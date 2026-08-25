import React, { useEffect, useState, useRef } from "react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
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
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale?: Locale;
  pathname?: string;
}

interface LanguageOption {
  code: Locale;
  label: string;
  subLabel: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", subLabel: "EN (Global)", flag: "🇺🇸" },
  { code: "id", label: "Bahasa Indonesia", subLabel: "ID (Indonesia)", flag: "🇮🇩" },
];

export function Navbar({ locale = "en", pathname = "/" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobilePricingExpanded, setMobilePricingExpanded] = useState(true);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langDropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Smart sticky header: auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    const updateScroll = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setIsScrolled(scrollY > 20);

      const delta = scrollY - lastScrollYRef.current;
      const threshold = 8;

      if (mobileMenuOpen || scrollY <= 60) {
        setIsVisible(true);
      } else if (delta > threshold) {
        // Scrolling down -> hide sticky header
        setIsVisible(false);
        setPricingDropdownOpen(false);
        setLangDropdownOpen(false);
      } else if (delta < -threshold) {
        // Scrolling up -> reveal sticky header
        setIsVisible(true);
      }

      lastScrollYRef.current = scrollY;
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [mobileMenuOpen]);

  // Click outside listener for language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLangDropdownOpen(false);
        setPricingDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
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

    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

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

  const handleMouseEnterLang = () => {
    if (langDropdownTimeoutRef.current) {
      clearTimeout(langDropdownTimeoutRef.current);
    }
    setLangDropdownOpen(true);
  };

  const handleMouseLeaveLang = () => {
    langDropdownTimeoutRef.current = setTimeout(() => {
      setLangDropdownOpen(false);
    }, 150);
  };

  const cleanPath = pathname.replace(/^\/id(\/|$)/, "/");

  return (
    <>
      <header
        id="main-navbar"
        ref={navRef}
        data-visible={isVisible ? "true" : "false"}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 will-change-transform",
          isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none",
          isScrolled
            ? "navbar-scrolled bg-ivory/45 backdrop-blur-xl border-b border-warm-border/60 shadow-[0_4px_24px_rgba(47,42,38,0.04)] py-2.5 sm:py-3"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <Container size="large">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href={getLocalizedPath("/", locale)}
              aria-label="ALTIA DEV Home"
              className="flex items-center group"
              data-cursor
              data-cursor-text="ALTIA"
            >
              <img
                src="/uploads/altia-dev-logo.webp"
                alt="ALTIA DEV"
                width={250}
                height={50}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className={cn(
                  "nav-brand-logo w-auto object-contain transition-all duration-300 ease-emil-out group-hover:scale-105 origin-left will-change-transform",
                  isScrolled
                    ? "h-7 sm:h-8 max-w-[150px] sm:max-w-[170px]"
                    : "h-11 sm:h-12 md:h-[50px] max-w-[210px] sm:max-w-[250px]"
                )}
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-cream/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-warm-border/80 shadow-warm">
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
                          "flex items-center gap-1 px-4 py-1.5 text-xs font-display font-semibold rounded-full transition-[background-color,color,box-shadow,transform] duration-160 ease-emil-out active:scale-[0.96]",
                          isActive
                            ? "bg-charcoal text-ivory shadow-sm"
                            : "text-charcoal-500 hover:text-charcoal hover:bg-ivory/80"
                        )}
                        data-cursor
                      >
                        <span>{t(locale, `Navigation.${link.labelKey}`)}</span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200 ease-emil-out",
                            pricingDropdownOpen ? "rotate-180" : ""
                          )}
                        />
                      </a>

                      {/* Origin-aware Semi Mega-Menu Dropdown */}
                      {pricingDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-[490px]">
                          <div className="p-4 rounded-2xl bg-[#FAF4E9] border-2 border-warm-border shadow-[0_20px_50px_rgba(47,42,38,0.22)] overflow-hidden origin-top animate-popover-enter">
                            <div className="grid grid-cols-1 gap-2.5">
                              {/* Option 1: Rate Card & Pricing */}
                              <a
                                href={getLocalizedPath("/pricing", locale)}
                                onClick={() => setPricingDropdownOpen(false)}
                                className="group/item flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFDF9] hover:bg-cream border border-warm-border transition-[background-color,border-color,transform] duration-160 ease-emil-out active:scale-[0.98]"
                              >
                                <div className="w-10 h-10 rounded-xl bg-warm-border/40 group-hover/item:bg-charcoal group-hover/item:text-ivory flex items-center justify-center flex-shrink-0 transition-colors duration-160">
                                  <Tag className="w-5 h-5 text-charcoal group-hover/item:text-ivory" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-display font-bold text-sm text-charcoal group-hover/item:text-vermilion transition-colors duration-160">
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
                                className="group/item flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFDF9] hover:bg-cream border border-warm-border transition-[background-color,border-color,transform] duration-160 ease-emil-out active:scale-[0.98]"
                              >
                                <div className="w-10 h-10 rounded-xl bg-vermilion/10 group-hover/item:bg-vermilion group-hover/item:text-ivory flex items-center justify-center flex-shrink-0 transition-colors duration-160">
                                  <Sparkles className="w-5 h-5 text-vermilion group-hover/item:text-ivory" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-display font-bold text-sm text-charcoal group-hover/item:text-vermilion transition-colors duration-160">
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
                      "px-4 py-1.5 text-xs font-display font-semibold rounded-full transition-[background-color,color,box-shadow,transform] duration-160 ease-emil-out active:scale-[0.96]",
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

            {/* Actions: Lang Dropdown & CTA Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Language Switcher Dropdown */}
              <div
                className="relative"
                ref={langDropdownRef}
                onMouseEnter={handleMouseEnterLang}
                onMouseLeave={handleMouseLeaveLang}
              >
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-bold uppercase rounded-full border transition-[background-color,border-color,color,box-shadow,transform] duration-160 ease-emil-out active:scale-[0.96] select-none",
                    langDropdownOpen
                      ? "bg-ivory border-charcoal text-charcoal shadow-xs"
                      : "bg-cream border-warm-border text-charcoal hover:border-charcoal hover:bg-ivory/90"
                  )}
                  aria-label="Language selector"
                  aria-expanded={langDropdownOpen}
                  data-cursor
                >
                  <Globe className="w-3.5 h-3.5 text-charcoal-muted" />
                  <span>{locale.toUpperCase()}</span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 text-charcoal-muted transition-transform duration-200 ease-emil-out",
                      langDropdownOpen ? "rotate-180 text-charcoal" : ""
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                {langDropdownOpen && (
                  <div className="absolute top-full right-0 pt-2 z-50 w-56">
                    <div className="p-2 rounded-2xl bg-[#FAF4E9] border-2 border-warm-border shadow-[0_16px_40px_rgba(47,42,38,0.20)] overflow-hidden origin-top-right animate-popover-enter">
                      <div className="px-2.5 py-1 mb-1 border-b border-warm-border/70 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-charcoal-muted">
                          {t(locale, "Common.language", "Language")}
                        </span>
                        <span className="text-[10px] font-mono text-charcoal-muted/70">
                          {locale === "en" ? "Global" : "ID"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {LANGUAGES.map((lang) => {
                          const isSelected = locale === lang.code;
                          const targetUrl = getLocalizedPath(cleanPath, lang.code);

                          return (
                            <a
                              key={lang.code}
                              href={targetUrl}
                              onClick={() => setLangDropdownOpen(false)}
                              className={cn(
                                "group/lang flex items-center justify-between px-3 py-2 rounded-xl text-xs font-display transition-[background-color,border-color,color,transform] duration-160 ease-emil-out active:scale-[0.98]",
                                isSelected
                                  ? "bg-[#FFFDF9] text-charcoal font-bold shadow-xs border border-warm-border"
                                  : "text-charcoal-muted hover:text-charcoal hover:bg-ivory/80 font-medium"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-base leading-none select-none">{lang.flag}</span>
                                <div className="flex flex-col">
                                  <span className={cn("leading-none", isSelected ? "text-charcoal" : "group-hover/lang:text-vermilion transition-colors duration-160")}>
                                    {lang.label}
                                  </span>
                                  <span className="text-[10px] text-charcoal-muted/80 font-mono mt-0.5">
                                    {lang.subLabel}
                                  </span>
                                </div>
                              </div>

                              {isSelected ? (
                                <div className="w-5 h-5 rounded-full bg-vermilion/10 flex items-center justify-center text-vermilion flex-shrink-0">
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                </div>
                              ) : (
                                <span className="text-[10px] font-mono text-charcoal-muted/50 uppercase group-hover/lang:text-charcoal transition-colors duration-160">
                                  {lang.code}
                                </span>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

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
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full bg-cream border border-warm-border flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-ivory active:scale-[0.92] transition-[transform,background-color,color] duration-160 ease-emil-out"
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
        className="fixed inset-0 z-40 bg-ivory/80 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 lg:hidden overflow-y-auto"
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
                          "font-display text-2xl font-bold transition-colors duration-160 ease-emil-out active:scale-[0.98]",
                          isActive ? "text-vermilion" : "text-charcoal hover:text-vermilion"
                        )}
                      >
                        {t(locale, `Navigation.${link.labelKey}`)}
                      </a>
                      <button
                        type="button"
                        onClick={() => setMobilePricingExpanded(!mobilePricingExpanded)}
                        className="p-2 text-charcoal hover:text-vermilion active:scale-90 transition-transform duration-160"
                        aria-label="Expand pricing menu"
                      >
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 transition-transform duration-200 ease-emil-out",
                            mobilePricingExpanded ? "rotate-180 text-vermilion" : ""
                          )}
                        />
                      </button>
                    </div>

                    {mobilePricingExpanded && (
                      <div className="pl-4 py-3 flex flex-col gap-3 border-b border-warm-border bg-cream/40 rounded-xl my-1 animate-popover-enter origin-top">
                        <a
                          href={getLocalizedPath("/pricing", locale)}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between text-sm font-display font-semibold text-charcoal hover:text-vermilion py-1 transition-colors duration-160 active:scale-[0.98]"
                        >
                          <span className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-charcoal" />
                            {t(locale, "Navigation.pricingMenu.rateCardTitle")}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-warm-border font-bold">
                            {t(locale, "Navigation.pricingMenu.rateCardBadge")}
                          </span>
                        </a>

                        <a
                          href={getLocalizedPath("/estimator", locale)}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between text-sm font-display font-semibold text-vermilion py-1 transition-colors duration-160 active:scale-[0.98]"
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
                    "mobile-nav-item font-display text-2xl font-bold py-2 border-b border-warm-border transition-colors duration-160 ease-emil-out flex items-center justify-between active:scale-[0.98]",
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
