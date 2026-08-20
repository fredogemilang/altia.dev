"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Project } from "@/data/projects";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/effects/ParallaxImage";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioFilterListProps {
  projects: Project[];
  locale: string;
}

export function PortfolioFilterList({
  projects,
  locale,
}: PortfolioFilterListProps) {
  const t = useTranslations("Portfolio");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "web" | "app" | "ai"
  >("all");

  const lang = locale === "id" ? "id" : "en";

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const categories: Array<{ id: "all" | "web" | "app" | "ai"; labelKey: string }> = [
    { id: "all", labelKey: "allFilter" },
    { id: "web", labelKey: "webFilter" },
    { id: "app", labelKey: "appFilter" },
    { id: "ai", labelKey: "aiFilter" },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-warm-border">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2 rounded-full font-display text-xs sm:text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-vermilion text-ivory shadow-sm"
                  : "bg-cream text-charcoal-500 hover:text-charcoal hover:bg-ivory"
              )}
              data-cursor
            >
              {t(cat.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project) => (
          <Card
            key={project.slug}
            className="flex flex-col justify-between h-full bg-warm-card border-warm-border group hover:border-vermilion"
          >
            <div>
              <ParallaxImage
                src={project.image}
                alt={project.title[lang]}
                aspectRatio="aspect-[16/10]"
                className="mb-6 shadow-sm"
              />
              <div className="flex items-center justify-between mb-3">
                <Badge
                  variant="vermilion"
                  size="sm"
                  className="uppercase font-bold tracking-wider text-[11px]"
                >
                  {project.category.toUpperCase()}
                </Badge>
                <span className="text-xs font-display text-charcoal-muted">
                  {project.client} • {project.year}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-3 group-hover:text-vermilion transition-colors">
                {project.title[lang]}
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
                {project.tagline[lang]}
              </p>
            </div>

            <div className="pt-4 border-t border-warm-border flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5 max-w-[60%]">
                {project.stack.slice(0, 3).map((st) => (
                  <span
                    key={st}
                    className="text-[11px] font-display font-medium px-2 py-0.5 rounded bg-cream text-charcoal-500 truncate"
                  >
                    {st}
                  </span>
                ))}
              </div>
              <Button
                href={`/portfolio/${project.slug}`}
                variant="ghost"
                size="sm"
                className="text-vermilion font-bold p-0 hover:bg-transparent"
                cursorText="VIEW"
              >
                <span>{t("viewProject")}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
