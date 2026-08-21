import en from '../messages/en.json';
import id from '../messages/id.json';

export type Locale = 'en' | 'id';

export const locales: Locale[] = ['en', 'id'];
export const defaultLocale: Locale = 'en';

const messages: Record<Locale, any> = { en, id };

/**
 * Get current locale from URL pathname
 */
export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0] === 'id') {
    return 'id';
  }
  return 'en';
}

/**
 * Translate a nested key, e.g. "Hero.titleLine1"
 */
export function t(locale: Locale, key: string, fallback?: string): string {
  const parts = key.split('.');
  let current: any = messages[locale] || messages.en;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to English if missing in target locale
      let engFallback: any = messages.en;
      for (const p of parts) {
        if (engFallback && typeof engFallback === 'object' && p in engFallback) {
          engFallback = engFallback[p];
        } else {
          return fallback || key;
        }
      }
      return typeof engFallback === 'string' ? engFallback : (fallback || key);
    }
  }

  return typeof current === 'string' ? current : (fallback || key);
}

/**
 * Generate localized URL path
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Normalize path
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Remove existing locale prefix if present
  let normalized = cleanPath;
  if (normalized.startsWith('/id/') || normalized === '/id') {
    normalized = normalized.substring(3) || '/';
  }

  if (locale === 'en') {
    return normalized;
  }

  return normalized === '/' ? '/id' : `/id${normalized}`;
}
