// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// GitHub Pages sirve el sitio en /jcraft-digital/; Vercel y el entorno local, en la raíz.
const onPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: onPages ? 'https://jhonvs31.github.io' : 'https://jcraft-digital.vercel.app',
  base: onPages ? '/jcraft-digital' : '/',
  // Conserva las URLs antiguas (servicios.html, blog/seo-local.html…) para no romper enlaces ni SEO.
  build: { format: 'file' },
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
