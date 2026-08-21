import { useState, useEffect } from "react";
import en from "../messages/en.json";
import id from "../messages/id.json";
import { type Locale, t as translate } from "./utils";

const messages: Record<Locale, any> = { en, id };

/**
 * React hook to access translations in client components
 */
export function useI18n(initialLocale?: Locale) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (initialLocale) return initialLocale;
    if (typeof window !== "undefined") {
      return window.location.pathname.startsWith("/id") ? "id" : "en";
    }
    return "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentLocale = window.location.pathname.startsWith("/id") ? "id" : "en";
      setLocale(currentLocale);
    }
  }, []);

  const t = (key: string, fallback?: string): string => {
    return translate(locale, key, fallback);
  };

  const getScopedT = (prefix: string) => {
    return (subKey: string, fallback?: string): string => {
      return translate(locale, `${prefix}.${subKey}`, fallback);
    };
  };

  return { locale, t, getScopedT };
}

// For compatibility with components expecting useTranslations
export function useTranslations(prefix: string, explicitLocale?: Locale) {
  const { getScopedT } = useI18n(explicitLocale);
  return getScopedT(prefix);
}

export function useLocale(): Locale {
  if (typeof window !== "undefined") {
    return window.location.pathname.startsWith("/id") ? "id" : "en";
  }
  return "en";
}
