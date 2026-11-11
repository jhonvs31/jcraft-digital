/** Ruta interna respetando el `base` (raíz en Vercel, /jcraft-digital en GitHub Pages). */
// La portada siempre es «/» (nunca «/index.html») y las páginas van sin «.html» (Vercel sirve /portafolio desde portafolio.html).
export const u = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '').replace(/(^|\/)index\.html$/, '$1').replace(/\.html(?=$|[?#])/, '')}`;

import contacto from '../content/ajustes/contacto.json';

// Número de WhatsApp: sale del teléfono que se edita en el panel (Ajustes → Contacto).
export const WA_NUMBER = contacto.phone.replace(/\D/g, '');
export const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
