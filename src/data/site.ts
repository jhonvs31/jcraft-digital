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

export const portfolio = [
  { cat: 'redes', tag: 'Redes Sociales', emoji: '🌿', name: 'Caracolí', place: '📍 Cliente nacional · Cali', text: 'Gestión integral de redes sociales para esta marca local. Desarrollamos la estrategia de contenido, producción creativa, edición de videos y fotografía profesional para posicionar la marca digitalmente.', short: 'Gestión integral de redes sociales para marca local en Cali. Estrategia de contenido, producción creativa, edición de videos y fotografía profesional.', result: 'Estrategia · Contenido · Redes · Foto & Video', home: true },
  { cat: 'redes', tag: 'Redes Sociales', emoji: '🎓', name: 'Aspaen', place: '📍 Cliente nacional · Cali', text: 'Manejo completo de redes sociales para institución educativa. Estrategia de contenido enfocada en comunidad y valores institucionales, con producción audiovisual y fotografía.', result: 'Estrategia · Contenido · Redes · Foto & Video' },
  { cat: 'redes', tag: 'Redes Sociales', emoji: '🏗️', name: 'Siamco Ingenierías', place: '📍 Cliente nacional · Cali', text: 'Posicionamiento digital para empresa de ingeniería. Creación de contenido técnico y visual atractivo para redes sociales, con estrategia orientada a generación de confianza y autoridad de marca.', result: 'Estrategia · Contenido · Redes · Foto & Video' },
  { cat: 'web', tag: 'Diseño Web', emoji: '👩‍💼', name: 'Mónica Muñoz', place: '📍 Cliente nacional · Cali', text: 'Diseño y creación de contenido para sitio web profesional. Producción de material audiovisual y fotografía para potenciar la presencia digital y credibilidad de esta profesional independiente.', result: 'Diseño Web · Contenido · Foto & Video' },
  { cat: 'web', tag: 'Diseño Web', emoji: '📚', name: 'Cedecur', place: '📍 Cliente nacional · Cali', text: 'Desarrollo de contenido web completo para esta institución. Diseño visual, redacción web, edición de videos y fotografía corporativa para comunicar su propuesta de valor de forma clara y atractiva.', result: 'Diseño Web · Contenido · Foto & Video' },
  { cat: 'web', tag: 'Diseño Web', emoji: '💼', name: 'IbVC Momentum', place: '📍 Cliente nacional · Bogotá', text: 'Creación del ecosistema web para esta empresa de capital de riesgo bogotana. Diseño de contenido web profesional, producción audiovisual y fotografía corporativa de alto impacto.', result: 'Diseño Web · Contenido · Foto & Video' },
  { cat: 'internacional', tag: 'Internacional · México', emoji: '✈️', name: 'Ya Me Fui', place: '🌎 Cliente internacional · México', text: 'Proyecto digital internacional para marca mexicana de viajes y lifestyle. Diseño de contenido web, producción de material audiovisual y fotografía adaptada al mercado latinoamericano.', result: 'Diseño Web · Contenido · Foto & Video' },
  { cat: 'internacional', tag: 'Internacional · EEUU', emoji: '🇺🇸', name: 'HR Unlimited', place: '🌎 Cliente internacional · Estados Unidos', text: 'Desarrollo de contenido web para empresa de recursos humanos con sede en Estados Unidos. Diseño visual bilingüe, edición de videos corporativos y fotografía profesional para mercado angloparlante.', result: 'Diseño Web · Contenido · Foto & Video' },
  { cat: 'web', tag: 'Web · Ads · SEO', emoji: '💅', name: 'Oh Lala Beauty Bar', place: '📍 Cliente nacional', text: 'Rediseño completo del sitio web con foco en experiencia de usuario y conversión. Implementación de estrategia SEO para posicionamiento orgánico y gestión de campañas de Google Ads para atraer nuevos clientes al salón de belleza.', short: 'Rediseño completo del sitio web, campañas de Google Ads y estrategia SEO para posicionamiento orgánico y captación de nuevas clientas.', result: 'Rediseño Web · Google Ads · SEO', home: true },
  { cat: 'redes', tag: 'Full Digital', emoji: '✈️', name: 'Pasaporte al Mundo Turismo', place: '📍 Cliente nacional', text: 'Gestión integral 360° para agencia de viajes: manejo de redes sociales, diseño gráfico de piezas para campañas, campañas de Meta Ads para captación de viajeros, y creación de sitio web con estrategia SEO para posicionamiento en búsquedas de turismo.', short: 'Gestión 360° para agencia de viajes: redes sociales, diseño gráfico, Meta Ads, sitio web con estrategia SEO.', result: 'Redes · Diseño · Meta Ads · Web · SEO', home: true },
];

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
