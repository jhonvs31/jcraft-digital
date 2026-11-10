// Contenido del sitio. Los textos vienen tal cual de la versión HTML (mayo 2026).
// Lo marcado como «POR VERIFICAR» son cifras o testimonios que conviene confirmar con datos reales antes de mantenerlos.

export const contact = {
  email: 'jcraft.digital@gmail.com',
  phone: '+57 313 549 4737',
  instagram: 'https://instagram.com/jcraftdigital',
  facebook: 'https://facebook.com/jcraftdigital',
  linkedin: 'https://linkedin.com/company/jcraftdigital',
  web: 'jcraftdigital.com',
  location: 'Colombia — atendemos clientes en todo el país y LATAM',
  hours: ['Lunes a Viernes: 8:00 am – 6:00 pm', 'Sábados: 9:00 am – 1:00 pm'],
};

export const nav = [
  { href: 'index.html', label: 'Inicio' },
  { href: 'servicios.html', label: 'Servicios' },
  { href: 'portafolio.html', label: 'Portafolio' },
  { href: 'nosotros.html', label: 'Nosotros' },
  { href: 'blog.html', label: 'Blog' },
];

export const services = [
  {
    n: '01', icon: '📱', short: 'Redes Sociales', title: 'Gestión de Redes Sociales',
    teaser: 'Gestión completa de Instagram, Facebook y más. Estrategia, contenido, publicación y reporte de métricas para hacer crecer tu comunidad.',
    text: 'Tu marca siempre activa, siempre relevante. Nos encargamos de todo para que tú te enfoques en tu negocio.',
    items: ['Estrategia de contenido personalizada', 'Diseño de posts y stories profesionales', 'Publicación y programación de contenidos', 'Calendario editorial mensual', 'Reporte de métricas y crecimiento', 'Instagram, Facebook, LinkedIn, TikTok'],
  },
  {
    n: '02', icon: '🌐', short: 'Diseño Web', title: 'Creación de Sitios Web',
    teaser: 'Sitios web profesionales que se ven increíbles y convierten visitantes en clientes. Diseñamos y desarrollamos a medida.',
    text: 'Tu sitio web es tu oficina digital abierta las 24 horas. Lo diseñamos para que se vea bien, funcione perfecto y convierta.',
    items: ['Diseño único y adaptado a tu marca', '100% responsivo (móvil, tablet, desktop)', 'Velocidad y rendimiento optimizados', 'SEO básico incluido desde el inicio', 'Formularios de contacto y WhatsApp', 'Panel de administración fácil de usar'],
  },
  {
    n: '03', icon: '📣', short: 'Pauta Digital', title: 'Pauta Digital (Google & Meta Ads)',
    teaser: 'Campañas de Google Ads y Meta Ads optimizadas para maximizar tu retorno de inversión. Cada peso invertido, bien invertido.',
    text: 'Llevamos tu mensaje a las personas correctas, en el momento correcto, con el presupuesto que tengas disponible.',
    items: ['Configuración y gestión de campañas', 'Segmentación de audiencias avanzada', 'Diseño de creativos para anuncios', 'Pruebas A/B de anuncios', 'Optimización semanal de campañas', 'Reporte detallado de resultados'],
  },
  {
    n: '04', icon: '🎨', short: 'Diseño Gráfico', title: 'Diseño Gráfico e Identidad Visual',
    teaser: 'Identidad visual, piezas para redes, brochures y materiales que reflejan la esencia de tu marca con calidad profesional.',
    text: 'Una marca que se ve bien, genera confianza. Creamos tu identidad visual o renovamos la que ya tienes.',
    items: ['Diseño de logo e identidad de marca', 'Manual de marca completo', 'Piezas gráficas para redes sociales', 'Brochures, flyers y catálogos', 'Presentaciones corporativas', 'Diseño de packaging y etiquetas'],
  },
  {
    n: '05', icon: '📊', short: 'Estrategia Digital', title: 'Estrategia Digital Integral',
    teaser: 'Analizamos tu negocio y construimos una hoja de ruta digital personalizada. Cada acción tiene un objetivo medible.',
    text: 'Si necesitas un diagnóstico completo y una hoja de ruta clara para crecer en digital, este servicio es para ti.',
    items: ['Auditoría de presencia digital actual', 'Análisis de competencia', 'Definición de buyer persona', 'Plan de contenidos y canales', 'Objetivos y KPIs definidos', 'Presentación ejecutiva de resultados'],
  },
];

