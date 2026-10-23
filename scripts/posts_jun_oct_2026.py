# -*- coding: utf-8 -*-
"""Agrega a src/data/posts.json los artículos de junio a octubre de 2026 (2 por mes).
Sin cifras inventadas: los consejos son prácticos y no citan estadísticas sin fuente.
Uso: python3 scripts/posts_jun_oct_2026.py
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data" / "posts.json"
MES = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
CAT = {"redes": "Redes Sociales", "web": "Diseño Web", "pauta": "Pauta Digital", "marca": "Marca", "seo": "SEO", "estrategia": "Estrategia"}

def faq(items):
    """Bloque de preguntas frecuentes al final del artículo (útil para Google y buscadores con IA)."""
    out = '<h2>Preguntas frecuentes</h2>'
    for q, a in items:
        out += f'<h3>{q}</h3><p>{a}</p>'
    return out

def steps(items):
    out = '<div class="step-list">'
    for i, (t, p) in enumerate(items, 1):
        out += f'<div class="step-item"><div class="step-num">{i}</div><div class="step-content"><h3>{t}</h3><p>{p}</p></div></div>'
    return out + '</div>'

def ul(items): return '<ul>' + ''.join(f'<li>{x}</li>' for x in items) + '</ul>'
def box(t): return f'<div class="highlight-box"><p>{t}</p></div>'
def link(slug, text): return f'<a href="../blog/{slug}.html">{text}</a>'
def svc(text): return f'<a href="../servicios.html">{text}</a>'
def contact(text): return f'<a href="../contacto.html">{text}</a>'

POSTS = [
dict(iso="2026-06-10", slug="whatsapp-business-pymes", category="redes", emoji="💬",
 title="WhatsApp Business para pymes: cómo configurarlo para vender más",
 seoTitle="WhatsApp Business para pymes: configuración para vender más",
 description="Guía práctica para configurar WhatsApp Business: perfil, catálogo, respuestas rápidas, etiquetas y mensajes automáticos para atender mejor y cerrar más ventas.",
 excerpt="Tu cliente ya te escribe por WhatsApp. Te mostramos cómo configurar el perfil, el catálogo y las respuestas rápidas para atender mejor y vender más.",
 body=f"""<p>En Colombia, buena parte de las ventas de una pyme empieza con un mensaje: «Hola, ¿precio?». Si ese mensaje llega a un WhatsApp personal, sin catálogo ni respuestas preparadas, cada conversación depende de que tengas tiempo para contestar. WhatsApp Business existe para ordenar eso, y es gratis.</p>
{box("💡 La meta no es responder más rápido a cualquier costo, sino que cada persona que escribe reciba la información que necesita para comprarte.")}
<h2>1. Un perfil de empresa completo</h2>
<p>El perfil es lo primero que revisa un cliente nuevo. Complétalo como si fuera tu vitrina:</p>
{ul(["<strong>Nombre del negocio</strong> igual al de tu Instagram y tu ficha de Google.", "<strong>Categoría</strong> correcta (restaurante, tienda de ropa, servicios profesionales…).", "<strong>Descripción</strong> corta: qué vendes, para quién y en qué zona.", "<strong>Horario de atención</strong>, dirección (si tienes local), correo y enlace a tu web.", "<strong>Foto de perfil</strong> con tu logo bien centrado, legible en tamaño pequeño."])}
<h2>2. Catálogo: que vean antes de preguntar</h2>
<p>El catálogo permite mostrar productos o servicios con foto, descripción y precio. Así el cliente llega a la conversación sabiendo qué quiere. Usa fotos reales, nombres claros y una descripción que responda las dudas típicas: tallas, tiempos de entrega, qué incluye.</p>
<h2>3. Mensajes automáticos y respuestas rápidas</h2>
{steps([("Mensaje de bienvenida", "Saluda, di con quién habla y pide un dato útil: «¿Qué producto te interesa?» o «¿En qué barrio estás?»."), ("Mensaje de ausencia", "Si escriben fuera de horario, di cuándo vas a responder. Evita que el cliente sienta que lo ignoraron."), ("Respuestas rápidas", "Guarda textos para lo que más te preguntan: precios, envíos, medios de pago, ubicación. Se usan escribiendo «/» y un atajo."), ("Etiquetas", "Marca cada chat: «nuevo», «cotización enviada», «pagado», «entregado». Así sabes a quién hacer seguimiento.")])}
{box("✍️ Una buena respuesta rápida de precio no es solo el número: incluye qué trae, cómo se paga y cuál es el siguiente paso para pedir.")}
<h2>4. Conecta WhatsApp con tus redes y tu web</h2>
<p>Pon el botón de WhatsApp en tu bio de Instagram, en tu ficha de Google y en tu sitio web. Si haces pauta, los anuncios que llevan a WhatsApp suelen funcionar bien para negocios que venden conversando. Lo explicamos en {link("google-ads-vs-meta-ads", "Google Ads vs Meta Ads")}.</p>
<h2>5. Lo que no debes hacer</h2>
{ul(["Enviar mensajes masivos a personas que no te dieron permiso: es molesto y puede bloquear tu número.", "Dejar al cliente en «visto» sin un horario claro de respuesta.", "Responder con audios largos cuando la persona pidió un precio."])}
<p>Si quieres que revisemos cómo atiendes hoy por WhatsApp y te dejemos las respuestas listas, {contact("escríbenos")}.</p>
""" + faq([("¿WhatsApp Business es gratis?", "Sí, la aplicación es gratuita. Las funciones de pago, como la API para empresas grandes, no son necesarias para la mayoría de las pymes."), ("¿Puedo usar el mismo número que tengo ahora?", "Sí. Puedes pasar tu número a WhatsApp Business y conservar los chats; haz una copia de seguridad antes de cambiar."), ("¿Cuántas respuestas rápidas debería tener?", "Empieza con las cinco preguntas que más te hacen. Ajusta los textos cada mes según lo que veas en los chats.")])),

dict(iso="2026-06-24", slug="google-business-profile-paso-a-paso", category="seo", emoji="📍",
 title="Google Business Profile paso a paso: cómo optimizar la ficha de tu negocio",
 seoTitle="Google Business Profile paso a paso para negocios locales",
 description="Cómo crear, verificar y optimizar tu ficha de Google Business Profile para aparecer en Google Maps y en las búsquedas locales de tu ciudad.",
 excerpt="Tu ficha de Google es lo primero que ven muchos clientes. Te explicamos cómo completarla y mantenerla activa para aparecer en Maps.",
 body=f"""<p>Cuando alguien busca «panadería cerca de mí» o «diseñador web en Cali», Google muestra un mapa con algunos negocios destacados. Lo que aparece ahí sale de <strong>Google Business Profile</strong>, la ficha gratuita de tu empresa en Google. En nuestro artículo de {link("seo-local", "SEO local")} vimos por qué importa; aquí va el paso a paso.</p>
