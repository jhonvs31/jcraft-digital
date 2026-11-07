// Reemplaza los archivos de piezas que ya existen en el portal (las busca por título) y las deja otra vez en «Por revisar».
// Uso: npm run portal:reemplazar -- "<carpeta con reemplazos.json y los archivos>"
// Formato de reemplazos.json: { "client": "<slug>", "posts": [ { "title": "…", "files": ["a.jpg"], "stickers"?: "…", "caption"?: "…" } ] }
// Pide el correo y la contraseña de la cuenta admin de JCraft en la terminal (no se guardan en ningún sitio).
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createInterface } from 'node:readline';

const env = Object.fromEntries(readFileSync(new URL('../.env', import.meta.url), 'utf8')
  .split('\n').filter((l) => l.includes('=') && !l.startsWith('#')).map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]));
const dir = process.argv[2];
if (!dir) { console.error('Indica la carpeta: npm run portal:reemplazar -- "<carpeta>"'); process.exit(1); }
const plan = JSON.parse(readFileSync(join(dir, 'reemplazos.json'), 'utf8'));

const ask = (q, hidden = false) => new Promise((res) => {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  if (hidden) rl._writeToOutput = (s) => { if (s.includes(q)) rl.output.write(s); };
  rl.question(q, (a) => { rl.close(); if (hidden) process.stdout.write('\n'); res(a.trim()); });
});

const sb = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);
const email = await ask('Correo admin de JCraft: ');
const password = await ask('Contraseña: ', true);
const { error: authError } = await sb.auth.signInWithPassword({ email, password });
if (authError) { console.error('No se pudo entrar:', authError.message); process.exit(1); }

const { data: client, error: cErr } = await sb.from('clients').select('id, name').eq('slug', plan.client).single();
if (cErr) { console.error(`No existe el cliente «${plan.client}»:`, cErr.message); process.exit(1); }
console.log(`Cliente: ${client.name} · ${plan.posts.length} piezas para reemplazar`);

const types = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };
const stamp = Date.now();
for (const [n, p] of plan.posts.entries()) {
  const { data: rows, error: fErr } = await sb.from('posts').select('id, status').eq('client_id', client.id).eq('title', p.title);
  if (fErr || !rows?.length) { console.error(`  ✗ No encontré «${p.title}». La salto.`); continue; }
  if (rows.length > 1) { console.error(`  ✗ Hay ${rows.length} piezas llamadas «${p.title}». La salto para no tocar la equivocada.`); continue; }
  const media = [];
  for (const f of p.files) {
    const path = `${client.id}/${stamp}-${f}`;
    const { error } = await sb.storage.from('piezas').upload(path, readFileSync(join(dir, f)), { contentType: types[extname(f).toLowerCase()], upsert: true });
    if (error) { console.error(`Error subiendo ${f}:`, error.message); process.exit(1); }
    media.push(path);
  }
  const patch = { media, status: 'pendiente', feedback: null, decided_at: null };
  if (p.stickers !== undefined) patch.stickers = p.stickers;
  if (p.caption !== undefined) patch.caption = p.caption;
  const { error } = await sb.from('posts').update(patch).eq('id', rows[0].id);
  if (error) { console.error(`Error actualizando «${p.title}»:`, error.message); process.exit(1); }
  console.log(`  ${n + 1}. ${p.title} → ${media.length} archivo${media.length > 1 ? 's' : ''} nuevo${media.length > 1 ? 's' : ''}`);
}
await sb.auth.signOut();
console.log('Listo. Las piezas nuevas ya se ven en el portal, en «Por revisar».');