// Precios publicados en Servicios (COP primero y USD redondeado; definidos por Jhon el 4-nov-2026).
export const socialPlans = [
  { name: 'Básico', cop: 120000, price: 39, total: 12, featured: false, items: ['3 posts', '2 carruseles', '6 stories', '1 reel con motion graphics', 'Textos y hashtags', 'Calendario del mes', 'Publicamos por ti', 'Reporte mensual de métricas', '1 ronda de cambios'] },
  { name: 'Plus', cop: 200000, price: 59, total: 18, featured: true, items: ['4 posts', '3 carruseles', '9 stories', '2 reels con motion graphics', 'Textos y hashtags', 'Calendario del mes', 'Publicamos por ti', 'Reporte mensual de métricas', '1 ronda de cambios'] },
  { name: 'Pro', cop: 300000, price: 89, total: 26, featured: false, items: ['6 posts', '4 carruseles', '12 stories', '4 reels con motion graphics', 'Textos y hashtags', 'Calendario del mes', 'Publicamos por ti', 'Reporte mensual de métricas', '2 rondas de cambios'] },
];
export const webPlans = [
  { name: 'Sitio web', cop: 1000000, price: 320, text: 'Tu web profesional, lista para que te encuentren y te escriban.', items: ['Hasta 7 páginas', 'Diseño adaptado a tu marca', 'Se ve bien en móvil, tablet y computador', 'SEO básico desde el inicio', 'Formulario de contacto y botón de WhatsApp'] },
  { name: 'Tienda online', cop: 1500000, price: 470, text: 'Para vender tus productos por internet.', items: ['Catálogo de productos', 'Carrito de compras y pago en línea', 'Diseño adaptado a tu marca', 'Se ve bien en móvil, tablet y computador', 'SEO básico desde el inicio'] },
];
export const webCare = { name: 'Mantenimiento web', cop: 80000, price: 25, text: 'Cambios de textos e imágenes, copias de seguridad y revisión de que todo funcione.' };
// Resto de servicios. `from` muestra «desde»; `unit` va después del precio.
export const otherPricing = [
  {
    title: 'Pauta digital', period: 'al mes',
    note: 'La inversión en anuncios la pagas directamente a Meta o Google y no está incluida.',
    plans: [
      { name: 'Pauta Básica', cop: 150000, price: 49, unit: '/mes', items: ['Meta Ads (Instagram y Facebook)', 'Hasta 2 campañas', '4 creativos', 'Ajustes cada semana', 'Reporte mensual'] },
      { name: 'Pauta Plus', cop: 250000, price: 79, unit: '/mes', items: ['Meta Ads y Google Ads', 'Hasta 4 campañas', '8 creativos', 'Pruebas A/B de anuncios', 'Reporte mensual'] },
      { name: 'Pack Redes + Pauta', cop: 240000, price: 75, unit: '/mes', items: ['Plan de redes Básico (12 contenidos)', 'Pauta Básica en Meta Ads', 'Reporte mensual de redes y pauta', 'Más barato que contratarlos por separado'] },
    ],
  },
  {
    title: 'Diseño gráfico e identidad', period: 'pago único',
    plans: [
      { name: 'Logo', cop: 350000, price: 110, items: ['2 propuestas', '2 rondas de cambios', 'Archivos finales en todos los formatos'] },
      { name: 'Identidad de marca', cop: 700000, price: 220, items: ['Logo', 'Colores y tipografías', 'Manual de marca básico', '5 plantillas para redes'] },
      { name: 'Piezas sueltas', cop: 25000, price: 8, from: true, unit: 'por pieza', items: ['Flyer, post o banner'] },
      { name: 'Brochure o catálogo', cop: 150000, price: 47, from: true, items: ['Hasta 6 páginas'] },
    ],
  },
  {
    title: 'Estrategia digital', period: 'pago único',
    plans: [
      { name: 'Diagnóstico digital', cop: 0, price: 0, free: true, items: ['Revisión de redes, web y ficha de Google', 'Comparación con 3 competidores', 'Informe con recomendaciones', '1 reunión para explicarlo'] },
      { name: 'Plan estratégico', cop: 500000, price: 160, items: ['Diagnóstico digital', 'Cliente ideal', 'Plan de contenidos y canales para 3 meses', 'Objetivos medibles', 'Presentación de resultados'] },
    ],
  },
];

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
const A = (slug: string, f: string) => `assets/portafolio/${slug}/${f}.webp`;
export const portfolio: Case[] = [
  {
    cat: 'redes web', tag: 'Full Digital', emoji: '✈️', name: 'Pasaporte al Mundo Turismo', place: '📍 Cliente nacional · Cali', slug: 'pasaporte-al-mundo',
    text: 'Gestión 360° para agencia de viajes con 30 años en Cali: sitio web nuevo, estrategia SEO con blog, redes sociales con reels y piezas para campañas.',
    short: 'Gestión 360° para agencia de viajes: redes sociales, diseño gráfico, Meta Ads, sitio web con estrategia SEO.',
    result: 'Web · SEO · Redes · Diseño · Meta Ads', home: true,
    url: 'https://pasaportealmundo.co/', urlLabel: 'pasaportealmundo.co', ig: 'https://www.instagram.com/pasaportealmundo_turismo/',
    intro: 'Agencia de viajes de Cali que desde 1996 ayuda a sus clientes con visas, paquetes turísticos y seguros de viaje.',
    did: [
      'Sitio web nuevo con formulario de asesoría y WhatsApp, y secciones de visas, paquetes, seguros y blog.',
      'Estrategia SEO: auditoría del sitio y calendario de 36 artículos para el blog, de mayo a octubre de 2026.',
      'Parrilla mensual de 20 piezas para Instagram, Facebook y TikTok: posts, carruseles, reels y stories.',
      'Reels con motion graphics, como la serie que explica el trámite de la visa de Estados Unidos.',
      'Piezas para campañas de paquetes y promociones, y pauta en Meta Ads.',
    ],
    web: [
      { src: A('pasaporte-al-mundo', 'web-inicio'), alt: 'Inicio del sitio web de Pasaporte al Mundo con formulario de asesoría' },
      { src: A('pasaporte-al-mundo', 'web-visas'), alt: 'Sección del proceso de visa en 4 pasos' },
      { src: A('pasaporte-al-mundo', 'web-paquetes'), alt: 'Sección de paquetes turísticos y asistencia' },
    ],
    mobile: A('pasaporte-al-mundo', 'web-movil'),
    posts: [
      { src: A('pasaporte-al-mundo', 'post-30-anos'), alt: 'Post 30 años de confianza' },
      { src: A('pasaporte-al-mundo', 'post-espana'), alt: 'Post de paquete a España' },
      { src: A('pasaporte-al-mundo', 'post-aruba'), alt: 'Post de paquete a Aruba' },
      { src: A('pasaporte-al-mundo', 'post-agendate'), alt: 'Post Agéndate ya' },
    ],
  },
  {
    cat: 'web', tag: 'Tienda online · Ads · SEO', emoji: '💅', name: 'Oh Lala Beauty Bar', place: '📍 Cliente nacional', slug: 'oh-lala-beauty-bar',
    text: 'Rediseño completo de la tienda online de belleza con foco en experiencia de compra y conversión, estrategia SEO y campañas de Google Ads.',
    short: 'Rediseño completo del sitio web, campañas de Google Ads y estrategia SEO para posicionamiento orgánico y captación de nuevas clientas.',
    result: 'Tienda online · Google Ads · SEO', home: true,
    url: 'https://ohlalabeautybar.com/', urlLabel: 'ohlalabeautybar.com',
    intro: 'Tienda de maquillaje, cuidado capilar, skincare y cuidado corporal, con envíos a todo Colombia.',
    did: [
      'Rediseño de la tienda online: catálogo por categorías y marcas, ofertas, búsqueda de productos y carrito.',
      'Pagos con tarjeta, Nequi, transferencia y compra ahora, paga después.',
      'Botón de WhatsApp en todas las páginas para resolver dudas antes de comprar.',
      'Estrategia SEO para categorías y productos, y campañas de Google Ads.',
    ],
    web: [
      { src: A('oh-lala-beauty-bar', 'web-inicio'), alt: 'Inicio de la tienda online de Oh Lala Beauty Bar' },
      { src: A('oh-lala-beauty-bar', 'web-productos'), alt: 'Productos destacados y medios de pago' },
      { src: A('oh-lala-beauty-bar', 'web-marcas'), alt: 'Productos organizados por marca' },
    ],
    mobile: A('oh-lala-beauty-bar', 'web-movil'),
  },
  {
    cat: 'internacional web redes', tag: 'Internacional · EE. UU.', emoji: '🏗️', name: 'HR Unlimited Builders', place: '🌎 Cliente internacional · Estados Unidos', slug: 'hr-unlimited',
    text: 'Sitio web y contenido para redes en inglés para constructora residencial de Florida: empresa, servicios, portafolio de proyectos y piezas educativas.',
    result: 'Diseño Web · Redes · Contenido en inglés',
    url: 'https://hrunlimitedbuilders.com/', urlLabel: 'hrunlimitedbuilders.com',
    intro: 'Constructora residencial de Florida fundada en 2018, clasificada como Minority Business por el Florida State Minority Supplier Development Council.',
    did: [
      'Sitio web en inglés para el mercado de Estados Unidos.',
      'Secciones de empresa, valores (diseño, seguridad, diversidad), servicios y contacto.',
      'Portafolio de proyectos residenciales en carrusel.',
      'Opciones de accesibilidad y enlaces a Instagram y Facebook.',
      'Diseño de piezas para redes en inglés: datos del sector, tips para construir y decorar, y contenido sobre BIM.',
    ],
    web: [
      { src: A('hr-unlimited', 'web-nosotros'), alt: 'Sección About Us de HR Unlimited Builders' },
      { src: A('hr-unlimited', 'web-portafolio'), alt: 'Portafolio de proyectos residenciales' },
      { src: A('hr-unlimited', 'web-servicios'), alt: 'Servicios: consultoría, programación y administración de contratos' },
    ],
    posts: [
      { src: A('hr-unlimited', 'post-sabias-que'), alt: 'Post Did you know that… sobre construcción de edificios' },
      { src: A('hr-unlimited', 'post-tips-casa'), alt: 'Carrusel 3 tips para construir tu casa' },
      { src: A('hr-unlimited', 'post-real-estate'), alt: 'Carrusel 3 datos de finca raíz' },
      { src: A('hr-unlimited', 'post-bim'), alt: 'Post sobre Building Information Modeling (BIM)' },
    ],
  },
  {
    cat: 'internacional', tag: 'Internacional · México', emoji: '🎓', name: 'Ya Me Fui', place: '🌎 Cliente internacional · México', slug: 'ya-me-fui',
    text: 'Sitio web para agencia de estudios en el extranjero: destinos, servicios, blog y agenda de asesorías gratuitas.',
    result: 'Diseño Web · Contenido',
    url: 'https://yamefui.com/', urlLabel: 'yamefui.com',
    intro: 'Agencia que asesora a estudiantes para estudiar en el extranjero: programas académicos, trámites de visa y adaptación cultural.',
    did: [
      'Sitio web con llamado principal a agendar una asesoría educativa gratuita.',
      'Fichas de destinos por continente: Canadá, Australia, Irlanda, Malta, España y más.',
      'Secciones de servicios clave (seguro médico, traducción de documentos), equipo, preguntas frecuentes y blog.',
      'Versión en español e inglés.',
    ],
    web: [
      { src: A('ya-me-fui', 'web-inicio'), alt: 'Inicio del sitio web de Ya Me Fui' },
      { src: A('ya-me-fui', 'web-destinos'), alt: 'Destinos para estudiar en el extranjero' },
      { src: A('ya-me-fui', 'web-servicios'), alt: 'Servicios clave: traducción de documentos' },
    ],
    mobile: A('ya-me-fui', 'web-movil'),
  },
  {
    cat: 'web', tag: 'Diseño Web', emoji: '☀️', name: 'IbVC Momentum', place: '📍 Cliente nacional · Bogotá', slug: 'ibvc-momentum',
    text: 'Sitio web para empresa de sostenibilidad en la construcción: paneles solares, gerenciamiento de activos, bombeo de concreto e infraestructura.',
    result: 'Diseño Web · Contenido',
    url: 'https://ibvcmomentum.com/', urlLabel: 'ibvcmomentum.com',
    intro: 'Empresa que construye, mantiene y acondiciona activos para mejorar su eficiencia energética y reducir la huella de carbono en la construcción.',
    did: [
      'Sitio web con sus líneas de servicio: bombeo de concreto, gerenciamiento de activos, facilidades e infraestructura.',
      'Mensaje central de sostenibilidad y eficiencia, con llamado a solicitar cotización.',
      'Secciones de equipo de trabajo y aliados.',
    ],
    web: [
      { src: A('ibvc-momentum', 'web-inicio'), alt: 'Inicio del sitio web de IbVC Momentum' },
      { src: A('ibvc-momentum', 'web-sostenibilidad'), alt: 'Sección de sostenibilidad y eficiencia' },
      { src: A('ibvc-momentum', 'web-aliados'), alt: 'Equipo de trabajo y aliados' },
    ],
    mobile: A('ibvc-momentum', 'web-movil'),
  },
  {
    cat: 'web', tag: 'Diseño Web', emoji: '🤝', name: 'Cedecur', place: '📍 Cliente nacional · Cali', slug: 'cedecur',
    text: 'Sitio web para entidad sin ánimo de lucro de desarrollo comunitario: historia, modelo de intervención, impacto, testimonios y donaciones.',
    result: 'Diseño Web · Contenido',
    url: 'https://cedecur.org/web/', urlLabel: 'cedecur.org',
    intro: 'Centro de Educación e Investigación para el Desarrollo Comunitario Urbano y Rural: entidad sin ánimo de lucro creada en 1982 en Cali.',
    did: [
      'Sitio web con su historia, modelo de intervención, líneas de trabajo e impacto.',
      'Testimonios en video y sección de publicaciones.',
      'Botón de donación visible en todo el sitio.',
      'Muro de organizaciones aliadas.',
    ],
    web: [
      { src: A('cedecur', 'web-inicio'), alt: 'Inicio del sitio web de Cedecur' },
      { src: A('cedecur', 'web-modelo'), alt: 'Modelo de intervención de Cedecur' },
      { src: A('cedecur', 'web-aliados'), alt: 'Organizaciones aliadas' },
    ],
    mobile: A('cedecur', 'web-movil'),
  },
  {
    cat: 'redes', tag: 'Redes Sociales', emoji: '🧁', name: 'Caracolí Pastelería', place: '📍 Cliente nacional · Cali', slug: 'caracoli',
    text: 'Gestión integral de redes sociales para pastelería en Cali. Desarrollamos la estrategia de contenido, producción creativa, edición de videos y fotografía profesional para posicionar la marca digitalmente.',
    short: 'Gestión integral de redes sociales para pastelería en Cali. Estrategia de contenido, producción creativa, edición de videos y fotografía profesional.',
    result: 'Estrategia · Contenido · Redes · Foto & Video', home: true,
    intro: 'Pastelería de Cali con tortas, cupcakes y mesas dulces para celebraciones familiares y eventos empresariales.',
    did: [
      'Estrategia de contenido para Instagram con su identidad: rosado, flores ilustradas y tipografía a mano.',
      'Sesiones de fotografía de producto y con personas, en exteriores.',
      'Carruseles para mostrar los productos y la línea de pastelería para eventos empresariales.',
      'Contenido para fechas especiales, como el Día de la Madre.',
    ],
    posts: [
      { src: A('caracoli', 'post-dulce-legado'), alt: 'Carrusel Dulce legado, nuestros productos' },
      { src: A('caracoli', 'post-conoce'), alt: 'Carrusel Conoce algunos de nuestros productos' },
      { src: A('caracoli', 'post-eventos'), alt: 'Post de pastelería para eventos empresariales' },
      { src: A('caracoli', 'post-dia-madre'), alt: 'Carrusel del Día de la Madre' },
    ],
  },
  {
    cat: 'redes', tag: 'Redes Sociales', emoji: '🎓', name: 'Aspaen', place: '📍 Cliente nacional · Cali', slug: 'aspaen',
    text: 'Manejo completo de redes sociales para institución educativa. Estrategia de contenido enfocada en comunidad y valores institucionales, con producción audiovisual y fotografía.',
    result: 'Estrategia · Contenido · Redes · Foto & Video',
    intro: 'Red de colegios y preescolares (Juanambú, Entrevalles, Tayana y Tacurí) con una ruta de formación desde el preescolar hasta la universidad.',
    did: [
      'Estrategia de contenido para redes enfocada en comunidad y valores institucionales.',
      'Piezas para la temporada de admisiones: agenda tu cita, entrevistas y Open Day.',
      'Comunicación del regreso a clases y de las adecuaciones de las instalaciones.',
      'Fotografía de estudiantes en el colegio con la línea gráfica de cada sede.',
    ],
    posts: [
      { src: A('aspaen', 'post-formacion'), alt: 'Post Ofrecemos una ruta de formación completa' },
      { src: A('aspaen', 'post-open-day'), alt: 'Post Open Day, agenda tu visita' },
      { src: A('aspaen', 'post-libertad'), alt: 'Post Libertad y confianza' },
      { src: A('aspaen', 'post-evolucionando'), alt: 'Post En Aspaen seguimos evolucionando' },
    ],
  },
  {
    cat: 'web redes', tag: 'Web · Redes', emoji: '🏗️', name: 'Siamco Ingeniería', place: '📍 Cliente nacional · Cali', slug: 'siamco',
    text: 'Sitio web y redes sociales para empresa de ingeniería de Cali: servicios, proyectos y aliados en la web, y contenido técnico y visual para generar confianza y autoridad de marca.',
    result: 'Diseño Web · Estrategia · Contenido · Redes',
    url: 'https://siamcoingenieria.com/', urlLabel: 'siamcoingenieria.com',
    intro: 'Empresa de Cali especializada en impermeabilización, pisos arquitectónicos e industriales (concreto estampado, microcemento) y lavado de tanques de agua potable.',
    did: [
      'Sitio web con los servicios de la empresa, proyectos recientes y marcas aliadas.',
      'Botón de WhatsApp y llamados a la acción para pedir cotización.',
      'Piezas para redes con contenido técnico: datos de impermeabilización, pisos y proyectos realizados.',
    ],
    web: [
      { src: A('siamco', 'web-servicios'), alt: 'Sección de servicios del sitio web de Siamco Ingeniería' },
      { src: A('siamco', 'web-proyectos'), alt: 'Proyectos recientes de Siamco' },
      { src: A('siamco', 'web-aliados'), alt: 'Marcas aliadas de Siamco' },
    ],
    posts: [
      { src: A('siamco', 'post-scarlatta'), alt: 'Post Proyecto Edificio Scarlatta' },
      { src: A('siamco', 'post-impermeabilizar'), alt: 'Post ¿Sabías que? sobre impermeabilización' },
      { src: A('siamco', 'post-pisos'), alt: 'Post Marca la diferencia en tus pisos' },
      { src: A('siamco', 'post-nuevo-proyecto'), alt: 'Post ¿Un nuevo proyecto?' },
    ],
  },
  {
    cat: 'internacional', tag: 'Internacional · EE. UU.', emoji: '⚖️', name: 'Ehrlich & Naparstek', place: '🌎 Cliente internacional · Florida, Estados Unidos', slug: 'ehrlich-naparstek',
    text: 'Sitio web en inglés para firma de abogados de lesiones personales en Florida: casos que atienden, zonas, resultados, reseñas y evaluación gratuita.',
    result: 'Diseño Web · Contenido en inglés',
    url: 'https://eninjurylaw.com/', urlLabel: 'eninjurylaw.com',
    intro: 'Firma de abogados de Florida especializada en lesiones personales, accidentes de tránsito y compensación laboral, con oficinas en Palm Beach y la Treasure Coast.',
    did: [
      'Sitio web en inglés con llamado constante a la evaluación gratuita y a llamar 24/7.',
      'Páginas por tipo de caso y por cada ciudad o zona que atienden.',
      'Secciones de abogados, resultados de casos, reseñas de clientes, preguntas frecuentes y noticias.',
    ],
    web: [
      { src: A('ehrlich-naparstek', 'web-resultados'), alt: 'Sección de resultados de casos de Ehrlich & Naparstek' },
      { src: A('ehrlich-naparstek', 'web-equipo'), alt: 'Sección de los abogados de la firma' },
      { src: A('ehrlich-naparstek', 'web-contacto'), alt: 'Llamado a contacto 24/7' },
    ],
    mobile: A('ehrlich-naparstek', 'web-movil'),
  },
];
// Orden en que aparecen en la página de portafolio
const ORDER = ['pasaporte-al-mundo', 'caracoli', 'aspaen', 'oh-lala-beauty-bar', 'siamco', 'ibvc-momentum', 'hr-unlimited', 'cedecur', 'ya-me-fui', 'ehrlich-naparstek'];
portfolio.sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));


