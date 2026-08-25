import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../lib/constants';
import { getProjects } from '../lib/b10cks';

export const GET: APIRoute = async () => {
  const siteUrl = SITE_CONFIG.url;
  const projects = await getProjects();
  const now = new Date().toISOString().split('T')[0];

  const urlElements = projects.flatMap((project) => {
    const enUrl = `${siteUrl}/portfolio/${project.slug}`;
    const idUrl = `${siteUrl}/id/portfolio/${project.slug}`;

    const galleryImage = project.gallery?.[0];
    const imageTag = galleryImage
      ? `\n    <image:image>
      <image:loc>${galleryImage.startsWith('http') ? galleryImage : `${siteUrl}${galleryImage}`}</image:loc>
      <image:title>${escapeXml(project.title.en)}</image:title>
    </image:image>`
      : '';

    const idImageTag = galleryImage
      ? `\n    <image:image>
      <image:loc>${galleryImage.startsWith('http') ? galleryImage : `${siteUrl}${galleryImage}`}</image:loc>
      <image:title>${escapeXml(project.title.id)}</image:title>
    </image:image>`
      : '';

    const enEntry = `  <url>
    <loc>${enUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${imageTag}
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="id" href="${idUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
  </url>`;

    const idEntry = `  <url>
    <loc>${idUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${idImageTag}
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

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