<h2>Crear y verificar la ficha</h2>
{steps([("Busca tu negocio", "Entra a google.com/business con la cuenta de Google del negocio. Si la ficha ya existe (a veces la crean otros usuarios), solicita la propiedad."), ("Elige la categoría principal", "Es una de las decisiones más importantes: elige la que describe lo que vendes, no la más general. Puedes sumar categorías secundarias."), ("Verifica", "Google te pedirá verificar que el negocio es tuyo: por video, llamada, correo o postal, según el caso. Sin verificación la ficha no aparece bien."), ("Define tu zona", "Si atiendes a domicilio y no tienes local abierto al público, configúralo como negocio de área de servicio e indica las ciudades o barrios.")])}
<h2>Qué completar para que funcione</h2>
{ul(["<strong>Nombre real del negocio</strong>, sin agregar palabras clave extra: Google puede penalizarlo.", "<strong>Horario</strong> normal y horarios especiales para festivos y temporada.", "<strong>Teléfono y WhatsApp</strong>, el mismo que usas en tu web y redes.", "<strong>Descripción</strong> clara de qué haces y para quién.", "<strong>Productos o servicios</strong> con nombre, descripción y, si quieres, precio.", "<strong>Fotos reales</strong>: fachada, interior, equipo, productos. Actualízalas con frecuencia."])}
{box("📌 Consistencia: el nombre, la dirección y el teléfono deben ser exactamente iguales en tu ficha, tu web, tus redes y los directorios donde aparezcas.")}
<h2>Mantenerla viva</h2>
<p>Una ficha completa no basta: Google valora la actividad. Publica novedades u ofertas, sube fotos nuevas y, sobre todo, <strong>responde todas las reseñas</strong>, las buenas y las malas, con amabilidad y sin copiar y pegar.</p>
<h3>Cómo pedir reseñas sin incomodar</h3>
<p>Pide la reseña justo después de una buena experiencia y envía el enlace directo. Nunca ofrezcas descuentos a cambio ni escribas reseñas falsas: va contra las políticas de Google y puede costarte la ficha.</p>
<h2>Conecta la ficha con tu web</h2>
<p>Enlaza tu sitio web desde la ficha y asegúrate de que tu web repita los mismos datos de contacto. Si aún no tienes web, revisa {link("por-que-necesitas-sitio-web", "por qué la necesitas aunque tengas redes")}.</p>
""" + faq([("¿Cuánto cuesta Google Business Profile?", "Es gratis. Desconfía de quien te cobre por «aparecer en Google Maps» como si fuera un pago a Google."), ("¿Puedo tener ficha si trabajo desde casa?", "Sí, como negocio de área de servicio, ocultando la dirección y mostrando la zona que atiendes."), ("¿En cuánto tiempo aparezco en el mapa?", "Depende de la competencia en tu zona y de qué tan completa y activa esté tu ficha. La verificación es el primer paso; las reseñas y la actividad ayudan con el tiempo.")])),

dict(iso="2026-07-08", slug="aparecer-en-chatgpt-gemini-perplexity", category="seo", emoji="🤖",
 title="Cómo aparecer en las respuestas de ChatGPT, Gemini y Perplexity: SEO para buscadores con IA",
 seoTitle="Cómo aparecer en ChatGPT, Gemini y Perplexity: guía de SEO para IA",
 description="Qué hacer para que los buscadores con inteligencia artificial encuentren, entiendan y recomienden tu negocio: contenido claro, datos estructurados y presencia consistente.",
 excerpt="Cada vez más personas preguntan a una IA antes de buscar en Google. Te contamos qué hacer para que tu negocio sea una de las respuestas.",
 body=f"""<p>Hoy mucha gente no solo «googlea»: le pregunta a ChatGPT, a Gemini o a Perplexity «¿qué agencia de marketing me recomiendas en Cali?» o «¿cómo elijo una pastelería para un matrimonio?». Google también muestra resúmenes hechos con IA encima de los resultados. A esto se le llama <strong>GEO</strong> (optimización para motores generativos) o SEO para IA.</p>
{box("🤖 La buena noticia: lo que ayuda a aparecer en las respuestas de la IA es casi lo mismo que ayuda en Google. Contenido útil, claro y verificable, en un sitio bien construido.")}
<h2>Cómo «leen» tu negocio las IA</h2>
<p>Estos asistentes combinan lo que aprendieron con información que buscan en la web en el momento. Para recomendarte necesitan encontrarte, entender qué haces y confiar en esa información. Eso depende de tres cosas:</p>
{ul(["<strong>Que puedan rastrear tu web</strong>: páginas rápidas, texto real (no solo imágenes) y sin bloqueos innecesarios.", "<strong>Que tu contenido responda preguntas concretas</strong> con claridad.", "<strong>Que otros sitios hablen de ti</strong> de forma consistente: tu ficha de Google, directorios, prensa local, reseñas."])}
<h2>7 acciones concretas</h2>
{steps([("Responde preguntas reales", "Escribe páginas y artículos que respondan lo que te preguntan los clientes, con la respuesta en las primeras líneas. Las secciones de preguntas frecuentes son ideales."), ("Sé específico", "Di qué haces, para quién, en qué ciudades y cómo se trabaja contigo. La IA prefiere datos concretos a frases genéricas."), ("Usa datos estructurados", "Marca tu web con schema.org (empresa, servicios, artículos, preguntas frecuentes). Ayuda a que las máquinas entiendan cada página."), ("Muestra quién está detrás", "Una página de equipo con nombres reales, experiencia y contacto genera confianza en personas y en algoritmos."), ("Mantén tus datos iguales en todas partes", "Mismo nombre, teléfono y dirección en tu web, Google Business Profile, redes y directorios."), ("Permite el acceso de los rastreadores", "Revisa que tu archivo robots.txt no bloquee a los buscadores ni a los rastreadores de IA si quieres aparecer en sus respuestas."), ("Registra tu web", "Da de alta tu sitio en Google Search Console y en Bing Webmaster Tools y envía tu sitemap.")])}
<h2>Lo que no funciona</h2>
<p>Rellenar páginas con palabras clave, publicar textos genéricos escritos en serie o inventar reseñas no te hace más visible: los sistemas modernos premian la utilidad y la credibilidad. Si quieres usar IA para escribir, lee {link("ia-marketing-pymes-sin-perder-tu-voz", "cómo usarla sin perder tu voz de marca")}.</p>
<p>En JCraft construimos webs pensadas para Google y para la IA desde el primer día. {svc("Mira nuestros servicios")}.</p>
""" + faq([("¿Puedo pagar para aparecer en ChatGPT?", "Las respuestas orgánicas no se compran. Lo que sí puedes hacer es que tu negocio sea fácil de encontrar, entender y verificar en la web."), ("¿El SEO tradicional sigue sirviendo?", "Sí. Una web rápida, con buen contenido y bien enlazada es la base tanto para Google como para los buscadores con IA."), ("¿Qué es el archivo llms.txt?", "Es una propuesta reciente: un archivo de texto en la raíz de tu web que resume tus páginas principales para los modelos de lenguaje. No reemplaza al SEO, pero no estorba y ayuda a ordenar la información.")])),

dict(iso="2026-07-22", slug="reels-para-negocios-estructura", category="redes", emoji="🎬",
 title="Reels para negocios: la estructura de 20 segundos que mantiene a la gente mirando",
 seoTitle="Reels para negocios: estructura de 20 segundos que funciona",
 description="Una estructura simple para crear Reels que enganchan desde el primer segundo: gancho, problema, solución y llamado a la acción, con ejemplos para pymes.",
 excerpt="Los primeros segundos deciden si alguien sigue mirando. Te damos una estructura de Reel fácil de repetir para tu negocio.",
 body=f"""<p>Los Reels son una de las formas más efectivas de llegar a personas que todavía no te siguen. Pero un Reel sin estructura se pierde en el scroll. La buena noticia es que no necesitas un equipo de cine: necesitas un orden claro.</p>
