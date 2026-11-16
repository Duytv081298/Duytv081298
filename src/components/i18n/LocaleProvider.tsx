'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Locale = 'en' | 'vi' | 'zh';
const dictionaries = {
  en: { home:'Home', playable:'Playable Ads', games:'Games', tech:'Tech Stack', journey:'Journey', contact:'Contact', available:'Available for new projects', role:'Cocos Developer', intro:'I build high-performance, engaging and scalable games and playable ads across mobile, web and instant platforms.', projects:'Projects', years:'Years exp.', companies:'Companies', cocos:'Cocos Creator', play:'Play demo games', cv:'Download CV', social:'Find me on', top:'Back to top', language:'Language', menu:'Open navigation menu', close:'Close navigation menu' },
  vi: { home:'Trang chủ', playable:'Quảng cáo chơi thử', games:'Trò chơi', tech:'Công nghệ', journey:'Sự nghiệp', contact:'Liên hệ', available:'Sẵn sàng hợp tác dự án mới', role:'Lập trình viên Cocos', intro:'Tôi phát triển trò chơi và quảng cáo tương tác hiệu năng cao, hấp dẫn và có khả năng mở rộng trên di động, web và nền tảng instant.', projects:'Dự án', years:'Năm kinh nghiệm', companies:'Công ty', cocos:'Cocos Creator', play:'Chơi thử game', cv:'Tải CV', social:'Kết nối với tôi', top:'Về đầu trang', language:'Ngôn ngữ', menu:'Mở menu điều hướng', close:'Đóng menu điều hướng' },
  zh: { home:'首页', playable:'试玩广告', games:'游戏作品', tech:'技术栈', journey:'职业经历', contact:'联系我', available:'欢迎新项目合作', role:'Cocos 游戏开发工程师', intro:'我专注于开发高性能、富有吸引力且可扩展的移动端、网页端和即时游戏平台游戏及试玩广告。', projects:'项目', years:'年经验', companies:'公司', cocos:'Cocos Creator', play:'试玩游戏', cv:'下载简历', social:'关注我', top:'返回顶部', language:'语言', menu:'打开导航菜单', close:'关闭导航菜单' },
} as const;
type TranslationKey = keyof typeof dictionaries.en;
type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: TranslationKey) => string };
const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = 'portfolio-language';
function detectLocale(): Locale {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'vi' || saved === 'zh') return saved;
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of preferred) {
    const code = lang.toLowerCase().split('-')[0];
    if (code === 'vi' || code === 'zh' || code === 'en') return code;
  }
  return 'en';
}
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>('en');
  useEffect(() => { updateLocale(detectLocale()); }, []);
  useEffect(() => { document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale; }, [locale]);
  const setLocale = (next: Locale) => { window.localStorage.setItem(STORAGE_KEY, next); updateLocale(next); };
  return <LocaleContext.Provider value={{ locale, setLocale, t: (key) => dictionaries[locale][key] }}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used within LocaleProvider');
  return value;
}
