// Portal JCraft · Crear un cliente nuevo desde el panel de JCraft.
// Solo la puede usar un administrador (tabla public.admins). La clave secreta de Supabase vive solo aquí,
// en el servidor de Supabase: nunca llega al navegador ni al repositorio.
//
// Recibe: { name, email, timezone, services: string[], plan, phone? }
// Hace: crea el usuario con una contraseña temporal (ya confirmado), crea el cliente y lo vincula.
// Devuelve: { client, email, password } para que JCraft le envíe el acceso al cliente.
import { createClient } from "npm:@supabase/supabase-js@2";

// Mismos códigos que SERVICES en src/scripts/portal/lib.ts
const SERVICES = new Set([
  "redes_basico", "redes_plus", "redes_pro",
  "sitio_web", "tienda_online", "mantenimiento_web",
  "pauta_basica", "pauta_plus", "pack_redes_pauta",
  "logo", "identidad_marca", "piezas_sueltas", "brochure",
  "diagnostico", "plan_estrategico",
]);
const PLANS = new Set(["basico", "plus", "pro"]);

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

function secretKey(): string {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try {
    const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
    return keys.default ?? Object.values(keys)[0] ?? "";
  } catch { return ""; }
}

// Contraseña temporal fácil de dictar: sin 0/O ni 1/l/I.
function tempPassword(): string {
  const letters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", digits = "23456789";
  const all = letters + digits;
  const rnd = crypto.getRandomValues(new Uint32Array(12));
  let out = "";
  for (let i = 0; i < 12; i++) out += (i === 4 || i === 9 ? digits : all)[rnd[i] % (i === 4 || i === 9 ? digits.length : all.length)];
  return out;
}

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "cliente";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Método no permitido." }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const key = secretKey();
  if (!key) return json({ error: "La función no tiene acceso a la clave del proyecto." }, 500);
  const admin = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  // 1. Quien llama debe ser administrador de JCraft.
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  const { data: who, error: whoErr } = await admin.auth.getUser(token);
  if (whoErr || !who?.user) return json({ error: "Inicia sesión de nuevo." }, 401);
  const { data: isAdmin } = await admin.from("admins").select("user_id").eq("user_id", who.user.id).maybeSingle();
  if (!isAdmin) return json({ error: "Solo JCraft puede crear clientes." }, 403);

  // 2. Validar datos.
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: "Datos inválidos." }, 400); }
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const timezone = String(body.timezone ?? "America/Bogota").trim();
  const phone = String(body.phone ?? "").replace(/[^\d+]/g, "") || null;
  const services = [...new Set((Array.isArray(body.services) ? body.services : []).map(String))].filter((s) => SERVICES.has(s));
  let plan = String(body.plan ?? "basico");
  if (!PLANS.has(plan)) plan = "basico";

  if (name.length < 2) return json({ error: "Escribe el nombre del cliente." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "El correo no es válido." }, 400);
  if (!services.length) return json({ error: "Elige al menos un servicio." }, 400);
  try { new Intl.DateTimeFormat("en-US", { timeZone: timezone }); } catch { return json({ error: "Zona horaria no válida." }, 400); }

  // 3. Nombre corto único (slug).
  const base = slugify(name);
  const { data: taken } = await admin.from("clients").select("slug").like("slug", `${base}%`);
  const used = new Set((taken ?? []).map((r) => r.slug));
  let slug = base;
  for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;

  // 4. Crear el usuario (ya confirmado: el correo gratuito de Supabase no les llega a los clientes).
  const password = tempPassword();
  const { data: created, error: userErr } = await admin.auth.admin.createUser({
    email, password, email_confirm: true, user_metadata: { name, client_slug: slug, must_change_password: true },
  });
  if (userErr || !created?.user) {
    const exists = /already|registered|exists/i.test(userErr?.message ?? "");
    return json({ error: exists ? "Ya existe un usuario con ese correo." : `No se pudo crear el usuario: ${userErr?.message}` }, exists ? 409 : 500);
  }
  const userId = created.user.id;

  // 5. Crear el cliente y vincularlo. Si algo falla, se deshace lo creado.
  const { data: client, error: cErr } = await admin.from("clients")
    .insert({ slug, name, timezone, plan, services, email, phone }).select("*").single();
  if (cErr || !client) {
    await admin.auth.admin.deleteUser(userId);
    return json({ error: `No se pudo crear el cliente: ${cErr?.message}` }, 500);
  }
  const { error: mErr } = await admin.from("client_members").insert({ client_id: client.id, user_id: userId });
  if (mErr) {
    await admin.from("clients").delete().eq("id", client.id);
    await admin.auth.admin.deleteUser(userId);
    return json({ error: `No se pudo dar acceso al cliente: ${mErr.message}` }, 500);
  }

  return json({ client, email, password });
});
