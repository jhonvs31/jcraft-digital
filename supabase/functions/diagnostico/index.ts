// Diagnóstico digital gratis de jcraft-digital.com.
// Recibe las respuestas del formulario, revisa la página web y el Instagram público del negocio (si los dio), calcula el puntaje
// con los mismos criterios de los diagnósticos iniciales de JCraft y devuelve el informe. En public.diagnosticos solo se guarda el contacto.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';

const ORIGINS = ['https://jcraft-digital.com', 'https://www.jcraft-digital.com', 'http://localhost:4321', 'http://localhost:4340'];
const cors = (o: string | null) => ({
  'Access-Control-Allow-Origin': o && (ORIGINS.includes(o) || /^https:\/\/jcraft-digital-[\w-]+\.vercel\.app$/.test(o)) ? o : ORIGINS[0],
  'Access-Control-Allow-Headers': 'content-type, apikey, authorization, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  Vary: 'Origin',
});
const json = (o: string | null, body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors(o), 'Content-Type': 'application/json' } });
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

type Area = 'web' | 'redes' | 'google' | 'marca';
type Check = { id: string; area: Area; pts: number; ok: boolean; bien: string; mejora: string };

// ── Revisión técnica de la web
// deno-lint-ignore no-explicit-any
async function revisarWeb(raw: string): Promise<any> {
  let url: URL;
  try { url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`); } catch { return { ok: false, motivo: 'url' }; }
  const host = url.hostname.toLowerCase();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host) || /^(localhost|.*\.local|.*\.internal)$/.test(host) || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return { ok: false, motivo: 'url' };
  const t0 = performance.now();
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 9000);
    const r = await fetch(url.href, { redirect: 'follow', signal: ctl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JCraftDiagnostico/1.0; +https://jcraft-digital.com)', Accept: 'text/html' } });
    const ms = Math.round(performance.now() - t0);
    const reader = r.body?.getReader();
    let html = ''; let size = 0;
    if (reader) {
      const dec = new TextDecoder();
      while (size < 1_500_000) { const { done, value } = await reader.read(); if (done) break; size += value.length; html += dec.decode(value, { stream: true }); }
      reader.cancel().catch(() => {});
    }
    clearTimeout(timer);
    const final = new URL(r.url || url.href);
    const head = html.slice(0, 200_000);
    const get = (re: RegExp) => (head.match(re)?.[1] ?? '').replace(/\s+/g, ' ').trim();
    const title = get(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const desc = get(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) || get(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i);
    return {
      ok: r.ok, status: r.status, ms, https: final.protocol === 'https:', url: final.href,
      title, desc,
      viewport: /<meta[^>]+name=["']viewport["']/i.test(head),
      h1: /<h1[\s>]/i.test(html),
      og: /<meta[^>]+property=["']og:image["']/i.test(head),
      schema: /application\/ld\+json/i.test(html),
      // Botones de WhatsApp: enlaces directos o complementos (muchos se cargan con un script que menciona whatsapp)
      whatsapp: /(wa\.me\/|whatsapp)/i.test(html),
      contacto: /(href=["']tel:|href=["']mailto:)/i.test(html),
      kb: Math.round(size / 1024),
    };
  } catch {
    return { ok: false, motivo: 'no_responde', ms: Math.round(performance.now() - t0) };
  }
}

// ── Revisión del Instagram público (Zernio · business discovery). Solo cuentas Empresa o Creador públicas.
const ZERNIO_ACCOUNT = Deno.env.get('ZERNIO_IG_ACCOUNT_ID') ?? '6ac66b1dc9d3589f98d38f20'; // @jcraftdigital conectada por Facebook Login
function handleIG(raw: string): string | null {
  const m = raw.match(/instagram\.com\/([A-Za-z0-9._]{1,30})/i);
  const h = (m ? m[1] : raw.replace(/^@+/, '').trim()).replace(/\/$/, '');
  return /^[A-Za-z0-9._]{1,30}$/.test(h) && !['p', 'reel', 'reels', 'stories', 'explore'].includes(h.toLowerCase()) ? h : null;
}
// deno-lint-ignore no-explicit-any
async function revisarIG(raw: string): Promise<any> {
  const key = Deno.env.get('ZERNIO_API_KEY');
  const user = handleIG(raw);
  if (!user) return { ok: false, motivo: 'usuario' };
  if (!key) return { ok: false, motivo: 'error' };
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 9000);
    const r = await fetch(`https://zernio.com/api/v1/accounts/${ZERNIO_ACCOUNT}/instagram/business-discovery?username=${encodeURIComponent(user)}&limit=12`, { headers: { Authorization: `Bearer ${key}` }, signal: ctl.signal });
    clearTimeout(timer);
    if (r.status === 404) return { ok: false, motivo: 'no_publica', usuario: user };
    if (!r.ok) { console.error('zernio', r.status); return { ok: false, motivo: 'error' }; }
    const { profile: p, media } = await r.json();
    const now = Date.now();
    // deno-lint-ignore no-explicit-any
    const fechas = (media ?? []).map((m: any) => Date.parse(m.timestamp)).filter((t: number) => !Number.isNaN(t)).sort((a: number, b: number) => b - a);
    const ult30 = fechas.filter((t: number) => now - t <= 30 * 86400_000).length;
    // deno-lint-ignore no-explicit-any
    const reels = (media ?? []).filter((m: any) => m.mediaProductType === 'REELS' || m.mediaType === 'VIDEO').length;
    // deno-lint-ignore no-explicit-any
    const inter = (media ?? []).filter((m: any) => m.likeCount != null).map((m: any) => (m.likeCount ?? 0) + (m.commentsCount ?? 0));
    const bio = (p.biography ?? '').trim();
    return {
      ok: true, usuario: p.username, nombre: p.name ?? null, bio: bio.slice(0, 300), enlace: p.website ?? null,
      seguidores: p.followersCount ?? null, publicaciones: p.mediaCount ?? null,
      ult30, diasUltimo: fechas.length ? Math.floor((now - fechas[0]) / 86400_000) : null,
      reels, revisadas: (media ?? []).length,
      promedio: inter.length ? Math.round(inter.reduce((a: number, b: number) => a + b, 0) / inter.length) : null,
    };
  } catch {
    return { ok: false, motivo: 'error' };
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return json(origin, { error: 'method' }, 405);
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json(origin, { error: 'json' }, 400); }

  const d = {
    negocio: str(b.negocio, 120), rubro: str(b.rubro, 80), ciudad: str(b.ciudad, 80) || null,
    web: str(b.web, 200) || null, instagram: str(b.instagram, 120) || null, otras_redes: str(b.otras_redes, 200) || null,
    ficha_google: str(b.ficha_google, 20) || null,
    objetivos: Array.isArray(b.objetivos) ? b.objetivos.map((x) => str(x, 60)).filter(Boolean).slice(0, 8) : [],
    frecuencia: str(b.frecuencia, 40) || null, quien_maneja: str(b.quien_maneja, 60) || null, marca: str(b.marca, 40) || null,
    problema: str(b.problema, 600) || null, nombre: str(b.nombre, 80),
    whatsapp: str(b.whatsapp, 30) || null, email: str(b.email, 160).toLowerCase() || null,
    acepta_datos: b.acepta_datos === true, pagina: str(b.pagina, 200) || null,
  };
  if (d.negocio.length < 2 || !d.rubro || d.nombre.length < 2 || !d.acepta_datos) return json(origin, { error: 'datos' }, 422);
  if (!d.whatsapp && !d.email) return json(origin, { error: 'contacto' }, 422);
  if (!d.web && !d.instagram && !d.otras_redes) return json(origin, { error: 'presencia' }, 422);
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return json(origin, { error: 'email' }, 422);

  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
  // Freno básico: máximo 3 diagnósticos por contacto en una hora
  const since = new Date(Date.now() - 3600_000).toISOString();
  const or = [d.whatsapp && `whatsapp.eq.${d.whatsapp.replace(/[,()]/g, '')}`, d.email && `email.eq.${d.email.replace(/[,()]/g, '')}`].filter(Boolean).join(',');
  const { count } = await sb.from('diagnosticos').select('id', { count: 'exact', head: true }).gte('created_at', since).or(or);
  if ((count ?? 0) >= 3) return json(origin, { error: 'limite' }, 429);

  const [w, ig] = await Promise.all([d.web ? revisarWeb(d.web) : null, d.instagram ? revisarIG(d.instagram) : null]);
  const webOk = !!w && w.ok;
  const tieneRed = !!(d.instagram || d.otras_redes);
  const freq: Record<string, number> = { 'Casi nunca': 0, '1 vez por semana': 6, '2 o 3 veces por semana': 10, 'Casi todos los días': 12 };
  const man: Record<string, number> = { 'Nadie por ahora': 0, 'Yo mismo': 4, 'Alguien de mi equipo': 6, 'Una agencia o freelance': 8 };
  // Con el Instagram revisado, la frecuencia sale de las fechas reales (publicaciones en los últimos 30 días)
  const igOk = !!ig && ig.ok;
  const igPriv = !!ig && ig.motivo === 'no_publica';
  const freqReal = igOk ? (ig.ult30 >= 8 ? 12 : ig.ult30 >= 4 ? 8 : ig.ult30 >= 1 ? 4 : 0) : null;
  const hace = (n: number | null) => (n == null ? '' : n === 0 ? 'hoy' : n === 1 ? 'ayer' : `hace ${n} días`);
  const bioLarga = igOk && ig.bio.length >= 40;
  const bioPts = igOk ? (bioLarga ? 3 : 0) + (ig.enlace ? 3 : 0) : 0;
  const titleOk = webOk && w.title.length >= 10 && w.title.length <= 70;
  const descOk = webOk && w.desc.length >= 50 && w.desc.length <= 170;

  const C: Check[] = [
    // Página web (35)
    { id: 'web', area: 'web', pts: 5, ok: webOk, bien: 'Tu página web está en línea y responde.', mejora: d.web ? 'Tu página web no respondió cuando la revisamos: revisa el dominio y el hosting.' : 'No tienes página web: hoy dependes solo de tus redes, y Google y ChatGPT tienen menos información para recomendarte.' },
    { id: 'https', area: 'web', pts: 4, ok: webOk && w.https, bien: 'Tu web es segura (HTTPS, con candado).', mejora: 'Tu web no usa HTTPS: el navegador la marca como «no segura» y eso espanta clientes.' },
    { id: 'vel', area: 'web', pts: 5, ok: webOk && w.ms < 1500, bien: 'Tu web responde rápido.', mejora: 'Tu web tarda en responder: cada segundo de espera hace que más gente se vaya.' },
    { id: 'movil', area: 'web', pts: 4, ok: webOk && w.viewport, bien: 'Tu web está preparada para verse en el celular.', mejora: 'Tu web no está adaptada al celular, donde llega la mayoría de tus clientes.' },
    { id: 'titulo', area: 'web', pts: 3, ok: titleOk, bien: 'Tu web tiene un título claro para Google.', mejora: 'El título de tu web para Google falta o no está bien escrito: es lo primero que la gente lee en los resultados.' },
    { id: 'desc', area: 'web', pts: 3, ok: descOk, bien: 'Tu web tiene una descripción para Google.', mejora: 'A tu web le falta la descripción que Google muestra debajo del título.' },
    { id: 'h1', area: 'web', pts: 2, ok: webOk && w.h1, bien: 'Tu página principal tiene un titular principal.', mejora: 'Tu página principal no tiene un titular principal (H1) que diga qué haces.' },
    { id: 'wa', area: 'web', pts: 5, ok: webOk && (w.whatsapp || w.contacto), bien: 'Desde tu web te pueden escribir o llamar con un toque.', mejora: 'En tu web no encontramos un botón de WhatsApp o de llamada: ponles fácil escribirte.' },
    { id: 'og', area: 'web', pts: 2, ok: webOk && w.og, bien: 'Tu web se ve bien cuando la comparten por WhatsApp o redes.', mejora: 'Cuando comparten tu web por WhatsApp no sale una imagen de vista previa.' },
    { id: 'schema', area: 'web', pts: 2, ok: webOk && w.schema, bien: 'Tu web le explica a Google qué tipo de negocio eres (datos estructurados).', mejora: 'A tu web le faltan datos estructurados para que Google y las IA entiendan qué haces.' },
    // Redes (30). Con Instagram revisado: presencia 4 · frecuencia real 12 · bio y enlace 6 · responsable 4 · objetivo 4.
    // Con Instagram personal o privado: presencia 4 · cuenta profesional 2 · frecuencia declarada 12 · responsable 8 · objetivo 4.
    { id: 'red', area: 'redes', pts: igOk || igPriv ? 4 : 6, ok: tieneRed, bien: 'Tienes presencia en redes sociales.', mejora: 'No tienes redes activas: es el primer lugar donde te buscan para ver si eres confiable.' },
    ...(igPriv ? [{ id: 'pro', area: 'redes' as Area, pts: 2, ok: false, bien: '', mejora: `No pudimos ver @${ig.usuario}: es una cuenta personal o privada. Pásala a cuenta profesional (es gratis) para tener estadísticas y botón de contacto.` }] : []),
    igOk
      ? { id: 'freq', area: 'redes', pts: 12, ok: ig.ult30 >= 8, bien: `Publicas seguido: ${ig.ult30} publicaciones en los últimos 30 días.`, mejora: ig.ult30 >= 1 ? `En los últimos 30 días publicaste ${ig.ult30} ${ig.ult30 === 1 ? 'vez' : 'veces'}: con 2 o 3 publicaciones por semana tu cuenta crece mucho más.` : `Tu Instagram está quieto: la última publicación fue ${hace(ig.diasUltimo) || 'hace mucho'}. Un perfil sin movimiento hace que la gente dude si sigues abierto.` }
      : { id: 'freq', area: 'redes', pts: 12, ok: (freq[d.frecuencia ?? ''] ?? 0) >= 10, bien: 'Publicas con buena frecuencia.', mejora: (freq[d.frecuencia ?? ''] ?? 0) >= 6 ? 'Publicas una vez por semana: con 2 o 3 publicaciones semanales tu cuenta crece mucho más.' : 'Casi no publicas: un perfil quieto hace que la gente dude si sigues abierto.' },
    ...(igOk ? [{ id: 'bio', area: 'redes' as Area, pts: 6, ok: bioPts === 6, bien: 'Tu bio de Instagram explica qué haces y tiene enlace.', mejora: !ig.enlace ? 'Tu bio de Instagram no tiene enlace: pon tu WhatsApp o tu web para que te escriban con un toque.' : 'Tu bio de Instagram es muy corta: di qué haces, para quién y dónde en una o dos líneas.' }] : []),
    { id: 'man', area: 'redes', pts: igOk ? 4 : 8, ok: (man[d.quien_maneja ?? ''] ?? 0) >= 6, bien: 'Tus redes tienen a alguien a cargo.', mejora: d.quien_maneja === 'Yo mismo' ? 'Manejas tus redes tú solo: con un calendario y plantillas te toma mucho menos tiempo.' : 'Nadie está a cargo de tus redes: sin un responsable, la constancia se pierde.' },
    { id: 'obj', area: 'redes', pts: 4, ok: d.objetivos.length > 0 && d.objetivos.length <= 3, bien: 'Tienes claro qué quieres lograr.', mejora: 'Quieres lograr muchas cosas a la vez: elige 1 o 2 objetivos para enfocar tu contenido.' },
    // Google (20)
    { id: 'ficha', area: 'google', pts: 12, ok: d.ficha_google === 'Sí', bien: 'Tienes ficha en Google Maps.', mejora: d.ficha_google === 'No sé' ? 'No sabes si tienes ficha en Google Maps: búscate en Google y reclámala; es gratis.' : 'No tienes ficha en Google Maps: cuando buscan «cerca de mí», no apareces.' },
    { id: 'seo', area: 'google', pts: 4, ok: titleOk && descOk, bien: 'Google tiene un título y una descripción claros de tu web.', mejora: 'Google no tiene un título y una descripción claros de tu negocio para mostrar.' },
    { id: 'seo2', area: 'google', pts: 4, ok: webOk && w.schema, bien: 'Tus datos están listos para Google y los buscadores con IA.', mejora: 'Tus datos de negocio no están marcados para Google ni para los buscadores con IA.' },
    // Marca (15)
    { id: 'marca', area: 'marca', pts: 15, ok: d.marca === 'Sí, todo definido', bien: 'Tu marca tiene logo, colores y tipografías definidos.', mejora: d.marca === 'Solo el logo' ? 'Tienes logo, pero sin colores ni tipografías definidos tus piezas se ven distintas cada vez.' : 'No tienes una identidad visual definida: sin ella cuesta verse profesional y que te recuerden.' },
  ];
  // La frecuencia y el manejo suman parcial; el resto es todo o nada
  const partial: Record<string, number> = { freq: freqReal ?? freq[d.frecuencia ?? ''] ?? 0, man: Math.round((man[d.quien_maneja ?? ''] ?? 0) * (igOk ? 0.5 : 1)), bio: bioPts, ficha: d.ficha_google === 'Sí' ? 12 : d.ficha_google === 'No sé' ? 3 : 0, marca: d.marca === 'Sí, todo definido' ? 15 : d.marca === 'Solo el logo' ? 7 : 0, vel: webOk ? (w.ms < 1500 ? 5 : w.ms < 3000 ? 3 : 0) : 0 };
  const got = (c: Check) => (c.id in partial ? partial[c.id] : c.ok ? c.pts : 0);
  const MAX: Record<Area, number> = { web: 35, redes: 30, google: 20, marca: 15 };
  const areas = (Object.keys(MAX) as Area[]).map((a) => {
    const v = C.filter((c) => c.area === a).reduce((s, c) => s + got(c), 0);
    return { id: a, puntos: v, max: MAX[a], pct: Math.round((v / MAX[a]) * 100) };
  });
  const puntaje = Math.max(0, Math.min(100, areas.reduce((s, a) => s + a.puntos, 0)));
  const bien = C.filter((c) => c.ok).sort((x, y) => y.pts - x.pts).slice(0, 3).map((c) => c.bien);
  const mejoras = C.filter((c) => !c.ok && !(c.id !== 'web' && c.area === 'web' && !webOk) && !(c.id === 'seo2' && !webOk) && !(c.id === 'seo' && !webOk))
    .map((c) => ({ c, falta: c.pts - got(c) })).sort((x, y) => y.falta - x.falta).slice(0, 3).map(({ c }) => ({ area: c.area, texto: c.mejora }));
  const peor = [...areas].sort((x, y) => x.pct - y.pct)[0].id;
  const nivel = puntaje >= 75 ? 'Fuerte' : puntaje >= 50 ? 'En camino' : puntaje >= 25 ? 'Con mucho por ganar' : 'Por construir';
  const resultado = {
    puntaje, nivel, areas, bien, mejoras, prioridad: peor,
    web: w ? (w.ok ? { revisada: true, url: w.url, https: w.https, ms: w.ms, movil: w.viewport, titulo: w.title.slice(0, 120), descripcion: w.desc.slice(0, 200), whatsapp: w.whatsapp, kb: w.kb } : { revisada: false, motivo: w.motivo }) : null,
    ig: ig ? (ig.ok ? { revisada: true, usuario: ig.usuario, seguidores: ig.seguidores, publicaciones: ig.publicaciones, ult30: ig.ult30, diasUltimo: ig.diasUltimo, reels: ig.reels, revisadas: ig.revisadas, promedio: ig.promedio, bio: !!bioLarga, enlace: !!ig.enlace } : { revisada: false, motivo: ig.motivo }) : null,
    fecha: new Date().toISOString(),
  };

  // Solo se guarda el contacto; el informe se devuelve a la persona y no queda en la base (decisión de Jhon, 10-nov-2026)
  const { error } = await sb.from('diagnosticos').insert({ negocio: d.negocio, nombre: d.nombre, whatsapp: d.whatsapp, email: d.email, acepta_datos: true });
  if (error) { console.error(error); return json(origin, { error: 'guardar' }, 500); }
  return json(origin, resultado);
});
