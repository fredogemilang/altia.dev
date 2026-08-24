import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { t, type Locale, getLocalizedPath } from "@/i18n/utils";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  locale?: Locale;
}

export function Footer({ locale = "en" }: FooterProps) {
  return (
    <footer className="bg-charcoal text-ivory pt-0 pb-12 relative">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-vermilion/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="large" className="relative z-10">
        {/* Top Overlapping CTA Banner */}
        <div className="-translate-y-16 sm:-translate-y-20 lg:-translate-y-24 -mb-4 sm:-mb-8 lg:-mb-10 relative z-20">
          <div className="texture-charcoal-spotlight border border-charcoal-500/40 rounded-4xl p-8 sm:p-12 lg:p-16 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] relative overflow-hidden">
            {/* Faded Top Grid Texture */}
            <div className="step-grid-header opacity-60" />

            {/* Ambient Radial Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-vermilion/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full">
              <span className="text-vermilion font-display text-xs uppercase font-bold tracking-widest mb-3 block">
                ALTIA DEV Studio
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ivory mb-4 leading-tight">
                {t(locale, "Cta.title")}
              </h2>
              <p className="text-ivory/70 text-base sm:text-lg mb-8 max-w-4xl leading-relaxed">
                {t(locale, "Cta.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href={getLocalizedPath("/contact", locale)} variant="primary" size="lg" cursorText="BOOK">
                  <span>{t(locale, "Cta.button")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
                <Button
                  href={getLocalizedPath("/portfolio", locale)}
                  variant="secondary"
                  size="lg"
                  className="bg-charcoal-700/80 text-ivory border-charcoal-500/50 hover:bg-charcoal-600"
                >
                  <span>{t(locale, "Navigation.portfolio")}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 pb-16 border-b border-charcoal-500/30 pt-6 sm:pt-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href={getLocalizedPath("/", locale)} className="flex items-center group">
              <img
                src="/uploads/altia-dev-logo-white.webp"
                alt="ALTIA DEV"
                className="h-8 sm:h-9 w-auto max-w-[160px] sm:max-w-[190px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <p className="text-ivory/60 text-sm max-w-sm leading-relaxed">
              {t(locale, "Footer.tagline")}
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
              {t(locale, "Footer.quickLinks")}
            </h4>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={getLocalizedPath(link.href, locale)}
                className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
              >
                {t(locale, `Navigation.${link.labelKey}`)}
              </a>
            ))}
          </div>

          {/* Services Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ivory/90 mb-1">
              {t(locale, "Footer.servicesTitle")}
            </h4>
            <a
              href={getLocalizedPath("/services#web", locale)}
              className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
            >
              Web Development
            </a>
            <a
              href={getLocalizedPath("/services#app", locale)}
              className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
            >
              Mobile & Desktop Apps
            </a>
            <a
              href={getLocalizedPath("/services#ai", locale)}
              className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
            >
              AI Automation & Systems
            </a>
            <a
              href={getLocalizedPath("/pricing", locale)}
              className="text-sm text-ivory/60 hover:text-vermilion transition-colors w-fit"
            >
              Pricing & Packages
            </a>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ivory/90 mb-1">
              {t(locale, "Footer.social")}
            </h4>
            <p className="text-sm text-ivory/60">
              {SITE_CONFIG.contact.email}
            </p>
            <p className="text-sm text-ivory/60">
              {SITE_CONFIG.contact.address}
            </p>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} ALTIA DEV. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={getLocalizedPath("/privacy", locale)}
              className="hover:text-vermilion transition-colors"
            >
              {locale === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
            </a>
            <span className="text-ivory/30">·</span>
            <a
              href={getLocalizedPath("/terms", locale)}
              className="hover:text-vermilion transition-colors"
            >
              {locale === "id" ? "Syarat & Ketentuan" : "Terms of Service"}
            </a>
          </div>
          <p>{t(locale, "Footer.designedWith", "Crafted with precision & code.")}</p>
        </div>
      </Container>
    </footer>
  );
}
