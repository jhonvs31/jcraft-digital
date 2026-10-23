# SEO de jcraft-digital: qué está hecho y qué falta

## Ya configurado en la web
- **Sitemap** en `/sitemap-index.xml`, con la fecha de cada artículo (`lastmod`).
- **robots.txt**: permite el acceso a Google, Bing y a los rastreadores de buscadores con IA (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot) y declara el sitemap.
- **llms.txt** en `/llms.txt`: un resumen del negocio y de todas las páginas para modelos de lenguaje.
- **Canonical** en cada página, sin duplicados.
- **Datos estructurados (schema.org)**:
  - En todas las páginas: empresa (`ProfessionalService`), con fundadores, contacto y redes, y sitio web (`WebSite`).
  - En las páginas internas: migas de pan (`BreadcrumbList`).
  - En Servicios: los servicios (`Service`) y sus preguntas frecuentes (`FAQPage`).
  - En los artículos del blog: `BlogPosting`, más `FAQPage` en los que tienen preguntas frecuentes.
- **Open Graph y Twitter Cards**: imagen para compartir de 1200 × 630 (`/og.jpg`).
- **Títulos** de 60 caracteres o menos, **descripciones** de 70 a 170 caracteres y **un solo H1** por página.
- **Página 404** propia, que no se indexa.
- **Rendimiento**: HTML estático y caché larga para los archivos de `/_astro` y `/assets` (`vercel.json`).
- **Seguridad**: cabeceras `nosniff`, `Referrer-Policy`, `X-Frame-Options` y `Permissions-Policy`.
- **Vistas previas de Vercel**: Vercel no deja que se indexen; solo se indexa la producción.

## Pasos que debe hacer Jhon (una sola vez)
### 1. Google Search Console
1. Entra a https://search.google.com/search-console y elige **Prefijo de la URL** con `https://jcraft-digital.vercel.app/`.
2. Elige el método **Etiqueta HTML** y copia solo el código del atributo `content="…"`.
3. En Vercel, abre el proyecto **jcraft-digital**, ve a *Settings → Environment Variables* y crea `PUBLIC_GOOGLE_SITE_VERIFICATION` con ese código, para el entorno *Production*. Luego haz **Redeploy**.
4. Vuelve a Search Console y pulsa **Verificar**.
5. En **Sitemaps**, envía `sitemap-index.xml`.
6. En **Inspección de URLs**, pide la indexación de la página de inicio y de los artículos más nuevos.

### 2. Bing Webmaster Tools
Su índice alimenta a Copilot y a otros buscadores. Entra a https://www.bing.com/webmasters, pulsa **Importar desde Google Search Console** (es lo más rápido) o verifica con la variable `PUBLIC_BING_SITE_VERIFICATION`, y envía el mismo sitemap.

### 3. Google Business Profile
Enlaza la web desde tu ficha de Google y usa el mismo nombre, teléfono y correo que aparecen en la web.

## Cuando tengas dominio propio
1. En Vercel: *Settings → Domains → Add* y agrega `jcraftdigital.com` y `www.jcraftdigital.com`. Vercel te da los registros DNS para pegarlos donde compraste el dominio. Marca uno como principal; el otro redirige solo.
2. En *Environment Variables*, crea `SITE_URL=https://jcraftdigital.com` (o el dominio principal que elijas) y haz **Redeploy**. Con eso se actualizan solos el canonical, el sitemap, robots, `llms.txt` y los datos estructurados.
3. Deja `jcraft-digital.vercel.app` redirigiendo al dominio nuevo: en *Domains*, edita ese dominio y elige **Redirect to** el principal.
4. En Search Console, agrega la **propiedad de dominio** nueva, verifícala por DNS y envía el sitemap otra vez.

## Contenido (lo que más posiciona)
- Publica **2 artículos al mes**. Cada artículo debe responder una pregunta real de los clientes, enlazar a 2 o 3 páginas de la web y cerrar con preguntas frecuentes.
- Los artículos están en `src/data/posts.json`; el script `scripts/posts_jun_oct_2026.py` sirve de plantilla.
- **No inventes cifras ni testimonios.** Si usas un dato, cita la fuente y la fecha. Ojo: algunos artículos antiguos tienen cifras sin fuente (por ejemplo, «46 %» en SEO local y «53 %» en Velocidad web). Conviene citar la fuente o reescribir esa frase.
