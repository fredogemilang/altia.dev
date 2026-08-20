import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getCmsPostBySlug } from "@/lib/payload/data";
import { BLOG_POSTS } from "@/data/blog";
import { routing } from "@/i18n/routing";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  routing.locales.forEach((locale) => {
    BLOG_POSTS.forEach((post) => {
      params.push({ locale, slug: post.slug });
    });
  });
  return params;
}

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getCmsPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const t = await getTranslations("Blog");
  const lang = locale === "id" ? "id" : "en";

  return (
    <article className="flex flex-col gap-12 pb-24">
      {/* 1. Article Header */}
      <section className="pt-8 bg-noise border-b border-warm-border/60 pb-12">
        <Container size="small">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-charcoal-muted hover:text-vermilion mb-8 transition-colors"
            data-cursor
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("back")}</span>
          </Link>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="vermilion" size="sm" className="uppercase font-bold tracking-wider">
                {post.category}
              </Badge>
              <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
                <Clock className="w-3.5 h-3.5 text-vermilion" />
                <span>{post.readTime} {t("readTime")}</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal leading-[1.18]">
              {post.title[lang]}
            </h1>

            <div className="flex items-center gap-4 pt-4 border-t border-warm-border/60 mt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-charcoal">
                  {post.author.name}
                </span>
                <span className="text-xs text-charcoal-muted">
                  {post.author.role} • {post.publishedAt}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Cover Image */}
      <section>
        <Container size="small">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-warm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title[lang]}
              className="w-full h-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* 3. Article Body */}
      <section>
        <Container size="small">
          <div className="prose prose-lg prose-neutral max-w-none text-charcoal leading-relaxed whitespace-pre-line">
            {post.content[lang]}
          </div>
        </Container>
      </section>
    </article>
  );
}