<h2>La estructura en 4 tiempos</h2>
{steps([("0 a 3 segundos: el gancho", "Nombra un problema o una situación que tu cliente reconoce: «¿Publicas todos los días y nadie te escribe?». Texto grande en pantalla desde el primer cuadro."), ("3 a 10 segundos: el problema", "Muestra por qué pasa, con imágenes reales de tu negocio o tu producto. Corta cada 2 o 3 segundos para mantener el ritmo."), ("10 a 17 segundos: la solución", "Enseña el cómo: un paso, un antes y después, un truco. Aquí está el valor por el que la gente guarda el video."), ("17 a 20 segundos: el llamado a la acción", "Una sola acción: «Guárdalo», «Comenta PLAN» o «Escríbenos por DM». Si pides tres cosas, no hacen ninguna.")])}
{box("🎯 Escribe el texto del gancho antes de grabar. Si no lo puedes decir en una frase, el Reel todavía no está claro.")}
<h2>Detalles que marcan la diferencia</h2>
{ul(["<strong>Subtítulos siempre</strong>: muchas personas ven los videos sin sonido.", "<strong>Zona segura</strong>: deja el texto lejos de los bordes para que la interfaz de Instagram no lo tape.", "<strong>Formato vertical 9:16</strong> en 1080 × 1920 px.", "<strong>Portada legible</strong>: aparece en tu perfil y debe explicar de qué trata el Reel.", "<strong>Audio con intención</strong>: la música acompaña, no compite con la voz."])}
<h2>Ideas de Reels para cualquier pyme</h2>
{ul(["Cómo se prepara tu producto, en 15 segundos.", "Tres errores que ves en tus clientes y cómo evitarlos.", "Antes y después real (con permiso del cliente).", "Respuesta a la pregunta que más te hacen por WhatsApp.", "Un día en tu negocio, contado por el equipo."])}
<p>Para no improvisar cada semana, organiza tus ideas en un {link("calendario-contenidos", "calendario de contenidos")}. Y si quieres que los produzcamos por ti, conoce nuestro servicio de {svc("redes sociales")}.</p>
""" + faq([("¿Cuánto debe durar un Reel?", "Lo justo para contar una idea. Para la mayoría de negocios, entre 15 y 30 segundos funciona bien: suficiente para aportar valor sin perder atención."), ("¿Tengo que salir en cámara?", "No es obligatorio, pero mostrar personas reales genera confianza. Puedes empezar con manos, producto y voz en off."), ("¿Cuántos Reels debo publicar?", "Los que puedas sostener con calidad. Es mejor uno bueno por semana que cinco hechos a la carrera.")])),

dict(iso="2026-08-05", slug="landing-page-o-sitio-web", category="web", emoji="🧭",
 title="Landing page o sitio web completo: qué necesita tu negocio",
 seoTitle="Landing page o sitio web completo: cuál necesita tu negocio",
 description="Diferencias entre una landing page y un sitio web completo, cuándo conviene cada uno y cómo decidir según tu objetivo, tu presupuesto y tu etapa.",
 excerpt="No todos los negocios necesitan una web de diez páginas. Te ayudamos a decidir entre una landing page y un sitio completo.",
 body=f"""<p>«Necesito una página web» puede significar cosas muy distintas. Para algunos negocios lo ideal es una sola página enfocada en vender una cosa; para otros, un sitio con varias secciones, blog y portafolio. Elegir bien te ahorra dinero y tiempo.</p>
