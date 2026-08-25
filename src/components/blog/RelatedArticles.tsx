import { Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/data/blog";
import { getLocalizedPath, type Locale } from "@/i18n/utils";

interface RelatedArticlesProps {
  posts: BlogPost[];
  currentSlug: string;
  currentCategory?: string;
  locale: Locale;
  sectionTitle?: string;
  sectionSubtitle?: string;
  viewAllLabel?: string;
}

export function RelatedArticles({
  posts,
  currentSlug,
  currentCategory,
  locale,
  sectionTitle = "Related Articles",
  sectionSubtitle = "Continue exploring our latest insights on software architecture, AI, and design systems.",
  viewAllLabel = "View all articles",
}: RelatedArticlesProps) {
  // Find the current post to access its metadata
  const currentPost = posts.find((p) =>
    typeof p.slug === 'object'
      ? p.slug.en === currentSlug || p.slug.id === currentSlug
      : p.slug === currentSlug
  );

  // Filter out current post
  const otherPosts = posts.filter((p) =>
    typeof p.slug === 'object'
      ? p.slug.en !== currentSlug && p.slug.id !== currentSlug
      : p.slug !== currentSlug
  );

  // Build a scored list for relevance matching
  const scored = otherPosts.map((post) => {
    let score = 0;

    // Highest priority: explicit editorial links
    const isRelated = currentPost?.relatedSlugs?.some((rel) =>
      typeof post.slug === 'object'
        ? rel === post.slug.en || rel === post.slug.id
        : rel === post.slug
    );
    if (isRelated) score += 100;

    // Same pillar
    if (currentPost?.pillar && post.pillar === currentPost.pillar) score += 30;

    // Same cluster
    if (currentPost?.cluster && post.cluster === currentPost.cluster) score += 20;

    // Same category (fallback)
    if (post.category === currentCategory) score += 10;

    return { post, score };
  });

  // Sort by score descending, then take top 3
  const related = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.post);

  if (related.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-t border-warm-border/80 bg-gradient-to-b from-transparent via-cream/30 to-cream/60 rounded-4xl mt-12">
      <Container size="large">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge variant="vermilion" size="sm" className="mb-4 uppercase tracking-widest text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-vermilion" />
              <span>{sectionTitle}</span>
            </Badge>
            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-charcoal leading-tight">
              {sectionSubtitle}
            </h3>
          </div>

          <a
            href={getLocalizedPath("/blog", locale)}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-charcoal hover:text-vermilion transition-colors pb-1 border-b border-charcoal/30 hover:border-vermilion w-fit group"
            data-cursor
          >
            <span>{viewAllLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((post) => {
            const relSlug = typeof post.slug === 'object' ? post.slug[locale] : post.slug;
            const keySlug = typeof post.slug === 'object' ? post.slug.en : post.slug;
            const postHref = locale === 'id' ? `/id/blog/${relSlug}` : `/blog/${relSlug}`;

            return (
              <a
                key={keySlug}
                href={postHref}
                className="group flex flex-col h-full bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EB] border border-warm-border rounded-3xl overflow-hidden hover:border-vermilion/50 hover:shadow-warm-lg hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-250 ease-emil-out will-change-transform"
                data-cursor
              >
              {/* Cover Image Container */}
              <div className="aspect-[16/10] overflow-hidden bg-cream relative">
                <img
                  src={post.coverImage}
                  alt={post.title[locale]}
                  className="w-full h-full object-cover transition-transform duration-500 ease-emil-out group-hover:scale-105 will-change-transform"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="vermilion" size="sm" className="uppercase font-bold text-[10px] shadow-sm">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-charcoal-muted mb-3">
                    <Clock className="w-3.5 h-3.5 text-vermilion" />
                    <span>{post.readTime} min read</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <h4 className="font-display font-bold text-lg sm:text-xl text-charcoal group-hover:text-vermilion transition-colors leading-snug line-clamp-2 mb-3">
                    {post.title[locale]}
                  </h4>

                  <p className="text-charcoal-muted text-xs sm:text-sm leading-relaxed line-clamp-2 mb-6">
                    {post.excerpt[locale]}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-warm-border/60 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={28}
                      height={28}
                      loading="lazy"
                      decoding="async"
                      className="w-7 h-7 rounded-full object-cover border border-warm-border"
                    />
                    <span className="font-display font-medium text-xs text-charcoal">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-vermilion flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
        </div>
      </Container>
    </section>
  );
}
