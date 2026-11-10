// Portafolio: abre el caso de cada cliente en un pop-up animado.
// Escritorio: el panel «crece» desde la tarjeta tocada. Celular: sube desde abajo como una hoja (se cierra deslizando hacia abajo).
import type gsapType from 'gsap';

export function initPortfolio(gsap: typeof gsapType, reduce: boolean) {
  const mobile = () => window.matchMedia('(max-width: 639px)').matches;
  let lastCard: HTMLElement | null = null;
  let busy = false;

  const items = (d: HTMLDialogElement) => [...d.querySelectorAll<HTMLElement>('[data-case-item]')];

  const open = (slug: string, card?: HTMLElement | null, push = true) => {
    const d = document.getElementById(`caso-${slug}`) as HTMLDialogElement | null;
    if (!d || d.open || busy) return;
    const panel = d.querySelector<HTMLElement>('.case-panel')!;
    lastCard = card ?? document.querySelector<HTMLElement>(`[data-case-card="${slug}"]`);
    d.showModal();
    panel.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => d.classList.add('is-open'));
    if (push) history.replaceState(null, '', `#caso-${slug}`);
    window.dispatchEvent(new CustomEvent('case:open', { detail: slug }));
    if (reduce) return;
    busy = true;
    const done = () => { busy = false; };
    if (mobile() || !lastCard) {
      gsap.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'expo.out', onComplete: done });
    } else {
      const a = lastCard.getBoundingClientRect(); const b = panel.getBoundingClientRect();
      gsap.fromTo(panel,
        { x: a.left - b.left, y: a.top - b.top, scaleX: a.width / b.width, scaleY: Math.min(1, a.height / b.height), opacity: 0.4 },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: 0.7, ease: 'expo.out', clearProps: 'transform,opacity', onComplete: done });
    }
    gsap.fromTo(items(d), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.06, delay: 0.18, clearProps: 'transform,opacity' });
  };

  const close = (d: HTMLDialogElement) => {
    if (!d.open || busy) return;
    const panel = d.querySelector<HTMLElement>('.case-panel')!;
    const finish = () => {
      d.close(); d.classList.remove('is-open'); gsap.set(panel, { clearProps: 'all' });
      document.documentElement.style.overflow = ''; busy = false;
      history.replaceState(null, '', location.pathname + location.search);
      lastCard?.querySelector<HTMLElement>('[data-case-open]')?.focus({ preventScroll: true });
    };
    d.classList.remove('is-open');
    if (reduce) return finish();
    busy = true;
    if (mobile() || !lastCard) {
      gsap.to(panel, { yPercent: 100, duration: 0.4, ease: 'power3.in', onComplete: finish });
    } else {
      const a = lastCard.getBoundingClientRect(); const b = panel.getBoundingClientRect();
      gsap.to(panel, { x: a.left - b.left, y: a.top - b.top, scaleX: a.width / b.width, scaleY: Math.min(1, a.height / b.height), opacity: 0, duration: 0.45, ease: 'power3.in', onComplete: finish });
    }
  };

  document.querySelectorAll<HTMLButtonElement>('[data-case-open]').forEach((btn) =>
    btn.addEventListener('click', () => open(btn.dataset.caseOpen!, btn.closest<HTMLElement>('[data-case-card]'))));

  document.querySelectorAll<HTMLDialogElement>('dialog[data-case]').forEach((d) => {
    d.addEventListener('cancel', (e) => { e.preventDefault(); close(d); });           // tecla Esc
    d.addEventListener('click', (e) => { if (e.target === d) close(d); });             // clic fuera del panel
    d.querySelectorAll('[data-case-close]').forEach((b) => b.addEventListener('click', () => close(d)));
    // Celular: deslizar hacia abajo para cerrar (cuando el panel está arriba del todo)
    const panel = d.querySelector<HTMLElement>('.case-panel')!;
    let y0 = 0, dy = 0, drag = false;
    panel.addEventListener('touchstart', (e) => { if (!mobile() || panel.scrollTop > 0) return; drag = true; y0 = e.touches[0].clientY; dy = 0; }, { passive: true });
    panel.addEventListener('touchmove', (e) => { if (!drag) return; dy = Math.max(0, e.touches[0].clientY - y0); if (dy > 0) gsap.set(panel, { y: dy }); }, { passive: true });
    panel.addEventListener('touchend', () => {
      if (!drag) return; drag = false;
      if (dy > 110) { gsap.set(panel, { y: 0 }); close(d); } else gsap.to(panel, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Enlace directo a un caso: /portafolio#caso-slug
  const fromHash = location.hash.match(/^#caso-([\w-]+)$/);
  if (fromHash) setTimeout(() => open(fromHash[1], null, false), 400);
}
