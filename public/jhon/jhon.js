// Portafolio de Jhon Vega: idioma, tema, banner, palabra escrita y pestañas.
(function () {
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- idioma ----
  const WORDS = {
    es: ['hace SEO.', 'diseña.', 'hace webs.', 'hace pauta.', 'automatiza.'],
    en: ['does SEO.', 'designs.', 'builds sites.', 'runs ads.', 'automates.'],
  };
  let lang = store.get('jv-lang') || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
  function applyLang() {
    root.lang = lang;
    document.querySelectorAll('[data-es]').forEach((el) => { el.textContent = el.dataset[lang]; });
    document.querySelectorAll('[data-es-html]').forEach((el) => { el.innerHTML = el.getAttribute('data-' + lang + '-html'); });
    document.getElementById('lang').textContent = lang === 'es' ? 'EN' : 'ES';
    wordIdx = 0; showWord(true);
  }
  document.getElementById('lang').addEventListener('click', () => { lang = lang === 'es' ? 'en' : 'es'; store.set('jv-lang', lang); applyLang(); });

  // ---- tema ----
  const themeBtn = document.getElementById('theme');
  function applyTheme(t) {
    root.dataset.theme = t;
    const label = themeBtn.querySelector('[data-es]');
    label.dataset.es = t === 'dark' ? 'claro' : 'oscuro';
    label.dataset.en = t === 'dark' ? 'light' : 'dark';
    label.textContent = label.dataset[lang];
  }
  applyTheme(store.get('jv-theme') || 'dark');
  themeBtn.addEventListener('click', () => { const t = root.dataset.theme === 'dark' ? 'light' : 'dark'; store.set('jv-theme', t); applyTheme(t); });

  // ---- palabra que se escribe ----
  const word = document.getElementById('word');
  let wordIdx = 0, timer = null;
  function showWord(now) {
    clearTimeout(timer);
    const list = WORDS[lang];
    word.textContent = list[wordIdx % list.length];
    if (reduced) return;
    word.classList.remove('erase', 'write'); void word.offsetWidth; word.classList.add('write');
    timer = setTimeout(() => {
      word.classList.remove('write'); word.classList.add('erase');
      timer = setTimeout(() => { wordIdx++; showWord(); }, 460);
    }, now ? 2600 : 2400);
  }

  // ---- banner ----
  const frames = [...document.querySelectorAll('#frames .frame')];
  let f = 0;
  if (!reduced && frames.length > 1) setInterval(() => { frames[f].classList.remove('on'); f = (f + 1) % frames.length; frames[f].classList.add('on'); }, 4200);

  // ---- pestañas ----
  const tabs = [...document.querySelectorAll('.tabs [role="tab"]')];
  tabs.forEach((t) => t.addEventListener('click', () => {
    tabs.forEach((x) => x.setAttribute('aria-selected', String(x === t)));
    document.querySelectorAll('.panel').forEach((p) => { p.hidden = p.id !== t.dataset.tab; });
  }));

  applyLang();
})();
