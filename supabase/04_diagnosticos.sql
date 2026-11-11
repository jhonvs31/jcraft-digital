-- Diagnóstico digital gratis de la web (ya ejecutado en Supabase el 10-nov-2026).
-- El público NO escribe directo en la tabla: todo entra por la función «diagnostico» (supabase/functions/diagnostico),
-- que revisa la web del negocio, calcula el puntaje y guarda la fila. Solo los administradores leen y actualizan.
create table public.diagnosticos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  negocio text not null check (char_length(negocio) between 2 and 120),
  rubro text not null check (char_length(rubro) <= 80),
  ciudad text check (char_length(ciudad) <= 80),
  web text check (char_length(web) <= 200),
  instagram text check (char_length(instagram) <= 120),
  otras_redes text check (char_length(otras_redes) <= 200),
  ficha_google text check (char_length(ficha_google) <= 20),
  objetivos text[] not null default '{}' check (cardinality(objetivos) <= 8),
  frecuencia text check (char_length(frecuencia) <= 40),
  quien_maneja text check (char_length(quien_maneja) <= 60),
  marca text check (char_length(marca) <= 40),
  problema text check (char_length(problema) <= 600),
  nombre text not null check (char_length(nombre) between 2 and 80),
  whatsapp text check (char_length(whatsapp) <= 30),
  email text check (char_length(email) <= 160),
  acepta_datos boolean not null check (acepta_datos),
  pagina text check (char_length(pagina) <= 200),
  puntaje int check (puntaje between 0 and 100),
  resultado jsonb,
  estado text not null default 'nuevo' check (estado in ('nuevo','en_proceso','enviado','descartado')),
  notas text,
  constraint diagnosticos_contacto check (coalesce(whatsapp,'') <> '' or coalesce(email,'') <> ''),
  constraint diagnosticos_presencia check (coalesce(web,'') <> '' or coalesce(instagram,'') <> '' or coalesce(otras_redes,'') <> '')
);
alter table public.diagnosticos enable row level security;
revoke all on public.diagnosticos from anon, authenticated;
grant select, update, delete on public.diagnosticos to authenticated;
create policy "admins leen diagnosticos" on public.diagnosticos for select to authenticated using (public.is_admin());
create policy "admins actualizan diagnosticos" on public.diagnosticos for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins borran diagnosticos" on public.diagnosticos for delete to authenticated using (public.is_admin());
create index diagnosticos_created_at_idx on public.diagnosticos (created_at desc);

-- Aviso al celular (ntfy, mismo canal del portal): solo negocio, rubro y puntaje; nunca datos de contacto.
create or replace function public.diagnosticos_notify()
returns trigger language plpgsql security definer set search_path = public as $$
declare topic text;
begin
  select value into topic from public.settings where key = 'ntfy_topic';
  if topic is null then return new; end if;
  perform net.http_post(
    url := 'https://ntfy.sh/',
    body := jsonb_build_object('topic', topic, 'title', 'Nuevo diagnóstico gratis',
      'message', format('🔎 %s (%s) hizo su diagnóstico en la web. Puntaje: %s/100.', new.negocio, new.rubro, coalesce(new.puntaje::text, '—')),
      'tags', jsonb_build_array('mag')),
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  return new;
end $$;
revoke execute on function public.diagnosticos_notify() from public, anon, authenticated;
create trigger diagnosticos_notify after insert on public.diagnosticos for each row execute function public.diagnosticos_notify();
