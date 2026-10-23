import type { APIRoute } from 'astro';
import posts from '../data/posts.json';
import { services, contact } from '../data/site';

// Resumen del sitio para modelos de lenguaje (propuesta llms.txt): qué es JCraft y dónde está cada cosa.
export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const body = `# JCraft Digital

> Agencia de marketing digital para pymes y emprendedores en Colombia y LATAM. Redes sociales, diseño web, pauta digital (Google y Meta Ads), diseño gráfico y estrategia digital. Fundada por Jhon Vega (web, pauta y diseño) y Catalina Escobar (diseño gráfico y redes sociales).

Contacto: WhatsApp ${contact.phone} · ${contact.email} · Instagram @jcraftdigital. Primera consulta gratuita.

## Páginas principales
- [Inicio](${url('index.html')}): qué hace JCraft y para quién.
- [Servicios](${url('servicios.html')}): ${services.map((s) => s.title).join(', ')}, con preguntas frecuentes.
- [Portafolio](${url('portafolio.html')}): proyectos de redes sociales, diseño web, SEO y pauta en Colombia, México y Estados Unidos.
- [Nosotros](${url('nosotros.html')}): equipo, misión, valores e historia.
- [Contacto](${url('contacto.html')}): WhatsApp, correo, horario y formulario.

## Blog
${posts.map((p) => `- [${p.title}](${url(`blog/${p.slug}.html`)}): ${p.description}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
