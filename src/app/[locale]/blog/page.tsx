import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BLOG_POSTS } from "@/data/blog";
import { Sparkles, Calendar, Clock, ArrowUpRight } from "lucide-react";

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Blog");
  const lang = locale === "id" ? "id" : "en";

  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* 1. Header */}
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

      {/* 2. Blog Posts Grid */}
      <section>
        <Container size="large">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Card
                key={post.slug}
                className="flex flex-col justify-between h-full bg-warm-card border-warm-border group hover:border-vermilion"
              >
                <div>
                  <div className="aspect-[16/10] w-full rounded-2xl bg-cream overflow-hidden mb-6 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="vermilion" size="sm" className="uppercase font-bold tracking-wider">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
                      <Clock className="w-3.5 h-3.5 text-vermilion" />
                      <span>{post.readTime} {t("readTime")}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-charcoal mb-3 group-hover:text-vermilion transition-colors">
                    {post.title[lang]}
                  </h3>

                  <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
                    {post.excerpt[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-warm-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-display font-medium text-charcoal">
                      {post.author.name}
                    </span>
                  </div>

                  <Button
                    href={`/blog/${post.slug}`}
                    variant="ghost"
                    size="sm"
                    className="text-vermilion font-bold p-0 hover:bg-transparent"
                    cursorText="READ"
                  >
                    <span>{t("readArticle")}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
