'use client';

import type { MouseEvent } from 'react';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { ArrowUp, Gamepad2 } from 'lucide-react';

export default function Footer() {
  const { t } = useLocale();
  const scrollToTop = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const hero = document.getElementById('hero');
    hero?.setAttribute('tabindex', '-1');
    hero?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <footer className="relative z-30 border-t border-border/70 bg-bg-primary/95 py-6">
      <div className="section-container flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 shadow-[0_0_12px_rgba(79,142,247,0.15)]">
            <Gamepad2 size={18} className="text-primary" aria-hidden="true" />
          </span>
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-text">
            Duy <span className="text-primary">Dev</span>
          </span>
        </div>

        {/* Copyright & Info */}
        <p className="font-code text-xs text-text-secondary text-center sm:text-left">
          © {new Date().getFullYear()} Trịnh Văn Duy. {t('All rights reserved.')}
        </p>

        {/* Back to top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="group relative z-30 flex min-h-11 cursor-pointer pointer-events-auto items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-code text-xs font-bold uppercase tracking-wider text-text-secondary transition-all hover:border-primary/50 hover:bg-primary/15 hover:text-primary active:scale-95 shadow-md"
          aria-label={t("top")}
        >
          <span>{t("top")}</span>
          <ArrowUp size={16} className="transition-transform group-hover:-translate-y-1 text-primary" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
