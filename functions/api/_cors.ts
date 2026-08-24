/**
 * Shared CORS utility for Cloudflare Pages Functions
 * Returns appropriate CORS headers based on request origin
 */

const ALLOWED_ORIGINS = [
  'https://altia.dev',
  'https://www.altia.dev',
  'https://altiadev.com',
  'https://www.altiadev.com',
];

// Also allow *.pages.dev preview deployments
const PREVIEW_PATTERN = /^https:\/\/[\w-]+\.altia-dev\.pages\.dev$/;

export function getCorsOrigin(request: Request): string {
  const origin = request.headers.get('Origin') || '';

  // Same-origin requests (no Origin header) — always allow
  if (!origin) return '*';

  // Check allowed production origins
  if (ALLOWED_ORIGINS.includes(origin)) return origin;

  // Check Cloudflare Pages preview deployments
  if (PREVIEW_PATTERN.test(origin)) return origin;

  // Local development
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) return origin;

  // Reject unknown origins
  return '';
}

export function corsHeaders(request: Request): Record<string, string> {
  const origin = getCorsOrigin(request);
  if (!origin) return { 'Content-Type': 'application/json' };

  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
  };
}

export function corsPreflightHeaders(request: Request): Record<string, string> {
  const origin = getCorsOrigin(request);
  if (!origin) return {};

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, api-key',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}
