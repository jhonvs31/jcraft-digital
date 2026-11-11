// Test «¿Qué necesita tu negocio?»: 7 preguntas, puntaje por área y recomendación de plan con precios reales de Servicios.
import type gsapType from 'gsap';

type Area = 'redes' | 'web' | 'pauta' | 'marca' | 'estrategia';
type Opt = { e: string; t: string; s: Partial<Record<Area, number>>; why?: Partial<Record<Area, string>>; tag?: string; tier?: number };
type Q = { k: string; t: string; h?: string; o: Opt[] };
type Plan = { name: string; cop: number; price: number; items: string[]; from: boolean; unit: string };

const AREAS: Record<Area, { label: string; emoji: string; title: string; pitch: string }> = {
  redes: { label: 'Redes sociales', emoji: '📱', title: 'Redes sociales con estrategia', pitch: 'Tu negocio necesita presencia constante: contenido que la gente quiera ver y una razón para escribirte.' },
  web: { label: 'Página web', emoji: '🌐', title: 'Una web que trabaje por ti', pitch: 'Te falta una base propia: un lugar claro donde Google, ChatGPT y tus clientes encuentren lo que ofreces.' },
  pauta: { label: 'Pauta digital', emoji: '📣', title: 'Pauta para vender más', pitch: 'Ya tienes con qué mostrarte: ahora toca llevarlo a más personas, con anuncios bien medidos.' },
  marca: { label: 'Marca', emoji: '🎨', title: 'Una marca que se vea profesional', pitch: 'Antes de invertir en publicidad, tu negocio necesita verse sólido y reconocible en todas partes.' },
  estrategia: { label: 'Estrategia', emoji: '🧭', title: 'Primero, un plan claro', pitch: 'Antes de gastar, conviene ordenar: saber dónde estás, qué hace tu competencia y qué paso dar primero.' },
};

