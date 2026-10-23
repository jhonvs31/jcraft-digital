# Seguridad

Si encuentras un problema de seguridad en este sitio, escríbenos a **jcraft.digital@gmail.com** en lugar de abrir un issue público. Respondemos lo antes posible.

## Medidas activas
- Sitio estático: no hay servidor, base de datos ni formularios que guarden datos. El formulario de contacto abre WhatsApp.
- Cabeceras de seguridad en `vercel.json`: CSP estricta, HSTS, X-Frame-Options, nosniff, Referrer-Policy, COOP y Permissions-Policy.
- Sin secretos en el repositorio: las verificaciones de Search Console y Bing van en variables de entorno de Vercel.
- GitHub: escaneo de secretos con bloqueo de subidas, Dependabot (alertas y parches) y rama `main` protegida contra borrados y reescrituras forzadas.
