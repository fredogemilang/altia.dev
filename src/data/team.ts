export interface TeamMember {
  name: string;
  role: {
    en: string;
    id: string;
  };
  bio: {
    en: string;
    id: string;
  };
  avatar: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Alexandre Altia",
    role: {
      en: "Founder & Lead Architect",
      id: "Pendiri & Kepala Arsitek",
    },
    bio: {
      en: "Specializing in high-performance web systems, GSAP animation orchestration, and modern cloud deployment.",
      id: "Spesialis dalam sistem web berkinerja tinggi, orkestrasi animasi GSAP, dan infrastruktur cloud modern.",
    },
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Soraya Danendra",
    role: {
      en: "Head of AI & Intelligent Systems",
      id: "Kepala Sistem AI & Otomatisasi",
    },
    bio: {
      en: "Pioneering autonomous multi-agent networks, vector semantic indexing, and enterprise RAG deployments.",
      id: "Memimpin pengembangan jaringan agen otonom, pengindeksan vektor, dan sistem RAG enterprise.",
    },
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Kenji Takahashi",
    role: {
      en: "Staff Mobile & Desktop Engineer",
      id: "Insinyur Utama Mobile & Desktop",
    },
    bio: {
      en: "Crafting multi-platform experiences with Flutter, Rust, and native graphics pipelines.",
      id: "Mengembangkan aplikasi multi-platform dengan Flutter, Rust, dan optimasi grafis native.",
    },
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Maya Indira",
    role: {
      en: "Creative Director & Design Systems",
      id: "Direktur Kreatif & Design System",
    },
    bio: {
      en: "Shaping warm minimalist aesthetics, micro-interaction ergonomics, and accessible brand tokens.",
      id: "Merancang estetika warm minimalist, ergonomi mikro-interaksi, dan token desain yang aksesibel.",
    },
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];
