/** Ruta interna respetando el `base` (raíz en Vercel, /jcraft-digital en GitHub Pages). */
export const u = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export const WA_NUMBER = '573135494737';
export const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
