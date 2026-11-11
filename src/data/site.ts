// Contenido del sitio.
// Lo que se edita desde el panel (/admin) vive en src/content: contacto, inicio, servicios, precios, preguntas frecuentes, portafolio y blog.
// El resto (equipo, historia, valores, procesos) sigue aquí.
import contacto from '../content/ajustes/contacto.json';
import inicio from '../content/ajustes/inicio.json';
import serviciosData from '../content/ajustes/servicios.json';
import precios from '../content/ajustes/precios.json';
import faqData from '../content/ajustes/faq.json';
import nosotros from '../content/ajustes/nosotros.json';
import paginaContacto from '../content/ajustes/pagina-contacto.json';
import paginaPortafolio from '../content/ajustes/pagina-portafolio.json';
import testimoniosData from '../content/ajustes/testimonios.json';
import seoData from '../content/ajustes/seo.json';
import avisoData from '../content/ajustes/aviso.json';

export const contact = contacto;
export const home = inicio;
export const seo = seoData;
export const aviso = avisoData;
const num = (i: number, pad = 2) => String(i + 1).padStart(pad, '0');

export const nav = [
  { href: 'index.html', label: 'Inicio' },
  { href: 'servicios.html', label: 'Servicios' },
  { href: 'portafolio.html', label: 'Portafolio' },
  { href: 'nosotros.html', label: 'Nosotros' },
  { href: 'blog.html', label: 'Blog' },
];

export const services = serviciosData.servicios.map((x, i) => ({ ...x, n: String(i + 1).padStart(2, '0') }));

// Precios publicados en Servicios (COP primero y USD redondeado; definidos por Jhon el 4-nov-2026).
type Plan = { id?: string; name: string; cop: number; price: number; eur: number; items: string[]; featured?: boolean; total?: number; text?: string; unit?: string; from?: boolean; free?: boolean };
export const socialPlans = precios.redes as (Plan & { total: number; featured: boolean })[];
export const webPlans = precios.web as (Plan & { text: string })[];
export const webCare = precios.mantenimiento as Omit<Plan, 'items'> & { text: string };
// Resto de servicios. `from` muestra «desde»; `unit` va después del precio.
export const otherPricing = precios.otros as { title: string; period: string; note?: string; plans: Plan[] }[];

// Sexta tarjeta de la portada (solo aparece en el inicio).
export const contentService = inicio.contenido;
export const why = inicio.porque;
export const approach = inicio.enfoque;
export const process = inicio.proceso.map((x, i) => ({ n: num(i), ...x }));

// Portafolio. Los campos `url`, `intro`, `did`, `web`, `mobile` y `posts` alimentan el pop-up de cada caso.
// Solo datos verificables: nada de cifras de resultados sin respaldo.
export type Case = {
  cat: string; tag: string; emoji: string; name: string; place: string; text: string; short?: string; result: string; home?: boolean;
  slug: string; url?: string; urlLabel?: string; ig?: string; intro?: string; did?: string[];
  web?: { src: string; alt: string }[]; mobile?: string; posts?: { src: string; alt: string }[];
};
// Cada caso es un archivo en src/content/portafolio/<slug>.json; el campo `orden` define la posición.
type CaseFile = Omit<Case, 'cat'> & { orden?: number; cats?: string[] };
const clean = (x?: string) => (x ? x.replace(/^\//, '') : x);
export const portfolio: Case[] = Object.values(import.meta.glob('../content/portafolio/*.json', { eager: true, import: 'default' }) as Record<string, CaseFile>)
  .sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999) || a.name.localeCompare(b.name))
  .map(({ orden: _o, cats, ...c }) => {
    // Lo que se deja vacío en el panel se trata como «no hay» (listas vacías, textos en blanco).
    const imgs = (l?: { src: string; alt: string }[]) => { const r = (l ?? []).filter((x) => x?.src).map((x) => ({ src: clean(x.src)!, alt: x.alt ?? '' })); return r.length ? r : undefined; };
    const txt = (v?: string) => (v && v.trim() ? v.trim() : undefined);
    const did = (c.did ?? []).filter((x) => x && x.trim());
    return {
      ...c, cat: (cats ?? []).join(' '), short: txt(c.short), url: txt(c.url), urlLabel: txt(c.urlLabel), ig: txt(c.ig), intro: txt(c.intro),
      did: did.length ? did : undefined, web: imgs(c.web), mobile: txt(clean(c.mobile)), posts: imgs(c.posts),
    };
  });

export const portfolioFilters = [
  { id: 'all', label: 'Todos', icon: 'all' }, { id: 'redes', label: 'Redes sociales', icon: 'redes' }, { id: 'web', label: 'Diseño web', icon: 'web' },
];

export const portfolioProcess = paginaPortafolio.proceso;

export const faq = faqData.preguntas;

export const team = nosotros.equipo.map((t) => ({ ...t, img: t.img.replace(/^\//, '') }));
export const values = nosotros.valores;
export const history = nosotros.historia;
export const difference = nosotros.diferencia;
export const afterContact = paginaContacto.despues.map((x, i) => ({ n: String(i + 1), ...x }));

// ── Cifras: se calculan a partir del portafolio para que coincidan en toda la web.
// Si se agrega un cliente al portafolio, las cifras se actualizan solas.
const clientCount = portfolio.length;
const countries = new Set(portfolio.map((p) => (p.place.includes('México') ? 'México' : p.place.includes('Estados Unidos') ? 'Estados Unidos' : 'Colombia'))).size;

export const claims = {
  show: true,
  // Testimonios: solo reales y con permiso del cliente. Se muestran cuando están activados en el panel y hay al menos uno.
  showTestimonials: testimoniosData.mostrar && testimoniosData.testimonios.length > 0,
  clients: clientCount,
  stats: [
    { value: clientCount, suffix: '', label: 'Clientes en el portafolio' },
    { value: countries, suffix: '', label: 'Países atendidos' },
    { value: 100, suffix: '%', label: 'Compromiso total' },
  ],
  portfolioStats: [
    { value: clientCount, suffix: '', label: 'Proyectos en el portafolio' },
    { value: clientCount, suffix: '', label: 'Clientes atendidos' },
    { value: countries, suffix: '', label: 'Países atendidos' },
    { value: 100, suffix: '%', label: 'Compromiso en cada proyecto' },
  ],
  testimonials: testimoniosData.testimonios.map((t: { texto: string; nombre: string; cargo?: string; estrellas?: number }) => ({
    stars: t.estrellas ?? 5, text: t.texto, name: t.nombre, role: t.cargo ?? '',
    initials: t.nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
  })),
  contactQuotes: testimoniosData.testimonios.slice(0, 3).map((t: { texto: string; nombre: string }) => ({ text: t.texto, who: t.nombre })),
  responseTime: paginaContacto.respuesta,
};

export const services_options = paginaContacto.servicios;
export const budget_options = paginaContacto.presupuestos;
