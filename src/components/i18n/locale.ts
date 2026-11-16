export type Locale = 'en' | 'vi' | 'zh';
export const STORAGE_KEY = 'portfolio-language';
export const isLocale = (value: unknown): value is Locale => value === 'en' || value === 'vi' || value === 'zh';

export function resolveLocale(saved: unknown, languages: readonly string[]): Locale {
  if (isLocale(saved)) return saved;
  for (const language of languages) {
    const code = language.toLowerCase().split(/[-_]/)[0];
    if (isLocale(code)) return code;
  }
  return 'en';
}