<h2>¿Qué es una landing page?</h2>
<p>Es una página única con un objetivo: que la persona haga una acción concreta, como escribir por WhatsApp, reservar o comprar. Todo en ella empuja hacia ese botón: titular claro, beneficios, pruebas, preguntas frecuentes y llamado a la acción.</p>
<h3>Conviene cuando…</h3>
{ul(["Vas a lanzar un producto, una promoción o un servicio puntual.", "Haces pauta y quieres que el clic llegue a una página hecha para esa oferta.", "Estás empezando y necesitas presencia profesional rápida."])}
<h2>¿Qué es un sitio web completo?</h2>
<p>Es un conjunto de páginas: inicio, servicios, nosotros, portafolio, blog y contacto. Cuenta la historia completa de tu marca y te da más oportunidades de aparecer en Google, porque cada página puede responder búsquedas distintas.</p>
<h3>Conviene cuando…</h3>
{ul(["Ofreces varios servicios o productos que la gente busca por separado.", "Quieres posicionarte en Google a largo plazo con contenido.", "Tu cliente investiga antes de decidir y necesita ver casos, equipo y proceso."])}
{box("🧭 Regla práctica: si tu objetivo principal es vender una cosa ya, empieza con una landing. Si tu objetivo es ser encontrado y generar confianza en el tiempo, apunta a un sitio completo.")}
<h2>Lo que ambas deben tener</h2>
{ul(["Diseño adaptado al móvil, porque es donde te verá la mayoría.", "Carga rápida: lo explicamos en " + link("velocidad-web", "velocidad web") + ".","Botón de WhatsApp visible y datos de contacto claros.", "Textos que hablen del cliente, no solo de ti.", "Configuración básica de SEO: títulos, descripciones y sitemap."])}
<p>Una landing puede crecer y convertirse en sitio completo más adelante, así que no es una decisión para siempre. Si quieres que te ayudemos a elegir, {contact("cuéntanos tu caso")}.</p>
""" + faq([("¿Una landing page sirve para SEO?", "Puede posicionar para una búsqueda muy concreta, pero un sitio con varias páginas y contenido tiene más oportunidades de aparecer en Google."), ("¿Puedo empezar con una landing y luego ampliar?", "Sí. Es una forma ordenada de empezar: lanzas rápido y amplías cuando el negocio lo pida."), ("¿Necesito blog?", "Si quieres atraer visitas desde Google de forma orgánica, sí ayuda: cada artículo responde una pregunta que tus clientes buscan.")])),

dict(iso="2026-08-19", slug="que-preguntar-antes-de-contratar-pagina-web", category="web", emoji="📝",
 title="Qué preguntar antes de contratar una página web (y qué debe incluir)",
 seoTitle="Qué preguntar antes de contratar una página web para tu negocio",
 description="Lista de preguntas para hacer antes de contratar el diseño de tu página web: dominio, hosting, propiedad, SEO, velocidad, mantenimiento y entregables.",
 excerpt="Antes de pagar una web, haz estas preguntas. Te evitan sorpresas con el dominio, el hosting, la propiedad y el mantenimiento.",
 body=f"""<p>Contratar una página web es una inversión, y muchas sorpresas aparecen después de pagar: el dominio no está a tu nombre, no puedes cambiar un texto sin pagar otra vez o la web no aparece en Google. Estas preguntas te ayudan a evitarlo.</p>
