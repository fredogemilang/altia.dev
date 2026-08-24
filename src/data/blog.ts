export interface BlogPost {
  slug: string;
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
  category: "Engineering" | "AI" | "Design";
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-zero-jank-gsap-nextjs-app-router",
    category: "Engineering",
    publishedAt: "2024-10-14",
    readTime: "6",
    title: {
      en: "Building Smooth GSAP Animations in Next.js 14",
      id: "Membangun Animasi GSAP yang Mulus di Next.js 14",
    },
    excerpt: {
      en: "How to keep scroll-driven animation responsive by coordinating Lenis, the GSAP ticker, React lifecycle, and rendering-friendly properties.",
      id: "Cara menjaga animasi berbasis scroll tetap responsif dengan menyelaraskan Lenis, GSAP ticker, React lifecycle, dan properti yang ramah rendering.",
    },
    content: {
      en: `
# Building Smooth GSAP Animations in Next.js 14

Premium motion isn't about adding more effects. The real challenge is keeping scrolling, animation timelines, React lifecycle, and browser rendering in sync.

## 1. Managing React Lifecycle Correctly
In the Next.js App Router, lifecycle management matters. ScrollTrigger instances and event listeners should be scoped and cleaned up correctly to avoid duplicated animations and memory leaks.

Use the official \`@gsap/react\` package with \`useGSAP\` to scope timelines to container refs:

\`\`\`typescript
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".headline-char", {
      yPercent: 100,
      opacity: 0,
      stagger: 0.02,
      ease: "expo.out",
      duration: 1,
    });
  }, { scope: container });

  return <div ref={container}>...</div>;
}
\`\`\`

## 2. Synchronizing Lenis with GSAP
Let Lenis update through the GSAP ticker so both systems observe the same animation clock. This keeps smooth scrolling and ScrollTrigger synchronized:

\`\`\`typescript
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
\`\`\`

## 3. Choosing Rendering-Friendly Properties
Prefer transform and opacity for most motion. Avoid animating layout-heavy properties such as \`top\`, \`left\`, and \`height\` when they aren't necessary:
- \`transform\` (\`x\`, \`y\`, \`scale\`, \`rotation\`)
- \`opacity\`
- \`clipPath\`

With clean lifecycle management, a synchronized ticker, and rendering-friendly properties, you can build scroll experiences that feel fluid without making performance an afterthought.
      `,
      id: `
# Membangun Animasi GSAP yang Mulus di Next.js 14

Animasi yang terasa premium bukan soal menambahkan semakin banyak efek. Tantangan sebenarnya adalah menjaga scrolling, timeline animasi, React lifecycle, dan rendering browser tetap selaras.

## 1. Mengelola React Lifecycle dengan Benar
Di Next.js App Router, pengelolaan lifecycle sangat penting. Instance ScrollTrigger dan event listener harus memiliki scope serta cleanup yang jelas agar animasi tidak terduplikasi dan memory leak dapat dihindari.

Gunakan integrasi resmi \`@gsap/react\` dengan \`useGSAP\` untuk membatasi scope timeline ke container ref:

\`\`\`typescript
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".headline-char", {
      yPercent: 100,
      opacity: 0,
      stagger: 0.02,
      ease: "expo.out",
      duration: 1,
    });
  }, { scope: container });

  return <div ref={container}>...</div>;
}
\`\`\`

## 2. Menyelaraskan Lenis dengan GSAP
Jalankan pembaruan Lenis melalui GSAP ticker agar keduanya menggunakan clock animasi yang sama. Dengan begitu, smooth scrolling dan ScrollTrigger tetap sinkron:

\`\`\`typescript
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
\`\`\`

## 3. Memilih Properti yang Ramah Rendering
Untuk sebagian besar animasi, prioritaskan transform dan opacity. Hindari animasi pada properti seperti \`top\`, \`left\`, dan \`height\` jika tidak benar-benar diperlukan:
- \`transform\` (\`x\`, \`y\`, \`scale\`, \`rotation\`)
- \`opacity\`
- \`clipPath\`

Dengan lifecycle yang bersih, ticker yang tersinkron, dan properti yang tepat, Anda dapat membangun pengalaman scroll yang terasa mulus tanpa menjadikan performa sebagai pekerjaan belakangan.
      `,
    },
    author: {
      name: "Alexandre Altia",
      role: "Lead Architect",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    },
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "architecting-multi-agent-rag-pipelines",
    category: "AI",
    publishedAt: "2024-09-28",
    readTime: "8",
    title: {
      en: "Beyond Simple RAG: Designing Self-Correcting Multi-Agent Workflows",
      id: "Melampaui RAG Sederhana: Merancang Workflow Multi-Agent yang Dapat Mengoreksi Diri",
    },
    excerpt: {
      en: "Why vector search alone isn't always enough, and how separating retrieval, evaluation, and generation can produce more reliable AI systems.",
      id: "Mengapa vector search saja tidak selalu cukup, dan bagaimana memisahkan retrieval, evaluasi, dan generasi dapat menghasilkan sistem AI yang lebih dapat diandalkan.",
    },
    content: {
      en: `
# Beyond Simple RAG: Designing Self-Correcting Multi-Agent Workflows

Simple RAG works well for direct questions. But once a task requires comparing figures, connecting information across documents, or resolving conflicting sources, top-k retrieval starts to show its limits.

## 1. Where Vector Search Falls Short
Embeddings measure semantic similarity, not factual correctness. A document can sound relevant while still being the wrong evidence for a specific question.

## 2. The Multi-Agent Pattern
Separate the workflow into distinct responsibilities:
1. **Retrieval Agent**: Gathers evidence from vector databases, SQL tables, or live APIs.
2. **Evaluation Agent**: Scores evidence relevance and filters out low-confidence data before synthesis.
3. **Generation Agent**: Produces answers strictly from evidence that passes verification.

## 3. Verify Before You Generate
Separating evaluation from generation gives the system room to reject weak context, retrieve more evidence, and reduce unsupported answers.

The goal of multi-agent architecture isn't complexity for its own sake. It is structure: a reasoning process that can be tested, observed, and improved.
      `,
      id: `
# Melampaui RAG Sederhana: Merancang Workflow Multi-Agent yang Dapat Mengoreksi Diri

RAG sederhana bekerja dengan baik untuk pertanyaan langsung. Namun ketika sebuah tugas membutuhkan perbandingan angka, hubungan lintas dokumen, atau penyelesaian konflik antar-sumber, retrieval top-k mulai menunjukkan batasnya.

## 1. Saat Vector Search Mulai Terbatas
Embedding mengukur kemiripan semantik, bukan kebenaran faktual. Sebuah dokumen bisa terlihat relevan tetapi tetap bukan sumber yang tepat untuk menjawab pertanyaan tertentu.

## 2. Pola Multi-Agent
Pisahkan workflow menjadi beberapa tanggung jawab:
1. **Agent Retrieval**: Mencari bukti dari database vektor, SQL, atau API live.
2. **Agent Evaluasi**: Menilai relevansi dan menyaring bukti sebelum dikirim ke tahap sintesis.
3. **Agent Generasi**: Menyusun jawaban berdasarkan bukti yang lolos verifikasi.

## 3. Verifikasi Sebelum Generasi
Dengan memisahkan evaluasi dari generasi, sistem memiliki kesempatan untuk menolak konteks yang lemah, mencari bukti tambahan, dan mengurangi jawaban yang tidak memiliki dukungan sumber.

Tujuan arsitektur multi-agent bukan membuat sistem semakin rumit. Tujuannya adalah memberi struktur pada proses reasoning agar dapat diuji, dipantau, dan diperbaiki.
      `,
    },
    author: {
      name: "Soraya Danendra",
      role: "Head of AI",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "the-psychology-of-warm-minimalism-in-tech",
    category: "Design",
    publishedAt: "2024-08-19",
    readTime: "5",
    title: {
      en: "Warm Minimalism: Why Technology Brands Are Starting to Feel More Human",
      id: "Warm Minimalism: Mengapa Brand Teknologi Mulai Terasa Lebih Manusiawi",
    },
    excerpt: {
      en: "How ivory, vermilion, warmer typography, and restrained motion are changing the visual language of modern technology brands.",
      id: "Bagaimana ivory, vermilion, tipografi yang lebih hangat, dan motion yang tenang mengubah bahasa visual brand teknologi modern.",
    },
    content: {
      en: `
# Warm Minimalism: Why Technology Brands Are Starting to Feel More Human

For years, technology branding leaned heavily on dark interfaces, neon accents, cyan gradients, and synthetic visual language. Dramatic, yes, but not always approachable.

## 1. The Shift Toward Warm Minimalism
Warm minimalism replaces harsh contrast with quieter spaces, warmer colors, and details that feel more tactile and human.

## 2. Warmer Color Systems
- **Ivory Base (#FFF6E8)**: Creates a paper-like sense of warmth that reduces eye fatigue.
- **Vermilion Accent (#E34234)**: Adds energy without becoming aggressive or overwhelming.
- **Soft Charcoal Typography (#2F2A26)**: Keeps the system grounded with comfortable reading contrast.

## 3. Motion That Doesn't Shout
Motion doesn't need to dominate the screen. Subtle movement can establish rhythm, clarify hierarchy, and make interaction feel more natural.

Warm minimalism isn't just a color trend. It is a way of making technology feel closer, more confident, and more comfortable to use.
      `,
      id: `
# Warm Minimalism: Mengapa Brand Teknologi Mulai Terasa Lebih Manusiawi

Selama bertahun-tahun, brand teknologi banyak menggunakan dark interface, aksen neon, gradient cyan, dan bahasa visual yang terasa sangat digital. Dramatis, memang, tetapi tidak selalu terasa dekat.

## 1. Pergeseran ke Warm Minimalism
Warm minimalism mengganti kontras yang keras dengan ruang yang lebih tenang, warna yang lebih hangat, dan detail visual yang terasa lebih manusiawi.

## 2. Sistem Warna yang Lebih Hangat
- **Warna Dasar Ivory (#FFF6E8)**: Memberi kesan hangat seperti kertas berkualitas yang nyaman di mata.
- **Aksen Vermilion (#E34234)**: Menghadirkan energi tanpa terasa agresif.
- **Tipografi Charcoal Lembut (#2F2A26)**: Menjaga keseluruhan sistem tetap seimbang dengan kontras yang nyaman dibaca.

## 3. Motion yang Tidak Berlebihan
Motion tidak harus mendominasi layar. Gerakan yang halus dapat memberi ritme, memperjelas hierarki, dan membuat interaksi terasa lebih natural.

Warm minimalism bukan sekadar tren warna. Ini adalah cara membuat teknologi terasa lebih dekat, lebih percaya diri, dan lebih nyaman digunakan.
      `,
    },
    author: {
      name: "Maya Indira",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    },
    coverImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop",
  },
];
