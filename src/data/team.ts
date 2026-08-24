export interface TeamMember {
  name: string;
  role: {
    en: string;
    id: string;
  };
  focus: string;
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
    name: "Alfredo Gemilang",
    role: {
      en: "Lead Software Engineer",
      id: "Lead Software Engineer",
    },
    focus: "Architecture · Backend · Systems",
    bio: {
      en: "Leads technical direction, designing scalable software architectures, backend systems, and APIs that turn complex requirements into maintainable technology.",
      id: "Memimpin arah teknis ALTIA DEV, merancang arsitektur software scalable, sistem backend, dan API yang mengubah kebutuhan bisnis menjadi teknologi terstruktur.",
    },
    avatar: "/uploads/team/Alfredo-Gemilang.webp",
    socials: {
      github: "https://github.com/fredogemilang",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Chety Chintia",
    role: {
      en: "Product Designer",
      id: "Product Designer",
    },
    focus: "UX · UI · Design Systems",
    bio: {
      en: "Designs digital products around how users interact, connecting product thinking with visual design across UX, UI, user flows, and cohesive design systems.",
      id: "Merancang produk digital berdasarkan interaksi pengguna, menghubungkan product thinking dengan visual design di area UX, UI, user flows, dan design system yang konsisten.",
    },
    avatar: "/uploads/team/Chety-Chintia.webp",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Ars Pelo",
    role: {
      en: "Infrastructure Engineer",
      id: "Infrastructure Engineer",
    },
    focus: "Cloud · DevOps · Security",
    bio: {
      en: "Builds and manages cloud environments, CI/CD deployment pipelines, server architecture, security, monitoring, and operational reliability for production systems.",
      id: "Membangun dan mengelola cloud environment, CI/CD deployment pipeline, arsitektur server, security, monitoring, serta keandalan operasional untuk sistem produksi.",
    },
    avatar: "/uploads/team/Ars-Pelo.webp",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Satrioaji Nugroho",
    role: {
      en: "Software Engineer",
      id: "Software Engineer",
    },
    focus: "Full-Stack · Web · Integration",
    bio: {
      en: "Builds responsive end-to-end web applications across frontend interfaces, backend services, database integrations, and third-party APIs ready for production.",
      id: "Membangun aplikasi web end-to-end pada sisi frontend, backend services, integrasi database, dan third-party API yang siap digunakan di lingkungan produksi.",
    },
    avatar: "/uploads/team/Satrioaji-Nugroho.webp",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];
