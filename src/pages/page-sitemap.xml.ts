import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../lib/constants';

interface PageEntry {
  path: string;
  idPath: string;
  changefreq: string;
  priority: string;
}

const STATIC_PAGES: PageEntry[] = [
  { path: '', idPath: '/id', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', idPath: '/id/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio', idPath: '/id/portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: '/pricing', idPath: '/id/pricing', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', idPath: '/id/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', idPath: '/id/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/contact', idPath: '/id/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/estimator', idPath: '/id/estimator', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy', idPath: '/id/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', idPath: '/id/terms', changefreq: 'yearly', priority: '0.3' },
];

export const GET: APIRoute = async () => {
  const siteUrl = SITE_CONFIG.url;
  const now = new Date().toISOString().split('T')[0];

  const urlElements = STATIC_PAGES.flatMap((page) => {
    const enUrl = `${siteUrl}${page.path}`;
    const idUrl = `${siteUrl}${page.idPath}`;

    const enEntry = `  <url>
    <loc>${enUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="id" href="${idUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
  </url>`;

    const idEntry = `  <url>
    <loc>${idUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${(parseFloat(page.priority) * 0.95).toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="id" href="${idUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
  </url>`;

    return [enEntry, idEntry];
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
