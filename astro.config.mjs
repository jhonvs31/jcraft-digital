// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';

// Dominio canónico. Cuando JCraft tenga dominio propio, basta con definir SITE_URL en Vercel
// (p. ej. https://jcraftdigital.com) y volver a publicar: canonical, sitemap, robots y datos estructurados se actualizan solos.
const SITE = process.env.SITE_URL || 'https://jcraft-digital.vercel.app';

// Fecha de cada artículo para el <lastmod> del sitemap.
// Los artículos están en src/content/blog/<slug>.md (se editan desde el panel /admin).
const blogDir = new URL('./src/content/blog/', import.meta.url);
const posts = readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => {
  const fm = YAML.parse(readFileSync(new URL(f, blogDir), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '') ?? {};
  return { slug: f.replace(/\.md$/, ''), iso: String(fm.iso ?? '').slice(0, 10), modified: fm.modified ? String(fm.modified).slice(0, 10) : undefined, draft: fm.draft === true };
}).filter((p) => p.iso && !p.draft);
const lastmod = Object.fromEntries(posts.map((p) => [`blog/${p.slug}`, p.modified || p.iso]));
const newest = posts.map((p) => p.modified || p.iso).sort().at(-1);

export default defineConfig({
  site: SITE,
  // Las páginas se generan como archivos .html; Vercel las sirve sin la extensión (cleanUrls) y redirige las URLs antiguas con .html.
  build: { format: 'file' },
  trailingSlash: 'ignore',
  integrations: [sitemap({
    filter: (page) => !/\/(404|links)(\.html)?$/.test(page) && !/\/portal\//.test(page),
    serialize(item) {
      // URLs limpias, sin «.html» (vercel.json → cleanUrls).
      const url = new URL(item.url);
      url.pathname = url.pathname.replace(/\.html$/, '').replace(/(.)\/$/, '$1');
      item.url = url.href;
      const path = url.pathname.replace(/^\//, '');
      const d = lastmod[path] || (path === 'blog' || path === '' ? newest : undefined);
      if (d) item.lastmod = new Date(`${d}T12:00:00-05:00`).toISOString();
      return item;
    },
  })],
  vite: { plugins: [tailwindcss()] },
});
