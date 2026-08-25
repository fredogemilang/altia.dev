import { ARTICLE_001_EN, ARTICLE_001_ID } from './blog-article-001';
import { ARTICLE_002_EN, ARTICLE_002_ID } from './blog-article-002';
import { ARTICLE_003_EN, ARTICLE_003_ID } from './blog-article-003';

export type Pillar =
  | 'engineering'
  | 'ai-engineering'
  | 'creative-development'
  | 'infrastructure'
  | 'digital-products';

export const PILLAR_LABELS: Record<Pillar, { en: string; id: string }> = {
  'engineering': { en: 'Engineering', id: 'Engineering' },
  'ai-engineering': { en: 'AI Engineering', id: 'AI Engineering' },
  'creative-development': { en: 'Creative Development', id: 'Creative Development' },
  'infrastructure': { en: 'Infrastructure', id: 'Infrastructure' },
  'digital-products': { en: 'Digital Products', id: 'Produk Digital' },
};

export interface BlogPost {
  slug: {
    en: string;
    id: string;
  };
  title: {
    en: string;
    id: string;
  };
  excerpt: {
    en: string;
    id: string;
  };
  content: {
    en: string;
    id: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;

  // Editorial metadata (aligned with docs/blog content strategy)
  pillar?: Pillar;
  cluster?: string;
  articleType?: string;
  searchIntent?: string;
  tags?: string[];
  relatedSlugs?: string[];
  relatedProject?: string;
  primaryCta?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: {
      en: "how-to-turn-complex-pdfs-into-structured-knowledge",
      id: "mengubah-pdf-kompleks-menjadi-knowledge-yang-terstruktur",
    },
    category: "AI",
    pillar: "ai-engineering",
    cluster: "AI-Assisted Document Processing",
    articleType: "Deep Dive",
    searchIntent: "Problem Solving",
    tags: ["ai", "document-processing", "knowledge-management", "pdf", "human-in-the-loop"],
    relatedSlugs: [
      "meilisearch-vs-vector-search-which-should-you-use",
      "rag-vs-search-what-should-a-business-knowledge-system-use",
      "meilisearch-vs-vector-search-mana-yang-sebaiknya-digunakan",
      "rag-vs-search-apa-yang-sebaiknya-digunakan-untuk-business-knowledge-system",
    ],
    relatedProject: "vads-knowledge-management",
    primaryCta: "Explore how ALTIA DEV approaches AI-powered knowledge systems.",
    publishedAt: "2026-08-11",
    readTime: "12",
    title: {
      en: "How to Turn Complex PDFs into Structured Knowledge",
      id: "Mengubah PDF Kompleks Menjadi Knowledge yang Terstruktur",
    },
    excerpt: {
      en: "Learn how AI-assisted document processing can turn complex PDFs into structured, searchable business knowledge with human review and workflow controls.",
      id: "Pelajari bagaimana pemrosesan dokumen berbantuan AI dapat mengubah PDF kompleks menjadi knowledge bisnis terstruktur, searchable, dan aman dengan alur review manusia.",
    },
    content: {
      en: ARTICLE_001_EN,
      id: ARTICLE_001_ID,
    },
    author: {
      name: "Alfredo Gemilang",
      role: "Founder & Lead Engineer",
      avatar: "/uploads/team/Alfredo-Gemilang.webp",
    },
    coverImage: "/uploads/blog/complex-pdfs-to-knowledge.webp",
  },
  {
    slug: {
      en: "meilisearch-vs-vector-search-which-should-you-use",
      id: "meilisearch-vs-vector-search-mana-yang-sebaiknya-digunakan",
    },
    category: "AI",
    pillar: "ai-engineering",
    cluster: "Search + AI",
    articleType: "Comparison",
    searchIntent: "Commercial Investigation / Decision",
    tags: ["meilisearch", "vector-search", "hybrid-search", "semantic-search", "knowledge-management", "enterprise-search"],
    relatedSlugs: [
      "how-to-turn-complex-pdfs-into-structured-knowledge",
      "rag-vs-search-what-should-a-business-knowledge-system-use",
      "mengubah-pdf-kompleks-menjadi-knowledge-yang-terstruktur",
      "rag-vs-search-apa-yang-sebaiknya-digunakan-untuk-business-knowledge-system",
    ],
    relatedProject: "vads-knowledge-management",
    primaryCta: "Explore how ALTIA DEV approaches search and AI engineering.",
    publishedAt: "2026-08-18",
    readTime: "14",
    title: {
      en: "Meilisearch vs Vector Search: Which Should You Use?",
      id: "Meilisearch vs Vector Search: Mana yang Sebaiknya Digunakan?",
    },
    excerpt: {
      en: "Compare keyword, vector, and hybrid search to choose the right retrieval architecture for knowledge systems, AI applications, and enterprise search.",
      id: "Bandingkan keyword, vector, dan hybrid search untuk memilih retrieval architecture yang tepat bagi knowledge system, aplikasi AI, dan enterprise search.",
    },
    content: {
      en: ARTICLE_002_EN,
      id: ARTICLE_002_ID,
    },
    author: {
      name: "Alfredo Gemilang",
      role: "Founder & Lead Engineer",
      avatar: "/uploads/team/Alfredo-Gemilang.webp",
    },
    coverImage: "/uploads/blog/meilisearch-vs-vector-search.webp",
  },
  {
    slug: {
      en: "rag-vs-search-what-should-a-business-knowledge-system-use",
      id: "rag-vs-search-apa-yang-sebaiknya-digunakan-untuk-business-knowledge-system",
    },
    category: "AI",
    pillar: "ai-engineering",
    cluster: "AI Knowledge Systems",
    articleType: "Decision Guide",
    searchIntent: "Problem Solving",
    tags: ["rag", "retrieval-augmented-generation", "search", "knowledge-management", "ai-assistant", "enterprise-search"],
    relatedSlugs: [
      "meilisearch-vs-vector-search-which-should-you-use",
      "how-to-turn-complex-pdfs-into-structured-knowledge",
      "meilisearch-vs-vector-search-mana-yang-sebaiknya-digunakan",
      "mengubah-pdf-kompleks-menjadi-knowledge-yang-terstruktur",
    ],
    relatedProject: "vads-knowledge-management",
    primaryCta: "Explore how ALTIA DEV builds AI knowledge systems.",
    publishedAt: "2026-08-25",
    readTime: "13",
    title: {
      en: "RAG vs Search: What Should a Business Knowledge System Use?",
      id: "RAG vs Search: Apa yang Sebaiknya Digunakan untuk Business Knowledge System?",
    },
    excerpt: {
      en: "Should your knowledge system use search, RAG, or both? A practical guide to choosing the right architecture based on real product requirements.",
      id: "Haruskah knowledge system menggunakan search, RAG, atau keduanya? Panduan praktis memilih architecture yang tepat berdasarkan kebutuhan produk yang nyata.",
    },
    content: {
      en: ARTICLE_003_EN,
      id: ARTICLE_003_ID,
    },
    author: {
      name: "Alfredo Gemilang",
      role: "Founder & Lead Engineer",
      avatar: "/uploads/team/Alfredo-Gemilang.webp",
    },
    coverImage: "/uploads/blog/rag-vs-search.webp",
  },
];
