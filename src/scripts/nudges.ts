// Mensajes emergentes (ver src/components/Nudges.astro): se carga con el resto del código para no incrustar scripts (CSP).
type N = { icon: string; q: string; a: string; cta: string; href: string };
const box = document.querySelector<HTMLElement>('[data-nudge]');
const data: N[] = JSON.parse(document.getElementById('nudges-data')?.textContent || '[]');
const store = { get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } }, set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* sin almacenamiento */ } } };
const FIRST = 25_000, EVERY = 75_000, MAX = 3, SHOW_FOR = 14_000;
let shown = Number(store.get('jc-nudges-shown') || 0);
let idx = Number(store.get('jc-nudges-next') || Math.floor(Math.random() * data.length));
let hideTimer = 0;
const hide = () => { if (!box) return; box.classList.add('opacity-0', 'translate-y-6'); window.setTimeout(() => { box.hidden = true; }, 500); };
const show = () => {
  if (!box || !data.length || store.get('jc-nudges-off') || shown >= MAX || document.hidden) return;
  if (document.body.classList.contains('overflow-hidden')) return; // menú abierto
  const n = data[idx % data.length];
  box.querySelector('[data-nudge-icon]')!.textContent = n.icon;
  box.querySelector('[data-nudge-q]')!.textContent = n.q;
  box.querySelector('[data-nudge-a]')!.textContent = n.a;
  const cta = box.querySelector<HTMLAnchorElement>('[data-nudge-cta]')!; cta.textContent = n.cta + ' →'; cta.href = n.href;
  box.hidden = false; requestAnimationFrame(() => box.classList.remove('opacity-0', 'translate-y-6'));
  shown++; idx++; store.set('jc-nudges-shown', String(shown)); store.set('jc-nudges-next', String(idx % data.length));
  clearTimeout(hideTimer); hideTimer = window.setTimeout(hide, SHOW_FOR);
};
box?.querySelector('[data-nudge-close]')?.addEventListener('click', () => { store.set('jc-nudges-off', '1'); hide(); });
box?.querySelector('[data-nudge-cta]')?.addEventListener('click', () => { store.set('jc-nudges-off', '1'); hide(); });
box?.addEventListener('mouseenter', () => clearTimeout(hideTimer));
box?.addEventListener('mouseleave', () => { hideTimer = window.setTimeout(hide, 6000); });
if (!store.get('jc-nudges-off') && shown < MAX) {
  window.setTimeout(() => { show(); const iv = window.setInterval(() => { if (shown >= MAX || store.get('jc-nudges-off')) clearInterval(iv); else show(); }, EVERY); }, FIRST);
}
