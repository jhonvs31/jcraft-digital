// Artículos del blog. Cada artículo es un archivo en src/content/blog/<slug>.md que se edita desde el panel (/admin).
// - Artículos nuevos: el texto va en Markdown (cuerpo del archivo).
// - Artículos anteriores al panel: el texto está en HTML en el campo `html` (se conserva tal cual para no perder el diseño).
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';
import YAML from 'yaml';

export const categories: Record<string, string> = { seo: 'SEO', redes: 'Redes Sociales', web: 'Diseño Web', pauta: 'Pauta Digital', marca: 'Marca', estrategia: 'Estrategia' };
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export type Post = {
  slug: string; title: string; seoTitle: string; description: string; excerpt: string;
  iso: string; modified?: string; date: string; category: string; categoryName: string; emoji: string;
  featured: boolean; readTime: string; body: string; cover: string; og: string; draft?: boolean;
};

const iso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? '').slice(0, 10));
const pub = (f: string) => existsSync(join(process.cwd(), 'public', f));

// Fecha de hoy en Colombia: los artículos con fecha futura quedan programados y se publican ese día
// (la acción «Publicar artículos programados» vuelve a publicar la web cada madrugada que hay uno).
export const hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(new Date());

const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const posts: Post[] = Object.entries(files).map(([path, raw]) => {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const fm = (m ? YAML.parse(m[1]) : {}) ?? {};
  const md = (m ? m[2] : raw).trim();
  const body = md ? (marked.parse(md, { async: false }) as string) : String(fm.html ?? '').trim();
  const d = iso(fm.iso);
  const [y, mo, day] = d.split('-').map(Number);
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const category = String(fm.category ?? 'estrategia');
  // Portada: la subida desde el panel, o la generada con el diseño de la web, o la de su categoría mientras se genera.
  const upload = fm.cover ? String(fm.cover).replace(/^\//, '') : '';
  const cover = upload || (pub(`assets/blog/${slug}.webp`) ? `assets/blog/${slug}.webp` : `assets/blog/categoria/${category}.webp`);
  const og = pub(`assets/blog/og/${slug}.jpg`) ? `assets/blog/og/${slug}.jpg` : upload || `assets/blog/og/categoria/${category}.jpg`;
  return {
    slug, title: String(fm.title ?? slug), seoTitle: String(fm.seoTitle || fm.title || slug), description: String(fm.description ?? ''), excerpt: String(fm.excerpt || fm.description || ''),
    iso: d, ...(fm.modified ? { modified: iso(fm.modified) } : {}), date: `${day} ${MESES[mo - 1]} ${y}`,
    category, categoryName: categories[category] ?? category, emoji: String(fm.emoji ?? '📝'), featured: fm.featured === true,
    readTime: fm.readTime ? String(fm.readTime) : `${Math.max(1, Math.round(words / 200))} min`, body, cover, og, draft: fm.draft === true,
  };
}).filter((p) => p.iso && !p.draft && p.iso <= hoy).sort((a, b) => b.iso.localeCompare(a.iso));

// Un solo destacado: el primero marcado (el más reciente) o, si no hay ninguno, el más reciente.
const top = posts.find((p) => p.featured) ?? posts[0];
posts.forEach((p) => { p.featured = p === top; });

export default posts;
