-- Portal de clientes de JCraft: tablas, permisos (RLS), almacenamiento y avisos.
-- Se ejecuta una vez en Supabase → SQL Editor. Se puede volver a ejecutar: no borra datos.

create extension if not exists pg_net;

-- ── Tablas ───────────────────────────────────────────────────────────────
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  timezone text not null default 'America/New_York',
  created_at timestamptz not null default now()
);

create table if not exists public.client_members (
  client_id uuid not null references public.clients(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key (client_id, user_id)
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  type text not null check (type in ('post', 'carrusel', 'story', 'reel')),
  title text not null,
  goal text,
  caption text,
  stickers text,
  media jsonb not null default '[]'::jsonb,         -- rutas en el bucket «piezas», en orden
  suggested_at timestamptz,                         -- fecha y hora que propone JCraft
  scheduled_at timestamptz,                         -- fecha y hora que elige el cliente
  status text not null default 'pendiente' check (status in ('pendiente', 'aprobado', 'cambios', 'publicado')),
  feedback text,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_client_idx on public.posts (client_id, suggested_at);

create table if not exists public.post_events (
  id bigint generated always as identity primary key,
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid,
  status text not null,
  feedback text,
  scheduled_at timestamptz,
  created_at timestamptz not null default now()
);

-- Ajustes privados (p. ej. el canal de avisos). Nadie lo lee desde la web.
create table if not exists public.settings (
  key text primary key,
  value text not null
);

-- ── Funciones de ayuda ───────────────────────────────────────────────────
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create or replace function public.is_member(cid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.client_members where client_id = cid and user_id = auth.uid());
$$;

-- ── Permisos (RLS) ───────────────────────────────────────────────────────
alter table public.clients enable row level security;
alter table public.client_members enable row level security;
alter table public.admins enable row level security;
alter table public.posts enable row level security;
alter table public.post_events enable row level security;
alter table public.settings enable row level security;

drop policy if exists "clientes: ver los propios" on public.clients;
create policy "clientes: ver los propios" on public.clients for select using (public.is_admin() or public.is_member(id));
drop policy if exists "clientes: admin gestiona" on public.clients;
create policy "clientes: admin gestiona" on public.clients for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "miembros: ver los propios" on public.client_members;
create policy "miembros: ver los propios" on public.client_members for select using (public.is_admin() or user_id = auth.uid());
drop policy if exists "miembros: admin gestiona" on public.client_members;
create policy "miembros: admin gestiona" on public.client_members for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins: verse a sí mismo" on public.admins;
create policy "admins: verse a sí mismo" on public.admins for select using (user_id = auth.uid());

drop policy if exists "piezas: ver las del cliente" on public.posts;
create policy "piezas: ver las del cliente" on public.posts for select using (public.is_admin() or public.is_member(client_id));
drop policy if exists "piezas: el cliente decide" on public.posts;
create policy "piezas: el cliente decide" on public.posts for update using (public.is_member(client_id)) with check (public.is_member(client_id));
drop policy if exists "piezas: admin gestiona" on public.posts;
create policy "piezas: admin gestiona" on public.posts for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "historial: ver el del cliente" on public.post_events;
create policy "historial: ver el del cliente" on public.post_events for select
  using (public.is_admin() or exists (select 1 from public.posts p where p.id = post_id and public.is_member(p.client_id)));

-- El cliente solo puede cambiar su decisión, el comentario y la fecha; nunca el contenido.
create or replace function public.posts_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if public.is_admin() then return new; end if;
  if old.status = 'publicado' then raise exception 'Esta pieza ya se publicó y no se puede cambiar.'; end if;
  if new.status not in ('aprobado', 'cambios') then raise exception 'Solo puedes aprobar o pedir cambios.'; end if;
  if new.status = 'cambios' and coalesce(trim(new.feedback), '') = '' then raise exception 'Cuéntanos qué quieres cambiar.'; end if;
  new.client_id := old.client_id; new.type := old.type; new.title := old.title; new.goal := old.goal;
  new.caption := old.caption; new.stickers := old.stickers; new.media := old.media;
  new.suggested_at := old.suggested_at; new.created_at := old.created_at;
  new.decided_at := now();
  return new;
end $$;
drop trigger if exists posts_guard on public.posts;
create trigger posts_guard before update on public.posts for each row execute function public.posts_guard();

-- Historial y aviso al celular de JCraft cuando el cliente aprueba o pide cambios.
create or replace function public.posts_notify() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  topic text;
  cname text;
  tz text;
  when_txt text;
  msg text;
begin
  if new.status is not distinct from old.status
     and new.feedback is not distinct from old.feedback
     and new.scheduled_at is not distinct from old.scheduled_at then
    return new;
  end if;
  insert into public.post_events (post_id, user_id, status, feedback, scheduled_at)
    values (new.id, auth.uid(), new.status, new.feedback, new.scheduled_at);
  if public.is_admin() or new.status not in ('aprobado', 'cambios') then return new; end if;

  select value into topic from public.settings where key = 'ntfy_topic';
  if topic is null then return new; end if;
  select name, timezone into cname, tz from public.clients where id = new.client_id;
  when_txt := to_char(coalesce(new.scheduled_at, new.suggested_at) at time zone tz, 'DD/MM HH24:MI');
  if new.status = 'aprobado' then
    msg := format('✅ %s aprobó «%s». Publicar el %s (hora de %s).', cname, new.title, when_txt, tz);
  else
    msg := format('✏️ %s pidió cambios en «%s»: %s', cname, new.title, new.feedback);
  end if;
  perform net.http_post(
    url := 'https://ntfy.sh/',                      -- publicación en JSON: el canal va dentro del cuerpo

    body := jsonb_build_object('topic', topic, 'title', 'Portal JCraft', 'message', msg,
                               'tags', jsonb_build_array(case when new.status = 'aprobado' then 'white_check_mark' else 'pencil2' end)),
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  return new;
end $$;
drop trigger if exists posts_notify on public.posts;
create trigger posts_notify after update on public.posts for each row execute function public.posts_notify();

-- ── Almacenamiento de las piezas (privado) ───────────────────────────────
-- Las rutas son «<id del cliente>/<archivo>». Solo el cliente dueño y JCraft las pueden ver.
insert into storage.buckets (id, name, public) values ('piezas', 'piezas', false) on conflict (id) do nothing;

drop policy if exists "piezas: ver archivos del cliente" on storage.objects;
create policy "piezas: ver archivos del cliente" on storage.objects for select
  using (bucket_id = 'piezas' and (public.is_admin() or public.is_member(((storage.foldername(name))[1])::uuid)));
drop policy if exists "piezas: admin sube" on storage.objects;
create policy "piezas: admin sube" on storage.objects for insert with check (bucket_id = 'piezas' and public.is_admin());
drop policy if exists "piezas: admin edita" on storage.objects;
create policy "piezas: admin edita" on storage.objects for update using (bucket_id = 'piezas' and public.is_admin());
drop policy if exists "piezas: admin borra" on storage.objects;
create policy "piezas: admin borra" on storage.objects for delete using (bucket_id = 'piezas' and public.is_admin());

-- Primer cliente
insert into public.clients (slug, name, timezone) values ('julia-wisteria', 'Julia Wisteria', 'America/New_York')
  on conflict (slug) do nothing;
