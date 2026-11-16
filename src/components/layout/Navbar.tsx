'use client';

import { useEffect, useState, useRef } from 'react';
import { useLocale, type Locale } from '@/components/i18n/LocaleProvider';
import { Languages } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Gamepad2, Mail, Menu, X, Home, Box, Layers3, Flag } from 'lucide-react';
import { FacebookIcon, GithubIcon, InstagramIcon } from '@/components/ui/BrandIcons';

const navItems = [
  { label: 'home', href: '#hero', Icon: Home },
  { label: 'playable', href: '#playable', Icon: Gamepad2 },
  { label: 'games', href: '#games', Icon: Box },
  { label: 'tech', href: '#tech', Icon: Layers3 },
  { label: 'journey', href: '#career', Icon: Flag },
  { label: 'contact', href: '#contact', Icon: Mail },
];

export default function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const isScrollingRef = useRef(false);

  useEffect(() => {
    // 1. Scroll-top background change (no layout reflow)
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. IntersectionObserver for active section (highly performant, no layout thrashing)
    const visibleSections = new Set<string>();

    const observerOptions = {
      root: null,
      rootMargin: '-140px 0px -50% 0px', // detects when section is in upper half of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      // Find the active section (search from bottom to top to match scrolling progression)
      for (let index = navItems.length - 1; index >= 0; index -= 1) {
        const id = navItems[index].href.slice(1);
        if (visibleSections.has(id)) {
          setActiveSection(id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    navItems.forEach((item) => {
      const id = item.href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navigateTo = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    setActiveSection(id);
    
    isScrollingRef.current = true;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1200);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`fixed inset-x-0 top-0 z-50 h-[82px] border-b transition-all duration-300 ${
          scrolled
            ? 'border-violet-500/30 bg-bg-primary/95 shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl'
            : 'border-violet-500/20 bg-bg-primary/88 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6 md:px-10">
          {/* Logo Branding */}
          <Link
            href="/"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("#hero");
            }}
            className="group flex min-h-11 items-center gap-3 rounded-lg"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-violet-500 bg-[#090a0f] shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Gamepad2 size={20} className="text-violet-400" aria-hidden="true" />
            </span>
            <span className="hidden flex-col sm:flex">
              <span className="font-display text-[17px] font-extrabold uppercase leading-tight tracking-[0.08em] text-text">
                Duy <span className="text-violet-400">Dev</span>
              </span>
              <span className="font-code text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400/80">Game Developer</span>
            </span>
          </Link>

          {/* Middle Nav Capsule Menu */}
          <div className="hidden lg:flex items-center gap-6 px-6 py-2.5 rounded-xl border border-violet-500/30 bg-[#090a0f]/60 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.03)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigateTo(item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative min-h-9 cursor-pointer px-1.5 font-code text-[13px] font-bold uppercase tracking-[0.08em] transition-colors flex items-center gap-2.5 ${
                    isActive ? 'text-primary' : 'text-text-secondary hover:text-text'
                  }`}
                >
                  <item.Icon size={15} className={isActive ? 'text-primary' : 'text-text-secondary'} />
                  <span>{t(item.label as Parameters<typeof t>[0])}</span>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-[9px] left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Social Icons Group & Mobile Menu Trigger */}
          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-2.5 md:flex">
              <a
                href="https://github.com/Duytv081298"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-lg bg-[#090a0f] border border-violet-500/50 text-violet-300 hover:border-violet-400 hover:bg-violet-500/10 transition-all shadow-[0_0_12px_rgba(168,85,247,0.05)] hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://web.facebook.com/Duytv98"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-lg bg-[#090a0f] border border-violet-500/50 text-violet-300 hover:border-violet-400 hover:bg-violet-500/10 transition-all shadow-[0_0_12px_rgba(168,85,247,0.05)] hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg bg-[#090a0f] border border-violet-500/50 text-violet-300 hover:border-violet-400 hover:bg-violet-500/10 transition-all shadow-[0_0_12px_rgba(168,85,247,0.05)] hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
              >
                <InstagramIcon size={16} />
              </a>
            </div>

            <label className="relative flex min-h-11 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2 text-text-secondary focus-within:ring-2 focus-within:ring-primary">
              <Languages size={16} aria-hidden="true" />
              <span className="sr-only">{t('language')}</span>
              <select aria-label={t('language')} value={locale} onChange={(event) => setLocale(event.target.value as Locale)} className="max-w-[74px] cursor-pointer bg-[#090a0f] text-xs font-semibold text-text outline-none">
                <option value="en">EN</option><option value="vi">VI</option><option value="zh">中文</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t('close') : t('menu')}
              aria-expanded={mobileOpen}
              className="grid h-11 w-11 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-card hover:text-text lg:hidden"
            >
              {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-primary/80 px-4 pt-[94px] backdrop-blur-sm lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="glass-strong mx-auto max-w-lg rounded-2xl p-3"
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onClick={(event) => event.stopPropagation()}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => navigateTo(item.href)}
                    className={`min-h-12 w-full rounded-xl px-4 text-left text-sm font-medium transition-colors flex items-center gap-3.5 ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-card hover:text-text'
                    }`}
                  >
                    <item.Icon size={16} />
                    <span>{t(item.label as Parameters<typeof t>[0])}</span>
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