const QS: Q[] = [
  { k: 'Tu negocio', t: '¿Qué tipo de negocio tienes?', o: [
    { e: '🛍️', t: 'Vendo productos', s: { web: 1, pauta: 1 }, tag: 'tienda' },
    { e: '💼', t: 'Ofrezco servicios', s: { web: 1, redes: 1 } },
    { e: '🍽️', t: 'Restaurante, café o comida', s: { redes: 2, pauta: 1 } },
    { e: '📍', t: 'Negocio local de barrio', s: { redes: 1, pauta: 1 } },
    { e: '🌱', t: 'Estoy empezando', s: { marca: 2, estrategia: 1 }, why: { marca: 'Estás empezando: es el mejor momento para definir cómo se ve tu marca.' } },
  ] },
  { k: 'Tu meta', t: '¿Qué quieres lograr en los próximos 3 meses?', h: 'Elige la más importante.', o: [
    { e: '💸', t: 'Vender más', s: { pauta: 3, web: 1 }, why: { pauta: 'Tu meta es vender más, y la pauta es lo que más rápido lleva tu oferta a nuevos clientes.' } },
    { e: '👀', t: 'Que más gente me conozca', s: { redes: 3, pauta: 1 }, why: { redes: 'Quieres que más gente te conozca, y eso se construye con contenido constante en redes.' } },
    { e: '🔎', t: 'Que me encuentren en Google', s: { web: 3 }, why: { web: 'Quieres que te encuentren en Google, y para eso necesitas una web clara y bien hecha.' } },
    { e: '✨', t: 'Verme más profesional', s: { marca: 3, web: 1 }, why: { marca: 'Quieres verte más profesional, y eso empieza por una identidad visual coherente.' } },
    { e: '🧩', t: 'Ordenar mi marketing', s: { estrategia: 3 }, why: { estrategia: 'Quieres ordenar tu marketing: un plan te dice qué hacer primero y qué dejar para después.' } },
  ] },
  { k: 'Tu web', t: '¿Tienes página web hoy?', o: [
    { e: '🚫', t: 'No tengo', s: { web: 3 }, why: { web: 'Hoy no tienes página web, y sin ella dependes solo de las redes.' } },
    { e: '🕸️', t: 'Sí, pero está vieja o no me trae clientes', s: { web: 2 }, why: { web: 'Tu web actual no te está trayendo clientes.' } },
    { e: '✅', t: 'Sí, y funciona bien', s: { web: -2, pauta: 1 } },
  ] },
  { k: 'Tus redes', t: '¿Cómo están tus redes sociales?', o: [
    { e: '😶', t: 'Casi no publico', s: { redes: 3 }, why: { redes: 'Casi no publicas, y un perfil quieto hace que la gente dude.' } },
    { e: '🎲', t: 'Publico cuando puedo', s: { redes: 2 }, why: { redes: 'Publicas cuando puedes: con un calendario fijo, tus redes trabajan aunque estés ocupado.' } },
    { e: '📉', t: 'Publico seguido, pero no crece', s: { redes: 1, pauta: 2, estrategia: 1 }, why: { pauta: 'Publicas seguido pero no creces: la pauta lleva tu contenido a gente nueva.', estrategia: 'Publicas seguido pero no creces: falta revisar qué funciona y qué no.' } },
    { e: '🚀', t: 'Están al día y funcionan', s: { redes: -2, pauta: 2 }, why: { pauta: 'Tus redes ya funcionan: es buen momento para darles alcance con anuncios.' } },
  ] },
  { k: 'Tu marca', t: '¿Tu marca tiene logo, colores y tipografías definidos?', o: [
    { e: '🤷', t: 'No tengo logo', s: { marca: 3 }, tag: 'sinlogo', why: { marca: 'Aún no tienes logo: es lo primero que la gente ve de tu negocio.' } },
    { e: '🖍️', t: 'Tengo logo, pero nada más', s: { marca: 1 }, why: { marca: 'Tienes logo, pero sin colores ni estilo definidos cada pieza se ve distinta.' } },
    { e: '🎨', t: 'Sí, todo está definido', s: { marca: -2 } },
  ] },
  { k: 'Tus anuncios', t: '¿Has pagado anuncios en Instagram, Facebook o Google?', o: [
    { e: '🙅', t: 'Nunca', s: { pauta: 1 } },
    { e: '😕', t: 'Probé y no me fue bien', s: { pauta: 2, estrategia: 1 }, why: { pauta: 'Probaste anuncios y no te fue bien: casi siempre es la segmentación o el mensaje, y eso se corrige.' } },
    { e: '📊', t: 'Sí, invierto seguido', s: { pauta: 2 }, why: { pauta: 'Ya inviertes en anuncios: con una gestión profesional cada peso rinde más.' } },
    { e: '🤔', t: 'No sé si me conviene', s: { estrategia: 2 }, why: { estrategia: 'No sabes si la pauta te conviene: un diagnóstico te lo dice antes de gastar.' } },
  ] },
  { k: 'Tu presupuesto', t: '¿Cuánto puedes invertir al mes en marketing?', h: 'Sin contar lo que pagues en anuncios.', o: [
    { e: '🪙', t: 'Menos de $150.000', s: {}, tier: 0 },
    { e: '💵', t: '$150.000 – $300.000', s: {}, tier: 1 },
    { e: '💰', t: '$300.000 – $600.000', s: {}, tier: 2 },
    { e: '🏦', t: 'Más de $600.000', s: {}, tier: 3 },
    { e: '❔', t: 'No lo tengo claro', s: { estrategia: 2 }, tier: -1, why: { estrategia: 'Aún no tienes claro cuánto invertir: un plan te ayuda a decidirlo con números.' } },
  ] },
];

const ORDER: Area[] = ['redes', 'web', 'pauta', 'marca', 'estrategia'];
const fmt = (n: number) => '$' + n.toLocaleString('es-CO');
const nice = (n: string) => (['Básico', 'Plus', 'Pro'].includes(n) ? `Redes ${n}` : n);

