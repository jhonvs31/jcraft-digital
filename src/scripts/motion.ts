// Movimiento del sitio: scroll suave (Lenis) + animaciones al hacer scroll (GSAP ScrollTrigger).
// Si el usuario prefiere menos movimiento, todo queda visible y estático.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './nudges';

gsap.registerPlugin(ScrollTrigger);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Cabecera: al bajar se vuelve una cápsula flotante de vidrio con barra de progreso (siempre visible).
const header = document.querySelector<HTMLElement>('[data-header]');
const progress = header?.querySelector<HTMLElement>('[data-hdr-progress]');
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
};
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Píldora que sigue al enlace bajo el cursor y vuelve a la página actual
const hdrNav = header?.querySelector<HTMLElement>('[data-hdr-nav]');
const pill = hdrNav?.querySelector<HTMLElement>('[data-hdr-pill]');
const pillTo = (el: HTMLElement | null) => {
  if (!pill) return;
  if (!el) { pill.style.opacity = '0'; return; }
  pill.style.opacity = '1'; pill.style.width = `${el.offsetWidth}px`; pill.style.transform = `translateX(${el.offsetLeft}px)`;
  pill.classList.toggle('is-current', el.getAttribute('aria-current') === 'page');
};
const currentLink = () => hdrNav?.querySelector<HTMLElement>('[aria-current="page"]') ?? null;
hdrNav?.querySelectorAll<HTMLElement>('.hdr-link').forEach((a) => { a.addEventListener('mouseenter', () => pillTo(a)); a.addEventListener('focus', () => pillTo(a)); });
hdrNav?.addEventListener('mouseleave', () => pillTo(currentLink()));
if (pill) { pillTo(currentLink()); document.fonts?.ready.then(() => pillTo(currentLink())); window.addEventListener('resize', () => pillTo(currentLink())); }

// ── Menú móvil: círculo que se expande desde el botón + enlaces escalonados (y al revés al cerrar)
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
const menuLinks = menu ? [...menu.querySelectorAll<HTMLElement>('[data-menu-link]')] : [];
const [barA, barB] = toggle ? [...toggle.querySelectorAll<HTMLElement>('[data-bar]')] : [];
let menuTl: gsap.core.Timeline | null = null;
const setMenu = (open: boolean) => {
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('overflow-hidden', open);
  // Las dos barras se cruzan en una X
  barA?.classList.toggle('-translate-y-1', !open); barA?.classList.toggle('rotate-45', open);
  barB?.classList.toggle('translate-y-1', !open); barB?.classList.toggle('-rotate-45', open);
  menuTl?.kill();
  if (reduce) { menu.hidden = !open; menu.style.clipPath = open ? 'none' : ''; return; }
  const r = toggle.getBoundingClientRect(); const at = `at ${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
  const full = `circle(${Math.hypot(window.innerWidth, window.innerHeight) * 1.1}px ${at})`; const zero = `circle(0px ${at})`;
  if (open) {
    menu.hidden = false;
    menuTl = gsap.timeline()
      .fromTo(menu, { clipPath: zero }, { clipPath: full, duration: 0.75, ease: 'expo.inOut' })
      .fromTo(menuLinks, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.06 }, '-=0.35');
  } else {
    menuTl = gsap.timeline({ onComplete: () => { menu.hidden = true; } })
      .to([...menuLinks].reverse(), { y: -40, opacity: 0, duration: 0.3, ease: 'power2.in', stagger: 0.035 })
      .to(menu, { clipPath: zero, duration: 0.55, ease: 'expo.inOut' }, '-=0.1');
  }
};
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); } });

// ── Filtros (portafolio y blog)
document.querySelectorAll<HTMLElement>('[data-filters]').forEach((group) => {
  const scope = document.querySelector(group.dataset.filters!);
  group.querySelectorAll<HTMLButtonElement>('button[data-filter]').forEach((btn) => btn.addEventListener('click', () => {
    group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const f = btn.dataset.filter;
    const shown: HTMLElement[] = [];
    scope?.querySelectorAll<HTMLElement>('[data-cat]').forEach((el) => {
      el.hidden = !(f === 'all' || (el.dataset.cat ?? '').split(' ').includes(f!));
      if (!el.hidden) shown.push(el);
    });
    moveInd();
    const count = document.querySelector('[data-pf-count]'); if (count) count.textContent = String(shown.length);
    if (!reduce && group.classList.contains('seg')) gsap.fromTo(shown, { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out', stagger: 0.05, overwrite: true });
    ScrollTrigger.refresh();
  }));
  // Indicador que se desliza bajo el botón activo (control segmentado del portafolio)
  const ind = group.querySelector<HTMLElement>('.seg-ind');
  function moveInd() {
    const on = group.querySelector<HTMLElement>('button[aria-pressed="true"]');
    if (!ind || !on) return;
    ind.style.width = `${on.offsetWidth}px`; ind.style.transform = `translateX(${on.offsetLeft}px)`;
  }
  if (ind) { moveInd(); window.addEventListener('resize', moveInd); document.fonts?.ready.then(moveInd); }
});

// ── Enlaces (bio de Instagram): vidrio líquido que sigue el dedo / el mouse
if (document.querySelector('[data-lg]')) import('./liquid-glass').then((m) => m.initLiquidGlass(reduce));

// ── Portafolio: pop-up de cada caso (solo en la página de portafolio)
if (document.querySelector('[data-case-open]')) import('./portfolio').then((m) => m.initPortfolio(gsap, reduce));

// ── Formulario de contacto → WhatsApp con el mensaje ya escrito (sitio estático, sin servidor)
const form = document.querySelector<HTMLFormElement>('#contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const d = new FormData(form);
  const line = (k: string, v: FormDataEntryValue | null) => (v ? `${k}: ${v}\n` : '');
  const msg = `Hola JCraft, quiero una consulta gratuita.\n\n${line('Nombre', d.get('nombre'))}${line('Negocio', d.get('empresa'))}${line('Correo', d.get('correo'))}${line('Teléfono', d.get('telefono'))}${line('Servicio', d.get('servicio'))}${line('Presupuesto', d.get('presupuesto'))}\n${d.get('mensaje') ?? ''}`;
  window.open(`https://wa.me/573008113078?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  const ok = document.querySelector<HTMLElement>('[data-form-ok]');
  if (ok) ok.hidden = false;
});

