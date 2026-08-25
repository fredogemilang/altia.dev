import fs from 'node:fs';

const filePath = './src/data/projects.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const mansorCustomsProject = `  {
    slug: "mansor-customs",
    tags: ["mansor-customs", "automotive", "luxury-web", "laravel"],
    category: "web",
    featured: true,
    year: "2025",
    title: {
      en: "Mansor Customs",
      id: "Mansor Customs",
    },
    client: "Mansor Customs",
    tagline: {
      en: "A digital experience built around the art of automotive transformation.",
      id: "Digital experience yang dibangun di sekitar seni automotive transformation.",
    },
    summary: {
      en: "A luxury automotive digital experience designed and developed for Mansor Customs in New Jersey, combining bespoke build showcases, vehicle make filtering, interactive before/after transformation sliders, and a tailored multi-step quote engine in custom Laravel and Tailwind.",
      id: "Digital experience luxury automotive yang dirancang dan dikembangkan untuk Mansor Customs di New Jersey, menyatukan showcase karya bespoke, filtering merek mobil, slider transformasi before/after interaktif, dan multi-step quote engine kustom berbasis Laravel dan Tailwind.",
    },
    challenge: {
      en: "Mansor Customs operates across a technically broad spectrum of luxury automotive customization—from PPF, ceramic coatings, and bodykit conversions to custom ECU tuning and bespoke interior upholstery. The challenge was organizing this vast capability into one coherent luxury brand experience that builds client confidence and inspires action without feeling like a generic service catalog.",
      id: "Mansor Customs menangani spektrum kustomisasi otomotif mewah yang sangat luas—mulai dari PPF, ceramic coating, dan konversi bodykit hingga ECU tuning serta interior bespoke. Tantangannya adalah menyusun seluruh kapabilitas ini ke dalam satu pengalaman brand mewah yang membangun kepercayaan klien tanpa terasa seperti katalog bengkel generik.",
    },
    solution: {
      en: "Engineered a custom Laravel and Tailwind web platform with GSAP cinematic motion, outcome-driven service narratives, interactive before/after vehicle transformation sliders, make-filtered build galleries (Lamborghini, Porsche, BMW, Mercedes, Rolls-Royce, Tesla), and a high-consideration tailored quote funnel.",
      id: "Membangun platform web kustom berbasis Laravel dan Tailwind dengan animasi sinematik GSAP, narasi layanan berbasis hasil, slider transformasi kendaraan before/after interaktif, galeri build terfilter merek, dan funnel penawaran harga kustom bertahap.",
    },
    impact: {
      en: [
        "Elevated brand positioning from a local auto shop to an international automotive transformation studio",
        "Streamlined high-consideration quote requests through a structured multi-step vehicle inquiry engine",
        "Over 1,000+ qualified quote requests captured with detailed vehicle context",
        "Delivered bespoke MansorCMS admin portal for rapid portfolio updates and lead management",
      ],
      id: [
        "Meningkatkan positioning brand dari bengkel lokal menjadi studio transformasi otomotif berstandar internasional",
        "Mempermudah pengajuan penawaran bernilai tinggi melalui inquiry engine bertahap yang terstruktur",
        "Lebih dari 1.000+ permintaan penawaran terkualifikasi masuk dengan detail kendaraan lengkap",
        "Menyediakan admin portal MansorCMS kustom untuk pembaruan portofolio dan manajemen prospek yang cepat",
      ],
    },
    metrics: [
      {
        value: "1,000+",
        label: { en: "Quote Requests", id: "Permintaan Penawaran" },
        sublabel: { en: "High-intent vehicle inquiries", id: "Prospek kustomisasi bernilai tinggi" },
      },
      {
        value: "8",
        label: { en: "Service Categories", id: "Kategori Layanan" },
        sublabel: { en: "Structured transformation pillars", id: "Pilar kustomisasi terstruktur" },
      },
      {
        value: "100%",
        label: { en: "Custom Laravel Stack", id: "Custom Laravel Stack" },
        sublabel: { en: "Zero page-builder bloat", id: "Bebas dependensi page builder" },
      },
    ],
    keyFeatures: [
      {
        title: { en: "Interactive Transformation Sliders", id: "Slider Transformasi Interaktif" },
        description: {
          en: "Showcases before-and-after visual results for wraps, lighting, and interior conversions with zero lag.",
          id: "Menampilkan hasil visual sebelum dan sesudah untuk wrap, pencahayaan, dan konversi interior dengan responsivitas instan.",
        },
        technicalNote: "GSAP scroll-driven reveals & drag interactions",
      },
      {
        title: { en: "Vehicle Make Portfolio Filtering", id: "Filter Portofolio Berdasarkan Merek" },
        description: {
          en: "Allows enthusiasts to filter completed builds across Lamborghini, Porsche, BMW, Mercedes, Tesla, and Rolls-Royce.",
          id: "Memungkinkan pengunjung memfilter hasil modifikasi berdasarkan merek Lamborghini, Porsche, BMW, Mercedes, Tesla, dan Rolls-Royce.",
        },
        technicalNote: "Client-side taxonomy filtering with instant DOM transitions",
      },
      {
        title: { en: "Multi-Step Tailored Quote Engine", id: "Engine Penawaran Kustom Multi-Tahap" },
        description: {
          en: "Gathers year, make, model, desired packages, and discovery channel before generating a qualified project lead.",
          id: "Mengumpulkan tahun, merek, model, paket yang diinginkan, dan saluran penemuan sebelum menghasilkan prospek proyek yang terarah.",
        },
        technicalNote: "Multi-step validation flow with automated CRM ingestion",
      },
      {
        title: { en: "Bespoke MansorCMS Admin Portal", id: "Admin Portal Kustom MansorCMS" },
        description: {
          en: "Custom back-office dashboard for managing works, blog posts, quote leads, and product inventory.",
          id: "Dashboard back-office kustom untuk mengelola karya, artikel blog, prospek penawaran, dan inventaris produk.",
        },
        technicalNote: "Role-based Laravel backend with instant search & metric cards",
      },
    ],
    architecture: {
      headline: {
        en: "Full-Stack Laravel & GSAP Motion Architecture",
        id: "Arsitektur Full-Stack Laravel & GSAP Motion",
      },
      description: {
        en: "A high-performance monolithic Laravel application pairing Blade and Tailwind CSS with custom GSAP interaction pipelines.",
        id: "Aplikasi monolitik Laravel berkinerja tinggi yang menggabungkan Blade dan Tailwind CSS dengan pipeline interaksi kustom GSAP.",
      },
      nodes: [
        {
          title: { en: "Laravel 11 Core", id: "Laravel 11 Core" },
          detail: "Monolithic MVC backend, lead capture engine, and bespoke admin portal",
          badge: "Core Engine",
        },
        {
          title: { en: "Blade & Tailwind CSS", id: "Blade & Tailwind CSS" },
          detail: "Custom semantic UI system optimized for dark luxury aesthetic and sub-second load times",
          badge: "Design System",
        },
        {
          title: { en: "GSAP Animation Engine", id: "GSAP Animation Engine" },
          detail: "Cinematic scroll reveals, before/after image splitters, and fluid page transitions",
          badge: "Motion",
        },
        {
          title: { en: "MansorCMS Portal", id: "MansorCMS Portal" },
          detail: "Integrated admin dashboard for managing work showcase, quotes, and content taxonomy",
          badge: "Admin Hub",
        },
      ],
    },
    testimonial: {
      quote: {
        en: "ALTIA DEV didn't just build a website; they captured the soul of our automotive craft. The before/after showcases and the tailored quote funnel immediately elevated our client conversations.",
        id: "ALTIA DEV tidak hanya membangun website; mereka berhasil menangkap esensi keahlian otomotif kami. Showcase before/after dan funnel penawaran langsung meningkatkan kualitas diskusi dengan calon klien kami.",
      },
      author: "Mansor Customs Team",
      role: "Founder & Master Builder",
      company: "Mansor Customs",
    },
    stack: ["Laravel", "Tailwind CSS", "GSAP", "Blade", "Alpine.js", "MySQL"],
    image: "/uploads/portfolio/mansor-customs/1.webp",
    gallery: [
      "/uploads/portfolio/mansor-customs/1.webp",
      "/uploads/portfolio/mansor-customs/2.webp",
      "/uploads/portfolio/mansor-customs/3.webp",
    ],
  },
`;

// Insert after export const PROJECTS: Project[] = [\n
content = content.replace(
  'export const PROJECTS: Project[] = [\n',
  'export const PROJECTS: Project[] = [\n' + mansorCustomsProject
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully added mansor-customs to projects.ts');
