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
      en: "Nexus — Autonomous Financial Intelligence Engine",
      id: "Nexus — Sistem Kecerdasan Finansial Otonom",
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
      en: "Aurora — E-Commerce Flagship & 3D Configurator",
      id: "Aurora — Flagship E-Commerce & Konfigurator 3D",
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
      en: "Strata — Cross-Platform Developer Workspace",
      id: "Strata — Workspace Developer Multi-Platform",
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
      en: "Cognita — Automated Enterprise Customer Support Agent",
      id: "Cognita — Agen Dukungan Pelanggan Enterprise Otomatis",
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
      en: "Lumina — Preventive Longevity & Health App",
      id: "Lumina — Aplikasi Kesehatan & Longevity Preventif",
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
      en: "Vortex — Collaborative Analytics & BI Canvas",
      id: "Vortex — Kanvas Kolaboratif Analitik & BI",
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
