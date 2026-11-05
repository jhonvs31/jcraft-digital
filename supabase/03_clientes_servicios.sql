-- Portal JCraft · Servicios contratados y datos de contacto de cada cliente.
-- Se puede volver a ejecutar: no borra datos. Los clientes nuevos se crean desde el panel de JCraft
-- (Clientes → Nuevo cliente), que llama a la función segura supabase/functions/crear-cliente.

-- Servicios contratados, con los códigos de SERVICES en src/scripts/portal/lib.ts
-- (p. ej. {redes_plus,pauta_basica}). El plan de redes también queda en clients.plan (límite de la galería).
alter table public.clients add column if not exists services text[] not null default '{}'::text[];
alter table public.clients add column if not exists email text;   -- correo con el que entra el cliente
alter table public.clients add column if not exists phone text;   -- WhatsApp del cliente (opcional)

-- Julia Wisteria contrató Redes Básico.
update public.clients set services = array['redes_basico'] where slug = 'julia-wisteria' and services = '{}'::text[];

select 'Listo: servicios y contacto de clientes' as resultado;
