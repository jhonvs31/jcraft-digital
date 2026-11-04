-- Portal JCraft · Brief de marca y galería de archivos del cliente (con límite por plan).
-- Ejecutar en Supabase → SQL Editor después de schema.sql. Se puede volver a ejecutar: no borra datos.

-- ── Plan de cada cliente (define cuántos archivos puede subir a su galería) ──
alter table public.clients add column if not exists plan text not null default 'basico';
alter table public.clients drop constraint if exists clients_plan_check;
alter table public.clients add constraint clients_plan_check check (plan in ('basico', 'plus', 'pro'));

-- Archivos permitidos por plan. Para cambiar los límites, cambia solo esta función.
create or replace function public.gallery_limit(cid uuid) returns integer
language sql stable security definer set search_path = public as $$
  select case (select plan from public.clients where id = cid)
    when 'pro' then 60
    when 'plus' then 40
    else 20 end;
$$;

-- Cuántos archivos tiene ya la galería de un cliente.
create or replace function public.gallery_count(cid uuid) returns integer
language sql stable security definer set search_path = public, storage as $$
  select count(*)::int from storage.objects where bucket_id = 'galeria' and (storage.foldername(name))[1] = cid::text;
$$;

-- ── Brief de marca (uno por cliente) ──
create table if not exists public.briefs (
  client_id uuid primary key references public.clients(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid
);
alter table public.briefs enable row level security;

drop policy if exists "brief: ver el propio" on public.briefs;
create policy "brief: ver el propio" on public.briefs for select using (public.is_admin() or public.is_member(client_id));
drop policy if exists "brief: crear el propio" on public.briefs;
create policy "brief: crear el propio" on public.briefs for insert with check (public.is_admin() or public.is_member(client_id));
drop policy if exists "brief: editar el propio" on public.briefs;
create policy "brief: editar el propio" on public.briefs for update using (public.is_admin() or public.is_member(client_id)) with check (public.is_admin() or public.is_member(client_id));

-- Fecha, autor y aviso al celular de JCraft cuando el cliente guarda su brief.
create or replace function public.briefs_touch() returns trigger
language plpgsql security definer set search_path = public as $$
declare topic text; cname text;
begin
  new.updated_at := now(); new.updated_by := auth.uid();
  if public.is_admin() then return new; end if;
  select value into topic from public.settings where key = 'ntfy_topic';
  select name into cname from public.clients where id = new.client_id;
  if topic is not null then
    perform net.http_post(url := 'https://ntfy.sh/',
      body := jsonb_build_object('topic', topic, 'title', 'Portal JCraft', 'message', format('📝 %s actualizó su brief de marca.', cname), 'tags', jsonb_build_array('memo')),
      headers := '{"Content-Type": "application/json"}'::jsonb);
  end if;
  return new;
end $$;
drop trigger if exists briefs_touch on public.briefs;
create trigger briefs_touch before insert or update on public.briefs for each row execute function public.briefs_touch();

-- ── Galería (archivos que sube el cliente: fotos, videos, logos, PDF) ──
-- Rutas «<id del cliente>/<archivo>». Máximo 15 MB por archivo y solo formatos de imagen, video y PDF.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('galeria', 'galeria', false, 15728640, array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/heic', 'image/heif', 'video/mp4', 'video/quicktime', 'application/pdf'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "galeria: ver" on storage.objects;
create policy "galeria: ver" on storage.objects for select
  using (bucket_id = 'galeria' and (public.is_admin() or public.is_member(((storage.foldername(name))[1])::uuid)));

-- Subir: solo en la carpeta propia y mientras no se pase del límite del plan.
drop policy if exists "galeria: subir" on storage.objects;
create policy "galeria: subir" on storage.objects for insert
  with check (bucket_id = 'galeria' and (
    public.is_admin() or (
      public.is_member(((storage.foldername(name))[1])::uuid)
      and public.gallery_count(((storage.foldername(name))[1])::uuid) < public.gallery_limit(((storage.foldername(name))[1])::uuid)
    )));

drop policy if exists "galeria: borrar" on storage.objects;
create policy "galeria: borrar" on storage.objects for delete
  using (bucket_id = 'galeria' and (public.is_admin() or public.is_member(((storage.foldername(name))[1])::uuid)));

-- Julia Wisteria tiene el plan Básico.
update public.clients set plan = 'basico' where slug = 'julia-wisteria';

select 'Listo: brief y galería creados' as resultado;
