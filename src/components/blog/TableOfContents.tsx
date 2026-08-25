import { useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";
import type { TocItem } from "@/lib/markdown";

interface TableOfContentsProps {
  toc: TocItem[];
  title?: string;
}

export function TableOfContents({ toc, title = "Table of Contents" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id || "");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (toc.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = toc.length - 1; i >= 0; i--) {
        const item = toc[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpenMobile(false);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className="w-full">
      {/* Mobile Collapsible TOC */}
      <div className="lg:hidden mb-8 rounded-2xl bg-cream/70 border border-warm-border p-4">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="flex items-center justify-between w-full text-left font-display font-bold text-sm text-charcoal"
          aria-expanded={isOpenMobile}
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-vermilion" />
            <span>{title}</span>
            <span className="text-xs font-mono text-charcoal-muted">({toc.length})</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-charcoal-muted transition-transform duration-300 ${
              isOpenMobile ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpenMobile && (
          <nav className="mt-4 pt-3 border-t border-warm-border flex flex-col gap-2">
            {toc.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToHeading(e, item.id)}
                  className={`text-sm py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                    isActive
                      ? "bg-vermilion/10 text-vermilion font-bold"
                      : "text-charcoal-muted hover:text-charcoal hover:bg-cream"
                  } ${item.level === 3 ? "pl-6 text-xs" : ""}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-vermilion" : "bg-charcoal-muted/40"
                    }`}
                  />
                  <span className="line-clamp-1">{item.text}</span>
                </a>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop Sticky TOC Card */}
      <div className="hidden lg:block bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EB] border border-warm-border rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-warm-border">
          <List className="w-4 h-4 text-vermilion" />
          <h3 className="font-display font-bold text-sm tracking-wide text-charcoal uppercase">
            {title}
          </h3>
        </div>

        <nav className="flex flex-col gap-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
          {toc.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(e, item.id)}
                className={`group flex items-start gap-2.5 py-1.5 px-2 rounded-xl text-xs sm:text-[13px] leading-snug transition-[transform,color,background-color] duration-160 ease-emil-out will-change-transform ${
                  isActive
                    ? "text-vermilion font-bold bg-vermilion/5 translate-x-1"
                    : "text-charcoal-muted hover:text-charcoal hover:translate-x-0.5"
                } ${item.level === 3 ? "pl-5 text-xs opacity-90" : ""}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-[background-color,transform] duration-160 ease-emil-out ${
                    isActive ? "bg-vermilion scale-125" : "bg-warm-border group-hover:bg-charcoal-muted"
                  }`}
                />
                <span className="line-clamp-2">{item.text}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