export const portfolioFilters = [
  { id: 'all', label: 'Todos' }, { id: 'redes', label: 'Redes Sociales' }, { id: 'web', label: 'Diseño Web' }, { id: 'internacional', label: 'Internacional' },
];

export const portfolioProcess = [
  { icon: '🔍', title: 'Descubrimiento', text: 'Entendemos tu negocio, tu audiencia y tus objetivos antes de proponer cualquier solución.' },
  { icon: '✏️', title: 'Diseño y Estrategia', text: 'Creamos la solución personalizada y la presentamos para tu aprobación antes de ejecutar.' },
  { icon: '🚀', title: 'Entrega y Seguimiento', text: 'Lanzamos, medimos resultados y optimizamos continuamente para maximizar el impacto.' },
];

export const faq = [
  { q: '¿Con cuánto presupuesto puedo empezar?', a: 'Los planes de redes sociales empiezan en $120.000 COP al mes (USD 39), los sitios web desde $1.000.000 COP (USD 320) y las tiendas online desde $1.500.000 COP (USD 470). El hosting y el dominio se pagan aparte. Si no sabes cuál te conviene, agenda una consulta gratuita y te asesoramos sin compromiso.' },
  { q: '¿Cuánto tiempo tarda en verse resultados?', a: 'Depende del servicio y el punto de partida. En redes sociales, los primeros resultados visibles suelen verse entre 30 y 60 días. En pauta digital, los resultados son más inmediatos desde la primera semana. Lo importante es tener expectativas realistas y dar tiempo a la estrategia.' },
  { q: '¿Tienen contratos de largo plazo?', a: 'Trabajamos con planes mensuales renovables. No te amarramos a contratos anuales forzosos. Creemos que si hacemos bien nuestro trabajo, tú vas a querer seguir con nosotros por elección propia.' },
  { q: '¿Puedo contratar solo un servicio?', a: '¡Claro! Puedes contratar solo lo que necesitas en este momento. Muchos clientes empiezan con un servicio y van agregando otros a medida que crecen. También ofrecemos paquetes combinados con mejor valor.' },
  { q: '¿Cómo es la comunicación durante el proceso?', a: 'Tendrás un canal directo de comunicación con tu gestor de cuenta (normalmente WhatsApp o email). Enviamos reportes mensuales y hacemos reuniones de seguimiento periódicas. Nunca estarás "en el aire" sin saber qué está pasando.' },
];

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
