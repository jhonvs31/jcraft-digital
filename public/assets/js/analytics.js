// Google Analytics 4 y etiqueta de Google Ads con aviso de cookies (JCraft Digital).
// - Analytics solo se carga si la persona acepta (se recuerda la elección en el navegador).
// - Mide clics a WhatsApp (whatsapp_click) y envíos del formulario de contacto (contacto_enviado).
// - No se incluye en el portal de clientes ni en las propuestas privadas (ver Base.astro).
// Va como archivo aparte porque la CSP de vercel.json no permite scripts en línea.
(function () {
  var me = document.currentScript;
  var ID = me && me.getAttribute('data-ga');
  var AW = me && me.getAttribute('data-aw'); // etiqueta de Google Ads (conversiones y remarketing)
  var AWL = me && me.getAttribute('data-aw-label'); // etiqueta de la conversión «Contacto» de Google Ads
  var PRIV = me && me.getAttribute('data-privacy'); // enlace a la política de privacidad (opcional)
  if (!ID) return;
  // v2: el aviso ahora incluye publicidad (Google Ads), así que se vuelve a preguntar a todos.
  var KEY = 'jc-cookies-v2'; // 'si' | 'no'
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { localStorage.setItem(KEY, v); } catch (e) { /* sin almacenamiento */ } };
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  function load() {
    if (loaded) return; loaded = true;
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
    gtag('js', new Date());
    gtag('config', ID, { anonymize_ip: true });
    if (AW) gtag('config', AW);
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
    document.head.appendChild(s);
  }
  var track = function (name, params) { if (loaded) gtag('event', name, params || {}); };
  // Conversión «Contacto» en Google Ads: clic a WhatsApp o envío del formulario
  var convert = function () { if (AW && AWL) track('conversion', { send_to: AW + '/' + AWL, value: 1.0, currency: 'COP', transport_type: 'beacon' }); };

  // Conversiones
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i.test(href)) {
      track('whatsapp_click', { link_url: href.split('?')[0], link_text: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 80), page_path: location.pathname });
      convert();
    }
  }, true);
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'contactForm') { track('contacto_enviado', { form: 'contacto', page_path: location.pathname }); convert(); }
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
      '<p style="margin:0"><strong style="font-weight:800">Usamos cookies de medición y publicidad</strong> (Google Analytics y Google Ads) para saber qué páginas te sirven, medir nuestros anuncios y mostrarte información relevante. ' + (PRIV ? '<a href="' + PRIV + '" style="color:#00BCD4;text-decoration:underline">Más información</a>' : '') + '</p>' +
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
