// Diagnóstico digital gratis: aviso flotante discreto + formulario de 4 pasos que se guarda en Supabase.
import type gsapType from 'gsap';

// La clave «publishable» de Supabase es pública por diseño: la tabla solo permite insertar (RLS), nunca leer.
const SB_URL = 'https://jjgepsfiajhommbruzbn.supabase.co';
const SB_KEY = 'sb_publishable_TTEHzWVoZVFcodh2fflprQ_XAHpDpic';
const HIDE_KEY = 'jc-diag-oculto';
const DONE_KEY = 'jc-diag-enviado';
const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
};

export function initDiag(gsap: typeof gsapType, reduce: boolean) {
  const d = document.querySelector<HTMLDialogElement>('[data-dg-dialog]');
  if (!d) return;
  const form = d.querySelector<HTMLFormElement>('[data-dg-form]')!;
  const steps = [...form.querySelectorAll<HTMLElement>('[data-dg-step]')];
  const dots = [...form.querySelectorAll<HTMLElement>('.dg-steps span')];
  const next = form.querySelector<HTMLButtonElement>('[data-dg-next]')!;
  const back = form.querySelector<HTMLButtonElement>('[data-dg-back]')!;
  const err = form.querySelector<HTMLElement>('[data-dg-error]')!;
  const teaser = document.querySelector<HTMLElement>('[data-dg-teaser]');
  const pill = document.querySelector<HTMLElement>('[data-dg-pill]');
  let step = 0;
  let openedAt = 0;

  // ── Aviso flotante: tarjeta blanca a los 9 s o al bajar un 35 %; si la cierran, queda la cápsula pequeña
  const showPill = () => { if (pill && !store.get(DONE_KEY)) { pill.hidden = false; requestAnimationFrame(() => pill.classList.add('is-in')); } };
  const showTeaser = () => {
    if (!teaser || store.get(DONE_KEY) || d.open || !teaser.hidden) return;
    if (store.get(HIDE_KEY) && Date.now() - Number(store.get(HIDE_KEY)) < 3 * 864e5) return showPill();
    teaser.hidden = false; requestAnimationFrame(() => teaser.classList.add('is-in'));
  };
  const dismiss = () => { store.set(HIDE_KEY, String(Date.now())); teaser?.classList.remove('is-in'); setTimeout(() => { if (teaser) teaser.hidden = true; showPill(); }, 350); };
  teaser?.querySelector('[data-dg-dismiss]')?.addEventListener('click', dismiss);
  if (!store.get(DONE_KEY)) {
    const t = window.setTimeout(showTeaser, 9000);
    const onScroll = () => { const h = document.documentElement; if (h.scrollTop / Math.max(1, h.scrollHeight - innerHeight) > 0.35) { clearTimeout(t); showTeaser(); removeEventListener('scroll', onScroll); } };
    addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Pasos
  const go = (n: number) => {
    const from = steps[step];
    step = n;
    steps.forEach((s, k) => (s.hidden = k !== n));
    dots.forEach((s, k) => s.classList.toggle('is-on', k <= n));
    form.querySelector('[data-dg-n]')!.textContent = String(n + 1);
    back.hidden = n === 0;
    next.textContent = n === steps.length - 1 ? 'Enviar y recibir mi diagnóstico' : 'Siguiente →';
    err.hidden = true;
    form.scrollTo({ top: 0 });
    if (!reduce && from !== steps[n]) gsap.fromTo(steps[n], { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.4, ease: 'expo.out', clearProps: 'all' });
    steps[n].querySelector<HTMLElement>('input:not([type=radio]):not([type=checkbox]), textarea')?.focus({ preventScroll: true });
  };
  const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | null)?.value.trim() ?? '';
  const radio = (n: string) => form.querySelector<HTMLInputElement>(`input[name="${n}"]:checked`)?.value ?? '';
  const fail = (m: string) => { err.textContent = m; err.hidden = false; if (!reduce) gsap.fromTo(err, { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, .3)' }); return false; };
  const check = () => {
    if (step === 0) { if (val('negocio').length < 2) return fail('Escribe el nombre de tu negocio.'); if (!radio('rubro')) return fail('Elige a qué se dedica tu negocio.'); }
    if (step === 1 && !val('web') && !val('instagram') && !val('otras_redes')) return fail('Déjanos tu web o al menos una red para poder revisarla.');
    if (step === 2 && !form.querySelector('input[name="objetivos"]:checked')) return fail('Elige al menos una opción.');
    if (step === 3) {
      if (val('nombre').length < 2) return fail('Escribe tu nombre.');
      const tel = val('whatsapp').replace(/[^\d+]/g, ''); const mail = val('email');
      if (!tel && !mail) return fail('Déjanos tu WhatsApp o tu correo para enviarte los resultados.');
      if (tel && tel.replace(/\D/g, '').length < 7) return fail('Revisa el número de WhatsApp.');
      if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return fail('Revisa el correo.');
      if (!(form.elements.namedItem('acepta_datos') as HTMLInputElement).checked) return fail('Para continuar, acepta el uso de tus datos.');
    }
    return true;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!check()) return;
    if (step < steps.length - 1) return go(step + 1);
    // Antispam: campo trampa y tiempo mínimo llenando el formulario
    if (val('sitio') || Date.now() - openedAt < 4000) return done();
    next.disabled = true; next.textContent = 'Enviando…';
    const body = {
      negocio: val('negocio'), rubro: radio('rubro'), ciudad: val('ciudad') || null,
      web: val('web') || null, instagram: val('instagram') || null, otras_redes: val('otras_redes') || null, ficha_google: radio('ficha_google') || null,
      objetivos: [...form.querySelectorAll<HTMLInputElement>('input[name="objetivos"]:checked')].map((i) => i.value),
      quien_maneja: radio('quien_maneja') || null, problema: val('problema') || null,
      nombre: val('nombre'), whatsapp: val('whatsapp') || null, email: val('email') || null, acepta_datos: true,
      pagina: location.pathname.slice(0, 200),
    };
    try {
      const r = await fetch(`${SB_URL}/rest/v1/diagnosticos`, { method: 'POST', headers: { apikey: SB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(body) });
      if (!r.ok) throw new Error(String(r.status));
      done();
      // Medición (solo si la persona aceptó cookies: gtag existe)
      const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      const s = document.querySelector<HTMLScriptElement>('script[data-aw]');
      g?.('event', 'diagnostico_enviado', { rubro: body.rubro, page_path: location.pathname });
      if (s?.dataset.aw && s.dataset.awLabel) g?.('event', 'conversion', { send_to: `${s.dataset.aw}/${s.dataset.awLabel}`, value: 1.0, currency: 'COP' });
    } catch {
      next.disabled = false; next.textContent = 'Enviar y recibir mi diagnóstico';
      fail('No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo, o escríbenos por WhatsApp.');
    }
  });
  back.addEventListener('click', () => go(Math.max(0, step - 1)));

  const done = () => {
    store.set(DONE_KEY, '1');
    steps.forEach((s) => (s.hidden = true));
    form.querySelector<HTMLElement>('[data-dg-foot]')!.hidden = true;
    form.querySelector<HTMLElement>('.dg-head')!.hidden = true;
    err.hidden = true;
    form.querySelector('[data-dg-name]')!.textContent = val('nombre').split(' ')[0] || 'gracias';
    form.querySelector('[data-dg-via]')!.textContent = val('whatsapp') ? (val('email') ? 'WhatsApp o correo' : 'WhatsApp') : 'correo';
    const ok = form.querySelector<HTMLElement>('[data-dg-done]')!;
    ok.hidden = false; ok.focus({ preventScroll: true });
    if (!reduce) gsap.fromTo(ok.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.07 });
    if (teaser) teaser.hidden = true;
    if (pill) pill.hidden = true;
  };

  // ── Abrir y cerrar
  const panel = form;
  const close = () => {
    if (!d.open) return;
    const end = () => { d.close(); d.classList.remove('is-open'); gsap.set(panel, { clearProps: 'all' }); document.documentElement.style.overflow = ''; };
    d.classList.remove('is-open');
    if (reduce) return end();
    gsap.to(panel, { opacity: 0, y: 30, scale: 0.97, duration: 0.3, ease: 'power2.in', onComplete: end });
  };
  d.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  d.addEventListener('click', (e) => { if (e.target === d) close(); });
  d.querySelectorAll('[data-dg-close]').forEach((b) => b.addEventListener('click', close));

  const open = () => {
    if (d.open) return;
    openedAt = Date.now();
    if (teaser && !teaser.hidden) { teaser.classList.remove('is-in'); teaser.hidden = true; showPill(); }
    d.showModal();
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => d.classList.add('is-open'));
    if (form.querySelector<HTMLElement>('[data-dg-done]')!.hidden) go(step);
    if (!reduce) gsap.fromTo(panel, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'expo.out', clearProps: 'transform,opacity' });
  };
  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest('[data-diag-open]');
    if (!t) return;
    e.preventDefault();
    open();
  });
  if (location.hash === '#diagnostico') setTimeout(open, 500);
}
