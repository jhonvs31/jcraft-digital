// Movimiento del sitio: scroll suave (Lenis) + animaciones al hacer scroll (GSAP ScrollTrigger).
// Si el usuario prefiere menos movimiento, todo queda visible y estático.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Cabecera: se compacta y toma fondo al bajar
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => {
  const on = window.scrollY > 40;
  header?.classList.toggle('bg-deep/80', on);
  header?.classList.toggle('backdrop-blur-xl', on);
  header?.querySelector('[data-header-inner]')?.classList.toggle('!py-3', on);
};
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

// ── Menú móvil
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  if (menu) menu.hidden = !open;
  document.body.classList.toggle('overflow-hidden', open);
  const [a, b] = toggle.querySelectorAll('[data-bar]');
  a?.classList.toggle('rotate-45', open); b?.classList.toggle('-rotate-45', open); b?.classList.toggle('translate-y-1.5', !open);
});

// ── Filtros (portafolio y blog)
document.querySelectorAll<HTMLElement>('[data-filters]').forEach((group) => {
  const scope = document.querySelector(group.dataset.filters!);
  group.querySelectorAll<HTMLButtonElement>('button[data-filter]').forEach((btn) => btn.addEventListener('click', () => {
    group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const f = btn.dataset.filter;
    scope?.querySelectorAll<HTMLElement>('[data-cat]').forEach((el) => { el.hidden = !(f === 'all' || el.dataset.cat === f); });
    ScrollTrigger.refresh();
  }));
});

// ── Formulario de contacto → WhatsApp con el mensaje ya escrito (sitio estático, sin servidor)
const form = document.querySelector<HTMLFormElement>('#contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const d = new FormData(form);
  const line = (k: string, v: FormDataEntryValue | null) => (v ? `${k}: ${v}\n` : '');
  const msg = `Hola JCraft, quiero una consulta gratuita.\n\n${line('Nombre', d.get('nombre'))}${line('Negocio', d.get('empresa'))}${line('Correo', d.get('correo'))}${line('Teléfono', d.get('telefono'))}${line('Servicio', d.get('servicio'))}${line('Presupuesto', d.get('presupuesto'))}\n${d.get('mensaje') ?? ''}`;
  window.open(`https://wa.me/573135494737?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
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
