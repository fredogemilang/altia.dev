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
      en: "Orchestrating Zero-Jank GSAP ScrollTrigger Animations in Next.js 14",
      id: "Membangun Animasi GSAP ScrollTrigger Bebas Stutter di Next.js 14",
    },
    excerpt: {
      en: "A deep dive into synchronizing Lenis smooth scroll with GSAP ticker, handling App Router hydration, and avoiding layout thrashing in production.",
      id: "Panduan mendalam sinkronisasi Lenis smooth scroll dengan GSAP ticker, penanganan hidrasi App Router, dan pencegahan layout thrashing.",
    },
    content: {
      en: `
# Orchestrating Zero-Jank GSAP ScrollTrigger Animations in Next.js 14

Building award-winning digital experiences demands more than just slapping CSS animations on scroll events. It requires a disciplined, timeline-based mental model where the scrollbar acts as a precision playback head.

## 1. The React Lifecycle Problem
In modern React frameworks with dynamic routing and client-side page transitions, naive GSAP setups inevitably lead to memory leaks, lingering event listeners, and duplicate ScrollTrigger calculations.

The solution is using the official \`@gsap/react\` integration with \`useGSAP\`. By properly scoping your timeline to a container ref, GSAP automatically reverts DOM mutations and removes event listeners when components unmount.

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

## 2. Syncing Lenis with the GSAP Ticker
Lenis has become the industry standard for smooth scrolling. To eliminate micro-stutter when ScrollTrigger calculates trigger positions during rapid scrolling, you must drive Lenis's requestAnimationFrame cycle directly from GSAP's internal ticker:

\`\`\`typescript
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
\`\`\`

## 3. Animate Only "Cheap" Properties
Never animate properties that trigger browser layout reflow (such as \`top\`, \`left\`, \`height\`, or \`margin\`). Always compose your choreographies using:
- \`transform\` (\`x\`, \`y\`, \`scale\`, \`rotation\`)
- \`opacity\`
- \`clipPath\`

By adhering to these rules, your Next.js application will maintain a silky 60–120 fps across devices.
      `,
      id: `
# Membangun Animasi GSAP ScrollTrigger Bebas Stutter di Next.js 14

Membangun pengalaman web berkelas dunia menuntut lebih dari sekadar animasi CSS biasa. Dibutuhkan model mental berbasis timeline yang presisi, di mana scrollbar bertindak sebagai pengontrol pemutaran animasi.

## 1. Masalah Siklus Hidup React
Dalam framework modern seperti Next.js dengan transisi halaman sisi klien, implementasi GSAP yang tidak tepat sering menyebabkan kebocoran memori dan duplikasi penghitungan ScrollTrigger.

Solusinya adalah menggunakan integrasi resmi \`@gsap/react\` dengan \`useGSAP\`. Dengan membatasi scope timeline ke ref kontainer, GSAP secara otomatis membersihkan mutasi DOM saat komponen di-unmount.

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

## 2. Sinkronisasi Lenis dengan GSAP Ticker
Lenis adalah standar industri untuk scrolling halus. Agar tidak terjadi stutter saat ScrollTrigger menghitung posisi scroll, hubungkan pembaruan Lenis langsung ke GSAP ticker:

\`\`\`typescript
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
\`\`\`

## 3. Hanya Animasikan Properti Komputasi Ringan
Hindari menganimasikan properti yang memicu reflow tata letak seperti \`top\`, \`left\`, atau \`height\`. Selalu gunakan:
- \`transform\` (\`x\`, \`y\`, \`scale\`, \`rotation\`)
- \`opacity\`
- \`clipPath\`

Dengan menerapkan pola ini, aplikasi Next.js Anda akan berjalan mulus di 60–120 fps.
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
      en: "Beyond Simple RAG: Architecting Multi-Agent Workflows with Self-Correction",
      id: "Melampaui RAG Sederhana: Merancang Alur Kerja Multi-Agent dengan Koreksi Mandiri",
    },
    excerpt: {
      en: "How to move past naive vector similarity search to build deterministic agent graphs that critique, filter, and synthesize complex enterprise data.",
      id: "Cara beralih dari vector similarity dasar menuju grafik agen deterministik yang mampu mengkritisi, menyaring, dan menyintesis data enterprise.",
    },
    content: {
      en: `
# Beyond Simple RAG: Architecting Multi-Agent Workflows with Self-Correction

Naive Retrieval-Augmented Generation (RAG)—fetching top-k vector chunks and passing them into a prompt—breaks down when dealing with complex, multi-hop reasoning, tabular data, and contradictory domain sources.

## The Core Bottleneck of Vector Search
Vector embeddings capture semantic closeness, but semantic closeness does not equal factual relevance. When an analyst queries "Compare Q3 operating margins between 2023 and 2024", naive cosine similarity retrieves paragraphs mentioning "margins" without understanding temporal or mathematical relationships.

## The Multi-Agent Solution: The Triad Pattern
At ALTIA DEV, we architect autonomous workflows using a Triad pattern:

1. **Router & Query Reformulator**: Deconstructs user intent into sub-queries, determining whether to hit dense vector storage, structured SQL databases, or live external APIs.
2. **Retrieval & Evidence Scorer**: Evaluates retrieved chunks for relevance, discarding low-confidence context before it reaches the synthesis stage.
3. **Synthesis & Hallucination Auditor**: Verifies that every claim generated in the final response maps directly to cited source tokens. If a hallucination is detected, the graph loops back with corrective instructions.

By separating retrieval evaluation from generation, production pipelines achieve accuracy rates exceeding 99% on rigorous compliance benchmarks.
      `,
      id: `
# Melampaui RAG Sederhana: Merancang Alur Kerja Multi-Agent dengan Koreksi Mandiri

Sistem Retrieval-Augmented Generation (RAG) dasar yang hanya mengambil top-k chunk vektor sering kali gagal saat dihadapkan pada penalaran multi-tahap, data tabel rumit, dan sumber informasi yang saling bertentangan.

## Keterbatasan Pencarian Vektor Dasar
Embedding vektor merepresentasikan kemiripan semantik, namun kemiripan semantik belum tentu relevan secara faktual. Ketika pertanyaan memerlukan perbandingan angka atau rentang waktu, similarity search sederhana kerap salah mengambil konteks.

## Solusi Kami: Pola Multi-Agent Triad
Di ALTIA DEV, kami menerapkan arsitektur agen berbasis pola Triad:

1. **Router & Reformulator Query**: Memecah intensi pengguna menjadi beberapa sub-query dan memilih apakah harus mengakses database vektor, database SQL, atau API eksternal.
2. **Evaluator & Scorer Bukti**: Menilai relevansi data yang diambil sebelum dikirim ke tahap sintesis untuk membuang konteks yang meragukan.
3. **Auditor Halusinasi**: Memverifikasi bahwa setiap poin kesimpulan memiliki referensi kutipan data yang valid. Jika ditemukan ketidaksesuaian, agen akan mengulang pencarian secara otomatis.

Dengan memisahkan proses evaluasi dari generasi teks, sistem AI kami mencapai akurasi lebih dari 99% dalam pengujian kepatuhan dokumen.
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
      en: "The Psychology of Warm Minimalism: Why Tech Brands Are Leaving Cold Dark Mode",
      id: "Psikologi Warm Minimalism: Mengapa Brand Teknologi Beralih dari Dark Mode Dingin",
    },
    excerpt: {
      en: "Exploring the shift toward organic ivory tones, vermilion accenting, and tactile typography that build authentic emotional connection.",
      id: "Mengeksplorasi pergeseran ke nuansa ivory organik, aksen vermilion, dan tipografi taktil yang membangun koneksi emosional autentik.",
    },
    content: {
      en: `
# The Psychology of Warm Minimalism: Why Tech Brands Are Leaving Cold Dark Mode

For years, the tech landscape was saturated with dark neon interfaces: jet black #000000 backgrounds, cyan glow effects, and hyper-synthetic purple gradients. While visually dramatic, these palettes often felt sterile, detached, and visually fatiguing during prolonged engagement.

## The Rise of Warm Craft
Leading digital agencies and high-end software houses are gravitating toward **Warm Minimalism**:
- **Ivory Base (#FFF6E8)**: Replaces stark clinical white with natural warmth that reduces ocular strain while evoking artisanal print media.
- **Vermilion Accent (#E34234)**: An intentional, energetic orange-red that conveys vitality, decisiveness, and human energy without the aggression of pure red.
- **Warm Charcoal Typography (#2F2A26)**: Softens reading contrast, ensuring high accessibility while harmonizing with the ivory canvas.

When married to fluid motion and purposeful typography, warm minimalism positions tech companies not as cold algorithmic factories, but as thoughtful, human-centric studios of craft.
      `,
      id: `
# Psikologi Warm Minimalism: Mengapa Brand Teknologi Beralih dari Dark Mode Dingin

Selama bertahun-tahun, lanskap industri teknologi dipenuhi antarmuka bernuansa neon gelap: background hitam pekat, efek cyan menyala, dan gradasi ungu sintetis. Meski dramatis, tampilan ini kerap terasa dingin, monoton, dan melelahkan bagi mata saat digunakan dalam waktu lama.

## Era Baru: Warm Minimalism
Studio desain dan perusahaan software modern kini mengadopsi pendekatan **Warm Minimalism**:
- **Warna Dasar Ivory (#FFF6E8)**: Menggantikan putih klinis dengan kehangatan alami yang nyaman di mata, membangkitkan nuansa kertas cetak berkualitas tinggi.
- **Aksen Vermilion (#E34234)**: Warna merah-oranye berenergi yang mencerminkan ketegasan, vitalitas, dan sentuhan manusia tanpa terkesan agresif.
- **Tipografi Charcoal Hangat (#2F2A26)**: Memperhalus kontras teks untuk kenyamanan membaca optimal.

Dipadukan dengan animasi yang halus dan tata letak berirama, warm minimalism menampilkan brand Anda sebagai studio teknologi yang berkelas, elegan, dan berpusat pada manusia.
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
