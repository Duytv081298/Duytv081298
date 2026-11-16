'use client';

import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/useReducedMotion';
import Link from 'next/link';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { localizeGame } from '@/components/i18n/game-copy';
import { LanguageSelect } from '@/components/layout/Navbar';
import { ArrowLeft, Cpu, Zap, TrendingDown, ArrowRight, Target, Lightbulb, Wrench } from 'lucide-react';
import { type Game } from '@/data/games';
import { PlatformBadge } from '@/components/ui/Badge';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import GridBackground from '@/components/effects/GridBackground';
import MouseSpotlight from '@/components/effects/MouseSpotlight';

interface GameDetailClientProps {
  game: Game;
}

function OptimizationCard({
  metric,
  before,
  after,
  index,
}: {
  metric: string;
  before: string;
  after: string;
  index: number;
}) {
  const { t } = useLocale();
  return (
    <RevealOnScroll delay={index * 0.1}>
      <div className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
        <p className="text-text-muted text-xs font-code uppercase tracking-wider mb-4">
          {t(metric)}
        </p>

        <div className="flex items-center gap-3">
          {/* Before */}
          <div className="flex-1 text-center">
            <p className="text-danger font-code text-2xl font-bold">{before}</p>
            <p className="text-text-muted text-[10px] mt-1 uppercase">{t('Before')}</p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <TrendingDown size={16} className="text-accent" />
            <ArrowRight size={14} className="text-accent" />
          </div>

          {/* After */}
          <div className="flex-1 text-center">
            <p className="text-accent font-code text-2xl font-bold">{after}</p>
            <p className="text-text-muted text-[10px] mt-1 uppercase">{t('After')}</p>
          </div>
        </div>

        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </RevealOnScroll>
  );
}

export default function GameDetailClient({ game: source }: GameDetailClientProps) {
  const { locale, t } = useLocale();
  const game = localizeGame(source, locale);
  const reduceMotion = useReducedMotion();
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-bg-primary text-text">
      <GridBackground />
      <MouseSpotlight />

      {/* Header / Hero */}
      <div className="relative overflow-hidden">
        {/* Banner Gradient */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${game.coverColor}, ${game.coverColorSecondary}, transparent)`,
          }}
        />

        <div className="section-container relative z-10 pt-8 pb-16">
          <div className="mb-6 flex justify-end"><LanguageSelect /></div>
          {/* Back Button */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#games"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-card border border-border/50 hover:border-border transition-all duration-200 text-sm mb-8"
            >
              <ArrowLeft size={16} />
              {t('Back to Portfolio')}
            </Link>
          </motion.div>

          {/* Game Info */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Cover */}
            <motion.div
              className="w-full lg:w-96 aspect-[16/10] rounded-2xl overflow-hidden shrink-0 shadow-2xl"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${game.coverColor}, ${game.coverColorSecondary})`,
                }}
              >
                <span className="text-white/90 font-display font-bold text-3xl drop-shadow-lg">
                  {game.title}
                </span>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              className="flex-1"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-code border border-primary/20">
                  {t(game.genre)}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-card text-text-secondary text-xs font-code border border-border">
                  {game.engine}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-2">
                {game.title}
              </h1>
              <p className="text-text-secondary text-lg mb-6">{game.subtitle}</p>

              {/* Platforms */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[...new Set(game.platforms)].map((platform) => (
                  <PlatformBadge key={platform} platform={platform} />
                ))}
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed">{game.description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Neon Divider */}
      <div className="neon-line" />

      {/* Content Sections */}
      <div className="section-container py-16 space-y-20">
        {/* Architecture */}
        <RevealOnScroll>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Cpu size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-text">{t('Architecture')}</h2>
                <p className="text-text-muted text-xs font-code">{"// system_design"}</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-text-secondary leading-relaxed">{game.architecture}</p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Challenges & Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevealOnScroll direction="left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center">
                  <Target size={20} className="text-danger" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-text">{t('Challenges')}</h2>
                  <p className="text-text-muted text-xs font-code">{"// problems_faced"}</p>
                </div>
              </div>
              <div className="space-y-3">
                {game.challenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-xl p-4 flex items-start gap-3"
                  >
                    <span className="text-danger font-code text-sm font-bold mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Lightbulb size={20} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-text">{t('Solutions')}</h2>
                  <p className="text-text-muted text-xs font-code">{"// implementation"}</p>
                </div>
              </div>
              <div className="space-y-3">
                {game.solutions.map((solution, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-xl p-4 flex items-start gap-3"
                  >
                    <span className="text-accent font-code text-sm font-bold mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Performance Optimization */}
        <div>
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Zap size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-text">
                  {t('Performance Optimization')}
                </h2>
                <p className="text-text-muted text-xs font-code">{"// before_vs_after"}</p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {game.optimizations.map((opt, i) => (
              <OptimizationCard
                key={opt.metric}
                metric={opt.metric}
                before={opt.before}
                after={opt.after}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Tags */}
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <Wrench size={16} className="text-text-muted" />
            <span className="text-text-muted text-xs font-code uppercase tracking-wider">
              {t('Technologies')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span
                key={t(tag)}
                className="px-3 py-1.5 rounded-lg bg-card border border-border text-text-secondary text-sm font-code hover:border-primary/30 hover:text-text transition-all duration-200"
              >
                {t(tag)}
              </span>
            ))}
          </div>
        </RevealOnScroll>

        {/* Back Link */}
        <div className="pt-8 border-t border-border">
          <Link
            href="/#games"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 font-display text-sm"
          >
            <ArrowLeft size={16} />
            {t('Back to Portfolio')}
          </Link>
        </div>
      </div>
    </main>
  );
}