<h2>Sobre la propiedad</h2>
{ul(["<strong>¿El dominio queda a mi nombre?</strong> Debería registrarse con tus datos o en una cuenta a la que tengas acceso.", "<strong>¿Quién paga y administra el hosting?</strong> Pide claridad sobre el costo anual y dónde queda alojada la web.", "<strong>¿Me entregan accesos?</strong> Al terminar, deberías tener los accesos o, al menos, un documento con dónde está todo."])}
<h2>Sobre lo que incluye</h2>
{ul(["¿Cuántas páginas y secciones incluye?", "¿Los textos los escribo yo o los redactan ustedes?", "¿Incluye fotos, o debo entregarlas?", "¿Cuántas rondas de cambios hay antes de publicar?", "¿Está adaptada a móvil y probada en varios navegadores?"])}
<h2>Sobre Google y la velocidad</h2>
{ul(["¿Configuran títulos, descripciones y sitemap de cada página?", "¿Conectan la web con Google Search Console?", "¿Cómo optimizan las imágenes para que cargue rápido?", "¿La web incluye datos estructurados para que Google y las IA entiendan el negocio?"])}
{box("📝 Pide todo por escrito: alcance, plazos, rondas de revisión, qué pasa después de la entrega y cuánto cuestan los cambios futuros.")}
<h2>Sobre el después</h2>
<p>Una web necesita mantenimiento: actualizaciones, copias de seguridad, cambios de textos y nuevos contenidos. Pregunta si hay un plan mensual, qué cubre y qué pasa si decides no contratarlo.</p>
<p>Estas mismas preguntas sirven para cualquier agencia, incluida la nuestra. Si quieres revisarlas con nosotros, {contact("escríbenos")} o mira cómo trabajamos en {svc("diseño web")}.</p>
""" + faq([("¿Es mejor una web hecha a medida o con plantilla?", "Depende de tu objetivo y presupuesto. Lo importante es que sea rápida, se vea bien en móvil, comunique claro y puedas actualizarla."), ("¿Cuánto tarda hacer una web?", "Varía según el alcance y la rapidez con que se entreguen textos y fotos. Pide un cronograma con fechas por etapa."), ("¿Qué pasa si quiero cambiar de proveedor?", "Si el dominio y el hosting están a tu nombre y tienes los accesos, puedes cambiar sin perder tu web.")])),

dict(iso="2026-09-09", slug="metricas-redes-sociales-pymes", category="redes", emoji="📈",
 title="Métricas de redes sociales que sí importan para una pyme",
 seoTitle="Métricas de redes sociales que importan para una pyme",
 description="Qué métricas revisar en Instagram y Facebook para saber si tus redes generan clientes: alcance, guardados, compartidos, mensajes y consultas, y cuáles son solo vanidad.",
 excerpt="Los likes no pagan la nómina. Te explicamos qué métricas revisar para saber si tus redes están trayendo clientes.",
 body=f"""<p>Es fácil medir el éxito de las redes por los «me gusta» o los seguidores. Pero lo que le importa a una pyme es otra cosa: que la gente correcta te descubra, confíe en ti y te escriba. Estas son las métricas que ayudan a ver eso.</p>
