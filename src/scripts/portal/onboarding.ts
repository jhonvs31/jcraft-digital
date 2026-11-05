// Portal de clientes · Recorrido guiado para clientes nuevos.
// Bienvenida → pasos con foco sobre cada parte del panel (con una mini animación que explica cada cosa) → cierre.
// Se muestra solo la primera vez (se guarda en la cuenta del cliente) y se puede repetir con «Ver guía».
import { sb } from './lib';

type Step = {
  view?: string;                       // sección que se abre antes del paso
  target: () => Element | null;        // lo que se ilumina (null = tarjeta centrada)
  kicker: string; title: string; text: string;
  art?: string;                        // mini animación (HTML) que explica el paso
};
export type TourOptions = {
  clientName: string;
  tempPassword: boolean;               // el cliente aún tiene la contraseña temporal
  setView: (v: string) => void;
  onDone?: (goTo?: string) => void;
};

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(.16,1,.3,1)';
const mobile = () => matchMedia('(max-width: 1023px)').matches;
const anim = (el: Element, k: Keyframe[], o: KeyframeAnimationOptions) => (calm ? null : (el as HTMLElement).animate(k, { easing: EASE, fill: 'both', ...o }));
const wait = (ms: number) => new Promise((r) => setTimeout(r, calm ? 0 : ms));
const q = (s: string) => document.querySelector(s);
const visible = (el: Element | null) => !!el && (el as HTMLElement).offsetParent !== null && el.getBoundingClientRect().width > 0;

