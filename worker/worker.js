// Cloudflare Worker "portfolio-matheus": serve o site a partir deste repositório.
// Publicar uma mudança = git push na branch main (cache de 5 min na borda).
const BASE = 'https://raw.githubusercontent.com/EngMatheusCardoso/portfolio/main/';
const TYPES = { 'og.jpg': 'image/jpeg', 'index.html': 'text/html; charset=utf-8' };

export default {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    const file = path === '/og.jpg' ? 'og.jpg' : 'index.html';
    const upstream = await fetch(BASE + file, { cf: { cacheTtl: 300, cacheEverything: true } });
    if (!upstream.ok) return new Response('Indisponível no momento.', { status: 502 });
    return new Response(upstream.body, {
      headers: { 'content-type': TYPES[file], 'cache-control': 'public, max-age=300' },
    });
  },
};