<h2>Métricas de descubrimiento</h2>
{ul(["<strong>Alcance</strong>: cuántas cuentas distintas vieron tu contenido. Mira cuánto viene de personas que no te siguen.", "<strong>Visitas al perfil</strong>: cuántos pasaron de ver un contenido a conocer tu cuenta."])}
<h2>Métricas de interés</h2>
{ul(["<strong>Guardados</strong>: señal de que el contenido fue útil.", "<strong>Compartidos</strong>: alguien lo envió a otra persona; es de las señales más valiosas.", "<strong>Retención en Reels</strong>: cuánto tiempo se quedan mirando. Si se van en los primeros segundos, revisa el gancho."])}
<h2>Métricas de negocio</h2>
{ul(["<strong>Mensajes recibidos</strong> por DM y WhatsApp.", "<strong>Clics</strong> en el enlace de la bio o en el botón de contacto.", "<strong>Consultas calificadas</strong>: personas que preguntan por un servicio concreto.", "<strong>Ventas o reservas</strong> que puedes rastrear hasta una publicación o campaña."])}
{box("📈 Para saber de dónde viene cada cliente, pregúntale cómo te conoció y anótalo. Es simple y te da datos que ninguna app te muestra.")}
<h2>Las métricas de vanidad</h2>
<p>Seguidores y «me gusta» no son malos, pero solos no dicen si vendes. Una cuenta pequeña con muchos mensajes de clientes vale más que una cuenta grande que nadie contacta. Por eso tampoco recomendamos comprar seguidores: inflan el número y bajan la calidad de tu audiencia.</p>
<h2>Cada cuánto revisar</h2>
<p>Una revisión mensual es suficiente para la mayoría de pymes. Compara periodos parecidos, mira qué temas funcionaron y repite lo que trajo conversaciones. Si estás empezando, evita los {link("errores-instagram-pymes", "errores más comunes en Instagram")}.</p>
<p>En JCraft incluimos un reporte mensual claro en nuestro servicio de {svc("redes sociales")}.</p>
""" + faq([("¿Qué es una buena tasa de interacción?", "Varía mucho según el sector y el tamaño de la cuenta. Más útil que compararte con promedios es compararte contigo mismo mes a mes."), ("¿Dónde veo estas métricas?", "En las estadísticas de Instagram y Facebook (Meta Business Suite) con una cuenta profesional o de empresa."), ("¿Cuánto tarda en verse resultado en redes?", "Depende del punto de partida y la constancia. Por eso conviene medir cada mes y ajustar, en lugar de juzgar por una sola publicación.")])),

dict(iso="2026-09-23", slug="meta-ads-negocios-locales", category="pauta", emoji="🎯",
 title="Meta Ads para negocios locales: cómo llegar a clientes cerca de ti",
 seoTitle="Meta Ads para negocios locales: cómo llegar a clientes cerca",
 description="Cómo configurar anuncios en Facebook e Instagram para un negocio local: objetivo, ubicación, audiencia, creatividades y destino, sin desperdiciar presupuesto.",
 excerpt="Si vendes en tu ciudad, no necesitas llegar a todo el país. Te mostramos cómo enfocar tus anuncios de Meta en tu zona.",
 body=f"""<p>Para un negocio local, mostrar anuncios a personas que viven lejos es gastar dinero. Meta Ads (Facebook e Instagram) permite concentrar la pauta en tu zona y en las personas con más probabilidad de comprarte. Así se organiza una campaña local.</p>
