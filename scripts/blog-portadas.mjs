// Genera las portadas del blog con el diseño de la web (azul JCraft, cuadrícula, brillo cian y un motivo por categoría).
// Salida: public/assets/blog/<slug>.webp (1600×900, portada) y public/assets/blog/og/<slug>.jpg (1200×630, al compartir).
// Uso: node scripts/blog-portadas.mjs            → solo las que faltan
//      node scripts/blog-portadas.mjs --todas    → regenera todas
//      node scripts/blog-portadas.mjs <slug>     → solo ese artículo
// Necesita Playwright con Chromium (npx playwright install chromium) y sharp (ya viene con Astro).
import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const posts = JSON.parse(readFileSync(path.join(root, 'src/data/posts.json'), 'utf8'));
const out = path.join(root, 'public/assets/blog');
mkdirSync(path.join(out, 'og'), { recursive: true });
const arg = process.argv[2];
const list = posts.filter((p) => (arg && arg !== '--todas' ? p.slug === arg : arg === '--todas' || !existsSync(path.join(out, `${p.slug}.webp`))));
if (!list.length) { console.log('No hay portadas pendientes.'); process.exit(0); }

const f = (p) => pathToFileURL(path.join(root, p)).href;
const fonts = `
@font-face{font-family:A;src:url(${f('node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2')}) format('woff2');font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:S;src:url(${f('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}) format('woff2');font-style:italic}`;
const logo = f('public/assets/logo-light-600.png');

