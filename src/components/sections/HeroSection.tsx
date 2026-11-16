'use client';

import { useState } from 'react';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { motion, useReducedMotion } from 'motion/react';
import { BriefcaseBusiness, Download, Gamepad2, Layers3, Play, Zap } from 'lucide-react';
import { GithubIcon, FacebookIcon } from '@/components/ui/BrandIcons';
import MagneticButton from '@/components/ui/MagneticButton';
import GlowOrb from '@/components/effects/GlowOrb';
import CVModal from '@/components/ui/CVModal';
import { playableAds } from '@/data/playableAds';

const stats = [
  { value: '30+', label: 'projects', color: '#3EA6FF', Icon: Layers3 },
  { value: '5+', label: 'years', color: '#00DFA2', Icon: Zap },
  { value: '4', label: 'companies', color: '#9B74FF', Icon: BriefcaseBusiness },
  { value: 'HTML5', label: 'cocos', color: '#8AB4FF', Icon: Gamepad2 },
];

const iconPositions = [
  { left: 44, top: 2, size: 72 },
  { left: 25, top: 17, size: 66 },
  { left: 61, top: 13, size: 70 },
  { left: 8, top: 35, size: 72 },
  { left: 42, top: 30, size: 68 },
  { left: 77, top: 31, size: 72 },
  { left: 91, top: 48, size: 70 },
  { left: 3, top: 58, size: 72 },
  { left: 27, top: 52, size: 68 },
  { left: 57, top: 51, size: 72 },
  { left: 75, top: 65, size: 68 },
  { left: 17, top: 78, size: 70 },
  { left: 45, top: 73, size: 72 },
  { left: 65, top: 84, size: 68 },
];

const heroGames = playableAds.filter((ad) => ad.icon).slice(0, iconPositions.length);

export default function HeroSection() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const openGame = (slug: string) => {
    window.dispatchEvent(new CustomEvent('play-game', { detail: { slug } }));
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[720px] items-center overflow-hidden border-b border-border/30 pt-24 pb-12 lg:pt-28 lg:pb-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(87,48,190,0.12),transparent_35%),radial-gradient(circle_at_96%_36%,rgba(20,130,220,0.1),transparent_28%)]" />
      <GlowOrb color="#5A3FD9" size={520} top="-12%" left="52%" delay={0} />
      <GlowOrb color="#006BE6" size={420} top="24%" left="78%" delay={2} />

      <div className="section-container relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex min-w-0 flex-col lg:col-span-6">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(0,217,126,0.8)]" />
              </span>
              <span className="font-code text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                {t('available')}
              </span>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <h1 className="font-display text-[44px] font-bold leading-[1.02] tracking-[-0.045em] text-text sm:text-[54px] lg:text-[64px]">
                Trịnh Văn{' '}
                <span className="bg-gradient-to-r from-primary via-purple to-accent bg-clip-text text-transparent">
                  Duy
                </span>
              </h1>
              <p className="mt-4 font-display text-lg font-semibold text-[#A8B6CB] lg:text-xl">
                Cocos Developer
              </p>
              <p className="mt-4 max-w-[570px] text-sm leading-7 text-text-secondary">
                {t('intro')}
              </p>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-6 grid max-w-[610px] grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {stats.map(({ value, label, color, Icon }) => (
                <div
                  key={label}
                  className="flex min-h-14 items-center gap-2 rounded-lg border border-border/90 bg-[#07101d]/80 px-3"
                >
                  <Icon size={16} style={{ color }} aria-hidden="true" />
                  <span className="font-code text-base font-bold tabular-nums" style={{ color }}>
                    {value}
                  </span>
                  <span className="text-[10px] leading-tight text-text-secondary">{t(label as Parameters<typeof t>[0])}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton variant="primary" size="md" onClick={() => openGame('arrow')} className="min-h-12 min-w-[245px] text-sm font-semibold">
                <Play size={15} fill="currentColor" aria-hidden="true" />
                {t('play')}
              </MagneticButton>
              <MagneticButton variant="ghost" size="md" onClick={() => setIsCVModalOpen(true)} className="min-h-12 min-w-[225px] text-sm font-semibold">
                <Download size={15} aria-hidden="true" />
                {t('cv')}
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="mt-7 flex items-center gap-2.5"
            >
              <span className="mr-1 font-code text-[9px] uppercase tracking-[0.2em] text-text-muted">{t('social')}</span>
              <a
                href="https://github.com/Duytv081298"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href="https://web.facebook.com/Duytv98"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <FacebookIcon size={17} />
              </a>
            </motion.div>
          </div>

          <div className="relative hidden h-[510px] lg:col-span-6 lg:block" aria-label="Featured game icons">
            <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 620 510" fill="none" aria-hidden="true">
              <ellipse cx="330" cy="255" rx="282" ry="188" stroke="url(#hero-orbit)" strokeOpacity="0.28" />
              <ellipse cx="330" cy="255" rx="222" ry="142" stroke="url(#hero-orbit)" strokeOpacity="0.22" />
              <ellipse cx="330" cy="255" rx="142" ry="92" stroke="url(#hero-orbit)" strokeOpacity="0.18" />
              <path d="M43 257C115 70 465 35 591 194" stroke="url(#hero-orbit)" strokeOpacity="0.16" />
              <defs>
                <linearGradient id="hero-orbit" x1="30" y1="80" x2="600" y2="440" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C5CFF" />
                  <stop offset="0.55" stopColor="#377DFF" />
                  <stop offset="1" stopColor="#00D97E" />
                </linearGradient>
              </defs>
            </svg>

            {heroGames.map((game, index) => {
              const position = iconPositions[index];
              return (
                <motion.button
                  key={game.slug}
                  type="button"
                  onClick={() => openGame(game.slug)}
                  aria-label={`Play ${game.title}`}
                  className="group absolute cursor-pointer rounded-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  style={{ left: `${position.left}%`, top: `${position.top}%`, width: position.size, height: position.size }}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1, y: reduceMotion ? 0 : [0, -5, 0] }}
                  transition={{
                    opacity: { duration: 0.35, delay: 0.08 + index * 0.025 },
                    scale: { duration: 0.35, delay: 0.08 + index * 0.025 },
                    y: { duration: 4.5 + (index % 4), repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 },
                  }}
                  whileHover={reduceMotion ? undefined : { scale: 1.08, y: -4 }}
                >
                  <img
                    src={game.icon}
                    alt=""
                    width={position.size}
                    height={position.size}
                    className="h-full w-full rounded-[18px] border border-white/20 object-cover shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_20px_rgba(62,166,255,0.12)] transition-shadow group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.7),0_0_24px_rgba(62,166,255,0.3)]"
                  />
                </motion.button>
              );
            })}

            <div className="absolute bottom-1 left-[18%] right-[8%] h-14 rounded-[50%] bg-[radial-gradient(ellipse,rgba(48,96,190,0.16),transparent_68%)] blur-md" aria-hidden="true" />
            <Gamepad2 className="absolute bottom-6 right-5 text-primary/15" size={24} aria-hidden="true" />
          </div>
        </div>
      </div>

      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
}
