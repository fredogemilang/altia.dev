import { useEffect, useState, useRef } from "react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { gsap } from "@/lib/gsapConfig";
import { t, type Locale, getLocalizedPath } from "@/i18n/utils";
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

interface NavbarProps {
  locale?: Locale;
  pathname?: string;
}

export function Navbar({ locale = "en", pathname = "/" }: NavbarProps) {
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
    const nextLocale: Locale = locale === "en" ? "id" : "en";
    const currentCleanPath = pathname.replace(/^\/id(\/|$)/, "/");
    const targetUrl = getLocalizedPath(currentCleanPath, nextLocale);
    window.location.href = targetUrl;
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

  const cleanPath = pathname.replace(/^\/id(\/|$)/, "/");

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
            <a
              href={getLocalizedPath("/", locale)}
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
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-cream/70 p-1.5 rounded-full border border-warm-border/80 backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isPricing = link.href === "/pricing";
                const isActive = isPricing
                  ? cleanPath.startsWith("/pricing") || cleanPath.startsWith("/estimator")
                  : link.href === "/"
                  ? cleanPath === "/"
                  : cleanPath.startsWith(link.href);

                if (isPricing) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={handleMouseEnterPricing}
                      onMouseLeave={handleMouseLeavePricing}
                    >
                      <a
                        href={getLocalizedPath("/pricing", locale)}
                        className={cn(
                          "flex items-center gap-1 px-4 py-1.5 text-xs font-display font-semibold rounded-full transition-all duration-200",
                          isActive
                            ? "bg-charcoal text-ivory shadow-sm"
                            : "text-charcoal-500 hover:text-charcoal hover:bg-ivory/80"
                        )}
                        data-cursor
                      >
                        <span>{t(locale, `Navigation.${link.labelKey}`)}</span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            pricingDropdownOpen ? "rotate-180" : ""
                          )}
                        />
                      </a>

                      {/* Semi Mega-Menu Dropdown */}
                      {pricingDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-[490px]">
                          <div className="p-4 rounded-2xl bg-[#FAF4E9] border-2 border-warm-border shadow-[0_20px_50px_rgba(47,42,38,0.22)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                            <div className="grid grid-cols-1 gap-2.5">
                              {/* Option 1: Rate Card & Pricing */}
                              <a
                                href={getLocalizedPath("/pricing", locale)}
                                onClick={() => setPricingDropdownOpen(false)}
                                className="group/item flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFDF9] hover:bg-cream border border-warm-border transition-all"
                              >
                                <div className="w-10 h-10 rounded-xl bg-warm-border/40 group-hover/item:bg-charcoal group-hover/item:text-ivory flex items-center justify-center flex-shrink-0 transition-colors">
                                  <Tag className="w-5 h-5 text-charcoal group-hover/item:text-ivory" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-display font-bold text-sm text-charcoal group-hover/item:text-vermilion transition-colors">
                                      {t(locale, "Navigation.pricingMenu.rateCardTitle")}
                                    </h4>
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-warm-border/60 text-charcoal font-display">
                                      {t(locale, "Navigation.pricingMenu.rateCardBadge")}
                                    </span>
                                  </div>
                                  <p className="text-xs text-charcoal-muted leading-relaxed">
                                    {t(locale, "Navigation.pricingMenu.rateCardDesc")}
                                  </p>
                                </div>
                              </a>

                              {/* Option 2: AI Cost Estimator */}
                              <a
                                href={getLocalizedPath("/estimator", locale)}
                                onClick={() => setPricingDropdownOpen(false)}
                                className="group/item flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFDF9] hover:bg-cream border border-warm-border transition-all"
                              >
                                <div className="w-10 h-10 rounded-xl bg-vermilion/10 group-hover/item:bg-vermilion group-hover/item:text-ivory flex items-center justify-center flex-shrink-0 transition-colors">
                                  <Sparkles className="w-5 h-5 text-vermilion group-hover/item:text-ivory" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-display font-bold text-sm text-charcoal group-hover/item:text-vermilion transition-colors">
                                      {t(locale, "Navigation.pricingMenu.estimatorTitle")}
                                    </h4>
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-vermilion/15 text-vermilion font-display">
                                      {t(locale, "Navigation.pricingMenu.estimatorBadge")}
                                    </span>
                                  </div>
                                  <p className="text-xs text-charcoal-muted leading-relaxed">
                                    {t(locale, "Navigation.pricingMenu.estimatorDesc")}
                                  </p>
                                </div>
                              </a>
                            </div>

                            {/* Dropdown Footer Guarantee */}
                            <div className="mt-3 pt-3 border-t border-warm-border flex items-center justify-between px-1 text-[11px] text-charcoal-muted font-display">
                              <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                {t(locale, "Navigation.pricingMenu.footerGuarantee")}
                              </span>
                              <span className="text-vermilion font-semibold">
                                {t(locale, "Navigation.pricingMenu.footerSpeed")}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={getLocalizedPath(link.href, locale)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-display font-semibold rounded-full transition-all duration-200",
                      isActive
                        ? "bg-charcoal text-ivory shadow-sm"
                        : "text-charcoal-500 hover:text-charcoal hover:bg-ivory/80"
                    )}
                    data-cursor
                  >
                    {t(locale, `Navigation.${link.labelKey}`)}
                  </a>
                );
              })}
            </nav>

            {/* Actions: Lang Switch & CTA Button */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-bold uppercase rounded-full bg-cream border border-warm-border text-charcoal hover:border-charcoal transition-all duration-200"
                aria-label="Toggle language"
                data-cursor
              >
                <Globe className="w-3.5 h-3.5 text-charcoal-muted" />
                <span>{locale}</span>
              </button>

              {/* Primary CTA */}
              <div className="hidden sm:block">
                <Button
                  href={getLocalizedPath("/contact", locale)}
                  variant="primary"
                  size="sm"
                  cursorText="HIRE"
                >
                  <span>{t(locale, "Navigation.cta")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full bg-cream border border-warm-border flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-ivory transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Fullscreen Animated Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        style={{ display: "none", opacity: 0 }}
        className="fixed inset-0 z-40 bg-ivory/98 backdrop-blur-xl flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 lg:hidden overflow-y-auto"
      >
        <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isPricing = link.href === "/pricing";
              const isActive = isPricing
                ? cleanPath.startsWith("/pricing") || cleanPath.startsWith("/estimator")
                : link.href === "/"
                ? cleanPath === "/"
                : cleanPath.startsWith(link.href);

              if (isPricing) {
                return (
                  <div key={link.href} className="mobile-nav-item flex flex-col">
                    <div className="flex items-center justify-between py-2 border-b border-warm-border">
                      <a
                        href={getLocalizedPath("/pricing", locale)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "font-display text-2xl font-bold transition-colors",
                          isActive ? "text-vermilion" : "text-charcoal hover:text-vermilion"
                        )}
                      >
                        {t(locale, `Navigation.${link.labelKey}`)}
                      </a>
                      <button
                        onClick={() => setMobilePricingExpanded(!mobilePricingExpanded)}
                        className="p-2 text-charcoal hover:text-vermilion"
                        aria-label="Expand pricing menu"
                      >
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 transition-transform duration-200",
                            mobilePricingExpanded ? "rotate-180" : ""
                          )}
                        />
                      </button>
                    </div>

                    {mobilePricingExpanded && (
                      <div className="pl-4 py-3 flex flex-col gap-3 bg-cream/50 rounded-xl my-2 border border-warm-border/60">
                        <a
                          href={getLocalizedPath("/pricing", locale)}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between text-sm font-display font-semibold text-charcoal hover:text-vermilion py-1"
                        >
                          <span className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-charcoal-muted" />
                            {t(locale, "Navigation.pricingMenu.rateCardTitle")}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-warm-border font-bold">
                            {t(locale, "Navigation.pricingMenu.rateCardBadge")}
                          </span>
                        </a>

                        <a
                          href={getLocalizedPath("/estimator", locale)}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between text-sm font-display font-semibold text-vermilion py-1"
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-vermilion" />
                            {t(locale, "Navigation.pricingMenu.estimatorTitle")}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-vermilion/20 text-vermilion font-bold">
                            {t(locale, "Navigation.pricingMenu.estimatorBadge")}
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={getLocalizedPath(link.href, locale)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "mobile-nav-item font-display text-2xl font-bold py-2 border-b border-warm-border transition-colors flex items-center justify-between",
                    isActive ? "text-vermilion" : "text-charcoal hover:text-vermilion"
                  )}
                >
                  <span>{t(locale, `Navigation.${link.labelKey}`)}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </a>
              );
            })}
          </nav>

          <div className="mobile-nav-item pt-4 flex flex-col gap-4">
            <Button
              href={getLocalizedPath("/contact", locale)}
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{t(locale, "Navigation.cta")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Footer Info */}
        <div className="mobile-nav-item text-center text-xs text-charcoal-muted font-display pt-8 border-t border-warm-border">
          <p>{SITE_CONFIG.title}</p>
          <p className="mt-1">{SITE_CONFIG.contact.address}</p>
        </div>
      </div>
    </>
  );
}