// ── Mini animaciones (CSS en portal.css, clases tour-art-*) ──
const ART = {
  menu: `<div class="ta ta-menu" aria-hidden="true"><span></span><span></span><span></span><span></span><i></i></div>`,
  week: `<div class="ta ta-week" aria-hidden="true">${'<span></span>'.repeat(7)}</div>`,
  swipe: `<div class="ta ta-swipe" aria-hidden="true"><div class="ta-card"><b class="ok">Aprobar ✓</b><b class="no">Cambios ✎</b></div><em class="l">← Pedir cambios</em><em class="r">Aprobar →</em></div>`,
  sheet: `<div class="ta ta-sheet" aria-hidden="true"><div class="ta-img"></div><div class="ta-lines"><span></span><span></span><span class="s"></span><i>📅 Mar 10 · 12:00</i></div></div>`,
  cal: `<div class="ta ta-cal" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<span${[2, 4, 8, 11].includes(i) ? ' class="on"' : ''}></span>`).join('')}</div>`,
  done: `<div class="ta ta-done" aria-hidden="true"><span>✓</span><span>✓</span><span>✓</span></div>`,
  brief: `<div class="ta ta-brief" aria-hidden="true"><div class="ta-q"><span></span><span class="s"></span></div><div class="ta-bar"><i></i></div></div>`,
  gal: `<div class="ta ta-gal" aria-hidden="true"><div class="ta-box"></div><span>🖼️</span><span>🎬</span><span>📄</span></div>`,
  pass: `<div class="ta ta-pass" aria-hidden="true"><span class="lock">🔒</span><span class="dots">••••••••</span></div>`,
  help: `<div class="ta ta-help" aria-hidden="true"><span class="b1">¿Me ayudan?</span><span class="b2">¡Claro! 👋</span></div>`,
};

function steps(o: TourOptions): Step[] {
  const menu = () => (mobile() ? q('.pp-tabbar') : q('.pp-rail nav'));
  return [
    { view: 'inicio', target: menu, kicker: 'El menú', title: 'Aquí te mueves por tu portal',
      text: mobile() ? 'Abajo tienes las secciones: Inicio, Calendario, Brief y Galería. En «Más» están tus piezas aprobadas y tu contraseña.' : 'A la izquierda tienes todas las secciones. Tócalas cuando quieras: nada se pierde al cambiar.', art: ART.menu },
    { view: 'inicio', target: () => q('#h-week')?.closest('section') ?? null, kicker: 'Inicio · Esta semana', title: 'Lo que sale en los próximos 7 días',
      text: 'Cada día muestra cuántas publicaciones tienes programadas. Así sabes qué viene sin buscar.', art: ART.week },
    { view: 'inicio', target: () => q('#h-pending')?.closest('section') ?? null, kicker: 'Inicio · Por revisar', title: 'Aprueba tus publicaciones deslizando',
      text: 'Aquí llegan las piezas que preparamos para ti. Desliza a la <b>derecha para aprobar</b> o a la <b>izquierda para pedir cambios</b>. También puedes usar los botones de abajo.', art: ART.swipe },
    { view: 'inicio', target: () => q('#deck'), kicker: 'La ficha de cada pieza', title: 'Toca una pieza para verla completa',
      text: 'Verás las imágenes o el video, el texto que la acompaña y la fecha y hora sugeridas. Si prefieres otro día u hora, la cambias ahí mismo antes de aprobar.', art: ART.sheet },
    { view: 'calendario', target: () => q('[data-panel="calendario"]'), kicker: 'Calendario', title: 'Todo tu mes de un vistazo',
      text: 'Cada semana en una fila, con cada publicación en su día. Toca cualquiera para abrirla.', art: ART.cal },
    { view: 'historial', target: () => q('[data-panel="historial"]'), kicker: 'Aprobadas', title: 'Lo que ya aprobaste',
      text: 'Aquí ves las piezas listas para publicar y las que ya publicamos. Nosotros nos encargamos de subirlas en su fecha.', art: ART.done },
    { view: 'brief', target: () => q('[data-panel="brief"]'), kicker: 'Brief de marca', title: 'Cuéntanos de tu negocio',
      text: 'Son preguntas cortas sobre tu marca, tus clientes y cómo quieres sonar. Puedes llenarlo por partes: cada vez que guardas, nos llega un aviso. Con esto tu contenido sale mucho más a tu medida.', art: ART.brief },
    { view: 'galeria', target: () => q('#drop') ?? q('[data-panel="galeria"]'), kicker: 'Galería', title: 'Sube tus fotos, videos y logos',
      text: 'Arrastra o elige archivos: fotos de tus productos, de tu equipo, tu logo o un PDF. Las fotos se optimizan solas. Tu plan define cuántos archivos puedes tener.', art: ART.gal },
    { view: 'cuenta', target: () => q('#pw'), kicker: 'Mi contraseña', title: o.tempPassword ? 'Cambia tu contraseña temporal' : 'Tu contraseña, cuando quieras',
      text: o.tempPassword ? 'Entraste con una contraseña que te enviamos. Cámbiala por una tuya de al menos 8 caracteres: así solo tú tienes acceso.' : 'Desde aquí la cambias en cualquier momento. Usa al menos 8 caracteres.', art: ART.pass },
    { view: 'inicio', target: () => (visible(q('#h-help')) ? q('#h-help')!.closest('section') : null), kicker: 'Ayuda', title: '¿Dudas? Escríbenos por WhatsApp',
      text: 'En «¿Necesitas algo?» tienes accesos directos a nuestro WhatsApp. Respondemos en horario de oficina de Colombia.', art: ART.help },
  ];
}

// ── Marcado del recorrido ──
function build(): HTMLElement {
  const root = document.createElement('div');
  root.className = 'tour'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'tour-title');
  root.innerHTML = `
    <div class="tour-shade"></div>
    <div class="tour-hole" aria-hidden="true"><span class="tour-pulse"></span></div>
    <section class="tour-card" tabindex="-1">
      <div class="tour-top"><span class="tour-kicker"></span><button type="button" class="tour-x" data-t="skip" aria-label="Salir de la guía">✕</button></div>
      <div class="tour-art"></div>
      <h2 id="tour-title" class="tour-title"></h2>
      <p class="tour-text"></p>
      <div class="tour-foot">
        <div class="tour-dots" aria-hidden="true"></div>
        <div class="tour-btns"><button type="button" class="tour-btn ghost" data-t="prev">Atrás</button><button type="button" class="tour-btn main" data-t="next">Siguiente</button></div>
      </div>
      <p class="tour-step sr-only" aria-live="polite"></p>
    </section>`;
  return root;
}

function placeCard(card: HTMLElement, r: DOMRect | null) {
  const vw = innerWidth, vh = innerHeight, gap = 18;
  card.classList.toggle('docked', mobile());
  if (mobile()) {
    // En el celular la tarjeta va arriba o abajo, en la mitad de la pantalla que no tapa lo iluminado.
    const tabbar = (q('.pp-tabbar') as HTMLElement | null)?.offsetHeight ?? 0;
    const below = !r || r.top + r.height / 2 < vh / 2;
    card.style.left = '12px'; card.style.right = '12px'; card.style.width = 'auto';
    card.style.top = below ? '' : '12px';
    card.style.bottom = below ? `${12 + (r && r.bottom > vh - tabbar - 20 ? 0 : tabbar)}px` : '';
    return;
  }
  card.style.right = ''; card.style.bottom = '';
  const w = Math.min(400, vw - 32); card.style.width = `${w}px`;
  const h = card.offsetHeight;
  if (!r) { card.style.left = `${(vw - w) / 2}px`; card.style.top = `${Math.max(16, (vh - h) / 2)}px`; return; }
  // Preferencia: a la derecha, luego a la izquierda, abajo o arriba de lo iluminado.
  const spots = [
    { ok: r.right + gap + w < vw - 16, left: r.right + gap, top: r.top + r.height / 2 - h / 2 },
    { ok: r.left - gap - w > 16, left: r.left - gap - w, top: r.top + r.height / 2 - h / 2 },
    { ok: r.bottom + gap + h < vh - 16, left: r.left + r.width / 2 - w / 2, top: r.bottom + gap },
    { ok: r.top - gap - h > 16, left: r.left + r.width / 2 - w / 2, top: r.top - gap - h },
  ];
  const s = spots.find((x) => x.ok) ?? { left: (vw - w) / 2, top: vh - h - 16 };
  card.style.left = `${Math.min(Math.max(16, s.left), vw - w - 16)}px`;
  card.style.top = `${Math.min(Math.max(16, s.top), vh - h - 16)}px`;
}

async function saveDone() {
  try { localStorage.setItem('jc-tour-done', '1'); } catch { /* sin almacenamiento */ }
  try { await sb.auth.updateUser({ data: { onboarded_at: new Date().toISOString() } }); } catch { /* se intenta la próxima vez */ }
}

export function tourDone(meta: Record<string, unknown> | undefined) {
  if (meta?.onboarded_at) return true;
  try { return localStorage.getItem('jc-tour-done') === '1'; } catch { return false; }
}

/** Pantalla de bienvenida y, si la persona quiere, el recorrido completo. */
export function startTour(o: TourOptions) {
  if (document.querySelector('.tour, .tour-welcome')) return;
  welcome(o);
}

function welcome(o: TourOptions) {
  const w = document.createElement('div');
  w.className = 'tour-welcome'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true'); w.setAttribute('aria-labelledby', 'tw-title');
  const first = o.clientName.trim();
  w.innerHTML = `
    <div class="tw-shade"></div>
    <section class="tw-card">
      <div class="tw-orbit" aria-hidden="true"><span class="tw-logo">JC</span><i></i><i></i><i></i></div>
      <p class="tw-kicker">Portal de clientes</p>
      <h2 id="tw-title" class="tw-title">¡Hola${first ? `, <span>${first.replace(/[<>&"]/g, '')}</span>` : ''}! Te damos la bienvenida a tu portal</h2>
      <p class="tw-text">Aquí revisas y apruebas tu contenido, eliges cuándo se publica y nos compartes todo lo de tu marca. Te mostramos cómo funciona en 2 minutos.</p>
      <ul class="tw-list">
        <li><span>✓</span>Aprobar o pedir cambios deslizando</li>
        <li><span>📅</span>Ver y mover tus fechas de publicación</li>
        <li><span>📝</span>Llenar tu brief de marca</li>
        <li><span>🖼️</span>Subir fotos, videos y logos</li>
      </ul>
      <div class="tw-btns"><button type="button" class="tour-btn ghost" data-w="later">Ahora no</button><button type="button" class="tour-btn main" data-w="go">Empezar recorrido</button></div>
      <p class="tw-note">Puedes volver a verlo cuando quieras en «Ver guía».</p>
    </section>`;
  document.body.appendChild(w);
  document.documentElement.classList.add('tour-lock');
  const card = w.querySelector('.tw-card')!;
  anim(w.querySelector('.tw-shade')!, [{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
  anim(card, [{ opacity: 0, transform: 'translateY(40px) scale(.94)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: 80 });
  card.querySelectorAll('.tw-kicker, .tw-title, .tw-text, .tw-list li, .tw-btns, .tw-note').forEach((el, i) =>
    anim(el, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 550, delay: 260 + i * 70 }));
  (w.querySelector('[data-w="go"]') as HTMLButtonElement).focus();
  const close = async (go: boolean) => {
    await anim(card, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-20px) scale(.96)' }], { duration: 320 })?.finished.catch(() => 0);
    w.remove();
    if (go) run(o); else { document.documentElement.classList.remove('tour-lock'); saveDone(); }
  };
  w.querySelector('[data-w="go"]')!.addEventListener('click', () => close(true));
  w.querySelector('[data-w="later"]')!.addEventListener('click', () => close(false));
  w.addEventListener('keydown', (e) => { if ((e as KeyboardEvent).key === 'Escape') close(false); });
}

function run(o: TourOptions) {
  const list = steps(o);
  const root = build(); document.body.appendChild(root);
  document.documentElement.classList.add('tour-lock');
  const hole = root.querySelector('.tour-hole') as HTMLElement, card = root.querySelector('.tour-card') as HTMLElement;
  const dots = root.querySelector('.tour-dots')!;
  dots.innerHTML = list.map(() => '<i></i>').join('');
  let i = 0, busy = false, lastRect: DOMRect | null = null;
  anim(root.querySelector('.tour-shade')!, [{ opacity: 0 }, { opacity: 1 }], { duration: 300 });

  const frame = (r: DOMRect | null) => {
    const pad = 10;
    const to = r ? { top: r.top - pad, left: r.left - pad, width: r.width + pad * 2, height: r.height + pad * 2, opacity: 1 }
      : { top: innerHeight / 2, left: innerWidth / 2, width: 0, height: 0, opacity: 0 };
    const from = lastRect ? { top: lastRect.top - pad, left: lastRect.left - pad, width: lastRect.width + pad * 2, height: lastRect.height + pad * 2 } : to;
    Object.assign(hole.style, { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px`, opacity: String(to.opacity) });
    anim(hole, [{ top: `${from.top}px`, left: `${from.left}px`, width: `${from.width}px`, height: `${from.height}px` }, { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px` }], { duration: 560, fill: 'none' });
    lastRect = r;
  };

  async function show(n: number) {
    if (busy) return; busy = true;
    const s = list[n]; const back = n < i; i = n;
    // La tarjeta sale, se abre la sección y se ilumina la parte que toca.
    await anim(card, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${back ? 24 : -24}px)` }], { duration: 200 })?.finished.catch(() => 0);
    if (s.view) o.setView(s.view);
    await wait(120);
    let el = s.target();
    if (el && !visible(el)) el = null;
    if (el) {
      const r0 = el.getBoundingClientRect();
      const tall = r0.height > innerHeight * 0.55;
      if (r0.top < 70 || r0.bottom > innerHeight - (mobile() ? 260 : 40) || tall) {
        (el as HTMLElement).scrollIntoView({ block: tall || mobile() ? 'start' : 'center', behavior: 'auto' });
        if (mobile() && !el.closest('.pp-tabbar')) window.scrollBy({ top: -16 });
        await wait(60);
      }
    }
    let r = el ? el.getBoundingClientRect() : null;
    // Si lo iluminado es muy alto, se ilumina solo la parte que cabe en pantalla.
    if (r) r = new DOMRect(r.left, Math.max(r.top, 8), r.width, Math.min(r.bottom, innerHeight * (mobile() ? 0.52 : 0.82)) - Math.max(r.top, 8));
    frame(r);
    root.querySelector('.tour-kicker')!.textContent = `${n + 1} de ${list.length} · ${s.kicker}`;
    root.querySelector('.tour-title')!.textContent = s.title;
    root.querySelector('.tour-text')!.innerHTML = s.text;
    root.querySelector('.tour-art')!.innerHTML = s.art ?? '';
    root.querySelector('.tour-step')!.textContent = `Paso ${n + 1} de ${list.length}: ${s.title}`;
    (root.querySelector('[data-t="prev"]') as HTMLButtonElement).hidden = n === 0;
    root.querySelector('[data-t="next"]')!.textContent = n === list.length - 1 ? 'Terminar' : 'Siguiente';
    dots.querySelectorAll('i').forEach((d, k) => d.className = k < n ? 'past' : k === n ? 'now' : '');
    placeCard(card, r);
    anim(card, [{ opacity: 0, transform: `translateX(${back ? -24 : 24}px)` }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 140 });
    card.focus({ preventScroll: true });
    busy = false;
  }

  const finish = async (completed: boolean) => {
    document.removeEventListener('keydown', onKey); removeEventListener('resize', onResize);
    await anim(root, [{ opacity: 1 }, { opacity: 0 }], { duration: 260 })?.finished.catch(() => 0);
    root.remove(); document.documentElement.classList.remove('tour-lock');
    saveDone();
    if (completed) outro(o); else o.onDone?.();
  };
  const next = () => (i === list.length - 1 ? finish(true) : show(i + 1));
  const prev = () => i > 0 && show(i - 1);
  root.querySelector('[data-t="next"]')!.addEventListener('click', next);
  root.querySelector('[data-t="prev"]')!.addEventListener('click', prev);
  root.querySelector('[data-t="skip"]')!.addEventListener('click', () => finish(false));
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') finish(false);
    else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };
  document.addEventListener('keydown', onKey);
  let t = 0; const onResize = () => { clearTimeout(t); t = window.setTimeout(() => { const el = list[i].target(); const r = el && visible(el) ? el.getBoundingClientRect() : null; lastRect = null; frame(r); placeCard(card, r); }, 120); };
  addEventListener('resize', onResize);
  i = -1; show(0);
}

