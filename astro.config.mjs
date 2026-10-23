// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// Dominio canónico. Cuando JCraft tenga dominio propio, basta con definir SITE_URL en Vercel
// (p. ej. https://jcraftdigital.com) y volver a publicar: canonical, sitemap, robots y datos estructurados se actualizan solos.
const SITE = process.env.SITE_URL || 'https://jcraft-digital.vercel.app';

// Fecha de cada artículo para el <lastmod> del sitemap.
const posts = JSON.parse(readFileSync(new URL('./src/data/posts.json', import.meta.url), 'utf8'));
const lastmod = Object.fromEntries(posts.map((p) => [`blog/${p.slug}.html`, p.modified || p.iso]));
const newest = posts.map((p) => p.modified || p.iso).sort().at(-1);

export default defineConfig({
  site: SITE,
  // Conserva las URLs antiguas (servicios.html, blog/seo-local.html…) para no romper enlaces ni SEO.
  build: { format: 'file' },
  trailingSlash: 'ignore',
  integrations: [sitemap({
    filter: (page) => !/\/(404|links)(\.html)?$/.test(page),
    serialize(item) {
      const path = new URL(item.url).pathname.replace(/^\//, '');
      const d = lastmod[path] || (path === 'blog.html' || path === '' ? newest : undefined);
      if (d) item.lastmod = new Date(`${d}T12:00:00-05:00`).toISOString();
      return item;
    },
  })],
  vite: { plugins: [tailwindcss()] },
});
