'use client';

import { useReducedMotion } from '@/lib/useReducedMotion';

import { useEffect, useState } from 'react';
import { Languages, Gamepad2, Menu, X } from 'lucide-react';
import { useLocale, type Locale } from '@/components/i18n/LocaleProvider';
import Modal from '@/components/ui/Modal';

const navItems = [
  { label: 'home', href: '#hero' },
  { label: 'About Me', href: '#about' },
  { label: 'playable', href: '#playable' },
  { label: 'games', href: '#games' },
  { label: 'tech', href: '#tech' },
  { label: 'journey', href: '#career' },
  { label: 'contact', href: '#contact' },
];

export function LanguageSelect() {
  const { locale, ready, setLocale, t } = useLocale();
  return (
    <label className="flex min-h-11 items-center gap-2 rounded-lg border border-white/15 bg-card px-3 text-text-secondary focus-within:ring-2 focus-within:ring-primary">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">{t('language')}</span>
      <select disabled={!ready} value={locale} onChange={(event) => setLocale(event.target.value as Locale)}
        className="min-h-11 max-w-[106px] cursor-pointer bg-card text-sm text-text">
        <option value="en" lang="en">English</option>
        <option value="vi" lang="vi">Tiếng Việt</option>
        <option value="zh" lang="zh-CN">简体中文</option>
      </select>
    </label>
  );
}

export default function Navbar() {
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActiveSection(visible[visible.length - 1].target.id);
    }, { rootMargin: '-90px 0px -55% 0px' });
    navItems.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });
    const desktop = window.matchMedia('(min-width: 1280px)');
    const onResize = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener('change', onResize);
    return () => { observer.disconnect(); desktop.removeEventListener('change', onResize); };
  }, []);

  const navigateTo = (href: string) => {
    setMobileOpen(false);
    setActiveSection(href.slice(1));
    // Run after the native dialog restores focus to its trigger.
    requestAnimationFrame(() => {
      const section = document.querySelector<HTMLElement>(href);
      section?.setAttribute('tabindex', '-1');
      section?.focus({ preventScroll: true });
      section?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
      window.history.replaceState(null, '', href);
    });
  };
  const links = (mobile: boolean) => navItems.map((item) => (
    <a key={item.href} href={item.href}
      onClick={(event) => { event.preventDefault(); navigateTo(item.href); }}
      aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
      className={`${mobile ? 'min-h-12 px-4 py-3 text-base' : 'min-h-11 px-2 py-3 text-sm'} flex items-center rounded-lg font-medium transition-colors ${activeSection === item.href.slice(1) ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-white/5 hover:text-text'}`}>
      {t(item.label)}
    </a>
  ));
  return (
    <>
      <nav aria-label={t('Primary navigation')} className="fixed inset-x-0 top-0 z-50 h-[82px] border-b border-border bg-bg-primary/95 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-3 px-5 md:px-8">
          <a href="#hero" onClick={(event) => { event.preventDefault(); navigateTo('#hero'); }} className="flex min-h-11 items-center gap-3 rounded-lg" aria-label={`Duy Dev — ${t('home')}`}>
            <span className="grid size-11 place-items-center rounded-xl border border-primary/40 bg-primary/10"><Gamepad2 size={22} className="text-primary" aria-hidden="true" /></span>
            <span className="hidden font-display text-lg font-bold tracking-wide min-[400px]:block">Duy <span className="text-primary">Dev</span></span>
          </a>
          <div className="hidden items-center gap-1 xl:flex">{links(false)}</div>
          <div className="flex items-center gap-2">
            <LanguageSelect />
            <button type="button" onClick={() => setMobileOpen(true)} aria-label={t('menu')} aria-expanded={mobileOpen} aria-controls="mobile-navigation"
              className="grid size-11 place-items-center rounded-lg border border-border text-text hover:bg-card xl:hidden"><Menu size={22} aria-hidden="true" /></button>
          </div>
        </div>
      </nav>
      <Modal open={mobileOpen} onClose={() => setMobileOpen(false)} label={t('Primary navigation')}>
        <div id="mobile-navigation" className="w-full max-w-lg rounded-2xl border border-border bg-bg-primary p-5 shadow-2xl">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="font-display font-semibold">{t('Primary navigation')}</span>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label={t('close')} className="grid size-11 place-items-center rounded-lg hover:bg-card"><X size={22} aria-hidden="true" /></button>
          </div>
          <nav aria-label={t('Primary navigation')} className="flex flex-col gap-1">{links(true)}</nav>
        </div>
      </Modal>
    </>
  );
}