export function initQuiz(gsap: typeof gsapType, reduce: boolean, root: HTMLElement, scroller?: HTMLElement) {
  const raw = root.querySelector('[data-quiz-json]');
  if (!raw) return;
  const D = JSON.parse(raw.textContent || '{}') as { wa: string; servicios: string; plans: Record<string, Plan> };
  const $ = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const screens = { intro: $('[data-step="intro"]'), q: $('[data-step="q"]'), loading: $('[data-step="loading"]'), result: $('[data-step="result"]') };
  const answers: (number | undefined)[] = [];
  let i = 0;
  let busy = false;

  const show = (name: keyof typeof screens) => {
    const cur = Object.values(screens).find((s) => !s.hidden);
    const next = screens[name];
    if (cur === next) return Promise.resolve();
    return new Promise<void>((res) => {
      const go = () => { if (cur) cur.hidden = true; next.hidden = false; (scroller ?? window).scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        if (reduce) return res(); gsap.fromTo(next, { opacity: 0, y: 40, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out', clearProps: 'filter', onComplete: res }); };
      if (!cur || reduce) return go();
      gsap.to(cur, { opacity: 0, y: -30, filter: 'blur(8px)', duration: 0.35, ease: 'power2.in', onComplete: () => { gsap.set(cur, { clearProps: 'all' }); go(); } });
    });
  };

  // ── Pregunta
  const box = $('[data-qbox]');
  const optsEl = $('[data-options]');
  const render = (dir = 1) => {
    const q = QS[i];
    const sc = scroller ?? document.scrollingElement;
    if (sc && sc.scrollTop > 0) sc.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    $('[data-qnum]').textContent = String(i + 1);
    $('[data-qtotal]').textContent = String(QS.length);
    $('[data-qkicker]').textContent = q.k;
    $('[data-qtitle]').textContent = q.t;
    $('[data-qhint]').textContent = q.h ?? '';
    $<HTMLButtonElement>('[data-back]').style.visibility = i ? 'visible' : 'hidden';
    root.style.setProperty('--qz-hue', String(i * 26));
    gsap.to($('[data-bar]'), { width: `${(i / QS.length) * 100}%`, duration: reduce ? 0 : 0.6, ease: 'expo.out' });
    optsEl.innerHTML = '';
    q.o.forEach((o, n) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'qz-opt'; b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(answers[i] === n));
      b.innerHTML = `<span class="qz-emo" aria-hidden="true">${o.e}</span><span class="qz-txt">${o.t}</span><kbd aria-hidden="true">${n + 1}</kbd>`;
      b.addEventListener('click', () => choose(n, b));
      optsEl.appendChild(b);
    });
    if (!reduce) {
      gsap.fromTo(box.querySelectorAll('[data-qkicker],[data-qtitle],[data-qhint]'), { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: 0.55, ease: 'expo.out', stagger: 0.05 });
      gsap.fromTo(optsEl.children, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'expo.out', stagger: 0.05, delay: 0.1, clearProps: 'transform,opacity' });
    }
    $<HTMLElement>('[data-qtitle]').focus({ preventScroll: true });
  };

  const choose = (n: number, el: HTMLElement) => {
    if (busy) return;
    busy = true;
    answers[i] = n;
    optsEl.querySelectorAll('.qz-opt').forEach((b, k) => { b.setAttribute('aria-checked', String(k === n)); b.classList.toggle('is-dim', k !== n); });
    el.classList.add('is-picked');
    const next = () => {
      busy = false;
      if (i < QS.length - 1) {
        i++;
        if (reduce) return render();
        gsap.to(box, { opacity: 0, x: -50, duration: 0.25, ease: 'power2.in', onComplete: () => { gsap.set(box, { clearProps: 'all' }); render(1); } });
      } else finish();
    };
    reduce ? next() : setTimeout(next, 420);
  };

  $('[data-back]').addEventListener('click', () => {
    if (busy || i === 0) return;
    i--;
    if (reduce) return render(-1);
    gsap.to(box, { opacity: 0, x: 50, duration: 0.25, ease: 'power2.in', onComplete: () => { gsap.set(box, { clearProps: 'all' }); render(-1); } });
  });
  document.addEventListener('keydown', (e) => {
    if (screens.q.hidden || !root.getClientRects().length || e.metaKey || e.ctrlKey || e.altKey) return;
    const n = Number(e.key) - 1;
    const btn = optsEl.children[n] as HTMLElement | undefined;
    if (btn) { e.preventDefault(); btn.click(); }
  });

  $('[data-start]').addEventListener('click', async () => { i = 0; answers.length = 0; await show('q'); render(); });

  // ── Resultado
  const score = () => {
    const s: Record<Area, number> = { redes: 0, web: 0, pauta: 0, marca: 0, estrategia: 0 };
    QS.forEach((q, k) => { const o = q.o[answers[k] ?? 0]; for (const [a, v] of Object.entries(o.s)) s[a as Area] += v as number; });
    // Sin web y con redes casi quietas, los anuncios no tienen a dónde llevar a la gente: primero la base.
    if (answers[2] === 0 && (answers[3] ?? 0) <= 1) s.pauta -= 3;
    return s;
  };
  const opt = (k: number) => QS[k].o[answers[k] ?? 0];

  const planFor = (area: Area, s: Record<Area, number>): string => {
    const tier = opt(6).tier ?? 0;
    const tienda = opt(0).tag === 'tienda' && answers[1] === 0;
    switch (area) {
      case 'redes': return s.pauta >= s.redes - 1 && tier >= 1 ? 'Pack Redes + Pauta' : tier >= 2 ? 'Pro' : tier === 1 ? 'Plus' : 'Básico';
      case 'web': return tienda ? 'Tienda online' : 'Sitio web';
      case 'pauta': return s.redes >= s.pauta - 1 && tier === 1 ? 'Pack Redes + Pauta' : tier >= 2 ? 'Pauta Plus' : 'Pauta Básica';
      case 'marca': return opt(4).tag === 'sinlogo' && tier <= 0 ? 'Logo' : 'Identidad de marca';
      default: return tier >= 2 ? 'Plan estratégico' : 'Diagnóstico digital';
    }
  };

  const finish = async () => {
    gsap.to($('[data-bar]'), { width: '100%', duration: 0.5, ease: 'expo.out' });
    await show('loading');
    const msgs = ['Analizando tus respuestas…', 'Comparando planes y precios…', 'Armando tu recomendación…'];
    const m = $('[data-loadmsg]');
    for (let k = 0; k < msgs.length; k++) { m.textContent = msgs[k]; if (!reduce) await new Promise((r) => setTimeout(r, 700)); }
    const s = score();
    const ranked = [...ORDER].sort((a, b) => s[b] - s[a]);
    const top = ranked[0];
    const second = ranked.find((a) => a !== top && planFor(a, s) !== planFor(top, s))!;
    const plan = D.plans[planFor(top, s)];
    const plan2 = D.plans[planFor(second, s)];
    const max = Math.max(1, s[top]);
    const why = QS.map((_, k) => opt(k).why?.[top]).filter(Boolean).slice(0, 3) as string[];
    if (!why.length) why.push(AREAS[top].pitch);
    const price = (p: Plan) => (p.cop === 0 ? 'Gratis' : `${p.from ? 'Desde ' : ''}${fmt(p.cop)}`);
    const unit = (p: Plan, area: Area) => (p.cop === 0 ? 'sin compromiso' : p.unit || (area === 'redes' || p.name.startsWith('Pauta') || p.name.startsWith('Pack') ? '/mes' : 'pago único'));
    const msg = `¡Hola JCraft! Hice el test en la web y me recomendó: ${nice(plan.name)} (${AREAS[top].label}). Mi negocio: ${opt(0).t.toLowerCase()}. Mi meta: ${opt(1).t.toLowerCase()}. Quiero más información.`;
    const waUrl = `https://wa.me/${D.wa}?text=${encodeURIComponent(msg)}`;

    $('[data-result]').innerHTML = `
      <div class="qz-res">
        <div class="qz-res-main">
          <p class="eyebrow" data-r>Tu resultado</p>
          <p class="mt-6 text-lg font-semibold text-white/60" data-r>${AREAS[top].emoji} Tu negocio necesita primero</p>
          <h2 class="mt-2 text-5xl leading-[.95] sm:text-7xl" data-r>${AREAS[top].title.replace(/(\S+)$/, '<em class="k">$1</em>')}</h2>
          <p class="mt-6 max-w-2xl text-lg text-white/75" data-r>${AREAS[top].pitch}</p>
          <ul class="mt-8 space-y-3" data-r>${why.map((w) => `<li class="flex gap-3 text-white/85"><span class="qz-tick" aria-hidden="true">✓</span><span>${w}</span></li>`).join('')}</ul>
        </div>
        <aside class="qz-plan" data-r>
          <p class="text-xs font-extrabold tracking-[.18em] text-navy/55 uppercase">Plan recomendado</p>
          <h3 class="mt-2 font-display text-4xl font-black text-navy">${nice(plan.name)}</h3>
          <p class="mt-4 flex flex-wrap items-baseline gap-x-2 text-navy"><span class="font-display text-5xl font-black tracking-tight tabular-nums" data-count="${plan.cop}" data-pre="${plan.from ? 'Desde ' : ''}">${price(plan)}</span><span class="text-navy/55">${unit(plan, top)}</span></p>
          ${top === 'pauta' || plan.name.startsWith('Pack') ? '<p class="mt-2 text-sm text-navy/55">La inversión en anuncios se paga aparte a Meta o Google.</p>' : ''}
          <ul class="mt-6 space-y-2 text-navy/80">${plan.items.slice(0, 6).map((t) => `<li class="flex gap-2"><span class="text-cyan" aria-hidden="true">●</span>${t}</li>`).join('')}</ul>
          <a class="btn btn-primary mt-8 w-full justify-center" href="${waUrl}" target="_blank" rel="noopener">Quiero este plan →</a>
          <a class="mt-3 block text-center text-sm font-bold text-blue hover:underline" href="${D.servicios}">Ver todos los planes y precios</a>
        </aside>
      </div>
      <div class="qz-res-grid mt-14">
        <div class="glass p-8" data-r>
          <p class="text-xs font-extrabold tracking-[.18em] text-cyan uppercase">Qué tanto lo necesitas</p>
          <p class="mt-1 text-sm text-white/50">Según tus respuestas</p>
          <div class="mt-6 space-y-4">${[...ORDER].sort((a, b) => s[b] - s[a]).map((a) => {
            const pct = Math.max(6, Math.round((Math.max(0, s[a]) / max) * 100));
            return `<div><div class="flex justify-between text-sm font-bold"><span>${AREAS[a].emoji} ${AREAS[a].label}</span><span class="text-white/50">${a === top ? 'Prioridad' : ''}</span></div><div class="qz-meter mt-2"><span data-w="${pct}" class="${a === top ? 'is-top' : ''}"></span></div></div>`;
          }).join('')}</div>
        </div>
        <div class="glass p-8" data-r>
          <p class="text-xs font-extrabold tracking-[.18em] text-cyan uppercase">Tu siguiente paso</p>
          <h3 class="mt-3 text-3xl">${AREAS[second].emoji} ${nice(plan2.name)}</h3>
          <p class="mt-2 text-white/65">Cuando tengas lo primero en marcha, sigue con ${AREAS[second].label.toLowerCase()}.</p>
          <p class="mt-4 font-display text-3xl font-black">${price(plan2)} <span class="text-base font-semibold text-white/55">${unit(plan2, second)}</span></p>
          <div class="mt-8 rounded-2xl border border-cyan/40 bg-cyan/10 p-5">
            <p class="font-bold">🎁 ¿Prefieres que lo revisemos contigo?</p>
            <p class="mt-1 text-sm text-white/70">El diagnóstico digital es gratis: revisamos tus redes, tu web y tu ficha de Google.</p>
          </div>
        </div>
      </div>
      <div class="mt-12 flex flex-wrap items-center gap-4" data-r>
        <a class="btn btn-primary" href="${waUrl}" target="_blank" rel="noopener">Hablar con JCraft por WhatsApp</a>
        <button type="button" class="btn btn-ghost" data-restart>Volver a hacer el test ↺</button>
      </div>`;

    await show('result');
    const R = $('[data-result]');
    R.querySelector('[data-restart]')?.addEventListener('click', async () => { i = 0; answers.length = 0; await show('q'); render(); });
    const meters = [...R.querySelectorAll<HTMLElement>('[data-w]')];
    if (reduce) { meters.forEach((el) => (el.style.width = el.dataset.w + '%')); return; }
    gsap.fromTo(R.querySelectorAll('[data-r]'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.08, clearProps: 'transform,opacity' });
    meters.forEach((el, k) => gsap.to(el, { width: el.dataset.w + '%', duration: 1.2, ease: 'expo.out', delay: 0.5 + k * 0.08 }));
    const c = R.querySelector<HTMLElement>('[data-count]');
    if (c && plan.cop > 0) { const o = { v: 0 }; gsap.to(o, { v: plan.cop, duration: 1.4, ease: 'expo.out', delay: 0.3, onUpdate: () => { c.textContent = c.dataset.pre + fmt(Math.round(o.v / 1000) * 1000); } }); }
    confetti(root.querySelector('canvas')!);
  };
}

