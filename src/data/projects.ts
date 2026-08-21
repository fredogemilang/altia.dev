export interface ProjectMetric {
  value: string;
  label: {
    en: string;
    id: string;
  };
  sublabel?: {
    en: string;
    id: string;
  };
}

export interface ProjectFeature {
  title: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  technicalNote?: string;
}

export interface ProjectArchitecture {
  headline: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  nodes: {
    title: {
      en: string;
      id: string;
    };
    detail: string;
    badge: string;
  }[];
}

export interface ProjectTestimonial {
  quote: {
    en: string;
    id: string;
  };
  author: string;
  role: string;
  company: string;
}

export interface Project {
  slug: string;
  category: "web" | "app" | "ai";
  featured: boolean;
  year: string;
  title: {
    en: string;
    id: string;
  };
  client: string;
  tagline: {
    en: string;
    id: string;
  };
  summary: {
    en: string;
    id: string;
  };
  challenge: {
    en: string;
    id: string;
  };
  solution: {
    en: string;
    id: string;
  };
  impact: {
    en: string[];
    id: string[];
  };
  metrics?: ProjectMetric[];
  keyFeatures?: ProjectFeature[];
  architecture?: ProjectArchitecture;
  testimonial?: ProjectTestimonial;
  gallery?: string[];
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "nexus-agentic-rag",
    category: "ai",
    featured: true,
    year: "2024",
    title: {
      en: "Nexus: Autonomous Financial Intelligence Engine",
      id: "Nexus: Sistem Kecerdasan Finansial Otonom",
    },
    client: "FinVentures Asia",
    tagline: {
      en: "Multi-agent LLM pipeline extracting actionable financial signals across 10,000+ daily regulatory filings.",
      id: "Pipeline multi-agent LLM yang mengekstrak sinyal finansial dari 10.000+ laporan regulasi setiap hari.",
    },
    summary: {
      en: "We engineered an autonomous multi-agent system utilizing LangGraph, custom vector indices, and FastAPI that automates financial statement synthesis, generating executive intelligence briefs in real time.",
      id: "Kami merancang sistem multi-agent otonom menggunakan LangGraph, indeks vektor kustom, dan FastAPI untuk sintesis laporan keuangan secara instan.",
    },
    challenge: {
      en: "Analysts were spending over 25 hours weekly manually parsing multilingual quarterly filings, SEC PDFs, and complex financial footnotes with significant risk of human oversight.",
      id: "Para analis menghabiskan lebih dari 25 jam seminggu membaca laporan kuartalan multi-bahasa, PDF SEC, dan catatan kaki laporan dengan risiko ketidaktelitian.",
    },
    solution: {
      en: "Built a self-healing RAG pipeline with hybrid dense/sparse search, confidence scoring, hallucination guardrails, and automated PDF table extraction with sub-second semantic retrieval.",
      id: "Membangun pipeline RAG mandiri dengan hybrid search, confidence scoring, guardrail anti-halusinasi, dan ekstraksi tabel PDF dalam hitungan sub-detik.",
    },
    metrics: [
      {
        value: "82%",
        label: { en: "Efficiency Gain", id: "Peningkatan Efisiensi" },
        sublabel: { en: "In research brief generation", id: "Pada pembuatan ringkasan riset" },
      },
      {
        value: "99.4%",
        label: { en: "Audit Accuracy", id: "Akurasi Audit Data" },
        sublabel: { en: "Across tabular financial footnotes", id: "Pada ekstraksi tabel laporan keuangan" },
      },
      {
        value: "$340k+",
        label: { en: "Annual Savings", id: "Penghematan Tahunan" },
        sublabel: { en: "In recurring operational overhead", id: "Dari biaya operasional berulang" },
      },
    ],
    architecture: {
      headline: {
        en: "Hybrid Dense Retrieval & Multi-Agent Verification Architecture",
        id: "Arsitektur Hybrid Retrieval & Verifikasi Multi-Agent",
      },
      description: {
        en: "Every regulatory PDF passes through a deterministic OCR extraction worker, chunked into hierarchical semantic embeddings in Qdrant, and reviewed by a critique agent before rendering.",
        id: "Setiap berkas regulasi diproses melalui worker OCR deterministik, diindeks dalam hierarki semantik Qdrant, dan diverifikasi oleh agen evaluator sebelum ditampilkan.",
      },
      nodes: [
        {
          title: { en: "1. Document Ingestion", id: "1. Ingesti Dokumen" },
          detail: "Async PDF table parsing & multilingual OCR pipeline",
          badge: "FastAPI / Celery",
        },
        {
          title: { en: "2. Hybrid Vector Indexing", id: "2. Pengindeksan Vektor" },
          detail: "Dense embeddings + BM25 sparse lexical reranking",
          badge: "Qdrant Vector DB",
        },
        {
          title: { en: "3. Agentic Synthesis", id: "3. Sintesis Agen Otonom" },
          detail: "LangGraph state machine with automatic citation groundings",
          badge: "GPT-4o / Claude 3.5",
        },
        {
          title: { en: "4. Real-time Telemetry", id: "4. Telemetri Real-time" },
          detail: "Sub-second streaming UI with live confidence metrics",
          badge: "Next.js 14 / WebSockets",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Deterministic Citation Tracing", id: "Penelusuran Sitasi Deterministik" },
        description: {
          en: "Every synthesized paragraph highlights exact PDF page numbers and paragraph sources, allowing one-click audit verification.",
          id: "Setiap kalimat menyertakan nomor halaman dan paragraf sumber dari PDF asli untuk verifikasi audit dalam satu klik.",
        },
        technicalNote: "Bounding-box coordinate matching via PDF.js worker",
      },
      {
        title: { en: "Anti-Hallucination Consensus Filter", id: "Filter Konsensus Anti-Halusinasi" },
        description: {
          en: "Dual LLM critique loops evaluate statistical claims against raw tabular extracts, rejecting uncertain assertions automatically.",
          id: "Dua loop evaluasi memverifikasi klaim statistik terhadap data tabel mentah dan menolak asersi yang tidak terbukti.",
        },
        technicalNote: "Cosine similarity scoring threshold >= 0.88",
      },
      {
        title: { en: "Sub-Second Semantic Retrieval", id: "Pencarian Semantik Sub-Detik" },
        description: {
          en: "Custom Qdrant collection sharding optimized for high-dimensional financial queries with zero latency penalty.",
          id: "Sharding koleksi Qdrant yang dioptimalkan untuk kueri finansial berdimensi tinggi tanpa hambatan latensi.",
        },
        technicalNote: "HNSW index with scalar quantization",
      },
    ],
    testimonial: {
      quote: {
        en: "ALTIA DEV delivered an enterprise-grade AI architecture that transformed how our analysts work. It's fast, incredibly accurate, and bulletproof.",
        id: "ALTIA DEV menghadirkan arsitektur AI kelas enterprise yang mentransformasi alur kerja analis kami. Cepat, sangat akurat, dan sangat andal.",
      },
      author: "Marcus Chen",
      role: "Managing Director of Quantitative Research",
      company: "FinVentures Asia",
    },
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
    ],
    impact: {
      en: [
        "82% reduction in report generation time",
        "Over $340k saved in annual operational overhead",
        "99.4% accuracy rate on tabular financial audits",
      ],
      id: [
        "Penurunan 82% waktu pembuatan ringkasan riset",
        "Penghematan biaya operasional lebih dari $340k per tahun",
        "Tingkat akurasi 99.4% pada audit data tabel finansial",
      ],
    },
    stack: ["Python", "FastAPI", "LangChain", "Qdrant", "OpenAI GPT-4o", "Next.js", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://nexus-ai.altiadev.demo",
  },
  {
    slug: "aurora-design-system",
    category: "web",
    featured: true,
    year: "2024",
    title: {
      en: "Aurora: E-Commerce Flagship & 3D Configurator",
      id: "Aurora: Flagship E-Commerce & Konfigurator 3D",
    },
    client: "Nordic Living Co.",
    tagline: {
      en: "High-craft headless e-commerce experience featuring interactive 3D product customization and 60fps animations.",
      id: "Pengalaman e-commerce headless premium dengan kustomisasi produk 3D interaktif dan animasi 60fps.",
    },
    summary: {
      en: "A bespoke headless storefront built with Next.js 14, WebGL/Three.js, and Shopify Storefront GraphQL, setting a new benchmark in furniture retail digital presence.",
      id: "Storefront headless kustom dibangun dengan Next.js 14, WebGL/Three.js, dan Shopify GraphQL yang menetapkan standar baru ritel furnitur modern.",
    },
    challenge: {
      en: "The client’s legacy monolithic store suffered from high bounce rates due to slow 4.5s load times and inability to let buyers visualize material customizations.",
      id: "Toko lama klien memiliki bounce rate tinggi karena waktu muat lambat (4.5s) dan tidak bisa memvisualisasikan kustomisasi bahan.",
    },
    solution: {
      en: "Architected an edge-cached Next.js application with GSAP ScrollTrigger transitions, progressive GLTF 3D loading, and seamless multi-currency checkout.",
      id: "Merancang aplikasi Next.js berbasis edge cache dengan transisi GSAP ScrollTrigger, loading 3D progresif, dan checkout multi-mata uang instan.",
    },
    metrics: [
      {
        value: "100/100",
        label: { en: "Lighthouse Performance", id: "Performa Lighthouse" },
        sublabel: { en: "Across desktop & mobile devices", id: "Di seluruh perangkat desktop & mobile" },
      },
      {
        value: "+43%",
        label: { en: "Checkout Conversion", id: "Konversi Checkout" },
        sublabel: { en: "Direct uplift in organic cart completion", id: "Peningkatan penyelesaian keranjang belanja" },
      },
      {
        value: "<750ms",
        label: { en: "Global Time-To-Interactive", id: "Waktu Interaktif Global" },
        sublabel: { en: "Via Cloudflare Edge & Next.js ISR", id: "Melalui Edge Cache & Next.js ISR" },
      },
    ],
    architecture: {
      headline: {
        en: "Headless E-Commerce & WebGL Rendering Pipeline",
        id: "Pipeline Headless E-Commerce & Rendering WebGL",
      },
      description: {
        en: "Decoupled headless storefront powered by Shopify Storefront GraphQL, progressive Draco 3D mesh compression, and ISR cache revalidation on inventory changes.",
        id: "Storefront headless independen yang ditenagai Shopify GraphQL, kompresi 3D Draco progresif, dan revalidasi cache otomatis.",
      },
      nodes: [
        {
          title: { en: "1. Headless Core", id: "1. Fondasi Headless" },
          detail: "Next.js 14 App Router with React Server Components",
          badge: "Next.js 14 / Edge",
        },
        {
          title: { en: "2. 3D WebGL Configurator", id: "2. Konfigurator 3D WebGL" },
          detail: "Real-time material swap & HDRI lighting canvas",
          badge: "Three.js / React Three Fiber",
        },
        {
          title: { en: "3. Commerce Engine", id: "3. Mesin Transaksi" },
          detail: "Shopify Storefront GraphQL with instant cart mutations",
          badge: "Shopify API",
        },
        {
          title: { en: "4. Global CDN Edge", id: "4. Distribusi Edge Global" },
          detail: "Sub-100ms asset delivery across Europe and Asia",
          badge: "Cloudflare Workers",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Interactive 3D Material Studio", id: "Studio Material 3D Interaktif" },
        description: {
          en: "Customers customize fabrics, wood grains, and metal finishes in real time with physically based rendering (PBR).",
          id: "Pelanggan dapat memilih tekstur kain, serat kayu, dan logam secara real-time dengan pantulan cahaya fisik realistis.",
        },
        technicalNote: "Draco-compressed GLTF models under 1.2MB",
      },
      {
        title: { en: "Fluid Page Transitions", id: "Transisi Halaman Mulus 60fps" },
        description: {
          en: "Bespoke page transitions and micro-interactions orchestrated via GSAP Flip and ScrollTrigger for a tactile boutique feel.",
          id: "Transisi halaman elegan yang diorkestrasikan dengan GSAP Flip untuk pengalaman belanja kelas atas.",
        },
        technicalNote: "Hardware-accelerated GPU transforms",
      },
      {
        title: { en: "One-Click Global Checkout", id: "Checkout Global Satu Klik" },
        description: {
          en: "Localized currencies, automatic tax calculation, and Apple Pay/Google Pay integration with zero redirect friction.",
          id: "Konversi mata uang otomatis, kalkulasi pajak instan, dan integrasi Apple Pay tanpa redirect lambat.",
        },
        technicalNote: "Shopify Storefront Mutation API",
      },
    ],
    testimonial: {
      quote: {
        en: "Our conversion rate jumped 43% within the first month. ALTIA DEV built a retail experience that feels more like an art gallery than a store.",
        id: "Tingkat konversi kami naik 43% dalam bulan pertama. ALTIA DEV membangun pengalaman belanja yang terasa seperti galeri seni modern.",
      },
      author: "Elena Lindqvist",
      role: "Chief Commercial Officer",
      company: "Nordic Living Co.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop",
    ],
    impact: {
      en: [
        "100/100 Lighthouse Performance score",
        "43% increase in mobile checkout conversion",
        "Sub-800ms global time-to-interactive",
      ],
      id: [
        "Skor Lighthouse Performance 100/100 sempurna",
        "Peningkatan 43% konversi checkout di perangkat mobile",
        "Waktu interaktif global di bawah 800ms",
      ],
    },
    stack: ["Next.js 14", "TypeScript", "GSAP ScrollTrigger", "Three.js", "Tailwind CSS", "Shopify API"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://aurora-store.altiadev.demo",
  },
  {
    slug: "strata-cloud-workspace",
    category: "app",
    featured: true,
    year: "2024",
    title: {
      en: "Strata: Cross-Platform Developer Workspace",
      id: "Strata: Workspace Developer Multi-Platform",
    },
    client: "Strata Technologies",
    tagline: {
      en: "Offline-first desktop and iPad utility uniting cloud infrastructure metrics, logs, and incident orchestration.",
      id: "Utilitas desktop dan iPad offline-first yang menyatukan metrik cloud, log, dan orkestrasi insiden.",
    },
    summary: {
      en: "Built with Flutter and Rust FFI for desktop (macOS/Windows/Linux) and iPadOS, delivering real-time telemetry streaming at 120Hz with zero UI stutter.",
      id: "Dibangun dengan Flutter dan Rust FFI untuk desktop serta iPadOS, menghadirkan streaming telemetri 120Hz yang sangat responsif.",
    },
    challenge: {
      en: "DevOps teams lacked a unified, keyboard-first desktop dashboard that could stream gigabytes of Kubernetes logs without locking the main rendering thread.",
      id: "Tim DevOps membutuhkan dashboard desktop keyboard-first yang mampu memproses gigabyte log Kubernetes tanpa membuat UI freeze.",
    },
    solution: {
      en: "Leveraged multi-isolate background processing in Flutter coupled with local SQLite caching, fuzzy command palettes, and custom native window frameless chrome.",
      id: "Memanfaatkan pemrosesan multi-isolate background di Flutter dengan cache lokal SQLite dan command palette super cepat.",
    },
    metrics: [
      {
        value: "35,000+",
        label: { en: "Daily Active Engineers", id: "Engineer Aktif Harian" },
        sublabel: { en: "Across macOS, Windows, and Linux", id: "Di platform macOS, Windows, dan Linux" },
      },
      {
        value: "<140MB",
        label: { en: "RAM Footprint", id: "Konsumsi Memori RAM" },
        sublabel: { en: "Under peak 50,000 log events/sec stream", id: "Saat streaming 50.000 log event/detik" },
      },
      {
        value: "120 FPS",
        label: { en: "Rendering Frame Rate", id: "Kecepatan Render Layar" },
        sublabel: { en: "Smooth telemetry charts with zero stutter", id: "Grafik telemetri mulus tanpa UI lag" },
      },
    ],
    architecture: {
      headline: {
        en: "Multi-Isolate Telemetry Engine & Native FFI Pipeline",
        id: "Engine Telemetri Multi-Isolate & Pipeline Native FFI",
      },
      description: {
        en: "High-throughput log ingestion is offloaded to native Rust binaries via Dart FFI, keeping the Flutter rendering thread unburdened at 120Hz.",
        id: "Pemrosesan log berkecepatan tinggi dialihkan ke binary Rust native via Dart FFI, menjaga thread render Flutter tetap stabil di 120Hz.",
      },
      nodes: [
        {
          title: { en: "1. Ingestion Pipeline", id: "1. Pipeline Log Streaming" },
          detail: "High-speed gRPC & WebSocket stream consumer",
          badge: "Rust / Tokio",
        },
        {
          title: { en: "2. Native FFI Bridge", id: "2. Bridge Native FFI" },
          detail: "Zero-copy byte buffer transfer to Dart VM",
          badge: "Dart:FFI / C-ABI",
        },
        {
          title: { en: "3. Multi-Isolate Processing", id: "3. Pemrosesan Isolate" },
          detail: "Background log filtering, regex search & indexing",
          badge: "Flutter Isolates",
        },
        {
          title: { en: "4. Custom Skia/Impeller Canvas", id: "4. Canvas Render Kustom" },
          detail: "120Hz hardware-accelerated time series charts",
          badge: "Flutter Impeller",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Keyboard-First Command Palette", id: "Command Palette Keyboard-First" },
        description: {
          en: "Lightning-fast fuzzy search across cloud clusters, services, and Kubernetes pods in under 15ms.",
          id: "Pencarian fuzzy super cepat di seluruh kluster cloud, service, dan pod Kubernetes dalam <15ms.",
        },
        technicalNote: "Custom Trie algorithm compiled to native code",
      },
      {
        title: { en: "Offline-First Local Cache", id: "Cache Lokal Offline-First" },
        description: {
          en: "Engineers can review incidents and run complex regex queries completely offline during transit.",
          id: "Engineer tetap dapat menganalisis insiden dan menjalankan query regex secara offline saat perjalanan.",
        },
        technicalNote: "WAL-mode SQLite with zstandard compression",
      },
      {
        title: { en: "Cross-Platform Consistency", id: "Konsistensi Lintas Platform" },
        description: {
          en: "Single Flutter codebase delivering pixel-perfect native window chrome on macOS, Windows, Linux, and iPadOS.",
          id: "Satu basis kode Flutter yang menghadirkan tampilan native di macOS, Windows, Linux, dan iPadOS.",
        },
        technicalNote: "Platform-channel window chrome hooks",
      },
    ],
    testimonial: {
      quote: {
        en: "Strata is by far the fastest developer tool our team has ever used. ALTIA DEV's mastery of Flutter and Rust performance is truly world-class.",
        id: "Strata adalah developer tool tercepat yang pernah digunakan tim kami. Penguasaan ALTIA DEV atas performa Flutter dan Rust benar-benar kelas dunia.",
      },
      author: "David Vance",
      role: "VP of Cloud Infrastructure",
      company: "Strata Technologies",
    },
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop",
    ],
    impact: {
      en: [
        "Over 35,000 active daily engineers",
        "Memory footprint under 140MB RAM under peak load",
        "Featured in Flutter Showcase 2024",
      ],
      id: [
        "Lebih dari 35.000 engineer aktif harian",
        "Konsumsi memori di bawah 140MB RAM pada beban puncak",
        "Masuk dalam kurasi Flutter Showcase 2024",
      ],
    },
    stack: ["Flutter", "Dart", "Rust FFI", "SQLite", "gRPC", "WebSockets"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://strata.altiadev.demo",
  },
  {
    slug: "cognita-agent-dispatch",
    category: "ai",
    featured: false,
    year: "2023",
    title: {
      en: "Cognita: Automated Enterprise Customer Support Agent",
      id: "Cognita: Agen Dukungan Pelanggan Enterprise Otomatis",
    },
    client: "LogiChain Global",
    tagline: {
      en: "Autonomous voice & chat agent resolving 70% of logistics tracking and ticket disputes without human escalation.",
      id: "Agen suara & chat otonom yang menyelesaikan 70% kendala pelacakan logistik tanpa eskalasi manual.",
    },
    summary: {
      en: "End-to-end integration between WhatsApp Business API, voice speech synthesis, and custom fine-tuned LLMs capable of real-time shipment rerouting and database lookups.",
      id: "Integrasi menyeluruh antara WhatsApp API, sintesis suara, dan LLM khusus yang mampu mengubah rute pengiriman dan cek database real-time.",
    },
    challenge: {
      en: "Peak season support spikes overwhelmed human agents, resulting in 4-hour wait times and high customer churn.",
      id: "Lonjakan dukungan pada musim puncak membebani staf, menyebabkan waktu tunggu hingga 4 jam.",
    },
    solution: {
      en: "Deployed deterministic state machine agents with LLM tool-calling capabilities to query internal ERPs and update tickets safely with audit logging.",
      id: "Mengimplementasikan agen tool-calling deterministik untuk query sistem ERP internal dan update tiket secara aman dengan log audit.",
    },
    metrics: [
      {
        value: "70%",
        label: { en: "Autonomous Resolution", id: "Resolusi Mandiri" },
        sublabel: { en: "First-contact dispute solving", id: "Penyelesaian kendala pada kontak pertama" },
      },
      {
        value: "8s",
        label: { en: "Average Response Time", id: "Waktu Respons Rata-rata" },
        sublabel: { en: "Down from 4 hours previously", id: "Turun dari 4 jam sebelumnya" },
      },
      {
        value: "4.8/5",
        label: { en: "Customer CSAT Score", id: "Skor Kepuasan Pelanggan" },
        sublabel: { en: "Across 100,000+ support interactions", id: "Dari 100.000+ interaksi layanan" },
      },
    ],
    architecture: {
      headline: {
        en: "Multi-Channel State Machine & Tool-Calling Pipeline",
        id: "Pipeline State Machine Multi-Channel & Tool Calling",
      },
      description: {
        en: "Inbound WhatsApp & Voice streams are transcribed in real-time, routed through a deterministic policy guardrail, and executed via secure ERP API tool calls.",
        id: "Pesan WhatsApp dan panggilan suara ditranskripsi real-time, diperiksa melalui guardrail kepatuhan, dan dieksekusi via API ERP internal.",
      },
      nodes: [
        {
          title: { en: "1. Multi-Channel Gateway", id: "1. Gateway Komunikasi" },
          detail: "WhatsApp Business API & Twilio Voice WebSockets",
          badge: "Twilio / Meta API",
        },
        {
          title: { en: "2. Audio & Text Synthesis", id: "2. Sintesis Suara & Teks" },
          detail: "Streaming Whisper STT & low-latency voice TTS",
          badge: "Whisper / ElevenLabs",
        },
        {
          title: { en: "3. Policy & Tool Execution", id: "3. Eksekusi Tool & Kebijakan" },
          detail: "Fine-tuned function calling with immutable audit trail",
          badge: "Python / LangGraph",
        },
        {
          title: { en: "4. ERP Integration", id: "4. Integrasi Database ERP" },
          detail: "Instant shipment rerouting and status updates",
          badge: "PostgreSQL / SAP API",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Instant Shipment Rerouting", id: "Pengalihan Rute Pengiriman Otomatis" },
        description: {
          en: "Customers can update delivery addresses and schedule redelivery slots directly via WhatsApp in under 30 seconds.",
          id: "Pelanggan dapat memperbarui alamat dan jadwal pengiriman langsung di WhatsApp dalam <30 detik.",
        },
        technicalNote: "Two-way verification with SMS OTP security",
      },
      {
        title: { en: "Zero-Latency Voice Streaming", id: "Streaming Suara Rendah Latensi" },
        description: {
          en: "Natural conversational voice bot that responds with human-like intonation with sub-500ms voice turnarounds.",
          id: "Bot suara percakapan alami yang merespons dengan intonasi ramah dalam waktu respon <500ms.",
        },
        technicalNote: "Full-duplex WebSocket audio buffer pipeline",
      },
      {
        title: { en: "Human Hand-off Escalation", id: "Eskalasi Mulus ke Operator Manusia" },
        description: {
          en: "Complex or sensitive disputes automatically transfer to senior agents with full conversation context and suggested actions.",
          id: "Tiket sensitif dialihkan otomatis ke staf senior lengkap dengan ringkasan konteks percakapan.",
        },
        technicalNote: "Zendesk & Salesforce CRM integration hooks",
      },
    ],
    testimonial: {
      quote: {
        en: "Cognita cut our customer support queue to zero during our biggest Black Friday sale. It performed flawlessly under massive scale.",
        id: "Cognita memangkas antrean tiket pelanggan menjadi nol selama promo Black Friday terbesar kami. Bekerja sempurna pada skala jutaan pengguna.",
      },
      author: "Samantha Wijaya",
      role: "Head of Customer Experience",
      company: "LogiChain Global",
    },
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0a67e557224f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    ],
    impact: {
      en: [
        "70% first-contact autonomous resolution",
        "Average response time dropped from 4 hours to 8 seconds",
        "Customer CSAT rose from 3.2 to 4.8 / 5.0",
      ],
      id: [
        "70% resolusi mandiri pada kontak pertama",
        "Waktu respons turun dari 4 jam menjadi 8 detik",
        "Skor kepuasan CSAT naik dari 3.2 ke 4.8 / 5.0",
      ],
    },
    stack: ["Python", "OpenAI Assistants API", "Whisper", "Twilio", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://cognita.altiadev.demo",
  },
  {
    slug: "lumina-health-mobile",
    category: "app",
    featured: false,
    year: "2023",
    title: {
      en: "Lumina: Preventive Longevity & Health App",
      id: "Lumina: Aplikasi Kesehatan & Longevity Preventif",
    },
    client: "Lumina BioTech",
    tagline: {
      en: "Cross-platform mobile application combining continuous biometric sync with personalized AI wellness coaching.",
      id: "Aplikasi mobile lintas platform yang menggabungkan sinkronisasi biometrik dengan panduan kesehatan berbasis AI.",
    },
    summary: {
      en: "React Native application integrated with Apple HealthKit and Google Health Connect, analyzing sleep biomarkers and wearable trends to generate daily metabolic insights.",
      id: "Aplikasi React Native yang terintegrasi dengan Apple HealthKit dan Google Health Connect untuk menganalisis biomarker tidur dan metabolisme harian.",
    },
    challenge: {
      en: "Parsing raw sensor streams from various smartwatch brands into intuitive, medically verified daily scoring without draining phone battery.",
      id: "Mengolah aliran data sensor smartwatch menjadi skor harian tanpa menguras baterai ponsel pengguna.",
    },
    solution: {
      en: "Engineered client-side background sync routines and on-device ML anomaly detection models with warm, editorial UI design.",
      id: "Merancang sinkronisasi background hemat daya dan model deteksi anomali di perangkat dengan UI bernuansa hangat.",
    },
    metrics: [
      {
        value: "120k+",
        label: { en: "App Downloads", id: "Unduhan Aplikasi" },
        sublabel: { en: "In first 90 days after launch", id: "Dalam 90 hari pertama rilis" },
      },
      {
        value: "4.9 ★",
        label: { en: "Store Rating", id: "Rating Toko Aplikasi" },
        sublabel: { en: "Across iOS App Store & Google Play", id: "Di App Store dan Google Play" },
      },
      {
        value: "<2%",
        label: { en: "Daily Battery Drain", id: "Konsumsi Baterai Harian" },
        sublabel: { en: "With continuous background sensor polling", id: "Dengan sinkronisasi sensor berkala" },
      },
    ],
    architecture: {
      headline: {
        en: "On-Device Biomarker Ingestion & ML Pipeline",
        id: "Pipeline Biomarker Di Perangkat & Model ML",
      },
      description: {
        en: "Raw biometric telemetry is aggregated via HealthKit / Health Connect, normalized locally on-device, and synchronized with encrypted backend vault.",
        id: "Data biometrik dari smartwatch dikumpulkan via HealthKit, dinormalisasi di perangkat, dan disinkronkan ke server aman terenkripsi.",
      },
      nodes: [
        {
          title: { en: "1. Sensor Ingestion", id: "1. Pengumpulan Sensor" },
          detail: "Apple HealthKit & Google Health Connect bridges",
          badge: "HealthKit / Health Connect",
        },
        {
          title: { en: "2. On-Device Normalization", id: "2. Normalisasi Data Lokal" },
          detail: "Battery-friendly SQLite batching & anomaly detection",
          badge: "React Native / SQLite",
        },
        {
          title: { en: "3. Encrypted Sync Vault", id: "3. Sinkronisasi Terenkripsi" },
          detail: "HIPAA-compliant zero-knowledge backend storage",
          badge: "Node.js / PostgreSQL",
        },
        {
          title: { en: "4. Personalized AI Coaching", id: "4. Panduan AI Personal" },
          detail: "Daily metabolic recovery score & sleep insights",
          badge: "FastAPI / OpenAI",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Holistic Sleep & Recovery Score", id: "Skor Pemulihan Tidur Holistik" },
        description: {
          en: "Synthesizes HRV, deep sleep stages, and resting heart rate into an actionable daily readiness percentage.",
          id: "Menggabungkan HRV, fase tidur lelap, dan detak jantung istirahat menjadi skor kesiapan harian yang mudah dipahami.",
        },
        technicalNote: "Proprietary biometric algorithm calibrated with clinical data",
      },
      {
        title: { en: "Warm Organic Aesthetic", id: "Desain Antarmuka Organik & Hangat" },
        description: {
          en: "Editorial typography and warm color palettes that reduce anxiety and encourage mindful daily habit tracking.",
          id: "Tipografi berkelas dan palet warna hangat yang memberikan ketenangan visual bagi pengguna.",
        },
        technicalNote: "Figma design system implemented in Tailwind CSS Native",
      },
      {
        title: { en: "Zero-Knowledge Data Privacy", id: "Privasi Data Terenkripsi Penuh" },
        description: {
          en: "End-to-end encrypted biometric storage ensuring user health data is never shared or monetized.",
          id: "Enkripsi end-to-end yang menjamin data medis pengguna aman dan tidak pernah dijual.",
        },
        technicalNote: "AES-256 encryption with user-owned private keys",
      },
    ],
    testimonial: {
      quote: {
        en: "ALTIA DEV delivered an extraordinary mobile app that won Best Health UI 2023. Our users genuinely love waking up to Lumina every morning.",
        id: "ALTIA DEV menghadirkan aplikasi mobile luar biasa yang memenangkan Best Health UI 2023. Pengguna kami sangat menyukai pengalaman menggunakan Lumina.",
      },
      author: "Dr. Arthur Jensen",
      role: "Founder & Chief Medical Officer",
      company: "Lumina BioTech",
    },
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=1200&auto=format&fit=crop",
    ],
    impact: {
      en: [
        "120,000+ app store downloads in first 90 days",
        "4.9 star rating across iOS App Store & Google Play",
        "Winner of Best Health UI Design 2023",
      ],
      id: [
        "120.000+ unduhan dalam 90 hari pertama",
        "Rating 4.9 bintang di App Store & Google Play",
        "Pemenang Penghargaan Desain UI Kesehatan Terbaik 2023",
      ],
    },
    stack: ["React Native", "TypeScript", "HealthKit", "Node.js", "MongoDB", "Figma"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://lumina-health.altiadev.demo",
  },
  {
    slug: "vortex-saas-platform",
    category: "web",
    featured: false,
    year: "2023",
    title: {
      en: "Vortex: Collaborative Analytics & BI Canvas",
      id: "Vortex: Kanvas Kolaboratif Analitik & BI",
    },
    client: "Vortex Data Labs",
    tagline: {
      en: "Multiplayer data exploration canvas enabling real-time visual SQL querying and interactive graph generation.",
      id: "Kanvas eksplorasi data multiplayer dengan query SQL visual real-time dan pembuatan grafik interaktif.",
    },
    summary: {
      en: "High-performance web dashboard built with Next.js, WebAssembly for client-side SQL execution (DuckDB-Wasm), and collaborative presence powered by CRDTs.",
      id: "Dashboard web berkinerja tinggi yang ditenagai WebAssembly (DuckDB) untuk eksekusi SQL langsung di browser dan kolaborasi real-time.",
    },
    challenge: {
      en: "Running analytics on multi-million row datasets directly in the client browser with collaborative cursor states and zero server latency.",
      id: "Menjalankan analitik pada jutaan baris data langsung di browser dengan sinkronisasi kursor multi-user tanpa latensi server.",
    },
    solution: {
      en: "Embedded DuckDB-Wasm in a Web Worker, paired with Canvas2D charting and custom GSAP smooth micro-interactions.",
      id: "Menanamkan DuckDB-Wasm di Web Worker, dipadukan dengan visualisasi Canvas2D dan mikro-interaksi GSAP.",
    },
    metrics: [
      {
        value: "10M+",
        label: { en: "Rows Processed In-Browser", id: "Baris Data Diolah di Browser" },
        sublabel: { en: "In under 200ms with zero backend lag", id: "Dalam <200ms tanpa beban server backend" },
      },
      {
        value: "74%",
        label: { en: "Cloud Compute Savings", id: "Penghematan Biaya Komputasi" },
        sublabel: { en: "By leveraging client-side WebAssembly", id: "Berkat komputasi lokal WebAssembly" },
      },
      {
        value: "50+",
        label: { en: "Enterprise Teams", id: "Tim Enterprise Adopsi" },
        sublabel: { en: "Actively collaborating on data canvases", id: "Berkolaborasi aktif di kanvas analitik" },
      },
    ],
    architecture: {
      headline: {
        en: "In-Browser WebAssembly SQL Engine & Multiplayer CRDTs",
        id: "Mesin SQL WebAssembly di Browser & CRDT Multiplayer",
      },
      description: {
        en: "Heavy analytical queries run locally inside the user's browser via DuckDB compiled to WebAssembly, while cursor presence is synchronized via WebSockets and Yjs CRDTs.",
        id: "Kueri analitik berat dieksekusi langsung di browser pengguna via DuckDB WebAssembly, disinkronkan real-time dengan WebSockets dan CRDT.",
      },
      nodes: [
        {
          title: { en: "1. Web Worker SQL", id: "1. SQL di Web Worker" },
          detail: "DuckDB-Wasm executing queries in background thread",
          badge: "WebAssembly / C++",
        },
        {
          title: { en: "2. Multiplayer Presence", id: "2. Sinkronisasi Kursor Multiplayer" },
          detail: "Sub-20ms live cursor & viewport collaboration",
          badge: "Yjs / WebSockets",
        },
        {
          title: { en: "3. Canvas Charting Engine", id: "3. Engine Grafik Canvas" },
          detail: "60fps time-series rendering of millions of data points",
          badge: "Canvas2D / WebGL",
        },
        {
          title: { en: "4. Next.js App Shell", id: "4. App Shell Next.js" },
          detail: "Edge-authenticated workspace with instant load times",
          badge: "Next.js 14 / Tailwind",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Instant Client-Side SQL Execution", id: "Eksekusi SQL Instan di Browser" },
        description: {
          en: "Analyze massive CSV and Parquet files entirely in the browser without uploading sensitive raw data to external servers.",
          id: "Analisis berkas CSV dan Parquet raksasa langsung di browser tanpa perlu mengunggah data rahasia ke server luar.",
        },
        technicalNote: "DuckDB WebAssembly virtual filesystem",
      },
      {
        title: { en: "Multiplayer Visual Query Canvas", id: "Kanvas Visual Kueri Kolaboratif" },
        description: {
          en: "Data teams drag, connect, and transform datasets together in real-time with visual query nodes.",
          id: "Tim data dapat menghubungkan dan mentransformasi dataset secara bersamaan dengan node kueri visual.",
        },
        technicalNote: "Conflict-free replicated data types (CRDTs)",
      },
      {
        title: { en: "Instant One-Click Export & Embed", id: "Ekspor & Sematan Dashboard Seketika" },
        description: {
          en: "Turn any analysis canvas into an interactive public dashboard with responsive iframe embeds.",
          id: "Ubah hasil analisis menjadi dashboard interaktif publik siap semat dalam hitungan detik.",
        },
        technicalNote: "Standalone Web Component exporter",
      },
    ],
    testimonial: {
      quote: {
        en: "Vortex has completely transformed how our business intelligence team operates. ALTIA DEV engineered a breakthrough WebAssembly product.",
        id: "Vortex mentransformasi cara kerja tim BI kami. ALTIA DEV merekayasa produk WebAssembly yang benar-benar mutakhir.",
      },
      author: "Alexandre Moreau",
      role: "Head of Data Engineering",
      company: "Vortex Data Labs",
    },
    gallery: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    ],
    impact: {
      en: [
        "Processes 10M rows in under 200ms locally",
        "Reduced backend compute bill by 74%",
        "Adopted by 50+ enterprise data teams",
      ],
      id: [
        "Memproses 10 juta baris data dalam waktu < 200ms",
        "Mengurangi biaya server backend hingga 74%",
        "Digunakan oleh 50+ tim data enterprise",
      ],
    },
    stack: ["Next.js", "DuckDB-Wasm", "TypeScript", "Tailwind CSS", "WebSockets", "GSAP"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://vortex-bi.altiadev.demo",
  },
];
