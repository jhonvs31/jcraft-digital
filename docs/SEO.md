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

## Dominio y buscadores (hecho el 4 de noviembre de 2026)
- **Dominio principal:** `https://jcraft-digital.com`, comprado en Vercel (renovación automática). Los DNS son de Vercel (`ns1/ns2.vercel-dns.com`).
- `www.jcraft-digital.com` y `jcraft-digital.vercel.app` redirigen con 308 al dominio principal.
- **Variables de Vercel (Production):** `SITE_URL=https://jcraft-digital.com` y `PUBLIC_GOOGLE_SITE_VERIFICATION`. Con `SITE_URL` se generan solos el canonical, el sitemap, robots, `llms.txt` y los datos estructurados.
- **Sitemap:** `https://jcraft-digital.com/sitemap-index.xml`.
- **Google Search Console:** propiedad `jcraft-digital.com` verificada con etiqueta HTML, sitemap enviado y cambio de dirección hecho desde la propiedad `jcraft-digital.vercel.app`.
- En `src/layouts/Base.astro` hay **dos** etiquetas `google-site-verification`: la del dominio nuevo y la de `vercel.app`. No borres la segunda: mantiene verificada la propiedad vieja mientras dura el cambio de dirección.
- **Supabase no depende del dominio:** el portal usa `jjgepsfiajhommbruzbn.supabase.co`. En Supabase → Authentication → URL Configuration, el Site URL debe ser `https://jcraft-digital.com` y `https://jcraft-digital.com/**` debe estar en las redirecciones permitidas.

## Pendiente
- **Bing Webmaster Tools:** entra a https://www.bing.com/webmasters y pulsa **Importar desde Google Search Console**, o verifica con `PUBLIC_BING_SITE_VERIFICATION`. Envía el mismo sitemap.
- **Google Business Profile:** enlaza `https://jcraft-digital.com` desde tu ficha y usa el mismo nombre, teléfono y correo que la web.
- En **Inspección de URLs** de Search Console, pide la indexación del inicio y de los artículos más nuevos.

## Contenido (lo que más posiciona)
- Publica **2 artículos al mes**. Cada artículo debe responder una pregunta real de los clientes, enlazar a 2 o 3 páginas de la web y cerrar con preguntas frecuentes.
- Los artículos están en `src/data/posts.json`; el script `scripts/posts_jun_oct_2026.py` sirve de plantilla.
- **No inventes cifras ni testimonios.** Si usas un dato, cita la fuente y la fecha. Ojo: algunos artículos antiguos tienen cifras sin fuente (por ejemplo, «46 %» en SEO local y «53 %» en Velocidad web). Conviene citar la fuente o reescribir esa frase.