function outro(o: TourOptions) {
  const w = document.createElement('div');
  w.className = 'tour-welcome'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true'); w.setAttribute('aria-labelledby', 'to-title');
  w.innerHTML = `
    <div class="tw-shade"></div>
    <section class="tw-card tw-end">
      <div class="tw-check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg></div>
      <h2 id="to-title" class="tw-title">¡Listo! Ya sabes usar tu portal</h2>
      <p class="tw-text">${o.tempPassword ? 'Te recomendamos empezar por cambiar tu contraseña temporal. Después, revisa tus piezas pendientes.' : 'Empieza revisando tus piezas pendientes. Cuando apruebes una, nos llega un aviso al instante.'}</p>
      <div class="tw-btns">${o.tempPassword ? '<button type="button" class="tour-btn ghost" data-o="inicio">Ir a mis piezas</button><button type="button" class="tour-btn main" data-o="cuenta">Cambiar mi contraseña</button>' : '<button type="button" class="tour-btn main" data-o="inicio">Revisar mis piezas</button>'}</div>
    </section>`;
  document.body.appendChild(w);
  document.documentElement.classList.add('tour-lock');
  const card = w.querySelector('.tw-card')!;
  anim(w.querySelector('.tw-shade')!, [{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
  anim(card, [{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 600 });
  confetti(card as HTMLElement);
  (w.querySelector('.tour-btn.main') as HTMLButtonElement).focus();
  w.querySelectorAll<HTMLButtonElement>('[data-o]').forEach((b) => b.addEventListener('click', () => {
    w.remove(); document.documentElement.classList.remove('tour-lock');
    o.setView(b.dataset.o!); o.onDone?.(b.dataset.o);
  }));
}

function confetti(from: HTMLElement) {
  if (calm) return;
  const r = from.getBoundingClientRect(); const colors = ['#00BCD4', '#0A2F6E', '#e8a33d', '#7fe7f3', '#0D47A1'];
  for (let k = 0; k < 46; k++) {
    const bit = document.createElement('span'); bit.className = 'confetti-bit'; bit.style.zIndex = '1001';
    bit.style.background = colors[k % colors.length]; bit.style.left = `${r.left + r.width / 2}px`; bit.style.top = `${r.top + 70}px`;
    document.body.appendChild(bit);
    const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 170;
    bit.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 80}px) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: .7 }, { transform: `translate(${Math.cos(a) * d * 1.1}px, ${Math.sin(a) * d + 120}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }],
      { duration: 1300 + Math.random() * 600, delay: 250, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'backwards' }).onfinish = () => bit.remove();
  }
}
