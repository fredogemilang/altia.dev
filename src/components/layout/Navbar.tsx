"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { gsap } from "@/lib/gsapConfig";
import {
  Menu,
  X,
  ArrowUpRight,
  Globe,
  ChevronDown,
  Tag,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState(false);
  const [mobilePricingExpanded, setMobilePricingExpanded] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Track scroll position for navbar glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menu, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        display: "flex",
      });

      const menuItems = menu.querySelectorAll(".mobile-nav-item");
      gsap.fromTo(
        menuItems,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, delay: 0.1, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menu, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
    }
  }, [mobileMenuOpen]);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "id" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const handleMouseEnterPricing = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setPricingDropdownOpen(true);
  };

  const handleMouseLeavePricing = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setPricingDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 sm:py-5",
          isScrolled
            ? "glass-warm py-3 sm:py-3.5 shadow-warm"
            : "bg-transparent"
        )}
      >
        <Container size="large">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              data-cursor
              data-cursor-text="ALTIA"
            >
              <div className="w-8 h-8 rounded-lg bg-vermilion flex items-center justify-center text-ivory font-display font-black text-base shadow-sm group-hover:scale-105 group-hover:bg-charcoal transition-all duration-300">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-charcoal leading-none">
                  ALTIA<span className="text-vermilion">.</span>DEV
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-charcoal-muted mt-0.5">
                  Studio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-cream/70 p-1.5 rounded-full border border-warm-border/80 backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isPricing = link.href === "/pricing";
                const isActive = isPricing
                  ? pathname.startsWith("/pricing") || pathname.startsWith("/estimator")
                  : link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

                if (isPricing) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={handleMouseEnterPricing}
                      onMouseLeave={handleMouseLeavePricing}
                    >
                      <Link
                        href="/pricing"
                        className={cn(
                          "flex items-center gap-1 px-4 py-1.5 text-xs font-display font-semibold rounded-full transition-all duration-200",
                          isActive
                            ? "bg-charcoal text-ivory shadow-sm"
                            : "text-charcoal-500 hover:text-charcoal hover:bg-ivory/80"
                        )}
                        data-cursor
                      >
                        <span>{t(link.labelKey)}</span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            pricingDropdownOpen ? "rotate-180" : ""
                          )}
                        />
                      </Link>

                      {/* Semi Mega-Menu Dropdown (Solid Opaque Background & High Z-Index) */}
                      {pricingDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-[490px]">
                          <div className="p-4 rounded-2xl bg-[#FAF4E9] border-2 border-warm-border shadow-[0_20px_50px_rgba(47,42,38,0.22)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                            <div className="grid grid-cols-1 gap-2.5">
                              {/* Option 1: Rate Card & Pricing */}
                              <Link
                                href="/pricing"
                                onClick={() => setPricingDropdownOpen(false)}
                                className="group/item flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFDF9] hover:bg-cream border border-warm-border transition-all"
                              >
                                <div className="w-10 h-10 rounded-xl bg-warm-border/40 group-hover/item:bg-charcoal group-hover/item:text-ivory flex items-center justify-center flex-shrink-0 transition-colors">
                                  <Tag className="w-5 h-5 text-charcoal group-hover/item:text-ivory" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-display font-bold text-sm text-charcoal group-hover/item:text-vermilion transition-colors">
                                      {t("pricingMenu.rateCardTitle")}
                                    </h4>
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-warm-border/60 text-charcoal font-display">
                                      {t("pricingMenu.rateCardBadge")}
                                    </span>
                                  </div>
                                  <p className="text-xs text-charcoal-muted leading-relaxed">
                                    {t("pricingMenu.rateCardDesc")}
                                  </p>
                                </div>
                              </Link>

                              {/* Option 2: Project Estimator */}
                              <Link
                                href="/estimator"
                                onClick={() => setPricingDropdownOpen(false)}
                                className="group/item flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFDF9] hover:bg-cream border-2 border-vermilion/40 hover:border-vermilion transition-all shadow-sm"
                              >
                                <div className="w-10 h-10 rounded-xl bg-vermilion text-ivory flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <Sparkles className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-display font-bold text-sm text-charcoal group-hover/item:text-vermilion transition-colors flex items-center gap-1.5">
                                      <span>{t("pricingMenu.estimatorTitle")}</span>
                                      <ArrowRight className="w-3.5 h-3.5 text-vermilion opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                    </h4>
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-vermilion text-ivory font-display">
                                      {t("pricingMenu.estimatorBadge")}
                                    </span>
                                  </div>
                                  <p className="text-xs text-charcoal-muted leading-relaxed">
                                    {t("pricingMenu.estimatorDesc")}
                                  </p>
                                </div>
                              </Link>
                            </div>

                            {/* Dropdown Footer Note */}
                            <div className="mt-3 pt-3 border-t border-warm-border/80 flex items-center justify-between text-[11px] text-charcoal-muted px-1 font-display">
                              <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-vermilion" />
                                <span>{t("pricingMenu.footerNote")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-1.5 text-xs font-display font-semibold rounded-full transition-all duration-200",
                      isActive
                        ? "bg-charcoal text-ivory shadow-sm"
                        : "text-charcoal-500 hover:text-charcoal hover:bg-ivory/80"
                    )}
                    data-cursor
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Language Switcher + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream text-charcoal-muted hover:text-charcoal hover:bg-ivory border border-warm-border text-xs font-display font-bold uppercase tracking-wider transition-all duration-200"
                data-cursor
                title="Switch language"
              >
                <Globe className="w-3.5 h-3.5 text-vermilion" />
                <span>{locale.toUpperCase()}</span>
              </button>

              <Button
                href="/contact"
                variant="primary"
                size="sm"
                cursorText="TALK"
              >
                <span>{t("getStarted")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>

            {/* Mobile Actions: Language toggle + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-cream text-charcoal border border-warm-border text-xs font-bold font-display uppercase"
              >
                {locale.toUpperCase()}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-cream text-charcoal border border-warm-border hover:bg-ivory transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-50 bg-ivory/98 backdrop-blur-xl hidden flex-col justify-between p-6 pt-5 pb-8 overflow-y-auto"
      >
        {/* Mobile Menu Top Bar with Close Button in Top Right */}
        <div className="flex items-center justify-between pb-4 border-b border-warm-border/60">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-vermilion flex items-center justify-center text-ivory font-display font-black text-base shadow-sm">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-charcoal leading-none">
                ALTIA<span className="text-vermilion">.</span>DEV
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-charcoal-muted mt-0.5">
                Studio
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-full bg-cream text-charcoal border border-warm-border text-xs font-bold font-display uppercase tracking-wider"
            >
              {locale.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-cream hover:bg-charcoal text-charcoal hover:text-ivory border border-warm-border transition-colors shadow-sm"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {NAV_LINKS.map((link) => {
            const isPricing = link.href === "/pricing";
            const isActive = isPricing
              ? pathname.startsWith("/pricing") || pathname.startsWith("/estimator")
              : link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

            if (isPricing) {
              return (
                <div key={link.href} className="mobile-nav-item border-b border-warm-border/60 py-2">
                  <div
                    onClick={() => setMobilePricingExpanded(!mobilePricingExpanded)}
                    className="flex items-center justify-between cursor-pointer font-display text-2xl font-bold py-1"
                  >
                    <span className={isActive ? "text-vermilion" : "text-charcoal"}>
                      {t(link.labelKey)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-charcoal-muted transition-transform",
                        mobilePricingExpanded ? "rotate-180" : ""
                      )}
                    />
                  </div>

                  {mobilePricingExpanded && (
                    <div className="flex flex-col gap-2.5 pl-3 pt-3 pb-2">
                      <Link
                        href="/pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl bg-cream hover:bg-ivory border border-warm-border shadow-xs transition-colors"
                      >
                        <div className="w-6 h-6 rounded-md bg-charcoal/10 text-charcoal flex items-center justify-center shrink-0 mt-0.5">
                          <Tag className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-charcoal">
                            {t("pricingMenu.rateCardTitle")}
                          </div>
                          <div className="text-xs text-charcoal-muted mt-0.5">
                            {t("pricingMenu.rateCardDesc")}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/estimator"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl bg-cream hover:bg-ivory border border-vermilion/40 shadow-xs transition-colors"
                      >
                        <div className="w-6 h-6 rounded-md bg-vermilion text-ivory flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-charcoal flex items-center gap-2">
                            <span>{t("pricingMenu.estimatorTitle")}</span>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-vermilion text-ivory">
                              New
                            </span>
                          </div>
                          <div className="text-xs text-charcoal-muted mt-0.5">
                            {t("pricingMenu.estimatorDesc")}
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "mobile-nav-item font-display text-2xl font-bold py-2 border-b border-warm-border/60 transition-colors flex items-center justify-between",
                  isActive ? "text-vermilion" : "text-charcoal"
                )}
              >
                <span>{t(link.labelKey)}</span>
                <ArrowUpRight className="w-5 h-5 text-charcoal-muted" />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-warm-border mt-6">
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>{t("getStarted")}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>

          <p className="text-xs text-charcoal-muted text-center font-display">
            {SITE_CONFIG.contact.email}
          </p>
        </div>
      </div>
    </>
  );
}
