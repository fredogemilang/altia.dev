import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/data/blog";
import { getLocalizedPath, type Locale } from "@/i18n/utils";

interface NextPrevArticlesProps {
  prevPost?: BlogPost;
  nextPost?: BlogPost;
  locale: Locale;
  prevLabel?: string;
  nextLabel?: string;
}

export function NextPrevArticles({
  prevPost,
  nextPost,
  locale,
  prevLabel = "Previous Article",
  nextLabel = "Next Article",
}: NextPrevArticlesProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-warm-border/80">
      {/* Previous Article */}
      {prevPost ? (
        <a
          href={getLocalizedPath(`/blog/${prevPost.slug}`, locale)}
          className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF4EB] border border-warm-border hover:border-vermilion/50 hover:shadow-md transition-all duration-300"
          data-cursor
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted group-hover:text-vermilion mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
            <span>{prevLabel}</span>
          </div>

          <div>
            <Badge variant="vermilion" size="sm" className="mb-2.5 uppercase font-bold text-[10px]">
              {prevPost.category}
            </Badge>
            <h4 className="font-display font-bold text-base sm:text-lg text-charcoal group-hover:text-vermilion transition-colors line-clamp-2 leading-snug">
              {prevPost.title[locale]}
            </h4>
          </div>
        </a>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* Next Article */}
      {nextPost ? (
        <a
          href={getLocalizedPath(`/blog/${nextPost.slug}`, locale)}
          className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF4EB] border border-warm-border hover:border-vermilion/50 hover:shadow-md transition-all duration-300 text-right items-end"
          data-cursor
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted group-hover:text-vermilion mb-4 transition-colors">
            <span>{nextLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </div>

          <div className="flex flex-col items-end">
            <Badge variant="vermilion" size="sm" className="mb-2.5 uppercase font-bold text-[10px]">
              {nextPost.category}
            </Badge>
            <h4 className="font-display font-bold text-base sm:text-lg text-charcoal group-hover:text-vermilion transition-colors line-clamp-2 leading-snug">
              {nextPost.title[locale]}
            </h4>
          </div>
        </a>
      ) : (
        <div className="hidden md:block" />
      )}
    </div>
  );
}
