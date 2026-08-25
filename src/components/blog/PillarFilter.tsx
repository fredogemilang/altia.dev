import { useState } from 'react';
import type { Pillar } from '../../data/blog';
import { PILLAR_LABELS } from '../../data/blog';
import type { Locale } from '../../i18n/utils';

interface PillarFilterProps {
  activePillar: Pillar | 'all';
  onFilter: (pillar: Pillar | 'all') => void;
  locale: Locale;
}

const PILLARS: (Pillar | 'all')[] = [
  'all',
  'engineering',
  'ai-engineering',
  'creative-development',
  'infrastructure',
  'digital-products',
];

export function PillarFilter({ activePillar, onFilter, locale }: PillarFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PILLARS.map((pillar) => {
        const isActive = activePillar === pillar;
        const label =
          pillar === 'all'
            ? locale === 'id' ? 'Semua' : 'All'
            : PILLAR_LABELS[pillar]?.[locale] || pillar;

        return (
          <button
            key={pillar}
            onClick={() => onFilter(pillar)}
            className={`
              px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider
              border transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? 'bg-vermilion text-ivory border-vermilion shadow-sm'
                  : 'bg-cream text-charcoal-muted border-warm-border hover:border-vermilion hover:text-vermilion'
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
