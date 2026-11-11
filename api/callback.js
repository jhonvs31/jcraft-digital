// Paso 2 del inicio de sesión con GitHub del panel /admin: GitHub vuelve aquí con un código y lo cambiamos por el token.
// Necesita en Vercel GITHUB_CLIENT_ID y GITHUB_CLIENT_SECRET (de la OAuth App de GitHub). El token no se guarda en ningún lado:
// se entrega solo a la ventana del panel de este mismo sitio.
import { resultPage, cookie } from './_oauth.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!clientId || !clientSecret) return resultPage({ error: 'Faltan las variables de GitHub en Vercel.' });
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    if (!code || !state || state !== cookie(request, 'jc-oauth')) return resultPage({ error: 'La solicitud no es válida o expiró.' });
    try {
      const r = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: `${url.origin}/api/callback` }),
      });
      const data = await r.json();
      if (!data.access_token) return resultPage({ error: data.error_description || data.error || 'GitHub no entregó el token.' });
      return resultPage({ token: data.access_token });
    } catch {
      return resultPage({ error: 'No se pudo conectar con GitHub.' });
    }
  },
};