// Lluvia de confeti con los colores de la marca
function confetti(cv: HTMLCanvasElement) {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);
  const colors = ['#00BCD4', '#6FE7F5', '#FFFFFF', '#1E5BFF', '#0D47A1'];
  const parts = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 14 - 4, r: Math.random() * 6 + 4,
    c: colors[(Math.random() * colors.length) | 0], a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.3, life: 0,
  }));
  const tick = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    let alive = 0;
    for (const p of parts) {
      p.life++; p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
      if (p.y > innerHeight + 20) continue;
      alive++;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.globalAlpha = Math.max(0, 1 - p.life / 160);
      ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore();
    }
    if (alive) requestAnimationFrame(tick); else ctx.clearRect(0, 0, innerWidth, innerHeight);
  };
  tick();
}

// ── Ventana emergente: el test se abre encima de la página actual, sin navegar.
let ready = false;
export function openQuizModal(gsap: typeof gsapType, reduce: boolean) {
  const d = document.querySelector<HTMLDialogElement>('[data-quiz-dialog]');
  if (!d) { location.href = '/test'; return; }
  const panel = d.querySelector<HTMLElement>('[data-quiz-root]')!;
  if (!ready) {
    ready = true;
    initQuiz(gsap, reduce, panel, panel);
    const close = () => {
      if (!d.open) return;
      const done = () => { d.close(); d.classList.remove('is-open'); gsap.set(panel, { clearProps: 'all' }); document.documentElement.style.overflow = ''; };
      d.classList.remove('is-open');
      if (reduce) return done();
      gsap.to(panel, { opacity: 0, scale: 0.94, y: 30, duration: 0.35, ease: 'power3.in', onComplete: done });
    };
    d.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
    d.addEventListener('click', (e) => { if (e.target === d) close(); });
    panel.querySelector('[data-quiz-close]')?.addEventListener('click', close);
  }
  if (d.open) return;
  d.showModal();
  document.documentElement.style.overflow = 'hidden';
  requestAnimationFrame(() => d.classList.add('is-open'));
  if (!reduce) gsap.fromTo(panel, { opacity: 0, scale: 0.94, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'expo.out', clearProps: 'transform,opacity' });
  window.dispatchEvent(new CustomEvent('quiz:open'));
}
