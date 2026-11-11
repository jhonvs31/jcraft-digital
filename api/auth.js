// Paso 1 del inicio de sesión con GitHub del panel /admin: manda a GitHub a pedir permiso.
// Necesita en Vercel la variable GITHUB_CLIENT_ID (de la OAuth App de GitHub).
import { resultPage } from './_oauth.js';

const SCOPES = new Set(['public_repo', 'repo']);

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) return resultPage({ error: 'Falta configurar GITHUB_CLIENT_ID en Vercel.' });
    if (url.searchParams.get('provider') !== 'github') return resultPage({ error: 'Proveedor no soportado.' });
    const asked = url.searchParams.get('scope') ?? '';
    const scope = SCOPES.has(asked) ? asked : 'public_repo';
    const state = crypto.randomUUID().replaceAll('-', '');
    const to = new URL('https://github.com/login/oauth/authorize');
    to.search = new URLSearchParams({ client_id: clientId, scope, state, redirect_uri: `${url.origin}/api/callback`, allow_signup: 'false' }).toString();
    return new Response(null, {
      status: 302,
      headers: {
        Location: to.href,
        'Cache-Control': 'no-store',
        // Protección CSRF: GitHub devuelve el mismo «state» y se compara con esta cookie.
        'Set-Cookie': `jc-oauth=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,
      },
    });
  },
};