// ── Contadores
const runCounter = (el: HTMLElement) => {
  const to = Number(el.dataset.count); const suf = el.dataset.suffix ?? '';
  if (reduce) { el.textContent = to + suf; return; }
  const o = { v: 0 };
  gsap.to(o, { v: to, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v) + suf; } });
};

if (reduce) {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach(runCounter);
} else {
  // Scroll suave sincronizado con ScrollTrigger
  // Suavizado ligero: responde rápido a la rueda y deja el táctil nativo.
  const lenis = new Lenis({ lerp: 0.18, wheelMultiplier: 1.15, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const t = document.querySelector(a.getAttribute('href')!); if (t) { e.preventDefault(); lenis.scrollTo(t as HTMLElement, { offset: -90 }); }
  }));

  // Titulares: palabras que suben desde una máscara
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    gsap.fromTo(el.querySelectorAll('.w > span'), { y: 0, yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // Bloques que aparecen (con escalonado si comparten contenedor [data-stagger])
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((box) => {
    gsap.to(box.querySelectorAll('[data-reveal]'), { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.09,
      scrollTrigger: { trigger: box, start: 'top 85%' } });
  });
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.closest('[data-stagger]')) return;
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  // Parallax suave de luces y fotos
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.to(el, { y: Number(el.dataset.parallax), ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Foto del hero: se abre como una cortina
  document.querySelectorAll<HTMLElement>('[data-curtain]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(18% 12% 18% 12% round 32px)', scale: 1.08 }, { clipPath: 'inset(0% 0% 0% 0% round 32px)', scale: 1, duration: 1.6, ease: 'expo.out', delay: 0.2 });
  });

  // Contadores al entrar en pantalla
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => runCounter(el) }));

  // Proceso: la línea se dibuja con el scroll
  document.querySelectorAll<HTMLElement>('[data-line]').forEach((el) => {
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: 'left center', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 40%', scrub: true } });
  });

  // Botones magnéticos (solo con ratón)
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }); const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.25); yTo((e.clientY - r.top - r.height / 2) * 0.35); });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
    // Tarjetas con inclinación 3D sutil
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5; const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 900, duration: 0.5, ease: 'power2.out' }); });
      el.addEventListener('pointerleave', () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'expo.out' }));
    });
  }
}
