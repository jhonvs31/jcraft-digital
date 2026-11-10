// Vidrio líquido tipo Apple para la página de enlaces.
// - El brillo de cada tarjeta sigue al mouse (o al dedo) para que parezca vidrio real.
// - La refracción (el fondo se "dobla" detrás del vidrio) solo se activa en Chrome/Edge,
//   que soportan filtros SVG en backdrop-filter; Safari y Firefox ven el vidrio esmerilado normal.
export function initLiquidGlass(reduce: boolean) {
  const page = document.querySelector<HTMLElement>('[data-lg]');
  if (!page) return;
  const ua = navigator.userAgent;
  const chromium = /Chrome|Edg\//.test(ua) && !/Firefox|FxiOS|CriOS|EdgiOS/.test(ua) && !/Version\/.*Safari/.test(ua);
  if (chromium && !/Mobi/.test(ua)) page.classList.add('lg-refract');

  if (reduce) return;
  const glass = [...page.querySelectorAll<HTMLElement>('.lg')];
  const move = (x: number, y: number) => {
    for (const el of glass) {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((x - r.left) / r.width) * 100}%`);
      el.style.setProperty('--my', `${((y - r.top) / r.height) * 100}%`);
    }
  };
  let raf = 0;
  const onMove = (e: PointerEvent) => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => move(e.clientX, e.clientY)); };
  window.addEventListener('pointermove', onMove, { passive: true });
  // En celular, sin mouse: el brillo pasea lento por las tarjetas
  if (!matchMedia('(hover: hover)').matches) {
    let t = 0;
    const loop = () => { t += 0.006; move(innerWidth * (0.5 + 0.45 * Math.sin(t)), innerHeight * (0.35 + 0.3 * Math.cos(t * 0.7))); raf = requestAnimationFrame(loop); };
    loop();
  }
}
