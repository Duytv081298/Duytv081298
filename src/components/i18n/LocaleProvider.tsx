'use client';

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { aliases, messages } from './messages';
import { isLocale, resolveLocale, STORAGE_KEY, type Locale } from './locale';
export type { Locale } from './locale';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};
const LocaleContext = createContext<LocaleContextValue | null>(null);
let sessionLocale: Locale | undefined;
const CHANGE_EVENT = 'portfolio-language-change';

function getLocale(): Locale {
  let saved: string | null = null;
  try { saved = window.localStorage.getItem(STORAGE_KEY); } catch { /* Storage can be disabled. */ }
  return sessionLocale ?? resolveLocale(saved, navigator.languages?.length ? navigator.languages : [navigator.language]);
}
function subscribe(notify: () => void) {
  const sync = () => { sessionLocale = undefined; notify(); };
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) sync();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener('languagechange', sync);
  window.addEventListener(CHANGE_EVENT, notify);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('languagechange', sync);
    window.removeEventListener(CHANGE_EVENT, notify);
  };
}
const serverLocale = (): Locale => 'en';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getLocale, serverLocale);
  useEffect(() => { document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale; }, [locale]);
  const setLocale = (next: Locale) => {
    if (!isLocale(next)) return;
    sessionLocale = next;
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* Keep the choice for this session. */ }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };
  const t: LocaleContextValue['t'] = (key, values) => {
    const source = aliases[key] ?? key;
    const translated = locale === 'en' ? source : messages[source]?.[locale === 'vi' ? 0 : 1] ?? source;
    return translated.replace(/\{(\w+)\}/g, (token, name: string) => String(values?.[name] ?? token));
  };
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      <MotionConfig reducedMotion="user">
        <a href="#main-content" className="skip-link">{t('Skip to content')}</a>
        {children}
      </MotionConfig>
    </LocaleContext.Provider>
  );
}
export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used within LocaleProvider');
  return value;
}
