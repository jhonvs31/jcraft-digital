/* Para Cata: datos de la historia, render, hilo rojo y efectos. Sin dependencias. */
(() => {
  'use strict';

  const CODE = '2811';
  const MET = '2019-08-01';
  const M = '/cata/media/';
  const SIGN = 'Tu osito Kung Fu Panda';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DIMS = {"cancha":[923,1228],"carro":[1400,1052],"mantel":[921,1228],"ciclas":[1400,1050],"espejo":[921,1228],"parquecafe":[1400,1050],"cachete":[923,1228],"grado":[1400,1050],"glee":[1400,1050],"kiosco":[921,1228],"zoo":[921,1228],"pereira":[1400,1050],"quindio":[1400,1050],"otaku":[921,1228],"aeropuerto":[921,1228],"dormida":[567,1228],"corazon":[567,1228],"boquita":[567,1228],"torta":[923,1228],"canopy":[1400,1050],"vaca":[921,1228],"tribuna":[921,1228],"flotador":[921,1228],"mirador":[921,1228],"cine":[1400,1050],"expo":[921,1228],"picnic":[1400,1050],"malecon":[921,1228],"universal":[921,1228],"d-castillo":[921,1228],"d-raton":[691,1228],"d-galaxia":[921,1228],"d-peludo":[921,1228],"d-arco":[921,1228],"d-pato":[921,1228],"d-cuadros":[921,1228],"d-princesa":[921,1228],"d-selfie":[921,1228],"d-globos":[921,1228],"u-tren":[921,1228],"u-pueblo":[921,1228],"u-dulces":[921,1228],"u-varita":[921,1228],"u-nieve":[921,1228],"u-castillo":[921,1228],"u-bebida":[921,1228],"u-escoba":[921,1228],"u-pandilla":[1400,787],"mar-corazon":[921,1228],"mar-olas":[921,1228],"mar-abrazo":[921,1228],"noria":[921,1228],"nieve":[921,1228],"n-princesa1":[921,1228],"n-princesa2":[921,1228],"pedida":[921,1228],"boda-ramo":[818,1228],"boda-cancion":[877,1228],"boda-ceremonia":[1280,854],"curazao":[921,1228],"sushi-clase":[921,1228],"piscina":[1400,1050]};
  const VID = { 'v-baile': [1280, 720] };

  /* ---------------- La historia ---------------- */
  const CHAPTERS = [
    { n: 1, title: 'Cómo empezó', years: '2019 a 2021', sky: '#FBE3E4', stops: [
      { id: 'cancha', date: '2019-08-01', when: '1 de agosto de 2019', title: 'Donde empezó todo', place: 'Entreno de voleibol de la universidad',
        lane: 'ball', media: [{ img: 'cancha', cap: 'Nuestra primera foto (y yo de espaldas)' }],
        msg: ['Ese 1 de agosto llegaste al entreno y yo, muy sabio, te dije «fresa» por venir de colegio gomelo.', 'Lo que no sabía era que esa fresa iba a ser lo más dulce que me iba a pasar en la vida. Mírate en esa foto: tú ya ibas adelante sonriendo, y yo ahí de espaldas, sin enterarme de nada.'] },
      { id: 'amigos', when: '2019 a 2021', title: 'Años de amigos', place: 'Y una serie que nos unió',
        count: { from: 1, to: 581, label: 'días siendo los mejores amigos' },
        media: [{ img: 'glee', cap: 'Hasta por videollamada la seguíamos viendo juntos' }],
        msg: ['Antes de ser «nosotros» fuimos los mejores amigos, por años.', 'Y teníamos nuestra serie: capítulo tras capítulo, aunque fuera cada uno desde su casa y por videollamada, Glee nos fue uniendo. Todavía te veo cantando y sufriendo con cada episodio.'] },
      { id: 'karens', date: '2021-03-04', when: '4 de marzo de 2021', title: 'La primera cita', place: "Karen's Pizza",
        media: [{ vid: 'v-karens', cap: 'Tú tapando la cámara, yo insistiendo' }],
        msg: ["Después de años de ser los mejores amigos, un 4 de marzo nos sentamos en Karen's Pizza «solo a comer».", 'Tú tapando la cámara, yo insistiendo… y al final esa sonrisa. Ahí entendí que lo nuestro ya no cabía en la palabra «amigos». Poquito a poco, como las cosas que valen la pena.'] },
      { id: 'trabajo', when: '2021', title: 'Después del trabajo, siempre tú', place: 'Salidas a comer entre semana', layout: 'strip',
        media: [{ img: 'carro', cap: 'Saliendo del trabajo directo a verte' }, { vid: 'v-plazoleta', cap: 'Tú haciendo caras, yo posando atrás' }, { vid: 'v-besos', cap: 'La evidencia de los besitos' }],
        msg: ['Salía del trabajo cansado, pero igual iba a verte, porque comer contigo era el mejor plan del día.', 'Poquito a poco lo fuimos volviendo serio… y llegaron los besitos. Tú no sabías muy bien cómo darlos (JAJAJA, perdón, pero la evidencia está en video), y aun así para mí fueron los mejores del mundo.'] },
      { id: 'restrepo', when: '2021', title: 'La prueba de fuego (en bicicleta)', place: 'La finca en Restrepo, con toda tu familia',
        media: [{ img: 'ciclas', cap: 'El examen final con mi suegrito' }, { img: 'mantel', cap: '«Como amigos», ajá' }],
        badge: 'Logro desbloqueado: aprobado por el suegrito',
        msg: ['Oficialmente íbamos «como amigos» a la finca en Restrepo (ajá, sí, claro).', 'Conocí a toda tu familia, y ese día en bicicleta fue mi examen final con mi suegrito lindo. Pedaleé como si me jugara la vida… porque en el fondo sí me la estaba jugando: me estaba jugando quedarme contigo.'] },
      { id: 'galaxia', when: '2021', title: 'Mismos gustos, misma galaxia', place: 'Camisetas iguales frente al espejo',
        sky: '#1C1838', night: true, ambient: 'stars',
        media: [{ img: 'espejo', cap: 'Mi compañera de galaxia' }],
        msg: ['Amaba descubrir que nos gustaban las mismas cosas: la misma camiseta, las mismas películas, los mismos planes.', 'No solo encontré a alguien a quien amar: encontré a mi compañera de galaxia.'] },
      { id: 'parquecafe', date: '2021-10-31', when: '31 de octubre de 2021', title: 'Nuestro primer paseo', place: 'Parque del Café',
        burst: 'confetti', media: [{ img: 'parquecafe', cap: 'Entre cafetales y montañas rusas' }],
        msg: ['Nuestro primer paseo juntos fue entre cafetales y montañas rusas.', 'Gritamos, nos reímos, y entendí que contigo hasta lo que da miedo se disfruta. Desde ese día eres mi compañera de aventuras favorita, en las subidas y en las bajadas.'] },
      { id: 'novios', date: '2021-11-28', when: '28 de noviembre de 2021', title: 'La pregunta más difícil de mi vida', place: 'El día que nos hicimos novios',
        ask: { icon: 'heart', q: '¿Quieres ser mi novia?', yes: ['Sí', 'Sí 💛'], burst: 'hearts' },
        msg: ['Ese 28 de noviembre te pedí que fuéramos novios. Me temblaba todo: había aprobado el examen del suegrito en bicicleta, sobreviví a la montaña rusa… pero nada me dio tanto susto como esa pregunta.', 'Y dijiste que sí. Sigue siendo la mejor respuesta que me han dado.'] },
    ] },

    { n: 2, title: 'De novios', years: '2021 y 2022', sky: '#E2EDD8', stops: [
      { id: 'almuerzos', when: 'Entre semana', title: 'Lo cotidiano también es amor', place: 'Tus almuerzos y el camino al trabajo',
        media: [{ img: 'cachete', cap: 'Tu forma favorita de saludarme' }],
        msg: ['Después de ese «sí», mi parte favorita del día era acompañarte en tu almuerzo o llevarte al trabajo.', 'No necesitábamos grandes planes: un rato contigo en medio de la semana me arreglaba todo.'] },
      { id: 'grado', when: 'Tus logros', title: 'Verte brillar', place: 'Siempre en primera fila',
        burst: 'gold', media: [{ img: 'grado', cap: 'Mi orgullo más grande' }],
        msg: ['Una de las cosas que más orgullo me da es verte cumplir tus metas: las académicas y también las de tu camino en la iglesia, que sé cuánto extrañas.', 'Siempre voy a estar en primera fila aplaudiéndote, como ese día.'] },
      { id: 'album', when: 'Mesarios, paseos y domingos', title: 'Álbum del noviazgo', place: 'Algunas páginas de esos años', layout: 'album', burst: 'petals',
        media: [
          { img: 'kiosco', cap: 'Así, abrazaditos, se me pasa la vida' },
          { img: 'zoo', cap: 'Mesario en el zoológico: yo solo te miraba a ti' },
          { img: 'pereira', cap: 'Pereira: tu familia, que ya se sentía mía' },
          { img: 'quindio', cap: 'Quindío y tu besito en el cachete' },
          { img: 'otaku', cap: 'Mesario otaku: ramen y anime' },
        ] },
      { id: 'sushi', date: '2022-02-12', when: '12 de febrero de 2022', title: 'El día que nació una adicción', place: 'Tu primer sushi',
        media: [{ vid: 'v-sushi', cap: 'El primer bocado. Ya no hubo vuelta atrás' }],
        msg: ['Un 12 de febrero probaste sushi por primera vez y, bueno… ya sabemos cómo terminó eso.', 'Me hace feliz haber sido yo quien te metió en este vicio. Prometo seguir patrocinándolo toda la vida.'] },
    ] },

    { n: 3, title: 'La distancia', years: '2022', sky: '#161A33', night: true, ambient: 'stars', stops: [
      { id: 'aeropuerto', date: '2022-03-08', when: '8 de marzo de 2022', title: 'Hasta pronto, no adiós', place: 'El aeropuerto',
        lane: 'plane', media: [{ img: 'aeropuerto', cap: 'El abrazo más difícil' }],
        msg: ['El 8 de marzo me tocó despedirme de ti en ese aeropuerto. Fue de los días más duros, porque por primera vez nuestro camino se partía en dos.', 'Pero ni la distancia ni los kilómetros lograron soltar el hilo que nos unía.'] },
      { id: 'seismeses', when: 'Marzo a septiembre de 2022', title: 'Seis meses, dos países, un mismo hilo', place: 'Cali y USA, por videollamada', layout: 'phones',
        count: { from: 1, to: 180, label: 'días lejos, y el hilo nunca se soltó' },
        media: [{ img: 'dormida', cap: 'Dormida en llamada' }, { img: 'corazon', cap: 'Un corazón para mí' }, { img: 'boquita', cap: 'Besito a distancia' }, { vid: 'v-baile', cap: 'Bailando para mí', wide: true }],
        msg: ['Fueron los 6 meses más duros, pero también de los más bonitos. Nos quedábamos dormidos en llamada, me hacías corazones con las manos, bailabas para mí al otro lado de la pantalla…', 'Y lo supimos llevar muy bien. Ahí entendí que lo nuestro podía con todo.'] },
      { id: 'regreso', when: 'Septiembre de 2022', title: 'Bienvenido a casa', place: 'El regreso que tú organizaste',
        sky: '#FBE3E4', night: false, ambient: '', burst: 'confetti',
        media: [{ img: 'torta', cap: 'Por fin juntos otra vez' }],
        msg: ['Después de 6 meses lejos, volví y me encontré con un regreso que tú organizaste con todo el amor del mundo. Cada detalle tenía algo de mí, y ahí me di cuenta de lo bien que me conoces.', 'Ese día no volví a Cali: volví a ti.'] },
    ] },

    { n: 4, title: 'Aventuras', years: '2022 a 2024', sky: '#D7EAF2', stops: [
      { id: 'pasaporte', when: 'Después del reencuentro', title: 'Pasaporte de aventuras', place: 'Siete sellos, y contando', layout: 'stamps',
        badge: 'Pasaporte completo: compañeros de aventura nivel experto',
        media: [
          { img: 'canopy', cap: 'Canopy' }, { img: 'vaca', cap: 'Ordeñando' }, { img: 'tribuna', cap: 'En la tribuna' }, { img: 'flotador', cap: 'En el lago' },
          { img: 'mirador', cap: 'Atardecer' }, { img: 'cine', cap: 'Cine' }, { img: 'expo', cap: 'Dentro de una pintura' },
        ],
        msg: ['Después de estar lejos, prometimos no perder ni un momento más. Volamos en canopy, ordeñaste una vaca (¡quién lo diría, la fresa!), flotamos en un lago, vimos atardeceres y hasta nos metimos dentro de una pintura.', 'Contigo cualquier plan se vuelve aventura.'] },
      { id: 'picnic', when: 'Un cumpleaños', title: 'Cada día contigo es un regalo', place: 'Bajo las lucecitas',
        burst: 'gold', media: [{ img: 'picnic', cap: 'Lo que decía el letrero, lo sigo diciendo hoy' }],
        msg: ['Ese letrero lo decía todo y lo sigue diciendo hoy: cada día contigo es un regalo.', 'Te amo 3 millones.'] },
    ] },

    { n: 5, title: 'USA juntos', years: 'Diciembre de 2024', sky: '#E4E0F4', stops: [
      { id: 'primervuelo', date: '2024-12', when: 'Diciembre de 2024', title: 'Tu primer vuelo al mundo', place: 'Tu primera vez fuera de Colombia',
        lane: 'plane2', media: [{ img: 'malecon', cap: 'Mirando atrás, sonriéndome' }, { img: 'universal', cap: 'El buzo rojo, presente como siempre' }],
        msg: ['El mismo lugar que un día nos separó se convirtió en el lugar donde te vi cumplir un sueño.', 'Estar a tu lado en tu primera vez fuera del país, viéndote descubrir todo con esos ojos, me aguó el ojo. Ya no era «yo allá y tú acá». Ahora éramos nosotros, juntos, conociendo el mundo.'] },
      { id: 'disney', when: 'Diciembre de 2024', title: 'Tu sueño más grande (hasta ahora)', place: 'Disney, con tiara y todo', layout: 'strip', parade: true, burst: 'fireworks',
        media: [
          { img: 'd-castillo', cap: 'Por fin, frente al castillo' }, { img: 'd-raton', cap: 'Saludando al anfitrión' }, { img: 'd-arco', cap: 'Princesa en su castillo' },
          { img: 'd-princesa', cap: 'Una cita real (con el buzo rojo)' }, { img: 'd-cuadros', cap: 'Entre princesas, la mía' }, { img: 'd-pato', cap: 'Con el más gruñón del parque' },
          { img: 'd-galaxia', cap: 'Nuestra galaxia, en persona' }, { img: 'd-peludo', cap: 'Abrazo de oso gigante' }, { img: 'd-globos', cap: 'Un mar de globos' }, { img: 'd-selfie', cap: 'La noche en que se cumplió' },
        ],
        msg: ['Verte frente a ese castillo, con tu tiara y esa sonrisa de niña, fue uno de los momentos más felices de mi vida.', 'No solo cumpliste tu sueño: me dejaste estar a tu lado mientras lo hacías. Y te prometo algo: voy a seguir acompañándote a cumplir cada sueño que venga.'] },
      { id: 'universalmagia', when: 'Diciembre de 2024', title: 'Un mundo de magia', place: 'Universal Studios', layout: 'strip', burst: 'gold',
        media: [
          { vid: 'v-u-castillo', cap: 'Llegando al castillo' }, { img: 'u-pueblo', cap: 'El pueblo nevado' }, { img: 'u-varita', cap: 'Varita de chocolate: ¿comer o guardar?' },
          { img: 'u-bebida', cap: 'La bebida más famosa' }, { img: 'u-tren', cap: 'Lista para abordar' }, { img: 'u-dulces', cap: 'En la tienda de dulces' },
          { img: 'u-nieve', cap: 'Con el muñeco de nieve' }, { img: 'u-castillo', cap: 'Feliz de verdad' }, { img: 'u-escoba', cap: 'Lista para volar' },
          { img: 'u-pandilla', cap: 'Con la pandilla del perro detective' }, { vid: 'v-u-camino', cap: 'Mirando atrás para buscarme' },
        ],
        msg: ['Después de cumplir un sueño, fuimos por otro. Verte entrar a ese mundo de magia, con tu gorra, tu varita de chocolate y esos ojos de niña emocionada, me confirmó algo:', 'la magia de verdad no está en los castillos, está en caminar a tu lado.'] },
      { id: 'mar', when: 'Diciembre de 2024', title: 'Tu primer mar (oficialmente)', place: 'Miami', sand: true,
        media: [{ img: 'mar-corazon', cap: 'El corazón que dibujaste' }, { img: 'mar-abrazo', cap: 'Abrazados entre las olas' }, { img: 'mar-olas', cap: 'Mojándote los pies' }],
        msg: ['La gente dice que tú ya conocías el mar… pero yo sé que ese día lo conociste de verdad, porque fue conmigo.', 'Dibujaste un corazón en la arena, y te prometo que este no lo borra ninguna ola.'] },
    ] },

    { n: 6, title: 'Un año después', years: 'Diciembre de 2025', sky: '#EAF2F9', stops: [
      { id: 'nieve', date: '2025-12', when: 'Diciembre de 2025', title: 'Nuestra primera nieve', place: 'Volvimos, esta vez al invierno', ambient: 'snow', layout: 'strip',
        media: [{ img: 'nieve', cap: 'Tu primera nieve' }, { img: 'noria', cap: 'Luces de invierno' }, { img: 'n-princesa1', cap: 'Más princesas para la colección' }, { img: 'n-princesa2', cap: 'Y otra más' }],
        msg: ['Volvimos un año después, esta vez a conocer la nieve. Verte lanzarla al aire, con los ojos cerrados y esa risa, fue como ver a una niña descubriendo el invierno.', 'Y yo, otra vez, el hombre más feliz del mundo por estar a tu lado.'] },
      { id: 'pedida', date: '2025-12', when: 'Diciembre de 2025', title: 'La pregunta, parte 2', place: 'Al atardecer, entre palmeras', sky: '#F6CDB6',
        ask: { icon: 'ring', q: '¿Quieres casarte conmigo?', yes: ['Sí', 'Sí, mil veces 💍'], burst: 'gold' },
        media: [{ img: 'pedida', cap: 'Dijo que sí' }],
        msg: ['Cuatro años después de pedirte que fueras mi novia, con el mismo susto (o peor), te pedí que fueras mi esposa.', 'Elegí ese viaje porque quería que el sí más importante de mi vida llegara en medio de nuestra aventura favorita. Y otra vez dijiste que sí.'] },
    ] },

    { n: 7, title: 'Para siempre', years: '2026', sky: '#F4F3F8', stops: [
      { id: 'boda', date: '2026-08-01', when: '1 de agosto de 2026', title: 'Sí, acepto', place: 'El mismo día en que te conocí', layout: 'strip', burst: 'petals', dates: true,
        media: [{ img: 'boda-ceremonia', cap: 'Riéndonos en nuestra propia boda' }, { img: 'boda-cancion', cap: 'Cantándonos' }, { img: 'boda-ramo', cap: 'Mi esposa' }],
        msg: ['Un 1 de agosto te conocí en una cancha y te dije «fresa». Siete años después, otro 1 de agosto, te dije «sí, acepto».', 'La vida tiene formas muy bonitas de cerrar círculos, y la nuestra fue volver al mismo día para empezarlo todo de nuevo, ahora como esposos.'] },
      { id: 'lunademiel', date: '2026-09', when: 'Septiembre de 2026', title: 'Y esto apenas empieza', place: 'Luna de miel en crucero, Curazao', layout: 'strip',
        media: [{ img: 'curazao', cap: 'Curazao y sus casitas de colores' }, { vid: 'v-crucero', cap: 'Desayuno frente al mar' }, { img: 'sushi-clase', cap: 'De adicta al sushi a hacerlo tú misma' }, { img: 'piscina', cap: 'Flotando, como en las nubes' }],
        msg: ['Por más viajes, más experiencias y muchas cosas más juntos (hasta clases de sushi, quién lo diría).', 'Gracias por amarme y por hacerme realmente feliz. Te amo hasta el infinito y más allá.'] },
    ] },
  ];

  /* ---------------- Utilidades ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* sin almacenamiento */ } } };
  const dayN = (iso) => { const [y, m, d] = iso.split('-').map(Number); const [a, b, c] = MET.split('-').map(Number); return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(a, b - 1, c)) / 864e5) + 1; };
  const fmt = (n) => n.toLocaleString('es-CO');
  const rot = (i) => [-2.4, 1.8, -1.2, 2.6, -2, 1.2, -1.6][i % 7];

  /* ---------------- Render ---------------- */
  function imgTag(key, alt, thumb) {
    const [w, h] = DIMS[key] || [1000, 1000];
    return `<img src="${M}${key}${thumb ? '-t' : ''}.webp" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
  }
  function vidTag(key, label) {
    const [w, h] = VID[key] || [720, 1280];
    return `<video src="${M}${key}.mp4" poster="${M}${key}.jpg" width="${w}" height="${h}" muted loop playsinline preload="none" aria-label="${esc(label)}"></video>`;
  }
  function pola(m, i) {
    const style = `--r:${rot(i)}deg;--d:${(i * 0.12).toFixed(2)}s`;
    if (m.vid) {
      const [w, h] = VID[m.vid] || [720, 1280];
      return `<figure class="pola pola--vid" style="${style}"><div class="pola__media" style="aspect-ratio:${w}/${h}">${vidTag(m.vid, m.cap)}</div><figcaption class="pola__cap">${esc(m.cap)}</figcaption></figure>`;
    }
    const [w, h] = DIMS[m.img];
    return `<figure class="pola" style="${style}"><div class="pola__media" style="aspect-ratio:${w}/${h}"><button type="button" data-full="${m.img}" data-cap="${esc(m.cap)}" aria-label="Ampliar foto: ${esc(m.cap)}">${imgTag(m.img, m.cap)}</button></div><figcaption class="pola__cap">${esc(m.cap)}</figcaption></figure>`;
  }
  function letter(s) {
    if (!s.msg) return '';
    return `<div class="letter"><p class="letter__hi">Cielito lindo:</p>${s.msg.map((p) => `<p>${esc(p)}</p>`).join('')}<p class="letter__sign">${SIGN}</p></div>`;
  }
  function mediaBlock(s) {
    const ms = s.media || [];
    if (!ms.length) return '';
    switch (s.layout) {
      case 'strip':
        return `<div class="wide"><div class="strip" ${s.parade ? 'data-parade' : ''} tabindex="0" aria-label="Fotos de ${esc(s.title)}, desliza para ver más">${ms.map(pola).join('')}</div><p class="strip__hint">Desliza hacia el lado para ver ${ms.length} recuerdos</p></div>`;
      case 'album':
        return `<div class="wide album">${ms.map(pola).join('')}</div>`;
      case 'phones':
        return `<div class="wide phones" tabindex="0" aria-label="Capturas de nuestras videollamadas">${ms.map((m, i) => m.vid
          ? `<div class="phone phone--wide" style="--d:${i * 0.15}s">${vidTag(m.vid, m.cap)}</div>`
          : `<div class="phone" style="--d:${i * 0.15}s"><button type="button" data-full="${m.img}" data-cap="${esc(m.cap)}" aria-label="Ampliar: ${esc(m.cap)}">${imgTag(m.img, m.cap)}</button></div>`).join('')}</div>`;
      case 'stamps':
        return `<div class="wide passport"><p class="passport__title">Pasaporte de Cata y su osito</p><div class="stamps">${ms.map((m, i) => `<div class="stamp" style="--r:${[4, -5, 3, -3, 6, -4, 2][i]}deg;--d:${0.25 + i * 0.28}s"><button type="button" data-full="${m.img}" data-cap="${esc(m.cap)}" aria-label="Ampliar: ${esc(m.cap)}">${imgTag(m.img, m.cap, true)}<span class="stamp__label">${esc(m.cap)}</span></button></div>`).join('')}</div></div>`;
      default:
        return `<div class="stop__media">${ms.map(pola).join('')}</div>`;
    }
  }
  const LANES = {
    ball: `<div class="lane" aria-hidden="true"><svg class="ball" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20"/><path d="M23 3c-6 8-6 30 0 40M4 17c10 4 28 4 38 0M6 33c9-5 25-6 34-2"/></svg></div>`,
    plane: `<div class="lane plane-lane" aria-hidden="true"><svg class="route" preserveAspectRatio="none"><path/></svg><svg class="plane" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg></div>`,
  };
  LANES.plane2 = LANES.plane.replace('class="plane"', 'class="plane plane--two"');
  const ICONS = {
    heart: `<svg class="ask__heart" viewBox="0 0 120 110" aria-hidden="true"><path d="M60 104S6 72 6 34A27 27 0 0 1 60 22a27 27 0 0 1 54 12c0 38-54 70-54 70z"/></svg>`,
    ring: `<svg class="ask__ring" viewBox="0 0 120 110" aria-hidden="true"><rect x="22" y="54" width="76" height="46" rx="8" fill="#7A1022"/><g class="lid"><rect x="22" y="34" width="76" height="22" rx="8" fill="#9C1A2E"/></g><g class="gem"><circle cx="60" cy="60" r="13" fill="none" stroke="#E3B04B" stroke-width="5"/><path d="M53 44l7-8 7 8-7 6z" fill="#DDEFFB" stroke="#9CC8E6"/></g></svg>`,
  };
  function stopHTML(s) {
    const day = s.date && s.date.length === 10 ? dayN(s.date) : null;
    const dayLine = day ? `<p class="stop__day">${day === 1 ? 'Día 1 de nosotros' : `Día ${fmt(day)} desde que te conocí`}</p>` : '';
    const head = `<header class="stop__head"><span class="knot"></span><p class="stop__when">${esc(s.when)}</p>${dayLine}<h2 class="stop__title">${esc(s.title)}</h2>${s.place ? `<p class="stop__place">${esc(s.place)}</p>` : ''}</header>`;
    const lane = s.lane ? LANES[s.lane] : '';
    const count = s.count ? `<div class="wide count" data-count="${s.count.to}" data-from="${s.count.from}"><span class="count__num">${fmt(s.count.from)}</span><span class="count__label">${esc(s.count.label)}</span></div>` : '';
    const dates = s.dates ? `<div class="wide dates" aria-label="Del 1 de agosto de 2019 al 1 de agosto de 2026"><span class="dates__line" aria-hidden="true">1 de agosto de <span class="dates__year" data-year>2019</span></span><span class="dates__note">Mismo día, siete años después</span></div>` : '';
    const sand = s.sand ? `<div class="wide"><svg class="sand" viewBox="0 0 300 140" preserveAspectRatio="xMinYMid meet" aria-hidden="true"><path class="heart" d="M150 120C90 82 62 58 66 38a26 26 0 0 1 84-6 26 26 0 0 1 84 6c4 20-24 44-84 82z"/><rect class="wave" x="0" y="0" width="300" height="140" rx="60"/></svg><p class="sand__note">Pasó la ola… y el corazón sigue ahí.</p></div>` : '';
    const badge = s.badge ? `<p class="badge wide">${esc(s.badge)}</p>` : '';
    let body;
    if (s.ask) {
      body = `${lane}<div class="ask" data-burst="${s.ask.burst}">${ICONS[s.ask.icon]}<p class="ask__q">${esc(s.ask.q)}</p><div class="ask__btns">${s.ask.yes.map((y, i) => `<button type="button" class="ask__btn ${i ? 'ask__btn--alt' : ''}">${esc(y)}</button>`).join('')}</div></div><div class="ask__after">${mediaBlock(s)}${letter(s)}</div>`;
    } else {
      body = `${lane}${count}${dates}${sand}${mediaBlock(s)}${letter(s)}${badge}`;
    }
    const attrs = [`id="${s.id}"`, s.sky ? `data-sky="${s.sky}"` : '', s.night != null ? `data-night="${s.night ? 1 : 0}"` : '', s.ambient != null ? `data-ambient="${s.ambient}"` : '', s.burst ? `data-burst="${s.burst}"` : ''].join(' ');
    return `<section class="stop" ${attrs}>${head}<div class="stop__body">${body}</div></section>`;
  }
  function render() {
    const parts = [];
    parts.push(`<section class="hero" data-sky="#FBE3E4" data-night="0" data-ambient=""><span class="knot-start" aria-hidden="true"></span><p class="hero__for">Para mi cielito lindo, en tus 25 años</p><h1 class="hero__title">Todo empezó en una cancha</h1><p class="hero__span">Del 1 de agosto de 2019 a tu cumpleaños, el 28 de noviembre de 2026. Sigue el hilo rojo: nos une desde el primer día.</p><p class="hero__how">Desliza hacia abajo o toca «Siguiente momento».</p></section>`);
    for (const c of CHAPTERS) {
      parts.push(`<section class="chapter" data-sky="${c.sky}" data-night="${c.night ? 1 : 0}" data-ambient="${c.ambient || ''}"><p class="chapter__num">Capítulo ${c.n}</p><h2 class="chapter__title">${esc(c.title)}</h2><p class="chapter__years">${esc(c.years)}</p></section>`);
      for (const s of c.stops) {
        s.sky = s.sky || c.sky;
        if (s.night == null) s.night = !!c.night;
        if (s.ambient == null) s.ambient = c.ambient || '';
        parts.push(stopHTML(s));
      }
    }
    const thumbs = Object.keys(DIMS).filter((k) => !/^(d-raton|d-pato|u-pandilla)$/.test(k));
    const total = dayN('2026-11-28');
    parts.push(`<section class="final" id="final" data-sky="#2A0F2E" data-night="1" data-ambient="stars" data-burst="fireworks"><div class="mosaic" aria-hidden="true">${thumbs.map((k, i) => `<img src="${M}${k}-t.webp" alt="" loading="lazy" decoding="async" style="--x:${((i * 37) % 200) - 100}px;--y:${((i * 53) % 240) - 120}px;--r:${((i * 29) % 40) - 20}deg;--d:${(i * 0.025).toFixed(3)}s">`).join('')}</div><div class="final__card"><h2 class="final__title">Feliz cumpleaños, mi amor</h2><p class="final__line">28 de noviembre: el día que llegaste al mundo… y el día que dijiste que sí.</p><p class="final__line">Hoy cumples 25 años, y nosotros cumplimos 5 de novios. Son ${fmt(total)} días desde aquella cancha, y quiero todos los que vienen.</p><div class="final__love count" data-count="3000000" data-from="0"><span class="count__label">Te amo</span><span class="count__num">0</span></div><p class="final__sign">${SIGN}</p><button type="button" class="final__again" id="again">Volver a recorrer la aventura</button></div></section>`);
    $('#stops').innerHTML = parts.join('');
  }

  /* ---------------- Hilo rojo ---------------- */
  const story = $('#story');
  const svg = $('#thread'), line = $('#thread-line'), ghost = $('#thread-ghost'), tip = $('#thread-tip');
  let samples = [], total = 0, knots = [];
  function buildThread() {
    const top = story.getBoundingClientRect().top + scrollY;
    const desk = innerWidth >= 760;
    const pts = [];
    const startEl = $('.hero');
    const x0 = desk ? Math.max(48, innerWidth * 0.045) : 26;
    pts.push({ x: x0, y: startEl.offsetTop + 40 });
    knots = $$('.stop').map((s) => {
      const k = $('.knot', s).getBoundingClientRect();
      return { el: s, x: k.left + scrollX, y: k.top + scrollY - top };
    });
    knots.forEach((k) => pts.push({ x: k.x, y: k.y }));
    const fin = $('#final');
    pts.push({ x: x0, y: fin.offsetTop + 30 });
    const amp = desk ? 34 : 20;
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], dy = b.y - a.y, s = i % 2 ? 1 : -1;
      d += ` C ${a.x + amp * s} ${a.y + dy * 0.45}, ${b.x - amp * s} ${b.y - dy * 0.45}, ${b.x} ${b.y}`;
    }
    const h = story.scrollHeight;
    svg.setAttribute('viewBox', `0 0 ${innerWidth} ${h}`);
    svg.style.height = h + 'px';
    line.setAttribute('d', d); ghost.setAttribute('d', d);
    total = line.getTotalLength();
    line.style.strokeDasharray = `${total} ${total}`;
    samples = [];
    for (let l = 0; l <= total; l += 14) { const p = line.getPointAtLength(l); samples.push([l, p.x, p.y]); }
    const lanes = $$('.plane-lane');
    lanes.forEach((ln) => {
      const w = ln.clientWidth || 300;
      const path = `M 0 92 C ${w * 0.3} -20, ${w * 0.7} -20, ${w - 20} 70`;
      $('.route', ln).setAttribute('viewBox', `0 0 ${w} 110`);
      $('.route path', ln).setAttribute('d', path);
      $('.plane', ln).style.offsetPath = `path("${path}")`;
    });
    onScroll();
  }
  function onScroll() {
    if (!samples.length) return;
    const top = story.getBoundingClientRect().top + scrollY;
    const target = reduce ? Infinity : scrollY - top + innerHeight * 0.62;
    let lo = 0, hi = samples.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (samples[mid][2] < target) lo = mid + 1; else hi = mid; }
    const s = samples[Math.max(0, lo)];
    const L = target === Infinity ? total : s[0];
    line.style.strokeDashoffset = String(total - L);
    tip.setAttribute('cx', s[1]); tip.setAttribute('cy', s[2]);
    tip.style.opacity = L >= total - 1 ? '0' : '1';
    for (const k of knots) k.el.classList.toggle('is-reached', k.y <= target);
  }

  /* ---------------- Efectos (canvas) ---------------- */
  const fx = (() => {
    const cv = $('#fx'), ctx = cv.getContext('2d');
    let W = 0, H = 0, dpr = 1, parts = [], ambient = '', raf = 0, stars = [];
    const COLORS = ['#D2152B', '#E3B04B', '#F7A8B8', '#7FB7E6', '#FFFFFF', '#9C6ADE'];
    function size() { dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); stars = []; }
    const rnd = (a, b) => a + Math.random() * (b - a);
    function heart(x, y, s) { ctx.beginPath(); ctx.moveTo(x, y + s * .3); ctx.bezierCurveTo(x, y, x - s * .5, y, x - s * .5, y + s * .3); ctx.bezierCurveTo(x - s * .5, y + s * .6, x, y + s * .8, x, y + s); ctx.bezierCurveTo(x, y + s * .8, x + s * .5, y + s * .6, x + s * .5, y + s * .3); ctx.bezierCurveTo(x + s * .5, y, x, y, x, y + s * .3); ctx.fill(); }
    function burst(kind) {
      if (reduce) return;
      const n = { confetti: 140, hearts: 60, gold: 90, petals: 70, fireworks: 0 }[kind] ?? 80;
      for (let i = 0; i < n; i++) {
        const p = { kind, x: rnd(0, W), y: rnd(-H * .3, -10), vx: rnd(-1.2, 1.2), vy: rnd(1.5, 4), r: rnd(0, 6.28), vr: rnd(-.15, .15), s: rnd(6, 12), life: 0, ttl: rnd(160, 260), c: COLORS[i % COLORS.length] };
        if (kind === 'confetti' || kind === 'hearts') { p.x = W / 2 + rnd(-40, 40); p.y = H * .55; p.vx = rnd(-7, 7); p.vy = rnd(-14, -6); }
        if (kind === 'hearts') { p.c = ['#D2152B', '#F7A8B8', '#FF5C7A'][i % 3]; p.s = rnd(10, 20); }
        if (kind === 'gold') { p.c = ['#E3B04B', '#FBE08A', '#FFFFFF'][i % 3]; p.s = rnd(2, 4.5); p.vy = rnd(.6, 2); }
        if (kind === 'petals') { p.c = ['#FFFFFF', '#F7C6D2', '#FBE3E4'][i % 3]; p.vy = rnd(1, 2.4); p.s = rnd(7, 11); }
        parts.push(p);
      }
      if (kind === 'fireworks') { let k = 0; const boom = () => { firework(rnd(W * .15, W * .85), rnd(H * .12, H * .45)); if (++k < 7) setTimeout(boom, rnd(250, 600)); }; boom(); }
      loop();
    }
    function firework(x, y) {
      const c = COLORS[Math.floor(rnd(0, COLORS.length))];
      for (let i = 0; i < 70; i++) { const a = (i / 70) * 6.283, v = rnd(2, 5.5); parts.push({ kind: 'spark', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, s: rnd(1.5, 3), life: 0, ttl: rnd(60, 90), c }); }
      loop();
    }
    function setAmbient(a) { if (reduce || a === ambient) return; ambient = a; loop(); }
    function step() {
      ctx.clearRect(0, 0, W, H);
      if (ambient === 'stars') {
        if (!stars.length) for (let i = 0; i < 90; i++) stars.push({ x: rnd(0, W), y: rnd(0, H), s: rnd(.6, 1.8), p: rnd(0, 6.28) });
        ctx.fillStyle = '#FFFFFF';
        for (const st of stars) { st.p += .03; ctx.globalAlpha = .25 + .55 * Math.abs(Math.sin(st.p)); ctx.beginPath(); ctx.arc(st.x, st.y, st.s, 0, 6.283); ctx.fill(); }
        ctx.globalAlpha = 1;
        if (Math.random() < .004) parts.push({ kind: 'shoot', x: rnd(W * .2, W), y: rnd(0, H * .3), vx: -9, vy: 4, s: 2, life: 0, ttl: 45, c: '#FFFFFF' });
      }
      if (ambient === 'snow' && parts.filter((p) => p.kind === 'snow').length < 120) parts.push({ kind: 'snow', x: rnd(0, W), y: -10, vx: rnd(-.4, .4), vy: rnd(.6, 1.8), s: rnd(1.5, 4), life: 0, ttl: 2000, r: rnd(0, 6.28) });
      parts = parts.filter((p) => p.life < p.ttl && p.y < H + 40);
      for (const p of parts) {
        p.life++;
        if (p.kind === 'confetti' || p.kind === 'hearts') { p.vy += .28; p.vx *= .985; }
        if (p.kind === 'spark') { p.vy += .06; p.vx *= .97; p.vy *= .97; }
        if (p.kind === 'petals' || p.kind === 'snow') { p.r += .03; p.vx = Math.sin(p.r) * .9; }
        p.x += p.vx; p.y += p.vy; if (p.vr) p.r += p.vr;
        const fade = p.life > p.ttl - 30 ? (p.ttl - p.life) / 30 : 1;
        ctx.globalAlpha = Math.max(0, fade); ctx.fillStyle = p.c || '#fff';
        if (p.kind === 'confetti') { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); }
        else if (p.kind === 'hearts') heart(p.x, p.y, p.s);
        else if (p.kind === 'petals') { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .5, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
        else if (p.kind === 'shoot') { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 6, p.y - p.vy * 6); ctx.stroke(); }
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
      if (parts.length || ambient) raf = requestAnimationFrame(step); else { raf = 0; ctx.clearRect(0, 0, W, H); }
    }
    function loop() { if (!raf) raf = requestAnimationFrame(step); }
    addEventListener('resize', size); size();
    return { burst, setAmbient };
  })();

  /* ---------------- Animaciones al llegar ---------------- */
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    const to = +el.dataset.count, from = +el.dataset.from, num = $('.count__num', el);
    if (reduce) { num.textContent = fmt(to); return; }
    const dur = to > 10000 ? 3200 : 2000, t0 = performance.now();
    const tick = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); num.textContent = fmt(Math.round(from + (to - from) * e)); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }
  function yearsRoll(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    let y = 2019; const tick = () => { el.textContent = String(y); if (y < 2026) { y++; setTimeout(tick, reduce ? 0 : 330); } }; setTimeout(tick, 600);
  }
  function parade(strip) {
    if (reduce || strip.dataset.on) return; strip.dataset.on = '1';
    let paused = false;
    const stop = () => { paused = true; };
    strip.addEventListener('pointerdown', stop, { once: true }); strip.addEventListener('wheel', stop, { once: true, passive: true }); strip.addEventListener('focusin', stop, { once: true });
    const id = setInterval(() => {
      if (paused || !strip.closest('.is-in')) return;
      const card = strip.querySelector('.pola'); const step = card ? card.getBoundingClientRect().width + 18 : 300;
      const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 8;
      strip.scrollTo({ left: atEnd ? 0 : strip.scrollLeft + step, behavior: 'smooth' });
    }, 3200);
    strip.dataset.timer = id;
  }
  function onEnter(sec) {
    if (sec.classList.contains('is-in')) return;
    sec.classList.add('is-in');
    if (sec.dataset.burst && !sec.dataset.fired) { sec.dataset.fired = '1'; setTimeout(() => fx.burst(sec.dataset.burst), 500); }
    $$('.count[data-count]', sec).forEach((c) => { if (!c.closest('.final__love')) countUp(c); });
    $$('[data-year]', sec).forEach(yearsRoll);
    $$('[data-parade]', sec).forEach(parade);
    if (sec.id === 'final') setTimeout(() => { countUp($('.final__love', sec)); fx.burst('confetti'); }, 2400);
  }

  /* ---------------- Cielo por capítulo ---------------- */
  function setSky(sec) {
    if (!sec.dataset.sky) return;
    document.body.style.backgroundColor = sec.dataset.sky;
    document.body.classList.toggle('is-night', sec.dataset.night === '1');
    $('meta[name="theme-color"]').setAttribute('content', sec.dataset.sky);
    fx.setAmbient(sec.dataset.ambient || '');
  }

  /* ---------------- Arranque ---------------- */
  function start() {
    render();
    const secs = $$('.hero, .chapter, .stop, .final');
    const ioIn = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) onEnter(e.target); }), { rootMargin: '0px 0px -30% 0px', threshold: 0 });
    const ioSky = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setSky(e.target); }), { rootMargin: '-48% 0px -48% 0px' });
    secs.forEach((s) => { ioIn.observe(s); ioSky.observe(s); });

    const ioVid = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target; v.muted = true;
      if (e.isIntersecting) { if (v.preload === 'none') v.preload = 'auto'; const p = v.play(); if (p) p.catch(() => {}); } else v.pause();
    }), { threshold: 0.35 });
    $$('video').forEach((v) => ioVid.observe(v));

    // Preguntas
    $$('.ask').forEach((ask) => {
      const btns = $$('.ask__btn', ask);
      btns.forEach((b) => {
        b.addEventListener('pointerenter', () => ask.classList.add('is-fast'));
        b.addEventListener('click', () => {
          ask.classList.add('is-done');
          fx.burst(ask.dataset.burst || 'hearts'); setTimeout(() => fx.burst('confetti'), 350);
          const after = ask.nextElementSibling;
          requestAnimationFrame(() => { $$('video', after).forEach((v) => ioVid.observe(v)); buildThread(); });
          after.setAttribute('tabindex', '-1'); setTimeout(() => after.focus({ preventScroll: true }), 50);
        });
      });
    });

    // Hilo: recalcular cuando cambie el tamaño
    let qt = 0; const queue = () => { cancelAnimationFrame(qt); qt = requestAnimationFrame(buildThread); };
    new ResizeObserver(queue).observe($('#stops'));
    addEventListener('resize', queue);
    if (document.fonts) document.fonts.ready.then(queue);
    addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
    buildThread();

    // Siguiente momento
    const nextBtn = $('#next'), nextLabel = $('#next-label');
    const marks = () => $$('.hero, .chapter, .stop, .final');
    nextBtn.addEventListener('click', () => {
      const y = scrollY + 8;
      const nxt = marks().find((s) => s.getBoundingClientRect().top + scrollY > y + 4);
      if (!nxt || nxt.id === 'final' && nxt.getBoundingClientRect().top < 20) { scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); return; }
      nxt.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
    const upd = () => { const atEnd = $('#final').getBoundingClientRect().top < innerHeight * 0.3; nextLabel.textContent = atEnd ? 'Volver al inicio' : 'Siguiente momento'; nextBtn.classList.toggle('is-up', atEnd); };
    addEventListener('scroll', upd, { passive: true });
    $('#again').addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

    // Fotos ampliadas
    const lb = $('#lightbox'), lbImg = $('#lightbox-img'), lbCap = $('#lightbox-cap');
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-full]'); if (!b) return;
      lbImg.src = `${M}${b.dataset.full}.webp`; lbImg.alt = b.dataset.cap; lbCap.textContent = b.dataset.cap;
      if (lb.showModal) lb.showModal();
    });
    $('#lightbox-close').addEventListener('click', () => lb.close());
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  }

  /* ---------------- Llave ---------------- */
  function unlock(instant) {
    const lock = $('#lock');
    store.set('cata-ok', '1');
    document.body.classList.remove('is-locked');
    lock.classList.add('is-open');
    if (instant) lock.style.transition = 'none';
    setTimeout(() => { lock.hidden = true; $('#next').focus({ preventScroll: true }); }, instant ? 0 : 1300);
    setTimeout(() => fx.burst('hearts'), instant ? 0 : 700);
  }
  function lockUI() {
    const input = $('#lock-code'), cells = $$('.lock__digits span'), err = $('#lock-error'), lock = $('#lock');
    const paint = () => {
      const v = input.value.replace(/\D/g, '').slice(0, 4); input.value = v;
      cells.forEach((c, i) => { c.textContent = v[i] ? '♥' : ''; c.classList.toggle('is-filled', !!v[i]); c.classList.toggle('is-cursor', i === v.length); });
      if (v.length === 4) {
        if (v === CODE) { err.textContent = ''; unlock(false); }
        else { err.textContent = 'Esa no es. Piensa en un 28 muy especial.'; lock.classList.remove('is-wrong'); void lock.offsetWidth; lock.classList.add('is-wrong'); setTimeout(() => { input.value = ''; paint(); }, 650); }
      }
    };
    input.addEventListener('input', paint);
    $('#lock-form').addEventListener('submit', (e) => e.preventDefault());
    paint();
    setTimeout(() => input.focus(), 400);
  }

  start();
  if (store.get('cata-ok') === '1') unlock(true); else lockUI();
})();