// Motivos abstractos por categoría (SVG propios, sin marcas de terceros)
const C = '#00BCD4';
const motif = {
  seo: `<circle cx="260" cy="260" r="230" stroke="${C}" stroke-opacity=".18" stroke-width="2" fill="none"/><circle cx="260" cy="260" r="170" stroke="${C}" stroke-opacity=".3" stroke-width="2" fill="none"/><circle cx="260" cy="260" r="110" stroke="${C}" stroke-opacity=".55" stroke-width="3" fill="none"/><path d="M340 340 L450 450" stroke="${C}" stroke-width="22" stroke-linecap="round"/><circle cx="260" cy="260" r="12" fill="${C}"/>`,
  redes: [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<rect x="${40 + c * 150}" y="${40 + r * 150}" width="130" height="130" rx="26" fill="${C}" fill-opacity="${[0.1, 0.22, 0.4, 0.16, 0.55, 0.12, 0.3, 0.08, 0.2][r * 3 + c]}"/>`)).join('') + `<path d="M265 300c-30-22-50-40-50-62a28 28 0 0 1 50-17 28 28 0 0 1 50 17c0 22-20 40-50 62z" fill="#fff" fill-opacity=".9"/>`,
  web: `<rect x="20" y="60" width="480" height="380" rx="28" fill="#fff" fill-opacity=".06" stroke="${C}" stroke-opacity=".5" stroke-width="2"/><path d="M20 120h480" stroke="${C}" stroke-opacity=".5" stroke-width="2"/><circle cx="56" cy="90" r="9" fill="${C}"/><circle cx="86" cy="90" r="9" fill="${C}" fill-opacity=".6"/><circle cx="116" cy="90" r="9" fill="${C}" fill-opacity=".3"/><rect x="60" y="160" width="250" height="26" rx="13" fill="${C}" fill-opacity=".7"/><rect x="60" y="206" width="380" height="14" rx="7" fill="#fff" fill-opacity=".25"/><rect x="60" y="234" width="320" height="14" rx="7" fill="#fff" fill-opacity=".18"/><rect x="60" y="290" width="180" height="110" rx="16" fill="${C}" fill-opacity=".22"/><rect x="260" y="290" width="180" height="110" rx="16" fill="${C}" fill-opacity=".12"/>`,
  pauta: [0, 1, 2, 3, 4].map((i) => `<rect x="${50 + i * 90}" y="${420 - (80 + i * 60)}" width="62" height="${80 + i * 60}" rx="14" fill="${C}" fill-opacity="${0.2 + i * 0.16}"/>`).join('') + `<path d="M60 300 L180 250 L280 200 L380 130 L470 70" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="470" cy="70" r="16" fill="#fff"/>`,
  marca: `<circle cx="180" cy="200" r="130" fill="${C}" fill-opacity=".35"/><circle cx="330" cy="200" r="130" fill="#0D47A1" fill-opacity=".7"/><circle cx="255" cy="330" r="130" fill="#fff" fill-opacity=".12"/><rect x="200" y="210" width="110" height="110" rx="20" transform="rotate(45 255 265)" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="4"/>`,
  estrategia: `<path d="M60 420 C 160 420, 140 260, 250 260 S 360 100, 460 90" stroke="${C}" stroke-width="6" fill="none" stroke-dasharray="2 18" stroke-linecap="round"/><circle cx="60" cy="420" r="22" fill="${C}" fill-opacity=".45"/><circle cx="250" cy="260" r="26" fill="${C}" fill-opacity=".7"/><circle cx="460" cy="90" r="34" fill="${C}"/><path d="M450 90l8 9 16-18" stroke="#061D47" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
function html(p, w, h) {
  const [head, ...rest] = p.title.split(/:\s+/);
  const sub = rest.join(': ');
  const s = w / 1600; // escala para la versión de compartir
  return `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;font-family:A;color:#fff;position:relative;
background:radial-gradient(${900 * s}px ${700 * s}px at 92% 8%,rgba(0,188,212,.32),transparent 60%),radial-gradient(${800 * s}px ${600 * s}px at -5% 110%,rgba(13,71,161,.85),transparent 60%),linear-gradient(140deg,#0A2F6E,#061D47 72%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:${64 * s}px ${64 * s}px;-webkit-mask:radial-gradient(circle at 70% 40%,#000,transparent 75%)}
.m{position:absolute;right:${70 * s}px;top:50%;transform:translateY(-50%);width:${560 * s}px;height:${560 * s}px;opacity:.95}
.emo{position:absolute;right:${245 * s}px;top:${h / 2 - 95 * s}px;width:${190 * s}px;height:${190 * s}px;border-radius:${46 * s}px;display:grid;place-items:center;font-size:${104 * s}px;font-family:'Noto Color Emoji';
background:linear-gradient(140deg,rgba(255,255,255,.22),rgba(255,255,255,.06));border:${2 * s}px solid rgba(255,255,255,.35);box-shadow:0 ${30 * s}px ${60 * s}px -${20 * s}px rgba(0,0,0,.6),inset 0 ${2 * s}px 0 rgba(255,255,255,.5);backdrop-filter:blur(${10 * s}px)}
.t{position:absolute;left:${96 * s}px;top:${96 * s}px;bottom:${180 * s}px;width:${880 * s}px;display:flex;flex-direction:column;justify-content:center}
.chip{align-self:flex-start;background:#00BCD4;color:#061D47;font-weight:800;letter-spacing:.16em;text-transform:uppercase;font-size:${22 * s}px;padding:${10 * s}px ${22 * s}px;border-radius:99px}
h1{margin-top:${30 * s}px;font-weight:900;letter-spacing:-.04em;line-height:.98;font-size:${100 * s}px;text-wrap:balance}
p{margin-top:${22 * s}px;font-family:S;font-style:italic;color:#00BCD4;font-size:${60 * s}px;line-height:1.05;text-wrap:balance}
.f{position:absolute;left:${96 * s}px;right:${96 * s}px;bottom:${64 * s}px;display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:${22 * s}px;color:rgba(255,255,255,.7);letter-spacing:.04em}
.f img{height:${54 * s}px}
</style></head><body><div class="grid"></div>
<svg class="m" viewBox="0 0 520 520">${motif[p.category] ?? motif.estrategia}</svg>
<div class="emo">${p.emoji}</div>
<div class="t"><span class="chip">${esc(p.categoryName)}</span><h1>${esc(head)}</h1>${sub ? `<p>${esc(sub)}</p>` : ''}</div>
<div class="f"><img src="${logo}"><span>jcraft-digital.com/blog</span></div>
<script>
// Ajusta el tamaño del título para que nunca se salga del recuadro
const t=document.querySelector('.t'),h=document.querySelector('h1'),q=document.querySelector('p');
let size=parseFloat(getComputedStyle(h).fontSize),sub=q?parseFloat(getComputedStyle(q).fontSize):0;
while(t.scrollHeight>t.clientHeight+1&&size>20){size*=.95;sub*=.95;h.style.fontSize=size+'px';if(q)q.style.fontSize=sub+'px';}
</script></body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage();
for (const p of list) {
  for (const [w, h, file, fmt] of [[1600, 900, `${p.slug}.webp`, 'webp'], [1200, 630, `og/${p.slug}.jpg`, 'jpeg']]) {
    await page.setViewportSize({ width: w, height: h });
    // Se abre como archivo local para que carguen las fuentes y el logo
    const tmp = path.join(os.tmpdir(), `portada-${p.slug}-${w}.html`);
    writeFileSync(tmp, html(p, w, h));
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
    rmSync(tmp);
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: 'png' });
    const img = sharp(png);
    await (fmt === 'webp' ? img.webp({ quality: 82 }) : img.jpeg({ quality: 86, mozjpeg: true })).toFile(path.join(out, file));
  }
  console.log('✓', p.slug);
}
await browser.close();
