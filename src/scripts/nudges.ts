// Mensajes emergentes (ver src/components/Nudges.astro): se carga con el resto del código para no incrustar scripts (CSP).
type N = { icon: string; q: string; a: string; cta: string; href: string };
const box = document.querySelector<HTMLElement>('[data-nudge]');
const bar = box?.querySelector<HTMLElement>('[data-nudge-bar]');
const data: N[] = JSON.parse(document.getElementById('nudges-data')?.textContent || '[]');
const store = { get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } }, set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* sin almacenamiento */ } } };
// SHOW_FOR: cuánto se ve cada mensaje antes de irse solo.
const FIRST = 25_000, EVERY = 75_000, MAX = 3, SHOW_FOR = 12_000;
let shown = Number(store.get('jc-nudges-shown') || 0);
let idx = Number(store.get('jc-nudges-next') || Math.floor(Math.random() * data.length));
let timer: Animation | null = null;
const hide = () => { if (!box) return; timer?.cancel(); timer = null; box.classList.add('opacity-0', 'translate-y-6'); window.setTimeout(() => { box.hidden = true; }, 500); };
const show = () => {
  if (!box || !data.length || store.get('jc-nudges-off') || shown >= MAX || document.hidden) return;
  if (document.body.classList.contains('overflow-hidden')) return; // menú abierto
  const n = data[idx % data.length];
  box.querySelector('[data-nudge-icon]')!.textContent = n.icon;
  box.querySelector('[data-nudge-q]')!.textContent = n.q;
  box.querySelector('[data-nudge-a]')!.textContent = n.a;
  const cta = box.querySelector<HTMLAnchorElement>('[data-nudge-cta]')!; cta.textContent = n.cta + ' →'; cta.href = n.href;
  box.querySelector<HTMLAnchorElement>('[data-nudge-cta-short]')!.href = n.href;
  box.hidden = false; requestAnimationFrame(() => box.classList.remove('opacity-0', 'translate-y-6'));
  shown++; idx++; store.set('jc-nudges-shown', String(shown)); store.set('jc-nudges-next', String(idx % data.length));
  // La barra hace de reloj: al vaciarse, el mensaje se oculta (y se pausa mientras el cursor está encima).
  timer?.cancel();
  timer = bar ? bar.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: SHOW_FOR, fill: 'forwards' }) : null;
  if (timer) timer.onfinish = hide; else window.setTimeout(hide, SHOW_FOR);
};
const off = () => { store.set('jc-nudges-off', '1'); hide(); };
box?.querySelectorAll('[data-nudge-close], [data-nudge-cta], [data-nudge-cta-short]').forEach((el) => el.addEventListener('click', off));
box?.addEventListener('mouseenter', () => timer?.pause());
box?.addEventListener('mouseleave', () => timer?.play());
if (!store.get('jc-nudges-off') && shown < MAX) {
  window.setTimeout(() => { show(); const iv = window.setInterval(() => { if (shown >= MAX || store.get('jc-nudges-off')) clearInterval(iv); else show(); }, EVERY); }, FIRST);
}
