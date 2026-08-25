export interface ClientCompany {
  id: string;
  name: string;
  tag: string;
  city: string;
  country: {
    en: string;
    id: string;
  };
  logo: string;
}

export const CLIENT_COMPANIES: ClientCompany[] = [
  {
    id: "total-cakra-alam",
    name: "PT Total Cakra Alam",
    tag: "total-cakra-alam",
    city: "Tangerang",
    country: { en: "Indonesia", id: "Indonesia" },
    logo: "/uploads/clients/PT-Total-Cakra-Alam.png",
  },
  {
    id: "vads-indonesia",
    name: "PT VADS Indonesia",
    tag: "vads",
    city: "Jakarta",
    country: { en: "Indonesia", id: "Indonesia" },
    logo: "/uploads/clients/PT-VADS-Indonesia.png",
  },
  {
    id: "saptawell-tehnicatama",
    name: "PT Saptawell Tehnicatama",
    tag: "saptawell",
    city: "Jakarta",
    country: { en: "Indonesia", id: "Indonesia" },
    logo: "/uploads/clients/pt-saptawell-tehnicatama.png",
  },
  {
    id: "javanegra-gourmet",
    name: "Javanegra Gourmet",
    tag: "javanegra-gourmet",
    city: "Jakarta",
    country: { en: "Indonesia", id: "Indonesia" },
    logo: "/uploads/clients/Javanegra-Gourmet.png",
  },
  {
    id: "javanegra-coffee",
    name: "Javanegra Coffee",
    tag: "javanegra-coffee",
    city: "Jakarta",
    country: { en: "Indonesia", id: "Indonesia" },
    logo: "/uploads/clients/Javanegra-Coffee.png",
  },
  {
    id: "mansor-customs",
    name: "Mansor Customs",
    tag: "mansor-customs",
    city: "New Jersey",
    country: { en: "United States", id: "Amerika Serikat" },
    logo: "/uploads/clients/mansor-customs.webp",
  },
  {
    id: "fiverr",
    name: "Fiverr",
    tag: "fiverr",
    city: "Global Remote",
    country: { en: "Worldwide", id: "Internasional" },
    logo: "/uploads/clients/fiverr.png",
  },
];
