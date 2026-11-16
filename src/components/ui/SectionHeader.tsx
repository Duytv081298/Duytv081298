'use client';

import { useState, type ReactNode } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { useLocale } from '@/components/i18n/LocaleProvider';

interface SectionHeaderProps {
  title: ReactNode; subtitle?: string; accent?: string; icon?: ReactNode;
  align?: 'left' | 'center'; index?: string; className?: string; id?: string;
}
export default function SectionHeader({ title, subtitle, accent, icon, align = 'left', index, className, id }: SectionHeaderProps) {
  const { t } = useLocale();
  const [status, setStatus] = useState('');
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`);
      setStatus('Link copied!');
    } catch { setStatus('Unable to copy. Use your browser address bar to copy the link.'); }
  };
  return (
    <header className={`${className ?? 'mb-7'} ${align === 'center' ? 'text-center' : 'text-left'}`} data-section-index={index}>
      {accent && <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{t(accent)}</p>}
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        {icon && <span className="shrink-0 text-primary" aria-hidden="true">{icon}</span>}
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl">{title}</h2>
        {id && <button type="button" onClick={copyLink} aria-label={`${t('Copy section link')}: ${typeof title === 'string' ? title : ''}`} className="grid size-11 shrink-0 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-card hover:text-primary"><LinkIcon size={18} aria-hidden="true" /></button>}
      </div>
      <p role="status" className={status ? 'mt-2 text-xs text-primary' : 'sr-only'}>{status && t(status)}</p>
      {subtitle && <p className={`mt-2 text-sm leading-relaxed text-text-secondary ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-3xl'}`}>{subtitle}</p>}
    </header>
  );
}
