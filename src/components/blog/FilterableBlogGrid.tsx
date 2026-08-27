import { useState } from 'react';
import { PillarFilter } from './PillarFilter';
import type { BlogPost, Pillar } from '../../data/blog';
import { PILLAR_LABELS } from '../../data/blog';
import type { Locale } from '../../i18n/utils';
import { t, getLocalizedPath } from '../../i18n/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';

function formatPublishedDate(dateStr: string, locale: Locale): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00Z');
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: locale === 'id' ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

interface FilterableBlogGridProps {
  posts: BlogPost[];
  locale: Locale;
}

export function FilterableBlogGrid({ posts, locale }: FilterableBlogGridProps) {
  const [activePillar, setActivePillar] = useState<Pillar | 'all'>('all');

  const filteredPosts =
    activePillar === 'all'
      ? posts
      : posts.filter((post) => post.pillar === activePillar);

  return (
    <div className="flex flex-col gap-8">
      {/* Pillar Filter Bar */}
      <PillarFilter
        activePillar={activePillar}
        onFilter={setActivePillar}
        locale={locale}
      />

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <p className="text-charcoal-muted text-lg">
              {locale === 'id'
                ? 'Belum ada artikel dalam kategori ini.'
                : 'No articles in this category yet.'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post, index) => {
            const postSlug = typeof post.slug === 'object' ? post.slug[locale] : post.slug;
            const postHref = locale === 'id' ? `/id/blog/${postSlug}` : `/blog/${postSlug}`;
            const keySlug = typeof post.slug === 'object' ? post.slug.en : post.slug;

            return (
              <div
                key={keySlug}
                className="flex flex-col justify-between h-full bg-warm-card border border-warm-border rounded-3xl p-5 group hover:border-vermilion transition-colors duration-300"
              >
                <div>
                  <a
                    href={postHref}
                    className="block aspect-[16/10] w-full rounded-2xl bg-cream overflow-hidden mb-6 relative cursor-pointer"
                    data-cursor
                    data-cursor-text="READ"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title[locale]}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge
                      variant="vermilion"
                      size="sm"
                      className="uppercase font-bold tracking-wider"
                    >
                      {post.pillar
                        ? PILLAR_LABELS[post.pillar]?.[locale] || post.category
                        : post.category}
                    </Badge>
                    <div className="flex items-center gap-3 text-xs text-charcoal-muted">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-vermilion" />
                          <span>{formatPublishedDate(post.publishedAt, locale)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-vermilion" />
                        <span>
                          {post.readTime} {t(locale, 'Blog.readTime')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={postHref}
                    className="block group/title"
                    data-cursor
                    data-cursor-text="READ"
                  >
                    <h3 className="font-display text-2xl font-bold text-charcoal mb-3 group-hover:text-vermilion transition-colors">
                      {post.title[locale]}
                    </h3>
                  </a>

                  <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
                    {post.excerpt[locale]}
                  </p>
                </div>

              <div className="pt-4 border-t border-warm-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full overflow-hidden">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={28}
                      height={28}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-display font-medium text-charcoal">
                    {post.author.name}
                  </span>
                </div>

                <Button
                  href={postHref}
                  variant="ghost"
                  size="sm"
                  className="text-vermilion font-bold p-0 hover:bg-transparent"
                  cursorText="READ"
                >
                  <span>{t(locale, 'Blog.readMore')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
}
