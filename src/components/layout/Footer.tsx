"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { ArrowUp, ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tCta = useTranslations("Cta");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-12 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-vermilion/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="large">
        {/* Top CTA Banner */}
        <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 border border-charcoal-500/30 rounded-4xl p-8 sm:p-12 lg:p-16 mb-20 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-vermilion font-display text-xs uppercase font-bold tracking-widest mb-3 block">
              ALTIA DEV Studio
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ivory mb-4 leading-tight">
              {tCta("title")}
            </h2>
            <p className="text-ivory/70 text-base sm:text-lg mb-8 max-w-xl">
              {tCta("subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg" cursorText="BOOK">
                <span>{tCta("button")}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg" className="bg-charcoal-500 text-ivory border-charcoal-500/50 hover:bg-charcoal-500/70">
                <span>{tNav("portfolio")}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 pb-16 border-b border-charcoal-500/30">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-vermilion flex items-center justify-center text-ivory font-display font-black text-base">
                A
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-ivory">
                ALTIA<span className="text-vermilion">.</span>DEV
              </span>
            </Link>
            <p className="text-ivory/60 text-sm max-w-sm leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-500/40 hover:bg-vermilion flex items-center justify-center text-ivory transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-500/40 hover:bg-vermilion flex items-center justify-center text-ivory transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-500/40 hover:bg-vermilion flex items-center justify-center text-ivory transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-500/40 hover:bg-vermilion flex items-center justify-center text-ivory transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ivory/90 mb-1">
              {t("quickLinks")}
            </h4>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
              >
                {tNav(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Services Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ivory/90 mb-1">
              {t("servicesTitle")}
            </h4>
            <Link
              href="/services#web"
              className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
            >
              Web Development
            </Link>
            <Link
              href="/services#app"
              className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
            >
              Mobile & Desktop Apps
            </Link>
            <Link
              href="/services#ai"
              className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
            >
              AI Automation & Systems
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
            >
              Pricing & Packages
            </Link>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ivory/90 mb-1">
              {t("social")}
            </h4>
            <p className="text-sm text-ivory/60">
              {SITE_CONFIG.contact.email}
            </p>
            <p className="text-sm text-ivory/60">
              {SITE_CONFIG.contact.address}
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-vermilion hover:text-ivory mt-4 transition-colors w-fit group"
              data-cursor
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>{t("copyright", { year: new Date().getFullYear().toString() })}</p>
          <p>{t("designedWith")}</p>
        </div>
      </Container>
    </footer>
  );
}
