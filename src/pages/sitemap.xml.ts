import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  const site = context.site || new URL('https://health.designjobs.cv');
  const pages = ['', '/jobs', '/submit', '/report'];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${new URL(page, site).href}</loc>
    <changefreq>${page === '/jobs' || page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page === '/jobs' ? '0.9' : '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