<h2>1. Elige un objetivo claro</h2>
{ul(["<strong>Mensajes</strong>: si vendes conversando por WhatsApp o Instagram.", "<strong>Tráfico</strong>: si quieres visitas a tu web o a una página de oferta.", "<strong>Clientes potenciales</strong>: si necesitas formularios con datos de contacto.", "<strong>Reconocimiento</strong>: si abres un local nuevo y quieres que el barrio te conozca."])}
<h2>2. Define bien la ubicación</h2>
<p>Puedes elegir ciudades, barrios o un radio alrededor de tu dirección. Revisa la opción de llegar a las personas que <strong>viven</strong> en la zona o que están ahí: si tu negocio es de visita, te interesa quien pasa por allí; si es a domicilio, quien vive en tu área de cobertura.</p>
<h2>3. Audiencia: ni muy amplia ni muy cerrada</h2>
<p>Con una ubicación bien definida, a veces basta con edad y algunos intereses generales; los sistemas de Meta optimizan solos con base en quién responde. También puedes crear audiencias con personas que ya interactuaron con tu cuenta o visitaron tu web.</p>
{box("🎯 Un buen anuncio local se ve local: muestra tu barrio, tu equipo, tu producto real. La gente confía más en lo que reconoce.")}
<h2>4. Creatividades que funcionan</h2>
{ul(["Video corto vertical con el gancho en los primeros segundos.", "Una sola oferta o mensaje por anuncio.", "Texto con la ciudad o zona: «Domicilios en el sur de Cali».", "Llamado a la acción alineado con el objetivo."])}
<h2>5. El destino importa tanto como el anuncio</h2>
<p>Si el anuncio lleva a WhatsApp, ten las respuestas rápidas listas. Si lleva a la web, que la página hable exactamente de la oferta del anuncio. Lo vimos en {link("landing-page-o-sitio-web", "landing page o sitio web")}.</p>
<p>¿Cuánto invertir? Depende de tu objetivo y tu margen; en {link("presupuesto-pauta-digital", "esta guía")} te explicamos cómo pensarlo. Y si prefieres que lo gestionemos, mira nuestro servicio de {svc("pauta digital")}.</p>
""" + faq([("¿Meta Ads o Google Ads para un negocio local?", "Google capta a quien ya está buscando; Meta te pone frente a personas que aún no te buscan. Muchos negocios combinan ambos. Lo comparamos en «Google Ads vs Meta Ads»."), ("¿Puedo pautar con poco presupuesto?", "Sí, siempre que el objetivo sea concreto y la zona esté bien definida. Empieza pequeño, mide y ajusta."), ("¿Cuánto tiempo debo dejar corriendo un anuncio?", "Dale algunos días para que el sistema aprenda antes de cambiarlo. Revisa los resultados con calma y ajusta una cosa a la vez.")])),

dict(iso="2026-10-07", slug="preparar-negocio-black-friday-diciembre", category="estrategia", emoji="🛍️",
 title="Cómo preparar tu negocio digital para Black Friday y diciembre",
 seoTitle="Cómo preparar tu negocio para Black Friday y diciembre",
 description="Checklist para preparar redes, WhatsApp, web y pauta antes de Black Friday y la temporada de diciembre: oferta, fechas, contenidos, atención y logística.",
 excerpt="La temporada alta se prepara antes. Una lista práctica para tener oferta, contenidos, atención y logística listos a tiempo.",
 body=f"""<p>Noviembre y diciembre son meses de alta demanda para muchos negocios. Los que mejor los aprovechan no improvisan: preparan la oferta, el contenido y la atención con semanas de anticipación. Esta es una lista para hacerlo con calma.</p>
<h2>1. Define la oferta</h2>
{ul(["¿Qué producto o servicio vas a empujar? Elige pocos y bien presentados.", "¿Descuento, combo, regalo o envío? Asegúrate de que tus márgenes lo aguanten.", "Fechas de inicio y fin claras, y condiciones por escrito."])}
{box("🛍️ Un descuento no es una estrategia por sí solo. Antes de anunciarlo, piensa qué problema le resuelve al cliente y por qué debería comprarte a ti.")}
<h2>2. Prepara los canales</h2>
{steps([("Redes", "Planifica las publicaciones de la temporada: anticipación, lanzamiento, recordatorios y cierre. Usa un calendario para no improvisar."), ("WhatsApp", "Actualiza el catálogo y las respuestas rápidas con la oferta, los medios de pago y los tiempos de entrega."), ("Web", "Crea una página para la oferta y revisa que los botones, formularios y enlaces funcionen en el móvil."), ("Ficha de Google", "Publica tus horarios especiales de temporada y festivos.")])}
<h2>3. Pauta con tiempo</h2>
<p>En temporada hay más anunciantes compitiendo por la misma atención. Lanzar con anticipación permite probar mensajes y ajustar antes de los días más fuertes. Para negocios con atención en una zona, revisa {link("meta-ads-negocios-locales", "cómo enfocar Meta Ads en tu ciudad")}.</p>
<h2>4. Atención y logística</h2>
{ul(["¿Quién responde los mensajes y en qué horario?", "¿Tienes inventario o agenda suficiente?", "¿Cuál es la última fecha para pedir y recibir antes del 24 de diciembre?", "¿Cómo vas a manejar cambios y devoluciones?"])}
<h2>5. Después de la temporada</h2>
<p>Anota qué funcionó: qué productos se vendieron, qué publicaciones trajeron mensajes y qué preguntas se repitieron. Es la mejor información para planear enero. Si quieres armar tu plan de temporada con nosotros, {contact("escríbenos")}.</p>
""" + faq([("¿Cuándo empiezo a preparar diciembre?", "Mientras antes, mejor: idealmente con varias semanas de anticipación para tener oferta, piezas y atención listas."), ("¿Tengo que dar descuento en Black Friday?", "No es obligatorio. Puedes ofrecer combos, regalos, envío o una edición especial si el descuento no te conviene."), ("¿Qué publico después de la temporada?", "Agradecimientos, testimonios reales (con permiso) y contenido útil para el inicio de año.")])),

dict(iso="2026-10-21", slug="ia-marketing-pymes-sin-perder-tu-voz", category="marca", emoji="✨",
 title="Inteligencia artificial para pymes: cómo usarla en tu marketing sin perder tu voz",
 seoTitle="IA para el marketing de pymes sin perder tu voz de marca",
 description="Cómo usar herramientas de inteligencia artificial para ideas, textos, imágenes y video en tu marketing, cuidando la voz de tu marca, la honestidad y la calidad.",
 excerpt="La IA puede ahorrarte horas, pero mal usada hace que tu marca suene igual a todas. Te contamos cómo usarla con criterio.",
 body=f"""<p>Las herramientas de inteligencia artificial ya hacen parte del día a día del marketing: ayudan a sacar ideas, escribir borradores, crear imágenes, poner voz a un video o resumir datos. Para una pyme pueden ser un gran aliado. El riesgo es terminar con contenido genérico que podría ser de cualquier marca.</p>
