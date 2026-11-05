// Google Analytics 4 con aviso de cookies (JCraft Digital).
// - Analytics solo se carga si la persona acepta (se recuerda la elección en el navegador).
// - Mide clics a WhatsApp (whatsapp_click) y envíos del formulario de contacto (contacto_enviado).
// - No se incluye en el portal de clientes ni en las propuestas privadas (ver Base.astro).
// Va como archivo aparte porque la CSP de vercel.json no permite scripts en línea.
(function () {
  var me = document.currentScript;
  var ID = me && me.getAttribute('data-ga');
  if (!ID) return;
  var KEY = 'jc-cookies'; // 'si' | 'no'
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { localStorage.setItem(KEY, v); } catch (e) { /* sin almacenamiento */ } };
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  function load() {
    if (loaded) return; loaded = true;
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('js', new Date());
    gtag('config', ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
    document.head.appendChild(s);
  }
  var track = function (name, params) { if (loaded) gtag('event', name, params || {}); };

  // Conversiones
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i.test(href)) {
      track('whatsapp_click', { link_url: href.split('?')[0], link_text: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 80), page_path: location.pathname });
    }
  }, true);
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'contactForm') track('contacto_enviado', { form: 'contacto', page_path: location.pathname });
  }, true);

  // Aviso de cookies
  function banner() {
    if (document.getElementById('jc-cookies')) return;
    var box = document.createElement('div');
    box.id = 'jc-cookies';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', 'Aviso de cookies');
    box.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:90;max-width:560px;margin:0 auto;border-radius:20px;background:#061D47;color:#F3F2F2;border:1px solid rgba(255,255,255,.14);box-shadow:0 30px 60px -20px rgba(0,0,0,.6);padding:18px 20px;font:15px/1.5 "Archivo Variable",Archivo,system-ui,sans-serif;transform:translateY(24px);opacity:0;transition:transform .5s cubic-bezier(.16,1,.3,1),opacity .5s';
    box.innerHTML =
      '<p style="margin:0"><strong style="font-weight:800">Usamos cookies de medición</strong> para saber qué páginas te sirven y mejorar la web (Google Analytics). No usamos cookies de publicidad.</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:12px">' +
      '<button type="button" data-c="no" style="border-radius:9999px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#F3F2F2;padding:9px 16px;font-weight:700;cursor:pointer">Solo necesarias</button>' +
      '<button type="button" data-c="si" style="border-radius:9999px;border:0;background:#00BCD4;color:#0A2F6E;padding:9px 18px;font-weight:800;cursor:pointer">Aceptar</button></div>';
    document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.style.transform = 'none'; box.style.opacity = '1'; }); });
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-c]'); if (!b) return;
      var v = b.getAttribute('data-c'); set(v);
      if (v === 'si') load();
      box.style.opacity = '0'; box.style.transform = 'translateY(24px)';
      setTimeout(function () { box.remove(); }, 450);
    });
  }
  // Enlace «Preferencias de cookies» del pie de página
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
    if (!t) return; e.preventDefault();
    try { localStorage.removeItem(KEY); } catch (err) { /* sin almacenamiento */ }
    if (loaded) { location.reload(); return; } // para retirar el permiso se recarga sin Analytics
    banner();
  });

  var choice = get();
  if (choice === 'si') load();
  else if (choice !== 'no') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(banner, 900); });
    else setTimeout(banner, 900);
  }
})();
