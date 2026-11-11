// Contenido del sitio.
// Lo que se edita desde el panel (/admin) vive en src/content: contacto, inicio, servicios, precios, preguntas frecuentes, portafolio y blog.
// El resto (equipo, historia, valores, procesos) sigue aquí.
import contacto from '../content/ajustes/contacto.json';
import inicio from '../content/ajustes/inicio.json';
import serviciosData from '../content/ajustes/servicios.json';
import precios from '../content/ajustes/precios.json';
import faqData from '../content/ajustes/faq.json';

export const contact = contacto;
export const home = inicio;

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
export const contentService = {
  icon: '✍️', short: 'Contenido Estratégico',
  teaser: 'Creamos el contenido que tu audiencia quiere ver: textos, imágenes y videos que enganchan y generan conversaciones.',
};

export const why = [
  { icon: '🎯', title: 'Soluciones a medida', text: 'Cada estrategia es diseñada específicamente para tu negocio. Sin plantillas, sin atajos.' },
  { icon: '🤝', title: 'Transparencia total', text: 'Comunicación constante, reportes claros y resultados medibles. Sabrás exactamente qué hacemos y por qué.' },
  { icon: '🚀', title: 'Dos especialistas, un equipo', text: 'Diseño + Tecnología trabajando en sinergia. La combinación perfecta para resultados integrales.' },
  { icon: '❤️', title: 'Pasión en cada proyecto', text: 'Amamos lo que hacemos y se nota. Nos involucramos con tu negocio como si fuera nuestro.' },
];

export const approach = ['Diagnóstico inicial gratuito', 'Estrategia personalizada', 'Ejecución con calidad', 'Reportes mensuales', 'Optimización continua'];

export const process = [
  { n: '01', title: 'Diagnóstico', text: 'Analizamos tu negocio, mercado y competencia para entender el punto de partida.' },
  { n: '02', title: 'Estrategia', text: 'Diseñamos un plan digital personalizado con objetivos claros y métricas definidas.' },
  { n: '03', title: 'Ejecución', text: 'Implementamos con calidad, creatividad y atención al detalle en cada pieza.' },
  { n: '04', title: 'Resultados', text: 'Medimos, reportamos y optimizamos continuamente para maximizar el impacto.' },
];

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

export const portfolioProcess = [
  { icon: '🔍', title: 'Descubrimiento', text: 'Entendemos tu negocio, tu audiencia y tus objetivos antes de proponer cualquier solución.' },
  { icon: '✏️', title: 'Diseño y Estrategia', text: 'Creamos la solución personalizada y la presentamos para tu aprobación antes de ejecutar.' },
  { icon: '🚀', title: 'Entrega y Seguimiento', text: 'Lanzamos, medimos resultados y optimizamos continuamente para maximizar el impacto.' },
];

export const faq = faqData.preguntas;

export const team = [
  { img: 'assets/jhon.jpg', name: 'Jhon Vega', role: 'Co-Fundador · Web, Paid Media & Diseño', text: 'Especialista en creación de sitios web, pauta digital (Google & Meta Ads) y diseño gráfico. Transforma la visión de cada cliente en soluciones digitales que generan resultados reales.' },
  { img: 'assets/catalina.jpg', name: 'Catalina Escobar', role: 'Co-Fundadora · Diseño Gráfico & Redes Sociales', text: 'Especialista en diseño gráfico y gestión de redes sociales. Crea contenido visual que conecta con las audiencias y construye comunidades auténticas alrededor de cada marca.' },
];

export const values = [
  { icon: '🎨', title: 'Creatividad', text: 'Cada solución es diseñada a medida, sin plantillas genéricas.' },
  { icon: '🤝', title: 'Confianza', text: 'Trabajamos con transparencia y comunicación constante.' },
  { icon: '📊', title: 'Resultados', text: 'Cada acción tiene un objetivo medible. Sin excusas.' },
  { icon: '❤️', title: 'Pasión', text: 'Amamos lo que hacemos y se nota en cada proyecto.' },
  { icon: '🚀', title: 'Crecimiento', text: 'Aprendemos y evolucionamos junto a nuestros clientes.' },
];

