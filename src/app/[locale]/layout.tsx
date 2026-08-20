import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { MagneticCursor } from "@/components/effects/MagneticCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ALTIA DEV — Creative Design & AI Engineering Studio",
    template: "%s | ALTIA DEV",
  },
  description:
    "High-craft digital engineering studio specializing in modern web applications, cross-platform apps, and automated AI systems.",
  keywords: [
    "Web Development",
    "Mobile Apps",
    "Desktop Apps",
    "AI Automation",
    "Next.js",
    "Flutter",
    "LangChain",
    "GSAP",
    "Creative Agency",
    "ALTIA DEV",
  ],
  authors: [{ name: "ALTIA DEV", url: "https://altiadev.com" }],
  creator: "ALTIA DEV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: "@altiadev",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "id")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="bg-ivory text-charcoal font-sans min-h-screen flex flex-col selection:bg-vermilion selection:text-ivory">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <MagneticCursor />
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
