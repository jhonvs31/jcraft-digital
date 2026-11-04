// Portal de clientes: conexión con Supabase y utilidades compartidas (fechas en la zona del cliente, etiquetas).
import { createClient, type Session } from '@supabase/supabase-js';

// La URL y la clave «anon» de Supabase son públicas por diseño: lo que protege los datos son las reglas RLS de supabase/schema.sql.
const SUPABASE_URL = 'https://jjgepsfiajhommbruzbn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TTEHzWVoZVFcodh2fflprQ_XAHpDpic';
const URL_ = (import.meta.env.PUBLIC_SUPABASE_URL as string | undefined) || SUPABASE_URL;
const KEY = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined) || SUPABASE_ANON_KEY;
export const configured = Boolean(URL_ && KEY);
export const sb = createClient(URL_ || 'https://sin-configurar.supabase.co', KEY || 'sin-configurar');

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const portalUrl = (page: string) => `${base}/portal/${page}`;
export const go = (page: string) => location.assign(portalUrl(page));

export type Post = {
  id: string; client_id: string; type: 'post' | 'carrusel' | 'story' | 'reel'; title: string; goal: string | null;
  caption: string | null; stickers: string | null; media: string[]; suggested_at: string | null; scheduled_at: string | null;
  status: 'pendiente' | 'aprobado' | 'cambios' | 'publicado'; feedback: string | null; decided_at: string | null;
};
export type Client = { id: string; slug: string; name: string; timezone: string; plan?: 'basico' | 'plus' | 'pro' };

// Archivos por plan en la galería (igual que public.gallery_limit en supabase/02_brief_galeria.sql).
export const GALLERY_LIMIT = { basico: 20, plus: 40, pro: 60 } as const;
export const PLAN_NAME = { basico: 'Básico', plus: 'Plus', pro: 'Pro' } as const;
export const MAX_FILE_MB = 15;

export const TYPES: Record<Post['type'], string> = { post: 'Post', carrusel: 'Carrusel', story: 'Storie', reel: 'Reel' };
export const STATUS: Record<Post['status'], string> = { pendiente: 'Por revisar', aprobado: 'Aprobada', cambios: 'Con cambios', publicado: 'Publicada' };

/** Devuelve la sesión o manda a la página de acceso. */
export async function requireSession(): Promise<Session> {
  const { data } = await sb.auth.getSession();
  if (!data.session) { go('acceso.html'); throw new Error('sin sesión'); }
  return data.session;
}

export async function isAdmin(userId: string) {
  const { data } = await sb.from('admins').select('user_id').eq('user_id', userId).maybeSingle();
  return Boolean(data);
}

// ── Fechas: se guardan en UTC y se muestran y editan en la zona horaria del cliente ──
function partsIn(date: Date, tz: string) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    .formatToParts(date).map((x) => [x.type, x.value]));
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, mi: +p.minute };
}
const pad = (n: number) => String(n).padStart(2, '0');

/** ISO (UTC) → { date: 'YYYY-MM-DD', time: 'HH:MM' } en la zona del cliente. */
export function toInputs(iso: string | null, tz: string) {
  if (!iso) return { date: '', time: '' };
  const p = partsIn(new Date(iso), tz);
  return { date: `${p.y}-${pad(p.m)}-${pad(p.d)}`, time: `${pad(p.h)}:${pad(p.mi)}` };
}

/** Fecha y hora escritas en la zona del cliente → ISO (UTC). */
export function fromInputs(date: string, time: string, tz: string) {
  const [y, m, d] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  const wanted = Date.UTC(y, m - 1, d, h, mi);
  let guess = wanted;
  for (let i = 0; i < 2; i++) {
    const p = partsIn(new Date(guess), tz);
    guess += wanted - Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi);
  }
  return new Date(guess).toISOString();
}

export const fmtDate = (iso: string | null, tz: string, opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' }) =>
  iso ? new Intl.DateTimeFormat('es-CO', { timeZone: tz, ...opts }).format(new Date(iso)) : '';
export const fmtTime = (iso: string | null, tz: string) =>
  iso ? new Intl.DateTimeFormat('es-CO', { timeZone: tz, hour: 'numeric', minute: '2-digit' }).format(new Date(iso)) : '';
export const tzName = (tz: string) =>
  new Intl.DateTimeFormat('es-CO', { timeZone: tz, timeZoneName: 'long' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName')?.value ?? tz;

/** Enlaces temporales (1 h) para ver archivos privados del bucket «piezas». */
export async function signed(paths: string[]): Promise<Record<string, string>> {
  if (!paths.length) return {};
  const { data, error } = await sb.storage.from('piezas').createSignedUrls(paths, 3600);
  if (error) throw error;
  return Object.fromEntries((data ?? []).filter((x) => x.signedUrl).map((x) => [x.path as string, x.signedUrl]));
}
export const isVideo = (path: string) => /\.(mp4|mov|webm)$/i.test(path);

export function esc(s: string | null | undefined) {
  return (s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

/** Mensaje breve en pantalla. */
export function toast(text: string, kind: 'ok' | 'error' = 'ok') {
  const el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.className = `fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full px-6 py-3 font-display text-sm font-extrabold shadow-xl ${kind === 'ok' ? 'bg-cyan text-navy' : 'bg-red-500 text-white'}`;
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}
