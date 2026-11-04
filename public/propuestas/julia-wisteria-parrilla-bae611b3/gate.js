// Abre la propuesta cifrada: deriva la clave de la contraseña y descifra data.bin en el navegador.
(function () {
  var form = document.getElementById('gate');
  var input = document.getElementById('pass');
  var msg = document.getElementById('msg');
  var btn = document.getElementById('go');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    btn.disabled = true; msg.textContent = 'Abriendo la parrilla…';
    try {
      var buf = new Uint8Array(await (await fetch('data.bin', { cache: 'no-store' })).arrayBuffer());
      var salt = buf.slice(0, 16), iv = buf.slice(16, 28), ct = buf.slice(28);
      var base = await crypto.subtle.importKey('raw', new TextEncoder().encode(input.value.trim()), 'PBKDF2', false, ['deriveKey']);
      var key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: 600000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      var html = new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct));
      document.open(); document.write(html); document.close();
    } catch (err) {
      btn.disabled = false;
      msg.textContent = 'La contraseña no es correcta. Revísala e inténtalo de nuevo.';
      input.select();
    }
  });
})();
