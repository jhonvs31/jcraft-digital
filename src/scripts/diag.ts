// Diagnóstico digital gratis: aviso flotante discreto + formulario de 4 pasos con resultados al instante.
// La función «diagnostico» de Supabase revisa la web del negocio y calcula el puntaje. El informe NO se guarda:
// se muestra mientras la ventana está abierta y se borra al cerrarla (en la base solo queda el contacto).
import type gsapType from 'gsap';

const FN_URL = 'https://jjgepsfiajhommbruzbn.supabase.co/functions/v1/diagnostico';
const WA = '573008113078';
const HIDE_KEY = 'jc-diag-oculto';
const DONE_KEY = 'jc-diag-hecho'; // solo marca que ya lo hizo, para no volver a mostrarle el aviso grande
const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
  del: (k: string) => { try { localStorage.removeItem(k); } catch { /* idem */ } },
};
type Res = {
  puntaje: number; nivel: string; prioridad: string;
  areas: { id: string; pct: number; puntos: number; max: number }[];
  bien: string[]; mejoras: { area: string; texto: string }[];
  web: null | { revisada: boolean; ms?: number; https?: boolean; movil?: boolean; whatsapp?: boolean; motivo?: string };
  ig?: null | { revisada: boolean; motivo?: string; usuario?: string; seguidores?: number | null; publicaciones?: number | null; ult30?: number; diasUltimo?: number | null; reels?: number; revisadas?: number; promedio?: number | null; bio?: boolean; enlace?: boolean };
};
type Saved = { r: Res; nombre: string; negocio: string };
const AREA: Record<string, string> = { web: '🌐 Página web', redes: '📱 Redes sociales', google: '📍 Google', marca: '🎨 Marca' };
const esc = (t: string) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function initDiag(gsap: typeof gsapType, reduce: boolean) {
  const d = document.querySelector<HTMLDialogElement>('[data-dg-dialog]');
  if (!d) return;
  const form = d.querySelector<HTMLFormElement>('[data-dg-form]')!;
  const head = form.querySelector<HTMLElement>('.dg-head')!;
  const foot = form.querySelector<HTMLElement>('[data-dg-foot]')!;
  const steps = [...form.querySelectorAll<HTMLElement>('[data-dg-step]')];
  const dots = [...form.querySelectorAll<HTMLElement>('.dg-steps span')];
  const next = form.querySelector<HTMLButtonElement>('[data-dg-next]')!;
  const back = form.querySelector<HTMLButtonElement>('[data-dg-back]')!;
  const err = form.querySelector<HTMLElement>('[data-dg-error]')!;
  const out = form.querySelector<HTMLElement>('[data-dg-done]')!;
  const teaser = document.querySelector<HTMLElement>('[data-dg-teaser]');
  const pill = document.querySelector<HTMLElement>('[data-dg-pill]');
  let step = 0;
  let openedAt = 0;
  let current: Saved | null = null; // el informe vive solo en memoria mientras la ventana está abierta

  // ── Aviso flotante: tarjeta blanca a los 9 s o al bajar un 35 %; si la cierran (o ya hizo el diagnóstico) queda la cápsula
  const showPill = () => {
    if (!pill) return;
    pill.hidden = false; requestAnimationFrame(() => pill.classList.add('is-in'));
  };
  const showTeaser = () => {
    if (!teaser || d.open || !teaser.hidden) return;
    if (store.get(DONE_KEY) || (store.get(HIDE_KEY) && Date.now() - Number(store.get(HIDE_KEY)) < 3 * 864e5)) return showPill();
    teaser.hidden = false; requestAnimationFrame(() => teaser.classList.add('is-in'));
  };
  const dismiss = () => { store.set(HIDE_KEY, String(Date.now())); teaser?.classList.remove('is-in'); setTimeout(() => { if (teaser) teaser.hidden = true; showPill(); }, 350); };
  teaser?.querySelector('[data-dg-dismiss]')?.addEventListener('click', dismiss);
  if (store.get(DONE_KEY)) showPill();
  else {
    const t = window.setTimeout(showTeaser, 9000);
    const onScroll = () => { const h = document.documentElement; if (h.scrollTop / Math.max(1, h.scrollHeight - innerHeight) > 0.35) { clearTimeout(t); showTeaser(); removeEventListener('scroll', onScroll); } };
    addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Pasos del formulario
  const setMode = (results: boolean) => {
    head.hidden = results; foot.hidden = results; out.hidden = !results;
    form.classList.toggle('is-result', results);
    if (results) steps.forEach((s) => (s.hidden = true));
  };
  const go = (n: number) => {
    const changed = n !== step;
    step = n;
    setMode(false);
    steps.forEach((s, k) => (s.hidden = k !== n));
    dots.forEach((s, k) => s.classList.toggle('is-on', k <= n));
    form.querySelector('[data-dg-n]')!.textContent = String(n + 1);
    back.hidden = n === 0;
    next.disabled = false;
    next.textContent = n === steps.length - 1 ? 'Ver mis resultados →' : 'Siguiente →';
    err.hidden = true;
    form.scrollTo({ top: 0 });
    if (!reduce && changed) gsap.fromTo(steps[n], { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.4, ease: 'expo.out', clearProps: 'all' });
  };
  const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | null)?.value.trim() ?? '';
  const radio = (n: string) => form.querySelector<HTMLInputElement>(`input[name="${n}"]:checked`)?.value ?? '';
  const fail = (m: string) => { err.textContent = m; err.hidden = false; if (!reduce) gsap.fromTo(err, { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, .3)' }); return false; };
  const check = () => {
    if (step === 0) { if (val('negocio').length < 2) return fail('Escribe el nombre de tu negocio.'); if (!radio('rubro')) return fail('Elige a qué se dedica tu negocio.'); }
    if (step === 1 && !val('web') && !val('instagram') && !val('otras_redes')) return fail('Déjanos tu web o al menos una red para poder revisarla.');
    if (step === 2) {
      if (!form.querySelector('input[name="objetivos"]:checked')) return fail('Elige al menos un objetivo.');
      if (!radio('frecuencia') || !radio('quien_maneja') || !radio('marca')) return fail('Responde las tres preguntas para calcular tu puntaje.');
    }
    if (step === 3) {
      if (val('nombre').length < 2) return fail('Escribe tu nombre.');
      const tel = val('whatsapp').replace(/[^\d+]/g, ''); const mail = val('email');
      if (!tel && !mail) return fail('Déjanos tu WhatsApp o tu correo para ver tus resultados.');
      if (tel && tel.replace(/\D/g, '').length < 7) return fail('Revisa el número de WhatsApp.');
      if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return fail('Revisa el correo.');
      if (!(form.elements.namedItem('acepta_datos') as HTMLInputElement).checked) return fail('Para ver tus resultados, acepta el uso de tus datos.');
    }
    return true;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!check()) return;
    if (step < steps.length - 1) return go(step + 1);
    if (val('sitio') || Date.now() - openedAt < 4000) return fail('Revisa tus datos e inténtalo de nuevo.'); // antispam
    next.disabled = true; next.textContent = 'Revisando tu web y tus redes…';
    const body = {
      negocio: val('negocio'), rubro: radio('rubro'), ciudad: val('ciudad'),
      web: val('web'), instagram: val('instagram'), otras_redes: val('otras_redes'), ficha_google: radio('ficha_google'),
      objetivos: [...form.querySelectorAll<HTMLInputElement>('input[name="objetivos"]:checked')].map((i) => i.value),
      frecuencia: radio('frecuencia'), quien_maneja: radio('quien_maneja'), marca: radio('marca'),
      nombre: val('nombre'), whatsapp: val('whatsapp'), email: val('email'), acepta_datos: true, pagina: location.pathname,
    };
    try {
      const r = await fetch(FN_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (r.status === 429) throw new Error('limite');
      if (!r.ok) throw new Error(String(r.status));
      const res = (await r.json()) as Res;
      current = { r: res, nombre: body.nombre.split(' ')[0], negocio: body.negocio };
      store.set(DONE_KEY, '1');
      show(current, true);
      const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      const tag = document.querySelector<HTMLScriptElement>('script[data-aw]');
      g?.('event', 'diagnostico_enviado', { rubro: body.rubro, puntaje: res.puntaje, page_path: location.pathname });
      if (tag?.dataset.aw && tag.dataset.awLabel) g?.('event', 'conversion', { send_to: `${tag.dataset.aw}/${tag.dataset.awLabel}`, value: 1.0, currency: 'COP' });
    } catch (x) {
      next.disabled = false; next.textContent = 'Ver mis resultados →';
      fail((x as Error).message === 'limite' ? 'Ya hiciste varios diagnósticos en la última hora. Inténtalo más tarde o escríbenos por WhatsApp.' : 'No pudimos calcular tu diagnóstico. Revisa tu conexión e inténtalo de nuevo, o escríbenos por WhatsApp.');
    }
  });
  back.addEventListener('click', () => go(Math.max(0, step - 1)));

  // ── Resultados
  const show = (s: Saved, animate: boolean) => {
    const { r } = s;
    setMode(true);
    teaser && (teaser.hidden = true);
    showPill();
    out.querySelector('[data-dg-name]')!.textContent = s.nombre || 'Listo';
    out.querySelector('[data-dg-biz]')!.textContent = s.negocio;
    out.querySelector('[data-dg-level]')!.textContent = `Nivel: ${r.nivel}`;
    out.querySelector('[data-dg-bars]')!.innerHTML = r.areas.map((a) => `<div class="dg-bar"><div class="dg-bar-l"><span>${AREA[a.id] ?? a.id}</span><b>${a.pct}%</b></div><div class="dg-bar-t"><span data-w="${a.pct}" class="${a.id === r.prioridad ? 'is-low' : ''}"></span></div></div>`).join('');
    out.querySelector('[data-dg-good]')!.innerHTML = (r.bien.length ? r.bien : ['Diste el primer paso: ya sabes dónde estás.']).map((t) => `<li>${esc(t)}</li>`).join('');
    out.querySelector('[data-dg-fix]')!.innerHTML = r.mejoras.map((m) => `<li><span class="dg-tag">${(AREA[m.area] ?? '').replace(/^\S+\s/, '')}</span>${esc(m.texto)}</li>`).join('') || '<li>¡Vas muy bien! En el diagnóstico completo te mostramos cómo dar el siguiente paso.</li>';
    const webBox = out.querySelector<HTMLElement>('[data-dg-web]')!;
    if (r.web?.revisada) {
      webBox.hidden = false;
      webBox.innerHTML = `<p class="dg-sub">🔍 Revisamos tu web</p><div class="dg-facts"><span>${r.web.https ? '✅' : '⚠️'} Segura (HTTPS)</span><span>${r.web.movil ? '✅' : '⚠️'} Lista para celular</span><span>${(r.web.ms ?? 9999) < 1500 ? '✅' : '⚠️'} Respondió en ${((r.web.ms ?? 0) / 1000).toFixed(1)} s</span><span>${r.web.whatsapp ? '✅' : '⚠️'} Botón de WhatsApp</span></div>`;
    } else if (r.web && !r.web.revisada) {
      webBox.hidden = false;
      webBox.innerHTML = '<p class="dg-sub">🔍 Tu web</p><p class="dg-note">No pudimos abrir tu página web para revisarla. Revisa que la dirección esté bien y que esté en línea.</p>';
    } else webBox.hidden = true;
    const igBox = out.querySelector<HTMLElement>('[data-dg-ig]')!;
    const ig = r.ig;
    const nf = (n: number | null | undefined) => (n == null ? '—' : n.toLocaleString('es-CO'));
    if (ig?.revisada) {
      igBox.hidden = false;
      const dias = ig.diasUltimo;
      const ult = dias == null ? 'Sin publicaciones' : `Última publicación: ${dias === 0 ? 'hoy' : dias === 1 ? 'ayer' : `hace ${dias} días`}`;
      igBox.innerHTML = `<p class="dg-sub">📸 Revisamos tu Instagram</p><p class="dg-note">@${esc(ig.usuario ?? '')} · ${nf(ig.seguidores)} seguidores · ${nf(ig.publicaciones)} publicaciones</p><div class="dg-facts"><span>${(ig.ult30 ?? 0) >= 8 ? '✅' : '⚠️'} ${ig.ult30 ?? 0} ${(ig.ult30 ?? 0) === 1 ? 'publicación' : 'publicaciones'} en 30 días</span><span>${dias != null && dias <= 7 ? '✅' : '⚠️'} ${ult}</span><span>${ig.bio ? '✅' : '⚠️'} Bio clara</span><span>${ig.enlace ? '✅' : '⚠️'} Enlace en la bio</span>${ig.revisadas ? `<span>🎬 ${ig.reels ?? 0} de ${ig.revisadas} recientes son video</span>` : ''}${ig.promedio != null ? `<span>💬 ${nf(ig.promedio)} interacciones por publicación</span>` : ''}</div>`;
    } else if (ig && ig.motivo === 'no_publica') {
      igBox.hidden = false;
      igBox.innerHTML = '<p class="dg-sub">📸 Tu Instagram</p><p class="dg-note">No pudimos ver tu cuenta: es personal o privada. Pásala a cuenta profesional (es gratis) y vuelve a hacer el diagnóstico.</p>';
    } else if (ig && ig.motivo === 'usuario') {
      igBox.hidden = false;
      igBox.innerHTML = '<p class="dg-sub">📸 Tu Instagram</p><p class="dg-note">No reconocimos el usuario de Instagram. Escríbelo así: @tunegocio.</p>';
    } else igBox.hidden = true;
    // Cierre: plan sugerido según el área más débil + regalo del diagnóstico completo al contratar
    const PLAN: Record<string, [string, string, string]> = {
      web: ['tu página web', 'Sitio web', 'clientes que te encuentran'],
      redes: ['tus redes sociales', 'Redes Plus', 'clientes que te escriben'],
      google: [r.web?.revisada ? 'tu presencia en Google' : 'tu página web', r.web?.revisada ? 'Redes Plus' : 'Sitio web', 'clientes que te encuentran'],
      marca: ['tu marca', 'Identidad de marca', 'una marca que inspire confianza'],
    };
    const [area, plan, goal] = PLAN[r.prioridad] ?? PLAN.redes;
    out.querySelector('[data-dg-area]')!.textContent = area;
    out.querySelector('[data-dg-plan]')!.textContent = plan;
    out.querySelector('[data-dg-goal]')!.textContent = goal;
    const msg = `¡Hola JCraft! Hice el diagnóstico digital gratis de ${s.negocio} en la web y saqué ${r.puntaje}/100. Quiero empezar con el plan ${plan} y recibir el diagnóstico completo con estudio de mercado.`;
    out.querySelector<HTMLAnchorElement>('[data-dg-wa]')!.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    form.scrollTo({ top: 0 });
    // Animaciones: el anillo y el número suben, las barras crecen
    const ring = out.querySelector<SVGCircleElement>('[data-dg-ring]')!;
    const C = 2 * Math.PI * 52;
    ring.style.strokeDasharray = String(C);
    ring.style.stroke = r.puntaje >= 75 ? '#16A34A' : r.puntaje >= 50 ? '#00BCD4' : r.puntaje >= 25 ? '#F59E0B' : '#EF4444';
    const n = out.querySelector<HTMLElement>('[data-dg-score]')!;
    const bars = [...out.querySelectorAll<HTMLElement>('[data-w]')];
    if (reduce || !animate) {
      ring.style.strokeDashoffset = String(C * (1 - r.puntaje / 100)); n.textContent = String(r.puntaje);
      bars.forEach((b) => (b.style.width = b.dataset.w + '%'));
    } else {
      ring.style.strokeDashoffset = String(C);
      const o = { v: 0 };
      gsap.to(o, { v: r.puntaje, duration: 1.6, ease: 'expo.out', delay: 0.2, onUpdate: () => { n.textContent = String(Math.round(o.v)); ring.style.strokeDashoffset = String(C * (1 - o.v / 100)); } });
      bars.forEach((b, k) => gsap.fromTo(b, { width: '0%' }, { width: b.dataset.w + '%', duration: 1.1, ease: 'expo.out', delay: 0.4 + k * 0.1 }));
      gsap.fromTo(out.querySelectorAll('.dg-cols > div, .dg-webinfo, .dg-cta'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.08, delay: 0.5, clearProps: 'transform,opacity' });
    }
    out.focus({ preventScroll: true });
  };
  const wipe = () => { current = null; form.reset(); out.querySelectorAll<HTMLElement>('[data-dg-web], [data-dg-ig]').forEach((b) => { b.innerHTML = ''; b.hidden = true; }); step = 0; go(0); };
  out.querySelector('[data-dg-again]')?.addEventListener('click', wipe);

  // ── Abrir y cerrar
  const close = () => {
    if (!d.open) return;
    // Al cerrar se borra el informe y todo lo que escribió (no se guarda en ningún lado)
    const end = () => { d.close(); d.classList.remove('is-open'); gsap.set(form, { clearProps: 'all' }); document.documentElement.style.overflow = ''; if (current) wipe(); };
    d.classList.remove('is-open');
    if (reduce) return end();
    gsap.to(form, { opacity: 0, y: 30, scale: 0.97, duration: 0.3, ease: 'power2.in', onComplete: end });
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
    go(step);
    if (!reduce) gsap.fromTo(form, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'expo.out', clearProps: 'transform,opacity' });
  };
  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest('[data-diag-open]');
    if (!t) return;
    e.preventDefault();
    open();
  });
  if (location.hash === '#diagnostico') setTimeout(open, 500);
}
