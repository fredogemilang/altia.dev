export const SITE_CONFIG = {
  name: "ALTIA DEV",
  legalName: "ALTIA DEV Studio",
  title: "ALTIA DEV · Creative Design & AI Engineering Studio",
  description:
    "High-craft digital engineering studio specializing in modern web applications, cross-platform apps, and intelligent AI automation pipelines.",
  descriptionId:
    "Studio rekayasa digital spesialis aplikasi web modern, cross-platform app, dan pipeline otomatisasi AI cerdas.",
  url: "https://altia.dev",
  ogImage: "https://altia.dev/og.jpg",
  logo: "https://altia.dev/uploads/altia-dev-logo.webp",
  foundingDate: "2024",
  knowsAbout: [
    "Web Engineering",
    "Full-Stack Web Applications",
    "Mobile App Development",
    "Cross-Platform Desktop Apps",
    "AI Automation Pipelines",
    "RAG (Retrieval-Augmented Generation)",
    "Document AI & Processing",
    "Cloud Infrastructure & DevOps",
    "UI/UX Design Systems",
  ],
  links: {
    twitter: "https://twitter.com/altiadev",
    github: "https://github.com/altiadev",
    linkedin: "https://linkedin.com/company/altiadev",
    instagram: "https://instagram.com/altiadev",
  },
  contact: {
    email: "hello@altia.dev",
    whatsapp: "+6282147709084",
    address: "Jakarta, Indonesia & Remote Worldwide",
    postalAddress: {
      streetAddress: "Jl. TB Simatupang",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12430",
      addressCountry: "ID",
    },
  },
  analytics: {
    // Fill in GA4 Measurement ID (G-XXXXXXXXXX) or GTM Container ID (GTM-XXXXXXX)
    // Can also be set via PUBLIC_GA_ID or PUBLIC_GTM_ID environment variables
    gaId: "G-XXXXXXXXXX",
    gtmId: "",
  },
};

export const NAV_LINKS = [
  { href: "/", labelKey: "home" },
  { href: "/services", labelKey: "services" },
  { href: "/portfolio", labelKey: "portfolio" },
  { href: "/pricing", labelKey: "pricing", hasDropdown: true },
  { href: "/about", labelKey: "about" },
  { href: "/blog", labelKey: "blog" },
  { href: "/contact", labelKey: "contact" },
];
