export interface Testimonial {
  id: string;
  quote: {
    en: string;
    id: string;
  };
  author: string;
  role: {
    en: string;
    id: string;
  };
  company: string;
  avatar: string;
  metric?: {
    en: string;
    id: string;
  };
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: {
      en: "ALTIA DEV didn't just deliver an AI RAG pipeline; they re-architected how our entire research department operates. The craftsmanship in both their frontend animations and backend agent logic is world-class.",
      id: "ALTIA DEV bukan hanya membuat pipeline AI RAG, mereka mengubah cara kerja seluruh departemen riset kami. Ketelitian mereka baik di animasi frontend maupun logika backend sungguh berkelas dunia.",
    },
    author: "Marcus Vance",
    role: {
      en: "Chief Technology Officer",
      id: "Chief Technology Officer",
    },
    company: "FinVentures Asia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    metric: {
      en: "82% faster reporting",
      id: "82% lebih cepat",
    },
  },
  {
    id: "2",
    quote: {
      en: "The combination of warm editorial aesthetics and silky GSAP smooth scrolling transformed our conversion rates overnight. Our customers constantly compliment the experience.",
      id: "Kombinasi estetika editorial yang hangat dan kehalusan animasi GSAP meningkatkan konversi kami secara signifikan. Pelanggan kami selalu memuji pengalaman web ini.",
    },
    author: "Elena Rostova",
    role: {
      en: "VP of Digital Experience",
      id: "VP of Digital Experience",
    },
    company: "Nordic Living Co.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    metric: {
      en: "+43% mobile conversion",
      id: "+43% konversi mobile",
    },
  },
  {
    id: "3",
    quote: {
      en: "Working with ALTIA DEV felt like having a team of principal engineers directly in our daily standups. They shipped our cross-platform desktop app 2 weeks ahead of our launch deadline.",
      id: "Bekerja dengan ALTIA DEV terasa seperti memiliki tim insinyur senior yang langsung terintegrasi. Mereka menyelesaikan aplikasi desktop kami 2 minggu lebih cepat dari tenggat waktu.",
    },
    author: "David Chen",
    role: {
      en: "Founder & CEO",
      id: "Founder & CEO",
    },
    company: "Strata Technologies",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    metric: {
      en: "35k+ daily engineers",
      id: "35rb+ engineer aktif",
    },
  },
];
