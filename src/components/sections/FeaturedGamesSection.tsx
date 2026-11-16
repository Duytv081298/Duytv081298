'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import Link from 'next/link';
import { games } from '@/data/games';
import { ArrowRight, Code2, Gamepad2, Globe2, MonitorSmartphone, Smartphone, Zap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const gameCategories = [
  {
    label: 'Mobile Games',
    value: 'mobile',
    icon: Smartphone,
    decoration: Gamepad2,
    description: 'Hyper casual and casual games built for iOS and Android.',
    color: '#4F8EF7',
  },
  {
    label: 'Instant Platforms',
    value: 'instant',
    icon: Zap,
    decoration: Globe2,
    description: 'Facebook Instant Games, Snapchat Games and other instant platforms.',
    color: '#00D97E',
  },
  {
    label: 'Web Games',
    value: 'web',
    icon: MonitorSmartphone,
    decoration: Code2,
    description: 'Browser-based HTML5 games with WebGL.',
    color: '#9B74FF',
  },
] as const;

export default function FeaturedGamesSection() {
  const { t } = useLocale();
  return (
    <section
      id="games"
      className="relative border-y border-border/50 bg-bg-secondary/35 py-10 md:py-12"
    >
      <div className="section-container">
        <SectionHeader
          id="games"
          title={t('Games Portfolio')}
          index="02"
          subtitle={t('Core game development across Mobile, Instant Platforms and Web.')}
          className="mb-6"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {gameCategories.map((category) => {
            const Icon = category.icon;
            const Decoration = category.decoration;

            return (
              <article
                key={category.value}
                className="group relative isolate flex min-h-[198px] flex-col overflow-hidden rounded-xl border bg-card/70 p-5 transition-colors duration-200 hover:bg-card focus-within:bg-card motion-reduce:transition-none sm:p-6"
                style={{
                  borderColor: `${category.color}80`,
                  backgroundImage: `linear-gradient(135deg, ${category.color}09 0%, transparent 62%)`,
                  boxShadow: `inset 0 0 0 1px ${category.color}08`,
                }}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <Icon
                    className="size-7 shrink-0"
                    strokeWidth={1.8}
                    style={{ color: category.color }}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-semibold text-text">{t(category.label)}</h3>
                </div>

                <p className="relative z-10 mt-3 max-w-[19rem] text-[13px] leading-5 text-text-secondary">
                  {t(category.description)}
                </p>

                <ul className="relative z-10 mt-auto space-y-1 pt-4">
                  {games.filter((game) => category.value === 'web' ? game.platforms.includes('Web') : game.category === category.value || (category.value === 'mobile' && game.platforms.includes('Mobile'))).map((game) => (
                    <li key={game.slug}>
                      <Link href={`/games/${game.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-md py-2 text-sm font-medium text-primary hover:underline" aria-label={`${t('View case study')}: ${game.title}`}>
                        {game.title}<ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <Decoration
                  className="pointer-events-none absolute -bottom-2 right-3 size-20 opacity-35 transition-opacity duration-200 group-hover:opacity-55 motion-reduce:transition-none sm:size-24"
                  strokeWidth={0.8}
                  style={{ color: category.color }}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
