// Precios en Servicios: cambia entre pesos colombianos (por defecto) y dólares, y recuerda la elección.
// Va como archivo aparte porque la CSP del sitio no permite scripts en línea.
(function () {
  var KEY = 'jcraft-moneda';
  var root = document.querySelector('[data-currency]');
  if (!root) return;
  var buttons = Array.prototype.slice.call(root.querySelectorAll('[data-cur-btn]'));
  function set(cur) {
    root.dataset.currency = cur;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.curBtn === cur)); });
    root.querySelectorAll('[data-cop]').forEach(function (el) { el.textContent = cur === 'cop' ? el.dataset.cop : el.dataset.usd; });
    root.querySelectorAll('[data-cur-label]').forEach(function (el) { el.textContent = cur.toUpperCase(); });
    try { localStorage.setItem(KEY, cur); } catch (e) { /* sin almacenamiento: queda en COP */ }
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.curBtn); }); });
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* idem */ }
  if (saved === 'usd') set('usd');
})();