export const history = [
  { year: '2023', title: 'El origen', text: 'Jhon y Catalina, dos esposos con habilidades complementarias, deciden unir fuerzas. La idea de JCraft Digital nace de una conversación de pareja: "¿Por qué las pymes no tienen acceso a marketing digital de calidad?"' },
  { year: '2024', title: 'Primeros clientes', text: 'Comenzamos con los primeros proyectos: diseño web para un restaurante local y gestión de redes para una boutique. Los resultados superaron expectativas y la recomendación de boca en boca comenzó a funcionar.' },
  { year: '2025', title: 'JCraft Digital oficial', text: 'Lanzamos JCraft Digital como agencia formal, con identidad de marca propia, portafolio de servicios completo y clientes en Colombia, México y Estados Unidos. El viaje apenas comienza.' },
  { year: '→', title: 'Lo que viene', text: 'Seguimos creciendo, aprendiendo y mejorando. Nuestro objetivo es claro: ser la agencia de referencia para pymes que quieren crecer en el mundo digital.' },
];

export const difference = [
  { icon: '👤', title: 'Para el cliente', text: 'Crecimiento digital real, presencia profesional y tranquilidad de tener un equipo que entiende su negocio.' },
  { icon: '⭐', title: 'Diferenciador', text: 'Dos especialistas (diseño + tecnología) trabajando juntos en cada proyecto. Un equipo completo en una sola propuesta.' },
  { icon: '🎯', title: 'Nuestra promesa', text: 'Soluciones digitales que se ven bien, funcionan bien y dan resultados. Sin complicaciones, con impacto real.' },
];

export const afterContact = [
  { n: '1', title: 'Respuesta en 24h', text: 'Te contactamos para confirmar que recibimos tu mensaje y agendar la reunión.' },
  { n: '2', title: 'Consulta gratuita', text: 'Conversamos sobre tu negocio, tus objetivos y qué soluciones se adaptan mejor.' },
  { n: '3', title: 'Propuesta personalizada', text: 'Preparamos una propuesta a medida con el plan, alcance y precio según tu negocio.' },
  { n: '4', title: '¡Empezamos!', text: 'Si estás de acuerdo, arrancamos. Sin burocracia, con toda la energía del primer día.' },
];

// ── Cifras: se calculan a partir del portafolio para que coincidan en toda la web.
// Si se agrega un cliente al portafolio, las cifras se actualizan solas.
const clientCount = portfolio.length;
const countries = new Set(portfolio.map((p) => (p.place.includes('México') ? 'México' : p.place.includes('Estados Unidos') ? 'Estados Unidos' : 'Colombia'))).size;

export const claims = {
  show: true,
  // Testimonios ocultos por decisión de Jhon (23-oct-2026): no estaban verificados. Solo se publican testimonios reales con permiso.
  showTestimonials: false,
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
  testimonials: [
    { stars: 5, text: 'JCraft transformó completamente mi presencia en Instagram. En solo 3 meses triplicamos los seguidores y empezamos a recibir pedidos directo por DM.', initials: 'MC', name: 'María Clara Ruiz', role: 'Dueña, Boutique Moda Clara' },
    { stars: 5, text: 'El sitio web que me hicieron es exactamente lo que necesitaba. Profesional, rápido y mis clientes me lo destacan todo el tiempo. ¡100% recomendados!', initials: 'LD', name: "Luigi D'Angelo", role: 'Propietario, Pizzería Don Luigi' },
    { stars: 5, text: 'Antes no entendía nada de pauta digital. JCraft me explicó todo con claridad y los resultados superaron mis expectativas. ¡Muy profesionales!', initials: 'AP', name: 'Andrés Pérez', role: 'Director, GymPro Fitness' },
  ],
  contactQuotes: [
    { text: 'Respondieron en minutos. La consulta fue super útil y sin presión.', who: 'María R.' },
    { text: 'Desde el primer mensaje sentí que entendían mi negocio.', who: 'Carlos M.' },
    { text: 'La propuesta llegó al día siguiente. Clara, detallada y justa.', who: 'Laura S.' },
  ],
  responseTime: 'Tiempo promedio de respuesta: menos de 2 horas en horario laboral.',
};

export const services_options = ['Gestión de Redes Sociales', 'Diseño y Desarrollo Web', 'Pauta Digital (Google / Meta Ads)', 'Diseño Gráfico e Identidad Visual', 'Estrategia Digital Integral', 'Varios servicios / No sé aún'];
export const budget_options = ['Menos de $500.000/mes', '$500.000 – $1.000.000/mes', '$1.000.000 – $3.000.000/mes', 'Más de $3.000.000/mes', 'Por definir'];
