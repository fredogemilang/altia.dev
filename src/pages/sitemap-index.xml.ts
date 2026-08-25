import type { APIRoute } from 'astro';
import { GET as getSitemap } from './sitemap.xml';

export const GET: APIRoute = async (context) => {
  return getSitemap(context);
};