<h2>Dónde sí ayuda la IA</h2>
{ul(["<strong>Lluvia de ideas</strong>: temas, ganchos para Reels, preguntas frecuentes de tus clientes.", "<strong>Primeros borradores</strong> de textos que luego tú ajustas.", "<strong>Variaciones</strong> de un mismo anuncio para probar cuál funciona mejor.", "<strong>Producción visual</strong>: escenas, fondos o voces en off para videos.", "<strong>Organización</strong>: resumir comentarios, ordenar un calendario, preparar reportes."])}
<h2>Cómo cuidar tu voz de marca</h2>
<p>Antes de pedirle nada a una IA, ten claro cómo habla tu marca. Si aún no lo tienes definido, empieza por {link("tono-de-voz-marca", "definir tu tono de voz")} y tu {link("manual-de-marca", "manual de marca")}. Luego:</p>
{steps([("Dale contexto", "Explica quién eres, a quién le hablas y cómo suena tu marca. Pega ejemplos reales de textos tuyos."), ("Edita siempre", "Usa lo que te entrega como punto de partida. Quita frases vacías y agrega detalles que solo tú conoces."), ("Revisa los datos", "La IA puede inventar cifras o hechos. Verifica todo antes de publicar y cita la fuente cuando uses datos."), ("Mantén lo humano", "Fotos reales de tu equipo, historias de tu negocio y tu forma de atender no se reemplazan con IA.")])}
{box("✨ Honestidad ante todo: si una imagen o una escena es creada con IA, no la presentes como real. Nunca inventes testimonios ni resultados.")}
<h2>Lo que conviene evitar</h2>
{ul(["Publicar textos sin leerlos.", "Usar personas generadas con IA como si fueran clientes reales.", "Llenar tu web de artículos genéricos solo para tener más páginas: los buscadores valoran la utilidad, no la cantidad.", "Subir información confidencial de tus clientes a herramientas sin revisar sus condiciones."])}
<p>En JCraft usamos IA como herramienta de producción, siempre con revisión humana y con la estrategia de cada cliente. Si quieres aprovecharla en tu negocio, {contact("hablemos")}.</p>
""" + faq([("¿Google penaliza el contenido hecho con IA?", "Google valora la calidad y la utilidad del contenido, no la herramienta con que se hizo. El contenido genérico o engañoso no funciona, se haga como se haga."), ("¿Debo decir que algo está hecho con IA?", "Cuando una imagen o un video realista es creado con IA, lo honesto es indicarlo. Algunas plataformas, como Instagram, también lo piden."), ("¿Qué herramienta de IA debo usar?", "La que resuelva una tarea concreta de tu negocio. Empieza por una, aprende a usarla bien y mide si de verdad te ahorra tiempo.")])),
]

def read_time(html):
    words = len(re.sub(r"<[^>]+>", " ", html).split())
    return f"{max(3, round(words / 200))} min"

def main():
    posts = json.loads(DATA.read_text())
    have = {p["slug"] for p in posts}
    for p in POSTS:
        if p["slug"] in have: continue
        y, m, d = p["iso"].split("-")
        p.update(date=f"{int(d)} {MES[int(m)]} {y}", categoryName=CAT[p["category"]], readTime=read_time(p["body"]))
        posts.append(p)
    posts.sort(key=lambda x: x["iso"], reverse=True)
    DATA.write_text(json.dumps(posts, ensure_ascii=False, indent=1))
    print(len(posts), "artículos")

if __name__ == "__main__":
    main()
