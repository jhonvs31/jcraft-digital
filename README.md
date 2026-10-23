# JCraft Digital · sitio web

Sitio de JCraft Digital hecho con **Astro**, **Tailwind CSS 4**, **GSAP** (animaciones al hacer scroll) y **Lenis** (scroll suave).

## Trabajar en local
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Dónde está cada cosa
- `src/data/site.ts`: textos de servicios, portafolio, equipo, FAQ y contacto.
- `src/data/posts.json`: los artículos del blog.
- `src/pages/`: una página por archivo. Las URLs se conservan (`servicios.html`, `blog/seo-local.html`…).
- `src/scripts/motion.ts`: animaciones, menú móvil, filtros y formulario (abre WhatsApp con el mensaje listo).
- `public/assets/`: fotos y logos.

## Publicación
- **Vercel** (producción): detecta Astro y publica solo en cada push a `main`. Cada rama o PR genera una vista previa.
- **GitHub Pages**: ya no se usa. Para volver a activarlo haría falta un flujo de GitHub Actions que compile con `GITHUB_PAGES=true`.

## Por verificar
En `src/data/site.ts`, el objeto `claims` agrupa las cifras y los testimonios heredados de la versión anterior. Con `show: false` se ocultan en todo el sitio.
