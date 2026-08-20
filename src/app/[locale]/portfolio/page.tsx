import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PortfolioFilterList } from "@/components/portfolio/PortfolioFilterList";
import { getCmsProjects } from "@/lib/payload/data";
import { Sparkles } from "lucide-react";

interface PortfolioPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Portfolio");
  const projects = await getCmsProjects();

  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* Page Header */}
      <section className="pt-12 pb-8 bg-noise border-b border-warm-border/60">
        <Container size="large">
          <div className="max-w-3xl">
            <Badge
              variant="vermilion"
              size="md"
              className="mb-4 uppercase tracking-widest text-[11px] font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-vermilion" />
              <span>{t("tag")}</span>
            </Badge>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-charcoal leading-[1.12] mb-6">
              {t("title")}
            </h1>
            <p className="text-lg sm:text-xl text-charcoal-muted leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Portfolio Grid with Interactive Filters */}
      <section>
        <Container size="large">
          <PortfolioFilterList projects={projects} locale={locale} />
        </Container>
      </section>
    </div>
  );
}
