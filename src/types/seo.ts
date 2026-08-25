import type { Locale } from '../i18n/utils';

export type PageType = 'website' | 'article' | 'profile' | 'service' | 'faq' | 'case-study';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ArticleMetadata {
  headline: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  authors: {
    name: string;
    role?: string;
    avatar?: string;
    url?: string;
  }[];
  section?: string;
  tags?: string[];
  image?: string;
  wordCount?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceMetadata {
  id: string;
  name: string;
  description: string;
  serviceType: string;
  offers?: {
    name?: string;
    price?: string;
    priceCurrency?: string;
  };
}

export interface CaseStudyMetadata {
  title: string;
  tagline: string;
  client: string;
  year?: string;
  services: string[];
  image: string;
  gallery?: string[];
  results?: {
    metric: string;
    label: string;
  }[];
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  locale?: Locale;
  pageType?: PageType;
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
  nofollow?: boolean;
  alternateUrls?: {
    en: string;
    id: string;
  };
  breadcrumbs?: BreadcrumbItem[];
  article?: ArticleMetadata;
  faqs?: FAQItem[];
  services?: ServiceMetadata[];
  caseStudy?: CaseStudyMetadata;
}
