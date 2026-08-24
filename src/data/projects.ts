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
    slug: "vads-knowledge-management-system",
    category: "ai",
    featured: true,
    year: "2026",
    title: {
      en: "VADS Knowledge Management System",
      id: "VADS Knowledge Management System",
    },
    client: "PT VADS Indonesia",
    tagline: {
      en: "Turning complex operational knowledge into something teams can find and use.",
      id: "Mengubah knowledge operasional yang kompleks menjadi sesuatu yang mudah ditemukan dan digunakan.",
    },
    summary: {
      en: "A multi-project knowledge management platform built from scratch for PT VADS Indonesia, combining Laravel, Meilisearch, role-based access, REST APIs, and AI-assisted document processing.",
      id: "Platform knowledge management multi-project yang dibangun dari nol untuk PT VADS Indonesia, menggabungkan Laravel, Meilisearch, role-based access, REST API, dan AI-assisted document processing.",
    },
    challenge: {
      en: "Operational knowledge was scattered across disparate manuals, documents, and teams, causing duplicated effort and knowledge loss during personnel transitions.",
      id: "Knowledge operasional tersebar di berbagai dokumen, manual, dan tim, menyebabkan duplikasi pekerjaan dan risiko hilangnya knowledge saat pergantian personel.",
    },
    solution: {
      en: "Engineered a centralized multi-tenant KMS with instant Meilisearch full-text indexing, OCR ingestion for scanned PDFs, and role-based access controls across distinct client projects.",
      id: "Membangun KMS multi-tenant terpusat dengan indexing Meilisearch instan, pipeline OCR untuk ekstraksi PDF, dan kontrol akses berbasis peran untuk berbagai project client.",
    },
    impact: {
      en: [
        "Centralized knowledge across multiple client project operations",
        "Sub-50ms search latency across thousands of operational SOPs and documents",
        "Automated OCR extraction pipeline for legacy scanned documentation",
        "Delivered from pitch to production deployment in just two months",
      ],
      id: [
        "Sentralisasi knowledge di seluruh operasional proyek client",
        "Latensi pencarian di bawah 50ms untuk ribuan dokumen dan SOP operasional",
        "Pipeline ekstraksi OCR otomatis untuk dokumen hasil scan",
        "Diselesaikan dari pitch hingga deployment production hanya dalam dua bulan",
      ],
    },
    metrics: [
      {
        value: "< 50ms",
        label: { en: "Search Latency", id: "Latensi Pencarian" },
        sublabel: { en: "Instant Meilisearch query speed", id: "Kecepatan query instan Meilisearch" },
      },
      {
        value: "100%",
        label: { en: "Multi-Tenant Isolation", id: "Isolasi Multi-Tenant" },
        sublabel: { en: "Role-based project security", id: "Keamanan proyek berbasis role" },
      },
      {
        value: "2 Months",
        label: { en: "Pitch to Production", id: "Pitch ke Produksi" },
        sublabel: { en: "Rapid enterprise turnaround", id: "Penyelesaian enterprise yang cepat" },
      },
    ],
    architecture: {
      headline: {
        en: "Multi-Tenant Search and AI Processing Architecture",
        id: "Arsitektur Search dan Pemrosesan AI Multi-Tenant",
      },
      description: {
        en: "Structured into four clear layers: Core Multi-Project KMS, Search and Indexing Layer, AI Ingestion Service, and REST API Integrations.",
        id: "Terstruktur dalam empat layer: Core Multi-Project KMS, Layer Search dan Indexing, AI Ingestion Service, dan Integrasi REST API.",
      },
      nodes: [
        {
          title: { en: "Core KMS & RBAC", id: "Core KMS & RBAC" },
          detail: "Laravel application managing project isolation and permission matrices.",
          badge: "Core",
        },
        {
          title: { en: "Meilisearch Engine", id: "Mesin Meilisearch" },
          detail: "Typo-tolerant high speed vector and lexical document search.",
          badge: "Search",
        },
        {
          title: { en: "OCR & Document AI", id: "OCR & Document AI" },
          detail: "Automated text extraction and parsing for unstructured files.",
          badge: "AI Pipeline",
        },
        {
          title: { en: "REST API Gateway", id: "REST API Gateway" },
          detail: "Secure endpoints for embedding knowledge into external enterprise portals.",
          badge: "API",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Search-First User Experience", id: "Pengalaman Berbasis Pencarian" },
        description: {
          en: "Instant typo-tolerant search across titles, tags, and document content with categorized project filters.",
          id: "Pencarian instan tahan salah ketik pada judul, tag, dan isi dokumen dengan filter proyek.",
        },
      },
      {
        title: { en: "AI-Assisted Document Processing", id: "Pemrosesan Dokumen Berbasis AI" },
        description: {
          en: "Extracts text and key facts from uploaded PDF and Word documents automatically during ingestion.",
          id: "Ekstraksi teks dan fakta penting secara otomatis dari dokumen PDF dan Word yang diunggah.",
        },
      },
      {
        title: { en: "Multi-Project Role-Based Access", id: "Akses Berbasis Peran Multi-Project" },
        description: {
          en: "Strict project boundaries ensuring team members only access knowledge relevant to their assignment.",
          id: "Batasan proyek yang ketat memastikan anggota tim hanya mengakses knowledge yang diizinkan.",
        },
      },
    ],
    stack: ["Laravel 11", "PHP 8.3", "Meilisearch", "PostgreSQL", "Tesseract OCR", "REST APIs", "Docker", "Tailwind CSS"],
    image: "/uploads/portfolio/vads-knowledge-management-system/1.webp",
    gallery: [
      "/uploads/portfolio/vads-knowledge-management-system/1.webp",
      "/uploads/portfolio/vads-knowledge-management-system/2.webp",
      "/uploads/portfolio/vads-knowledge-management-system/3.webp",
    ],
  },
  {
    slug: "javanegra-coffee",
    category: "web",
    featured: true,
    year: "2026",
    title: {
      en: "Javanegra Coffee",
      id: "Javanegra Coffee",
    },
    client: "Javanegra Coffee",
    tagline: {
      en: "From online store to digital coffee catalog and origin showcase.",
      id: "Dari online store menjadi digital coffee catalog dan etalase asal kopi.",
    },
    summary: {
      en: "Originally built as an e-commerce platform in 2020, evolved in 2026 into a refined product catalog communicating Indonesian single-origin coffee heritage, rainforest sourcing, and wholesale distribution.",
      id: "Awalnya dibangun sebagai platform e-commerce pada 2020, berevolusi pada 2026 menjadi katalog produk yang mengomunikasikan warisan kopi single-origin Indonesia, sumber rainforest, dan distribusi wholesale.",
    },
    challenge: {
      en: "The brand needed to shift focus from direct-to-consumer online checkout towards storytelling, origin transparency, premium corporate gifting, and B2B retail partnerships.",
      id: "Brand perlu menggeser fokus dari checkout online langsung ke storytelling, transparansi asal kopi, corporate gifting premium, dan kemitraan retail B2B.",
    },
    solution: {
      en: "Redesigned the digital experience with an editorial aesthetic, interactive origin mapping, roast profile breakdowns, and direct wholesale and retail partner inquiry channels.",
      id: "Mendesain ulang pengalaman digital dengan estetika editorial, pemetaan asal kopi interaktif, profil sangrai, dan jalur inquiry mitra retail serta wholesale langsung.",
    },
    impact: {
      en: [
        "Elevated brand positioning for Indonesian rainforest single-origin coffee",
        "Streamlined inquiry flow for corporate gifting and international distribution",
        "Fast, lightweight catalog architecture with high SEO discoverability",
        "6+ years of continuous digital partnership and brand stewardship",
      ],
      id: [
        "Meningkatkan positioning brand untuk kopi single-origin rainforest Indonesia",
        "Menyederhanakan alur inquiry untuk corporate gifting dan distribusi internasional",
        "Arsitektur katalog ringan dan cepat dengan discoverability SEO tinggi",
        "Kemitraan digital dan pendampingan brand berkelanjutan selama lebih dari 6 tahun",
      ],
    },
    metrics: [
      {
        value: "6+ Years",
        label: { en: "Digital Stewardship", id: "Kemitraan Digital" },
        sublabel: { en: "Continuous brand evolution", id: "Evolusi brand berkelanjutan" },
      },
      {
        value: "100%",
        label: { en: "Rainforest Origin Focus", id: "Fokus Asal Rainforest" },
        sublabel: { en: "Showcasing Indonesian terroir", id: "Menampilkan terroir kopi Indonesia" },
      },
      {
        value: "Global",
        label: { en: "Market Reach", id: "Jangkauan Pasar" },
        sublabel: { en: "B2B, retail, and export readiness", id: "Kesiapan B2B, retail, dan ekspor" },
      },
    ],
    architecture: {
      headline: {
        en: "Editorial Origin Showcase and Catalog Architecture",
        id: "Arsitektur Etalase Asal Kopi Editorial dan Katalog Produk",
      },
      description: {
        en: "Engineered around an editorial content structure connecting terroir storytelling, coffee varieties, and direct wholesale channeling.",
        id: "Dirancang dengan struktur konten editorial yang menghubungkan cerita terroir, varietas kopi, dan penyaluran wholesale langsung.",
      },
      nodes: [
        {
          title: { en: "CMS Content Engine", id: "Engine Konten CMS" },
          detail: "Custom post types managing origin stories, farmer profiles, and coffee tasting notes.",
          badge: "Content",
        },
        {
          title: { en: "Interactive Origin Explorer", id: "Eksplorasi Asal Interaktif" },
          detail: "Dynamic mapping highlighting Indonesian rainforest regions from Sumatra to Papua.",
          badge: "Frontend",
        },
        {
          title: { en: "B2B Lead Gateway", id: "Gateway Lead B2B" },
          detail: "Direct inquiry routing for corporate gifting, cafe supply, and export distribution.",
          badge: "Integration",
        },
        {
          title: { en: "Cloudflare Global CDN", id: "CDN Global Cloudflare" },
          detail: "Optimized image delivery, WebP caching, and sub-second asset latency.",
          badge: "Edge",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Single-Origin Terroir Showcase", id: "Etalase Terroir Single-Origin" },
        description: {
          en: "Dedicated visual profiles detailing growing altitudes, processing methods, and farmer stories.",
          id: "Profil visual khusus yang merinci ketinggian tanam, metode pemrosesan, dan cerita petani.",
        },
      },
      {
        title: { en: "Direct B2B and Retail Channeling", id: "Penyaluran B2B dan Retail Langsung" },
        description: {
          en: "Integrated inquiry routing for horeca, corporate packages, and retail stockists.",
          id: "Perutean inquiry terintegrasi untuk horeca, paket korporat, dan distributor retail.",
        },
      },
    ],
    stack: ["WordPress", "PHP 8.2", "Tailwind CSS", "Alpine.js", "MySQL", "Cloudflare CDN"],
    image: "/uploads/portfolio/javanegra-coffee/1.webp",
    liveUrl: "https://www.javanegra.com/",
    gallery: [
      "/uploads/portfolio/javanegra-coffee/1.webp",
      "/uploads/portfolio/javanegra-coffee/2.webp",
      "/uploads/portfolio/javanegra-coffee/3.webp",
    ],
  },
  {
    slug: "javanegra-gourmet",
    category: "web",
    featured: true,
    year: "2025",
    title: {
      en: "Javanegra Gourmet",
      id: "Javanegra Gourmet",
    },
    client: "Javanegra Gourmet",
    tagline: {
      en: "One family. Many dining experiences.",
      id: "Satu keluarga. Banyak pengalaman kuliner.",
    },
    summary: {
      en: "A digital home for Javanegra Gourmet, the hospitality group led by Chef Andrea Peresthu, uniting culinary concepts across Jakarta and Bali into one cohesive visual presence.",
      id: "Rumah digital untuk Javanegra Gourmet, grup hospitality yang dipimpin oleh Chef Andrea Peresthu, menyatukan konsep kuliner di Jakarta dan Bali ke dalam satu kehadiran visual yang kohesif.",
    },
    challenge: {
      en: "Representing an expanding family of distinct restaurant concepts, each with its own character, menu philosophy, and location, while maintaining group-level culinary prestige.",
      id: "Merepresentasikan keluarga konsep restoran yang berkembang, masing-masing dengan karakter, filosofi menu, dan lokasi sendiri, sambil menjaga prestise kuliner tingkat grup.",
    },
    solution: {
      en: "Architected a unified digital experience where visitors can explore Chef Andrea Peresthu's culinary philosophy, discover each restaurant concept, view seasonal menus, and make reservations.",
      id: "Membangun pengalaman digital terpadu di mana pengunjung dapat menjelajahi filosofi kuliner Chef Andrea Peresthu, menemukan konsep restoran, melihat menu musiman, dan melakukan reservasi.",
    },
    impact: {
      en: [
        "Unified multiple restaurant brands into a prestigious digital ecosystem",
        "Seamless outlet discovery across Jakarta and Bali destinations",
        "Direct reservation routing and catering inquiry integration",
        "Long-standing digital partnership since June 2020",
      ],
      id: [
        "Menyatukan berbagai brand restoran ke dalam ekosistem digital prestisius",
        "Kemudahan menemukan outlet di destinasi Jakarta dan Bali",
        "Integrasi reservasi langsung dan inquiry catering",
        "Kemitraan digital jangka panjang sejak Juni 2020",
      ],
    },
    metrics: [
      {
        value: "8+",
        label: { en: "Dining Concepts", id: "Konsep Kuliner" },
        sublabel: { en: "Jakarta and Bali locations", id: "Lokasi Jakarta dan Bali" },
      },
      {
        value: "100%",
        label: { en: "Brand Cohesion", id: "Kohesi Brand" },
        sublabel: { en: "Chef-driven gastronomy", id: "Gastronomi dipimpin chef" },
      },
      {
        value: "5+ Years",
        label: { en: "Brand Partnership", id: "Kemitraan Brand" },
        sublabel: { en: "Ongoing digital stewardship", id: "Pendampingan digital berkelanjutan" },
      },
    ],
    architecture: {
      headline: {
        en: "Multi-Brand Hospitality and Reservation Architecture",
        id: "Arsitektur Hospitality Multi-Brand dan Reservasi Terpadu",
      },
      description: {
        en: "A structured digital architecture that balances group-level prestige with individual restaurant brand identities, menus, and reservation channels.",
        id: "Arsitektur digital terstruktur yang menyeimbangkan prestise tingkat grup dengan identitas brand, menu, dan jalur reservasi setiap restoran.",
      },
      nodes: [
        {
          title: { en: "Hospitality Core Engine", id: "Engine Utama Hospitality" },
          detail: "Centralized management of restaurant branches, operating hours, and seasonal menus.",
          badge: "Core",
        },
        {
          title: { en: "Venue Experience Layer", id: "Layer Pengalaman Venue" },
          detail: "Tailored brand microsites showcasing atmosphere and woodfire culinary specialties.",
          badge: "UI/UX",
        },
        {
          title: { en: "Direct Reservation API", id: "API Reservasi Langsung" },
          detail: "Instant routing to WhatsApp concierge and third-party table booking services.",
          badge: "Channel",
        },
        {
          title: { en: "High-Resolution Asset Mesh", id: "Distribusi Asset Visual" },
          detail: "Edge delivery for photography, high-definition menus, and video backgrounds.",
          badge: "CDN",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Multi-Venue Discovery", id: "Eksplorasi Multi-Venue" },
        description: {
          en: "Interactive directory showcasing dining atmosphere, signature dishes, and private dining options for each venue.",
          id: "Direktori interaktif yang menampilkan atmosfer bersantap, hidangan khas, dan opsi private dining setiap venue.",
        },
      },
      {
        title: { en: "Culinary Storytelling", id: "Storytelling Kuliner" },
        description: {
          en: "Highlights Mediterranean and Spanish woodfire grilling techniques guided by Chef Andrea Peresthu.",
          id: "Menampilkan teknik woodfire grilling khas Mediterania dan Spanyol di bawah arahan Chef Andrea Peresthu.",
        },
      },
    ],
    stack: ["WordPress", "PHP 8.2", "JavaScript", "Custom CSS", "Cloudflare", "MySQL"],
    image: "/uploads/portfolio/javanegra-gourmet/1.webp",
    liveUrl: "https://www.javanegragourmet.com/",
    gallery: [
      "/uploads/portfolio/javanegra-gourmet/1.webp",
      "/uploads/portfolio/javanegra-gourmet/2.webp",
      "/uploads/portfolio/javanegra-gourmet/3.webp",
    ],
  },
  {
    slug: "saptawell-corporate-website",
    category: "web",
    featured: true,
    year: "2025",
    title: {
      en: "Saptawell Corporate Website",
      id: "Saptawell Corporate Website",
    },
    client: "PT Saptawell Tehnicatama",
    tagline: {
      en: "Turning technical expertise into a clearer digital presence.",
      id: "Mengubah technical expertise menjadi digital presence yang lebih jelas.",
    },
    summary: {
      en: "A new corporate website designed and developed for PT Saptawell Tehnicatama, bringing services, heavy equipment, operational experience, certifications, and quotation flows into a structured B2B digital experience.",
      id: "Website corporate baru yang dirancang dan dikembangkan untuk PT Saptawell Tehnicatama, menyatukan services, equipment berat, operational experience, sertifikasi, dan alur quotation ke dalam digital experience B2B yang terstruktur.",
    },
    challenge: {
      en: "Presenting a technically complex energy services business with specialized snubbing units, wireline services, and deep operational histories without making the website feel overwhelming.",
      id: "Menyajikan bisnis energy services yang sangat teknis dengan unit snubbing khusus, layanan wireline, dan sejarah operasional mendalam tanpa membuat website terasa rumit atau membingungkan.",
    },
    solution: {
      en: "Engineered an intuitive capability and asset hierarchy in WordPress, structuring hydraulic workover specs, equipment rental catalogs, client credentials, and quotation pathways.",
      id: "Membangun hierarki kapabilitas dan aset yang intuitif di WordPress, menyusun spesifikasi hydraulic workover, katalog rental equipment, kredensial klien, dan jalur quotation.",
    },
    impact: {
      en: [
        "Structured presentation of complex services including Hydraulic Workover and Slickline",
        "Dedicated equipment technical layer detailing pulling, snubbing, and well capacity",
        "Surfaced operational credibility and historical engagements across major oil and gas operators",
        "Streamlined B2B quotation and RFP request funnel for prospective corporate clients",
      ],
      id: [
        "Penyajian terstruktur untuk layanan kompleks termasuk Hydraulic Workover dan Slickline",
        "Layer teknis equipment khusus yang merinci kapasitas pulling, snubbing, dan sumur aktif",
        "Menampilkan kredibilitas operasional dan pengalaman dengan operator migas terkemuka",
        "Mempermudah alur permintaan quotation dan RFP B2B bagi calon klien korporat",
      ],
    },
    metrics: [
      {
        value: "B2B",
        label: { en: "Information Architecture", id: "Arsitektur Informasi" },
        sublabel: { en: "Structured capability flow", id: "Alur kapabilitas terstruktur" },
      },
      {
        value: "4+",
        label: { en: "Core Service Areas", id: "Area Layanan Utama" },
        sublabel: { en: "HWU, Slickline, Labor, Rental", id: "HWU, Slickline, Tenaga Kerja, Rental" },
      },
      {
        value: "100%",
        label: { en: "Equipment Specs", id: "Spesifikasi Alat" },
        sublabel: { en: "Detailed operational capacity", id: "Kapasitas operasional mendalam" },
      },
    ],
    architecture: {
      headline: {
        en: "B2B Energy Capability and Asset Hierarchy Architecture",
        id: "Arsitektur Hierarki Kapabilitas dan Aset Energi B2B",
      },
      description: {
        en: "Structured across six progressive evaluation stages: Company Introduction, Service Capabilities, Equipment Assets, Operational Proof, Team/HSE Standards, and Commercial Quotation.",
        id: "Terstruktur melalui enam tahap evaluasi bertahap: Company Introduction, Service Capabilities, Equipment Assets, Bukti Operasional, Standar Tim/HSE, dan Quotation Komersial.",
      },
      nodes: [
        {
          title: { en: "Corporate Identity Core", id: "Pusat Identitas Korporat" },
          detail: "WordPress engine managing company history, vision, mission, and organizational hierarchy.",
          badge: "Core",
        },
        {
          title: { en: "Technical Asset Directory", id: "Direktori Aset Teknis" },
          detail: "Dedicated catalog showcasing HWU 340, HWU 225, HWU 150 specs and pulling capacity.",
          badge: "Equipment",
        },
        {
          title: { en: "HSE & Certification Layer", id: "Layer HSE & Sertifikasi" },
          detail: "Showcases permit-to-work compliance, lifting, sea survival, and safety standards.",
          badge: "Compliance",
        },
        {
          title: { en: "Commercial RFQ Gateway", id: "Gateway RFQ Komersial" },
          detail: "Custom quotation form routing technical specifications and tender inquiries directly.",
          badge: "Lead Funnel",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Technical Equipment Showcase", id: "Etalase Equipment Teknis" },
        description: {
          en: "Detailed specifications for Hydraulic Workover Snubbing Units (HWU 340, 225, 150), pulling/snubbing capacities, and well suitability.",
          id: "Spesifikasi mendalam untuk Hydraulic Workover Snubbing Units (HWU 340, 225, 150), kapasitas pulling/snubbing, dan kesesuaian sumur." },
      },
      {
        title: { en: "Credibility and Client Track Record", id: "Rekam Jejak Kredibilitas & Klien" },
        description: {
          en: "Surfaces proven track records with Pertamina PHE OSES, CNOOC SES, and PetroChina Jabung.",
          id: "Menampilkan rekam jejak terbukti bersama Pertamina PHE OSES, CNOOC SES, dan PetroChina Jabung." },
      },
    ],
    stack: ["WordPress", "PHP 8.2", "Elementor", "Responsive UI", "Custom CSS", "MySQL", "SpeedyCache"],
    image: "/uploads/portfolio/saptawell-corporate-website/1.webp",
    liveUrl: "https://saptawell.com/",
    gallery: [
      "/uploads/portfolio/saptawell-corporate-website/1.webp",
      "/uploads/portfolio/saptawell-corporate-website/2.webp",
      "/uploads/portfolio/saptawell-corporate-website/3.webp",
    ],
  },
  {
    slug: "atlas-knowledge-analyst",
    category: "ai",
    featured: true,
    year: "2025",
    title: {
      en: "Atlas Knowledge Analyst",
      id: "Atlas Knowledge Analyst",
    },
    client: "Confidential AI Product Concept",
    tagline: {
      en: "Ask questions across your knowledge. Get answers grounded in evidence.",
      id: "Ajukan pertanyaan ke seluruh knowledge Anda. Dapatkan jawaban yang tetap grounded pada evidence.",
    },
    summary: {
      en: "An AI-powered knowledge analysis workspace that creates an intelligence layer over complex internal documents, enabling semantic reasoning, cross-document comparison, and evidence citations.",
      id: "Workspace analisis knowledge berbasis AI yang membangun intelligence layer di atas dokumen internal kompleks, memungkinkan semantic reasoning, perbandingan lintas dokumen, dan sitasi evidence.",
    },
    challenge: {
      en: "Traditional search finds keywords in isolated files but fails to synthesize cross-document insights, identify contradictions, or trace conclusions back to authoritative sources.",
      id: "Pencarian tradisional hanya menemukan keyword di file terpisah, gagal menyintesis insight lintas dokumen, menemukan kontradiksi, atau menelusuri kesimpulan ke sumber resmi.",
    },
    solution: {
      en: "Engineered an agentic RAG pipeline that disassembles complex inquiries, retrieves multi-document context chunks, assesses evidence strength, and generates sourced synthesis reports.",
      id: "Membangun pipeline RAG agentic yang membedah pertanyaan kompleks, mengambil context chunk dari banyak dokumen, menilai kekuatan evidence, dan menghasilkan laporan terstruktur bersumber.",
    },
    impact: {
      en: [
        "Transforms passive document repositories into an active intelligence reasoning workspace",
        "Full evidence traceability linking every generated claim directly to source passages",
        "Cross-document comparison matrix detecting policy discrepancies automatically",
        "Multi-stage retrieval pipeline combining dense embeddings with hybrid sparse search",
      ],
      id: [
        "Mengubah repositori dokumen pasif menjadi workspace analisis berbasis penalaran aktif",
        "Ketertelusuran evidence lengkap yang menghubungkan setiap klaim ke dokumen sumber",
        "Matriks perbandingan lintas dokumen yang mendeteksi perbedaan kebijakan secara otomatis",
        "Pipeline retrieval multi-stage yang menggabungkan dense embedding dan sparse search hybrid",
      ],
    },
    metrics: [
      {
        value: "100%",
        label: { en: "Evidence Grounded", id: "Berdasar Evidence" },
        sublabel: { en: "Zero unverified claims", id: "Bebas klaim tanpa bukti" },
      },
      {
        value: "Hybrid",
        label: { en: "Retrieval Pipeline", id: "Pipeline Retrieval" },
        sublabel: { en: "Vector and keyword fusion", id: "Fusi vektor dan kata kunci" },
      },
      {
        value: "Cross-Doc",
        label: { en: "Analysis Scope", id: "Cakupan Analisis" },
        sublabel: { en: "Multi-document reasoning", id: "Penalaran lintas dokumen" },
      },
    ],
    architecture: {
      headline: {
        en: "Multi-Stage Knowledge Reasoning Pipeline",
        id: "Pipeline Penalaran Knowledge Multi-Stage",
      },
      description: {
        en: "Progresses from query decomposition and hybrid vector retrieval to cross-document context assembly and citation-backed synthesis.",
        id: "Bergerak dari dekomposisi query dan retrieval vektor hybrid ke penyusunan context lintas dokumen dan sintesis bersitasi.",
      },
      nodes: [
        {
          title: { en: "Query Decomposition", id: "Dekomposisi Query" },
          detail: "Breaks multifaceted business questions into targeted sub-queries.",
          badge: "Step 1",
        },
        {
          title: { en: "Hybrid Retrieval", id: "Retrieval Hybrid" },
          detail: "Combines dense vector embeddings with BM25 lexical precision.",
          badge: "Step 2",
        },
        {
          title: { en: "Evidence Evaluation", id: "Evaluasi Evidence" },
          detail: "Reranks retrieved passages and checks for factual consistency.",
          badge: "Step 3",
        },
        {
          title: { en: "Grounded Synthesis", id: "Sintesis Grounded" },
          detail: "Generates structured answer with interactive paragraph-level citations.",
          badge: "Step 4",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Evidence Citations Graph", id: "Grafik Sitasi Evidence" },
        description: {
          en: "Interactive visual map connecting synthesized findings to exact page numbers and paragraphs.",
          id: "Peta visual interaktif yang menghubungkan temuan ke nomor halaman dan paragraf dokumen.",
        },
      },
      {
        title: { en: "Cross-Document Comparison Matrix", id: "Matriks Perbandingan Lintas Dokumen" },
        description: {
          en: "Side-by-side analysis highlighting consensus and conflicting statements across multiple policies.",
          id: "Analisis berdampingan yang menyoroti konsensus dan kontradiksi di antara berbagai kebijakan.",
        },
      },
    ],
    stack: ["Next.js / React", "Python FastAPI", "LangChain / LlamaIndex", "Qdrant Vector DB", "OpenAI / Claude APIs", "Tailwind CSS"],
    image: "/uploads/portfolio/atlas-knowledge-analyst/1.webp",
    gallery: [
      "/uploads/portfolio/atlas-knowledge-analyst/1.webp",
      "/uploads/portfolio/atlas-knowledge-analyst/2.webp",
      "/uploads/portfolio/atlas-knowledge-analyst/3.webp",
    ],
  },
  {
    slug: "brew-mobile-commerce",
    category: "app",
    featured: true,
    year: "2024",
    title: {
      en: "Brew Mobile Commerce",
      id: "Brew Mobile Commerce",
    },
    client: "Confidential F&B Client",
    tagline: {
      en: "A complete mobile ordering experience, built natively for iOS and Android.",
      id: "Pengalaman pemesanan mobile yang dibangun secara native untuk iOS dan Android.",
    },
    summary: {
      en: "A production mobile commerce application for a food and beverage brand, guiding customers through product discovery, beverage customization, Midtrans payment, and real-time order tracking.",
      id: "Aplikasi mobile commerce production untuk brand F&B, memandu pelanggan melalui penemuan produk, kustomisasi minuman, pembayaran Midtrans, dan pelacakan pesanan real-time.",
    },
    challenge: {
      en: "Designing a frictionless ordering experience with complex drink modifiers, shot selections, and pickup scheduling across two native platforms with maximum UI responsiveness.",
      id: "Merancang pengalaman pemesanan tanpa hambatan dengan modifier minuman kompleks, pilihan shot, dan jadwal pickup di dua platform native dengan responsivitas UI maksimal.",
    },
    solution: {
      en: "Developed two native mobile applications in Swift for iOS and Kotlin for Android, integrating Midtrans payment SDKs and seamless order lifecycle management.",
      id: "Mengembangkan dua aplikasi native dalam Swift untuk iOS dan Kotlin untuk Android, mengintegrasikan SDK pembayaran Midtrans dan manajemen siklus pesanan yang mulus.",
    },
    impact: {
      en: [
        "Native 60fps fluid UI performance across all iOS and Android devices",
        "Frictionless multi-level beverage modifier customization pipeline",
        "Integrated Midtrans payment gateway with zero drop-off checkout",
        "Successfully deployed to production App Store and Google Play Store",
      ],
      id: [
        "Performa UI native 60fps yang sangat halus di semua perangkat iOS dan Android",
        "Pipeline kustomisasi modifier minuman multi-level yang mudah digunakan",
        "Integrasi payment gateway Midtrans dengan proses checkout lancar",
        "Berhasil diluncurkan ke production App Store dan Google Play Store",
      ],
    },
    metrics: [
      {
        value: "Native",
        label: { en: "iOS & Android", id: "iOS & Android" },
        sublabel: { en: "Swift and Kotlin codebases", id: "Codebase Swift dan Kotlin" },
      },
      {
        value: "60 FPS",
        label: { en: "Fluid UI Motion", id: "Animasi UI Halus" },
        sublabel: { en: "Zero frame drop transitions", id: "Transisi tanpa frame drop" },
      },
      {
        value: "Midtrans",
        label: { en: "Payment Gateway", id: "Payment Gateway" },
        sublabel: { en: "Seamless secure checkout", id: "Checkout aman dan cepat" },
      },
    ],
    architecture: {
      headline: {
        en: "Dual Native Mobile Commerce Architecture",
        id: "Arsitektur Mobile Commerce Dual Native",
      },
      description: {
        en: "Built natively on iOS and Android to maximize device capabilities, touch responsiveness, biometric payments, and offline resilience.",
        id: "Dibangun secara native di iOS dan Android untuk memaksimalkan kapabilitas perangkat, respons sentuh, pembayaran biometrik, dan ketahanan offline.",
      },
      nodes: [
        {
          title: { en: "Native iOS Client", id: "Klien Native iOS" },
          detail: "Swift and SwiftUI client with native animations, haptics, and Apple Pay readiness.",
          badge: "iOS",
        },
        {
          title: { en: "Native Android Client", id: "Klien Native Android" },
          detail: "Kotlin and Jetpack Compose app with Material 3 UI and hardware acceleration.",
          badge: "Android",
        },
        {
          title: { en: "Payment SDK Gateway", id: "Gateway SDK Pembayaran" },
          detail: "Midtrans Snap integration supporting QRIS, GoPay, virtual accounts, and cards.",
          badge: "Payment",
        },
        {
          title: { en: "Order Event Stream", id: "Stream Status Pesanan" },
          detail: "Real-time WebSocket events synchronizing kitchen status with customer mobile UI.",
          badge: "Real-Time",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Multi-Option Customization", id: "Kustomisasi Multi-Pilihan" },
        description: {
          en: "Interactive modifier screen for milk alternatives, espresso shot counts, syrup flavors, and sweetness levels.",
          id: "Layar modifier interaktif untuk alternatif susu, jumlah shot espresso, sirup, dan tingkat kemanisan.",
        },
      },
      {
        title: { en: "Live Order Status Tracking", id: "Pelacakan Status Pesanan Real-time" },
        description: {
          en: "Step-by-step progress indicator informing the customer from barista preparation to counter pickup.",
          id: "Indikator progres langkah demi langkah yang mengabari pelanggan mulai dari peracikan barista hingga siap diambil.",
        },
      },
    ],
    stack: ["Native iOS (Swift)", "Native Android (Kotlin)", "Midtrans SDK", "REST APIs", "Figma Design System"],
    image: "/uploads/portfolio/brew-mobile-commerce/1.webp",
    gallery: [
      "/uploads/portfolio/brew-mobile-commerce/1.webp",
      "/uploads/portfolio/brew-mobile-commerce/2.webp",
      "/uploads/portfolio/brew-mobile-commerce/3.webp",
    ],
  },
  {
    slug: "meridian-proposal-intelligence",
    category: "ai",
    featured: true,
    year: "2025",
    title: {
      en: "Meridian Proposal Intelligence",
      id: "Meridian Proposal Intelligence",
    },
    client: "Confidential AI Product Concept",
    tagline: {
      en: "Turn complex RFPs into a clearer path to proposal.",
      id: "Mengubah RFP yang kompleks menjadi arah proposal yang lebih jelas.",
    },
    summary: {
      en: "An AI-powered proposal intelligence workspace that ingests 100+ page RFP and tender documents, extracts requirements into a compliance matrix, and detects project risks.",
      id: "Workspace proposal intelligence bertenaga AI yang memproses dokumen RFP dan tender ratusan halaman, mengekstrak requirement ke compliance matrix, dan mendeteksi risiko proyek.",
    },
    challenge: {
      en: "Tender documents scatter critical compliance requirements across hundreds of pages, causing missed specifications, commercial risks, and manual spreadsheet delays.",
      id: "Dokumen tender menyebarkan requirement penting di ratusan halaman, menyebabkan spesifikasi terlewat, risiko komersial, dan keterlambatan spreadsheet manual.",
    },
    solution: {
      en: "Engineered an AI document extraction platform that automatically parses specifications into categorized mandatory requirements, compliance matrices, and risk scoring radars.",
      id: "Membangun platform ekstraksi dokumen AI yang otomatis membedah spesifikasi menjadi requirement wajib, compliance matrix, dan radar penilaian risiko.",
    },
    impact: {
      en: [
        "Accelerates RFP requirement extraction from days to under ten minutes",
        "Automated compliance matrix generator mapping tender specs to organizational capabilities",
        "AI risk evaluation radar flagging SLA penalties and strict non-standard liability clauses",
        "Generates structured proposal outline drafts directly aligned with evaluation criteria",
      ],
      id: [
        "Mempercepat ekstraksi requirement RFP dari hitungan hari menjadi di bawah sepuluh menit",
        "Generator compliance matrix otomatis memetakan spesifikasi tender ke kapabilitas tim",
        "Radar evaluasi risiko AI yang menandai penalti SLA dan klausul liabilitas ketat",
        "Menghasilkan draf outline proposal terstruktur sesuai kriteria penilaian tender",
      ],
    },
    metrics: [
      {
        value: "10 Min",
        label: { en: "RFP Analysis", id: "Analisis RFP" },
        sublabel: { en: "From 100+ page documents", id: "Dari dokumen 100+ halaman" },
      },
      {
        value: "100%",
        label: { en: "Compliance Coverage", id: "Cakupan Kepatuhan" },
        sublabel: { en: "Zero missed mandatory specs", id: "Bebas requirement terlewat" },
      },
      {
        value: "Risk Radar",
        label: { en: "Clause Evaluation", id: "Evaluasi Klausul" },
        sublabel: { en: "Flagging commercial pitfalls", id: "Menandai potensi risiko kontrak" },
      },
    ],
    architecture: {
      headline: {
        en: "Document Intelligence and Proposal Generation Architecture",
        id: "Arsitektur Document Intelligence dan Generator Proposal",
      },
      description: {
        en: "An end-to-end pipeline parsing complex PDF/Word tender specifications into structured compliance matrices and scored response foundations.",
        id: "Pipeline menyeluruh yang membedah spesifikasi tender format PDF/Word menjadi matriks kepatuhan terstruktur dan fondasi respons berbobot.",
      },
      nodes: [
        {
          title: { en: "Multi-Format Ingestion", id: "Ingestion Multi-Format" },
          detail: "Unstructured.io and layout parser extracting tables, clauses, and appendix text.",
          badge: "Parser",
        },
        {
          title: { en: "Requirement Categorizer", id: "Kategorisasi Requirement" },
          detail: "LLM extraction separating mandatory specifications from general terms.",
          badge: "NLP",
        },
        {
          title: { en: "Risk Evaluation Engine", id: "Engine Evaluasi Risiko" },
          detail: "Clause auditor highlighting SLA penalties, warranty liabilities, and scope gaps.",
          badge: "Audit",
        },
        {
          title: { en: "Compliance Matrix Canvas", id: "Kanvas Compliance Matrix" },
          detail: "Interactive workspace for proposal teams to assign section leads and track readiness.",
          badge: "UI Layer",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Tender Compliance Matrix Generator", id: "Generator Compliance Matrix Tender" },
        description: {
          en: "Extracts every requirement with ID, clause text, compliance status, and assigned lead.",
          id: "Mengekstrak setiap requirement dengan ID, teks klausul, status kepatuhan, dan penanggung jawab.",
        },
      },
      {
        title: { en: "AI Risk Evaluation Radar", id: "Radar Evaluasi Risiko AI" },
        description: {
          en: "Visual radar analyzing technical, legal, financial, and operational risk factors in contract terms.",
          id: "Radar visual menganalisis faktor risiko teknis, legal, finansial, dan operasional dalam kontrak.",
        },
      },
    ],
    stack: ["React / Next.js", "Python / LangChain", "Unstructured.io", "Qdrant", "Claude 3.5 Sonnet", "Tailwind CSS"],
    image: "/uploads/portfolio/meridian-proposal-intelligence/1.webp",
    gallery: [
      "/uploads/portfolio/meridian-proposal-intelligence/1.webp",
      "/uploads/portfolio/meridian-proposal-intelligence/2.webp",
      "/uploads/portfolio/meridian-proposal-intelligence/3.webp",
    ],
  },
  {
    slug: "lumen-research-ai-workspace",
    category: "ai",
    featured: false,
    year: "2025",
    title: {
      en: "Lumen Research AI Workspace",
      id: "Lumen Research AI Workspace",
    },
    client: "Confidential AI Product Concept",
    tagline: {
      en: "From scattered information to structured insight.",
      id: "Mengubah informasi yang tersebar menjadi insight yang terstruktur.",
    },
    summary: {
      en: "An AI-powered research workspace designed around the investigation workflow, gathering evidence, synthesizing findings, and producing structured research with provenance.",
      id: "Workspace research bertenaga AI yang dirancang mengikuti workflow investigasi, mengumpulkan evidence, menyintesis temuan, dan menghasilkan riset terstruktur dengan provenance yang jelas.",
    },
    challenge: {
      en: "Knowledge workers spend hours manually copying quotes, cross-referencing conflicting reports, and losing source links when compiling complex research.",
      id: "Peneliti menghabiskan waktu berjam-jam menyalin kutipan secara manual, membandingkan laporan berbeda, dan kehilangan tautan sumber saat menyusun riset.",
    },
    solution: {
      en: "Built an investigative canvas that plans research questions, extracts factual claims from documents and web sources, and visualizes source reliability trees.",
      id: "Membangun kanvas investigasi yang merencanakan pertanyaan riset, mengekstrak klaim fakta dari dokumen dan web, serta memvisualisasikan pohon reliabilitas sumber.",
    },
    impact: {
      en: [
        "Reduces deep research compilation time by over 70% while maintaining source accuracy",
        "Interactive claim verification tree highlighting strong vs weak evidence sources",
        "Structured research output generator with exportable Markdown and executive summaries",
        "Human-in-the-loop validation ensuring analysts maintain oversight of all conclusions",
      ],
      id: [
        "Mengurangi waktu penyusunan riset mendalam lebih dari 70% dengan akurasi tinggi",
        "Pohon verifikasi klaim interaktif yang membedakan bukti kuat dan lemah",
        "Generator output riset terstruktur dengan ekspor Markdown dan ringkasan eksekutif",
        "Validasi human-in-the-loop memastikan analis memegang kendali atas kesimpulan",
      ],
    },
    metrics: [
      {
        value: "70%",
        label: { en: "Time Saved", id: "Waktu Hemat" },
        sublabel: { en: "On deep research synthesis", id: "Pada sintesis riset mendalam" },
      },
      {
        value: "Full",
        label: { en: "Provenance", id: "Provenance Lengkap" },
        sublabel: { en: "Traceable claim verification", id: "Verifikasi klaim yang dapat dilacak" },
      },
      {
        value: "Structured",
        label: { en: "Output Format", id: "Format Output" },
        sublabel: { en: "Executive-ready briefings", id: "Briefing siap pakai untuk eksekutif" },
      },
    ],
    architecture: {
      headline: {
        en: "Investigative Canvas and Provenance Graph Architecture",
        id: "Arsitektur Kanvas Investigasi dan Graf Provenance",
      },
      description: {
        en: "An intelligence workflow separating source gathering, claim extraction, evidence validation, and final research synthesis.",
        id: "Workflow intelligence yang memisahkan pengumpulan sumber, ekstraksi klaim, validasi evidence, dan sintesis riset akhir.",
      },
      nodes: [
        {
          title: { en: "Research Plan Engine", id: "Engine Rencana Riset" },
          detail: "Disassembles high-level research questions into verifiable sub-hypotheses.",
          badge: "Planning",
        },
        {
          title: { en: "Claim Extraction Layer", id: "Layer Ekstraksi Klaim" },
          detail: "Isolates factual assertions from PDFs, news reports, and academic journals.",
          badge: "Extraction",
        },
        {
          title: { en: "Citation Verification Tree", id: "Pohon Verifikasi Sitasi" },
          detail: "Hierarchical provenance graph validating source consistency and consensus.",
          badge: "Verification",
        },
        {
          title: { en: "Structured Synthesis Engine", id: "Engine Sintesis Terstruktur" },
          detail: "Exports executive briefing memos with footnotes linked to exact source text.",
          badge: "Export",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Claims Synthesis Panel", id: "Panel Sintesis Klaim" },
        description: {
          en: "Aggregates key claims from across multiple sources into cohesive thematic groupings.",
          id: "Mengelompokkan klaim utama dari berbagai sumber ke dalam tema-tema yang kohesif.",
        },
      },
      {
        title: { en: "Citation Verification Tree", id: "Pohon Verifikasi Sitasi" },
        description: {
          en: "Visual hierarchy displaying primary sources, secondary references, and confidence scores.",
          id: "Hierarki visual yang menampilkan sumber primer, referensi sekunder, dan skor keyakinan.",
        },
      },
    ],
    stack: ["Next.js", "TypeScript", "Python FastAPI", "Milvus / ChromaDB", "Claude 3.5 Sonnet", "Tailwind CSS"],
    image: "/uploads/portfolio/lumen-research-ai-workspace/1.webp",
    gallery: [
      "/uploads/portfolio/lumen-research-ai-workspace/1.webp",
      "/uploads/portfolio/lumen-research-ai-workspace/2.webp",
      "/uploads/portfolio/lumen-research-ai-workspace/3.webp",
    ],
  },
  {
    slug: "event-experience-platform",
    category: "app",
    featured: false,
    year: "2024",
    title: {
      en: "Event Experience Platform",
      id: "Event Experience Platform",
    },
    client: "Enterprise Event Client",
    tagline: {
      en: "One digital experience from registration to the final doorprize.",
      id: "Satu pengalaman digital dari registrasi hingga doorprize terakhir.",
    },
    summary: {
      en: "A multi-surface event operations platform covering registration, approval workflows, on-site QR check-in, booth digital stamp passports, and real-time doorprize draws.",
      id: "Platform operasional event multi-surface yang mencakup registrasi, alur approval, check-in QR di lokasi, paspor stempel digital booth, dan undian doorprize real-time.",
    },
    challenge: {
      en: "Coordinating high-volume attendee flows on event day without queues, ensuring verified eligibility for session check-ins, sponsor booth stamps, and stage lottery drawings.",
      id: "Mengkoordinasikan arus peserta bervolume tinggi di hari event tanpa antrean, memastikan verifikasi kehadiran sesi, stempel booth sponsor, dan undian panggung.",
    },
    solution: {
      en: "Engineered a decoupled ecosystem with a fast attendee Progressive Web App, dedicated on-site kiosk scanner terminals, and an interactive stage presentation lottery wheel.",
      id: "Membangun ekosistem terpisah dengan PWA cepat untuk peserta, terminal scanner kiosk di lokasi, dan roda undian interaktif untuk layar panggung utama.",
    },
    impact: {
      en: [
        "Zero queue bottlenecks during peak morning attendee registration check-ins",
        "Over 90% attendee participation in sponsor booth digital stamp collection",
        "Live transparent stage doorprize generation with instant winner SMS notifications",
        "Resilient offline-first scanning terminals for guaranteed event-day continuity",
      ],
      id: [
        "Tanpa antrean macet saat jam sibuk check-in registrasi pagi",
        "Partisipasi peserta di atas 90% dalam pengumpulan stempel booth sponsor",
        "Undian doorprize panggung transparan dengan notifikasi SMS pemenang instan",
        "Terminal scanner offline-first yang andal untuk kelancaran hari event",
      ],
    },
    metrics: [
      {
        value: "1,500+",
        label: { en: "Event Attendees", id: "Peserta Event" },
        sublabel: { en: "Checked in seamlessly", id: "Check-in lancar tanpa antrean" },
      },
      {
        value: "3 Surfaces",
        label: { en: "App Ecosystem", id: "Ekosistem Aplikasi" },
        sublabel: { en: "Attendee PWA, Kiosk, Stage", id: "PWA Peserta, Kiosk, Layar Panggung" },
      },
      {
        value: "< 2s",
        label: { en: "Check-in Speed", id: "Kecepatan Check-in" },
        sublabel: { en: "QR scan and badge verification", id: "Scan QR dan verifikasi badge" },
      },
    ],
    architecture: {
      headline: {
        en: "Decoupled Multi-Surface Event Architecture",
        id: "Arsitektur Event Multi-Surface Terdesentralisasi",
      },
      description: {
        en: "Separated into dedicated application surfaces for attendees, scanning staff, booth sponsors, and the main stage presentation screen.",
        id: "Dipisahkan ke dalam antarmuka aplikasi khusus untuk peserta, staf scanner, sponsor booth, dan layar presentasi panggung utama.",
      },
      nodes: [
        {
          title: { en: "Attendee PWA", id: "PWA Peserta" },
          detail: "Mobile web application for personalized badge QR, session agendas, and digital stamp passport.",
          badge: "Attendee UI",
        },
        {
          title: { en: "Offline-Ready Kiosk Terminal", id: "Terminal Kiosk Scanner" },
          detail: "High-speed camera scanner validating tickets at entrance doors in under two seconds.",
          badge: "On-Site Staff",
        },
        {
          title: { en: "Doorprize Lottery Engine", id: "Mesin Undian Doorprize" },
          detail: "WebSocket animated wheel for big stage displays checking stamp eligibility rules in real time.",
          badge: "Stage Display",
        },
        {
          title: { en: "Core Event API & Redis", id: "Core API Event & Redis" },
          detail: "Laravel backend handling high-concurrency ticket validation and attendee telemetry.",
          badge: "Backend",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Multi-Surface Experience", id: "Pengalaman Multi-Surface" },
        description: {
          en: "Dedicated interfaces for attendees (PWA), check-in staff (kiosks), booth sponsors (stamp scanners), and stage MCs (lottery wheel).",
          id: "Antarmuka khusus untuk peserta (PWA), staf check-in (kiosk), sponsor booth (scanner stempel), dan MC panggung (roda undian).",
        },
      },
      {
        title: { en: "Digital Stamp Passport", id: "Paspor Stempel Digital" },
        description: {
          en: "Gamified sponsor booth engagement requiring attendees to collect stamps before unlocking doorprize eligibility.",
          id: "Gamifikasi keterlibatan booth sponsor yang mewajibkan peserta mengumpulkan stempel sebelum membuka syarat undian doorprize.",
        },
      },
    ],
    stack: ["Laravel", "PWA", "Vue.js / React", "WebSockets", "MySQL", "Tailwind CSS", "Redis"],
    image: "/uploads/portfolio/event-experience-platform/1.webp",
    gallery: [
      "/uploads/portfolio/event-experience-platform/1.webp",
      "/uploads/portfolio/event-experience-platform/2.webp",
      "/uploads/portfolio/event-experience-platform/3.webp",
    ],
  },
  {
    slug: "padel-tournament-platform",
    category: "app",
    featured: false,
    year: "2024",
    title: {
      en: "Padel Tournament Platform",
      id: "Padel Tournament Platform",
    },
    client: "Sports Event Client",
    tagline: {
      en: "From registration and bracket generation to real-time live scoring.",
      id: "Dari registrasi dan pembuatan bagan hingga live scoring real-time.",
    },
    summary: {
      en: "A tournament management web platform for padel competitions, automating bracket generation, attendance check-in, court assignment, and real-time point-by-point match scoring.",
      id: "Platform web manajemen turnamen untuk kompetisi padel, mengotomatisasi pembuatan bagan pertandingan, check-in kehadiran, alokasi lapangan, dan skor langsung poin demi poin.",
    },
    challenge: {
      en: "Tournament directors struggled with manual brackets, seed balancing, and paper score tracking that caused match delays and spectator confusion.",
      id: "Penyelenggara turnamen kesulitan dengan bagan manual, penyeimbangan unggulan, dan pencatatan skor kertas yang menyebabkan keterlambatan pertandingan.",
    },
    solution: {
      en: "Built an administrative tournament engine in Laravel deployed via Dokploy, paired with a high-speed React live scoring interface for court umpires and spectators.",
      id: "Membangun mesin turnamen administratif di Laravel yang di-deploy via Dokploy, dipadukan dengan interface live scoring React cepat untuk wasit lapangan dan penonton.",
    },
    impact: {
      en: [
        "Automated bracket generation eliminating manual seeding errors",
        "Instant point-by-point score broadcasting to spectator mobile phones",
        "Streamlined court scheduling and umpire match assignment workflows",
        "Containerized deployment and high reliability via Dokploy infrastructure",
      ],
      id: [
        "Pembuatan bagan otomatis yang mengeliminasi kesalahan seeding manual",
        "Penyiaran skor poin demi poin instan ke ponsel penonton",
        "Alur penjadwalan lapangan dan penugasan wasit yang efisien",
        "Deployment berbasis container dengan keandalan tinggi via Dokploy",
      ],
    },
    metrics: [
      {
        value: "Real-Time",
        label: { en: "Live Scoring", id: "Skor Langsung" },
        sublabel: { en: "Instant point synchronization", id: "Sinkronisasi poin instan" },
      },
      {
        value: "100%",
        label: { en: "Automated Brackets", id: "Bagan Otomatis" },
        sublabel: { en: "Eliminating manual seed errors", id: "Bebas kesalahan susunan bagan" },
      },
      {
        value: "Dokploy",
        label: { en: "DevOps Infrastructure", id: "Infrastruktur DevOps" },
        sublabel: { en: "Isolated container deploy", id: "Deployment container terisolasi" },
      },
    ],
    architecture: {
      headline: {
        en: "Hybrid Administrative and Live Scoring Architecture",
        id: "Arsitektur Administratif dan Live Scoring Hybrid",
      },
      description: {
        en: "Combines a server-rendered administrative backend with a dedicated reactive front-end client for live court umpiring.",
        id: "Menggabungkan backend administratif server-rendered dengan klien front-end reaktif untuk penjurian pertandingan di lapangan.",
      },
      nodes: [
        {
          title: { en: "Tournament Control Core", id: "Core Kontrol Turnamen" },
          detail: "Laravel engine generating knockout brackets, seeding algorithms, and court schedules.",
          badge: "Admin Core",
        },
        {
          title: { en: "Umpire Scoring Client", id: "Klien Wasit Lapangan" },
          detail: "Touch-optimized React interface for fast point-by-point score logging on mobile tablets.",
          badge: "Score UI",
        },
        {
          title: { en: "Public Bracket Broadcaster", id: "Penyiaran Bagan Publik" },
          detail: "Live updates syncing match scores and court progressions to spectator screens.",
          badge: "Broadcast",
        },
        {
          title: { en: "Dokploy Container Host", id: "Host Container Dokploy" },
          detail: "Docker container deployment ensuring rapid provisioning and zero-friction rollback.",
          badge: "DevOps",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Live Point-by-Point Scoreboard", id: "Papan Skor Poin demi Poin Langsung" },
        description: {
          en: "Fast-touch scoring UI allowing umpires to log aces, faults, games, and set tiebreakers in real time.",
          id: "UI pencatatan skor cepat memudahkan wasit mencatat ace, fault, game, dan tiebreaker set secara real time.",
        },
      },
      {
        title: { en: "Dynamic Bracket Progression", id: "Perkembangan Bagan Dinamis" },
        description: {
          en: "Winners advance automatically through knockout stages with court assignments updated on public displays.",
          id: "Pemenang otomatis maju ke babak berikutnya dengan update alokasi lapangan di layar publik.",
        },
      },
    ],
    stack: ["Laravel", "React", "Livewire", "Dokploy / Docker", "Tailwind CSS", "PostgreSQL"],
    image: "/uploads/portfolio/padel-tournament-platform/1.webp",
    gallery: [
      "/uploads/portfolio/padel-tournament-platform/1.webp",
      "/uploads/portfolio/padel-tournament-platform/2.webp",
      "/uploads/portfolio/padel-tournament-platform/3.webp",
    ],
  },
  {
    slug: "total-cakra-alam",
    category: "web",
    featured: false,
    year: "2025",
    title: {
      en: "Total Cakra Alam",
      id: "Total Cakra Alam",
    },
    client: "Total Cakra Alam",
    tagline: {
      en: "A corporate website built to turn experience into credibility.",
      id: "Website corporate yang mengubah pengalaman menjadi kredibilitas.",
    },
    summary: {
      en: "A complete redesign of Total Cakra Alam's corporate digital presence, presenting deep capabilities across general contracting, construction management, specialized supply, and interior design.",
      id: "Redesign menyeluruh digital presence Total Cakra Alam, menghadirkan kapabilitas di bidang general contracting, manajemen konstruksi, supply khusus, dan interior design.",
    },
    challenge: {
      en: "The company required a professional digital presence that communicated established credibility across large-scale government and private sector infrastructure projects.",
      id: "Perusahaan membutuhkan digital presence profesional yang mengomunikasikan kredibilitas kuat di berbagai proyek infrastruktur pemerintah dan swasta berskala besar.",
    },
    solution: {
      en: "Engineered a structured corporate website built on a robust WordPress foundation, highlighting portfolio case studies, certifications, and multi-sector capabilities.",
      id: "Membangun website korporat terstruktur di atas foundation WordPress yang andal, menonjolkan studi kasus portfolio, sertifikasi, dan kapabilitas multi-sektor.",
    },
    impact: {
      en: [
        "Strengthened corporate credibility for tender submissions and partner evaluations",
        "Clear presentation of multi-industry capabilities from construction to medical supply",
        "Maintained and supported continuously by ALTIA DEV since January 2019",
        "Fast loading times and high availability across corporate networks",
      ],
      id: [
        "Memperkuat kredibilitas korporat untuk pengajuan tender dan evaluasi mitra",
        "Penyajian kapabilitas multi-industri dari konstruksi hingga suplai medis",
        "Dikelola dan didukung secara berkelanjutan oleh ALTIA DEV sejak Januari 2019",
        "Waktu muat cepat dan ketersediaan tinggi di seluruh jaringan korporat",
      ],
    },
    metrics: [
      {
        value: "7+ Years",
        label: { en: "Ongoing Maintenance", id: "Maintenance Berkelanjutan" },
        sublabel: { en: "Trusted technology partner", id: "Mitra teknologi terpercaya" },
      },
      {
        value: "Grade B1",
        label: { en: "Contractor Status", id: "Kualifikasi Kontraktor" },
        sublabel: { en: "Large scale capability", id: "Kapabilitas skala besar" },
      },
      {
        value: "99.9%",
        label: { en: "Platform Uptime", id: "Uptime Platform" },
        sublabel: { en: "Reliable corporate presence", id: "Digital presence yang andal" },
      },
    ],
    architecture: {
      headline: {
        en: "Corporate Credibility and Portfolio Showcase Architecture",
        id: "Arsitektur Kredibilitas Korporat dan Etalase Portfolio Proyek",
      },
      description: {
        en: "A robust corporate web architecture designed for stability, high availability, fast tender document downloads, and multi-division presentation.",
        id: "Arsitektur web korporat andal yang dirancang untuk stabilitas, ketersediaan tinggi, unduhan dokumen tender yang cepat, dan penyajian multi-divisi.",
      },
      nodes: [
        {
          title: { en: "Corporate Content Backbone", id: "Pusat Konten Korporat" },
          detail: "Customized WordPress structure managing project archives, licenses, and leadership profiles.",
          badge: "CMS",
        },
        {
          title: { en: "Sector Classification Matrix", id: "Matriks Klasifikasi Sektor" },
          detail: "Interactive filtering separating civil construction, MEP, medical supply, and interior design.",
          badge: "Structure",
        },
        {
          title: { en: "Tender Documentation Hub", id: "Hub Dokumentasi Tender" },
          detail: "Secure and fast document hosting for company profile downloads and verification.",
          badge: "Storage",
        },
        {
          title: { en: "LiteSpeed Enterprise Cache", id: "Cache LiteSpeed Enterprise" },
          detail: "Server-level caching and HTTP/3 support ensuring sub-second response times.",
          badge: "Performance",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Project Portfolio Directory", id: "Direktori Portfolio Proyek" },
        description: {
          en: "Showcases completed infrastructure, commercial construction, and interior fit-out projects.",
          id: "Menampilkan proyek infrastruktur, konstruksi komersial, dan interior fit-out yang telah selesai.",
        },
      },
      {
        title: { en: "Multi-Division Overview", id: "Ikhtisar Multi-Divisi" },
        description: {
          en: "Structured breakdown of general supply, engineering services, and medical distribution.",
          id: "Struktur detail dari layanan suplai umum, jasa rekayasa, dan distribusi medis.",
        },
      },
    ],
    stack: ["WordPress", "PHP 8.2", "Custom Theme", "JavaScript", "MySQL", "LiteSpeed"],
    image: "/uploads/portfolio/total-cakra-alam/1.webp",
    liveUrl: "https://totalcakraalam.com/",
    gallery: [
      "/uploads/portfolio/total-cakra-alam/1.webp",
      "/uploads/portfolio/total-cakra-alam/2.webp",
      "/uploads/portfolio/total-cakra-alam/3.webp",
    ],
  },
  {
    slug: "javanegra-cloud-identity",
    category: "app",
    featured: false,
    year: "2023",
    title: {
      en: "Javanegra Cloud & Identity",
      id: "Javanegra Cloud & Identity",
    },
    client: "Javanegra Group",
    tagline: {
      en: "A self-hosted private cloud, communication, and identity ecosystem.",
      id: "Ekosistem cloud, komunikasi, dan identity yang dibangun secara self-hosted.",
    },
    summary: {
      en: "Enterprise digital infrastructure migrating Javanegra from legacy cPanel hosting to a self-hosted private cloud combining encrypted mail, Nextcloud collaboration, and centralized Keycloak SSO.",
      id: "Infrastruktur digital enterprise yang memigrasi Javanegra dari hosting cPanel lama ke private cloud self-hosted yang menggabungkan email terenkripsi, kolaborasi Nextcloud, dan SSO terpusat Keycloak.",
    },
    challenge: {
      en: "Overcoming storage limits, rising third-party SaaS license costs, and fragmented user identities across multiple corporate hospitality locations.",
      id: "Mengatasi batasan storage, kenaikan biaya lisensi SaaS pihak ketiga, dan fragmentasi akun user di berbagai lokasi hospitality korporat.",
    },
    solution: {
      en: "Architected a self-hosted infrastructure ecosystem integrating Stalwart / Mailcow mail servers, Nextcloud files and calendar, and centralized Authentik / Keycloak Single Sign-On.",
      id: "Merancang ekosistem infrastruktur self-hosted yang mengintegrasikan server email Stalwart / Mailcow, file dan kalender Nextcloud, serta Single Sign-On terpusat Authentik / Keycloak.",
    },
    impact: {
      en: [
        "Total organization ownership over private data and communications",
        "Substantial long-term cost reduction compared to commercial SaaS subscriptions",
        "Centralized single sign-on across all operational employee accounts",
        "Continuous infrastructure management and zero-downtime reliability since May 2023",
      ],
      id: [
        "Kepemilikan penuh organisasi atas data dan komunikasi privat",
        "Penghematan biaya jangka panjang dibandingkan langganan SaaS komersial",
        "Single Sign-On terpusat di seluruh akun operasional karyawan",
        "Pengelolaan infrastruktur berkelanjutan dan keandalan tinggi sejak Mei 2023",
      ],
    },
    metrics: [
      {
        value: "100%",
        label: { en: "Data Sovereignty", id: "Kedaulatan Data" },
        sublabel: { en: "Self-hosted private servers", id: "Server privat self-hosted" },
      },
      {
        value: "SSO",
        label: { en: "Centralized Identity", id: "Identity Terpusat" },
        sublabel: { en: "One login for all services", id: "Satu login untuk semua layanan" },
      },
      {
        value: "3+ Years",
        label: { en: "Operational Uptime", id: "Uptime Operasional" },
        sublabel: { en: "Continuous management", id: "Pengelolaan berkelanjutan" },
      },
    ],
    architecture: {
      headline: {
        en: "Self-Hosted Private Cloud and Identity Architecture",
        id: "Arsitektur Private Cloud dan Identity Terpusat Self-Hosted",
      },
      description: {
        en: "A unified self-hosted ecosystem integrating email, private cloud storage, collaboration suites, and single sign-on security.",
        id: "Ekosistem self-hosted terpadu yang mengintegrasikan email, penyimpanan private cloud, paket kolaborasi, dan keamanan single sign-on.",
      },
      nodes: [
        {
          title: { en: "Centralized SSO Directory", id: "Direktori SSO Terpusat" },
          detail: "Authentik and Keycloak identity provider orchestrating OIDC logins across all tools.",
          badge: "Security",
        },
        {
          title: { en: "Encrypted Mail Server", id: "Server Email Terenkripsi" },
          detail: "Stalwart mail server with TLS 1.3, Sieve filtering, and anti-spam protection.",
          badge: "Email",
        },
        {
          title: { en: "Private File & Task Vault", id: "Vault File & Kolaborasi" },
          detail: "Nextcloud instance managing enterprise file sync, shared calendars, and group chat.",
          badge: "Cloud",
        },
        {
          title: { en: "Traefik Reverse Proxy", id: "Reverse Proxy Traefik" },
          detail: "Automated Let's Encrypt TLS renewal, rate limiting, and container load balancing.",
          badge: "Network",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "Centralized SSO Directory", id: "Direktori SSO Terpusat" },
        description: {
          en: "Single user credential accessing cloud storage, internal wikis, team chat, and email services.",
          id: "Satu kredensial pengguna untuk mengakses cloud storage, wiki internal, chat tim, dan layanan email.",
        },
      },
      {
        title: { en: "Private Cloud Collaboration", id: "Kolaborasi Private Cloud" },
        description: {
          en: "High-capacity secure document sharing, shared calendars, and team task boards without per-seat fees.",
          id: "Berbagi dokumen aman berkapasitas besar, kalender bersama, dan papan tugas tim tanpa biaya per akun.",
        },
      },
    ],
    stack: ["Linux / Ubuntu Server", "Docker", "Stalwart / Mailcow", "Nextcloud", "Authentik / Keycloak", "Traefik", "PostgreSQL"],
    image: "/uploads/portfolio/javanegra-cloud-identity/1.webp",
    gallery: [
      "/uploads/portfolio/javanegra-cloud-identity/1.webp",
      "/uploads/portfolio/javanegra-cloud-identity/2.webp",
      "/uploads/portfolio/javanegra-cloud-identity/3.webp",
    ],
  },
  {
    slug: "tca-email-infrastructure",
    category: "web",
    featured: false,
    year: "2025",
    title: {
      en: "TCA & Pulau Intan Email Infrastructure",
      id: "Infrastruktur Email TCA & Pulau Intan",
    },
    client: "PT Total Cakra Alam & Pulau Intan Perdana",
    tagline: {
      en: "Keeping business communication reliable across two sister companies.",
      id: "Menjaga komunikasi bisnis tetap reliable di dua sister company.",
    },
    summary: {
      en: "Long-term operational email management, DNS routing, authentication (SPF, DKIM, DMARC), and platform migration for Total Cakra Alam and Pulau Intan Perdana since January 2020.",
      id: "Pengelolaan email operasional jangka panjang, routing DNS, autentikasi (SPF, DKIM, DMARC), dan migrasi platform untuk Total Cakra Alam dan Pulau Intan Perdana sejak Januari 2020.",
    },
    challenge: {
      en: "Managing mission-critical business communications across two sister companies on different platforms, preventing deliverability degradation and mailbox outages.",
      id: "Mengelola komunikasi bisnis penting di dua sister company pada platform berbeda, mencegah penurunan deliverability dan gangguan mailbox.",
    },
    solution: {
      en: "Implemented rigorous DNS record authentication, migration of Pulau Intan Perdana to Zoho Mail, continuous mailbox administration, and proactive deliverability monitoring.",
      id: "Menerapkan autentikasi DNS yang ketat, migrasi Pulau Intan Perdana ke Zoho Mail, administrasi mailbox rutin, dan pemantauan deliverability proaktif.",
    },
    impact: {
      en: [
        "99.9% inbox deliverability with complete SPF, DKIM, and DMARC enforcement",
        "Zero data loss during multi-mailbox migration to Zoho Mail",
        "Rapid troubleshooting and mailbox provisioning for new corporate personnel",
        "Over 6 years of uninterrupted operational stewardship by ALTIA DEV",
      ],
      id: [
        "Deliverability inbox 99.9% dengan penerapan penuh SPF, DKIM, dan DMARC",
        "Nol kehilangan data selama migrasi multi-mailbox ke Zoho Mail",
        "Penyelesaian masalah cepat dan pembuatan mailbox untuk personel baru",
        "Lebih dari 6 tahun pendampingan operasional tanpa henti oleh ALTIA DEV",
      ],
    },
    metrics: [
      {
        value: "6+ Years",
        label: { en: "Operational Management", id: "Pengelolaan Operasional" },
        sublabel: { en: "Since January 2020", id: "Sejak Januari 2020" },
      },
      {
        value: "99.9%",
        label: { en: "Inbox Deliverability", id: "Deliverability Inbox" },
        sublabel: { en: "Full DMARC compliance", id: "Kepatuhan penuh DMARC" },
      },
      {
        value: "2 Entities",
        label: { en: "Sister Companies", id: "Sister Company" },
        sublabel: { en: "TCA and Pulau Intan Perdana", id: "TCA dan Pulau Intan Perdana" },
      },
    ],
    architecture: {
      headline: {
        en: "Dual-Entity Mail Operations and Cryptographic Routing Architecture",
        id: "Arsitektur Operasi Email Dual-Entity dan Routing Kriptografi",
      },
      description: {
        en: "A dual-tenant enterprise mail routing architecture managing domain authentication, mailbox migration, and deliverability monitoring across sister corporations.",
        id: "Arsitektur routing email enterprise dual-tenant yang mengelola autentikasi domain, migrasi mailbox, dan pemantauan deliverability di dua perusahaan.",
      },
      nodes: [
        {
          title: { en: "Zoho Enterprise Workplace", id: "Zoho Enterprise Workplace" },
          detail: "Primary cloud mail platform hosting Pulau Intan Perdana with webmail and mobile sync.",
          badge: "Cloud Mail",
        },
        {
          title: { en: "Dedicated cPanel Cluster", id: "Cluster Mail cPanel" },
          detail: "Operational mail server hosting Total Cakra Alam with custom quota management.",
          badge: "Server Mail",
        },
        {
          title: { en: "Cryptographic DNS Mesh", id: "Mesh DNS Kriptografis" },
          detail: "Strict SPF, 2048-bit DKIM keys, and DMARC quarantine policies on Cloudflare DNS.",
          badge: "Authentication",
        },
        {
          title: { en: "Deliverability Sentinel", id: "Pemantau Deliverability" },
          detail: "Continuous blacklisting check, IP reputation telemetry, and SMTP queue alerting.",
          badge: "Monitoring",
        },
      ],
    },
    keyFeatures: [
      {
        title: { en: "DNS Authentication Hardening", id: "Penguatan Autentikasi DNS" },
        description: {
          en: "Configured cryptographic DKIM signatures, strict SPF alignments, and DMARC reporting policies.",
          id: "Konfigurasi signature kriptografi DKIM, alignment SPF yang ketat, dan kebijakan pelaporan DMARC.",
        },
      },
      {
        title: { en: "Zero-Downtime Migration", id: "Migrasi Tanpa Downtime" },
        description: {
          en: "Seamless transfer of historical mailboxes, folders, and address books without communication drops.",
          id: "Pemindahan mailbox historis, folder, dan buku alamat tanpa jeda komunikasi bisnis.",
        },
      },
    ],
    stack: ["Zoho Workplace", "cPanel Mail", "Cloudflare DNS", "SPF / DKIM / DMARC", "IMAP / SMTP Protocols"],
    image: "/uploads/portfolio/tca-email-infrastructure/1.webp",
    gallery: [
      "/uploads/portfolio/tca-email-infrastructure/1.webp",
      "/uploads/portfolio/tca-email-infrastructure/2.webp",
      "/uploads/portfolio/tca-email-infrastructure/3.webp",
    ],
  },
];
