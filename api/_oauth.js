// Ayudas compartidas para el inicio de sesión con GitHub del panel /admin (Sveltia CMS).
// Los archivos que empiezan con «_» no se publican como funciones en Vercel.

/** Página que entrega el resultado a la ventana del panel (protocolo de Decap/Sveltia CMS) y se cierra. */
export function resultPage({ token, error }) {
  const nonce = crypto.randomUUID().replaceAll('-', '');
  const state = error ? 'error' : 'success';
  const content = error ? { provider: 'github', error } : { provider: 'github', token };
  const message = `authorization:github:${state}:${JSON.stringify(content)}`;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Panel JCraft</title></head>
<body style="font-family:system-ui;background:#061D47;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0">
<p>${error ? 'No se pudo iniciar sesión. Cierra esta ventana e inténtalo de nuevo.' : 'Listo, ya puedes volver al panel.'}</p>
<script nonce="${nonce}">
(() => {
  const msg = ${JSON.stringify(message)};
  // Solo se entrega el resultado al panel de este mismo sitio.
  window.addEventListener('message', ({ data, origin }) => {
    if (origin !== location.origin || data !== 'authorizing:github') return;
    window.opener?.postMessage(msg, origin);
    setTimeout(() => window.close(), 400);
  });
  window.opener?.postMessage('authorizing:github', location.origin);
})();
</script></body></html>`;
  return new Response(html, {
    status: error ? 400 : 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`,
      'X-Robots-Tag': 'noindex',
      'Set-Cookie': 'jc-oauth=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0',
    },
  });
}

export const cookie = (request, name) =>
  (request.headers.get('cookie') ?? '').split(/;\s*/).map((c) => c.split('=')).find(([k]) => k === name)?.[1] ?? '';
