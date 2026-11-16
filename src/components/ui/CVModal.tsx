'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Download, ExternalLink, Copy, Check, GraduationCap, Briefcase, Code2, Mail, Phone, MapPin, Trophy, FileText } from 'lucide-react';
import Modal from './Modal';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { useLocale, type Locale } from '@/components/i18n/LocaleProvider';
import { profile, cvFiles } from '@/data/profile';

export default function CVModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { locale, t } = useLocale();
  const [status, setStatus] = useState('');
  const [choice, setChoice] = useState<{ ui: Locale; pdf: 'en' | 'vi' } | null>(null);
  const pdfLocale = choice?.ui === locale ? choice.pdf : locale === 'vi' ? 'vi' : 'en';
  const selectedFile = cvFiles[pdfLocale];
  const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/cv/${selectedFile.filename}`;
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(new URL(pdfUrl, window.location.origin).href); setStatus('Link copied!'); }
    catch { setStatus('Unable to copy. Use your browser address bar to copy the link.'); }
  };
  const sectionTitle = 'flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wide text-text';
  const action = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-bg-primary px-3.5 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-primary/40 hover:text-text';

  return (
    <Modal open={isOpen} onClose={onClose} label={t('Curriculum Vitae')}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-primary/35 bg-[#090b14] text-text shadow-2xl">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 className="font-display text-lg font-bold sm:text-xl">{t('Curriculum Vitae')} — {profile.name}</h2>
            <p className="mt-1 text-sm text-text-secondary">{t(profile.role)}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('Close CV')} className="grid size-11 shrink-0 place-items-center rounded-lg text-text-secondary hover:bg-white/10 hover:text-text"><X size={22} aria-hidden="true" /></button>
        </header>

        <div className="min-h-0 space-y-7 overflow-y-auto p-4 sm:p-6 md:p-8">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5" aria-label={t('Professional summary')}>
            <h3 className={sectionTitle}><FileText size={18} className="shrink-0 text-primary" aria-hidden="true" />{t('Professional summary')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{t(profile.summary)}</p>
            <div className="mt-5 grid gap-3 border-t border-border pt-4 text-sm text-text-secondary sm:grid-cols-2">
              <a href={`tel:${profile.phone}`} className="flex min-h-11 items-center gap-2.5 hover:text-primary"><Phone size={16} className="shrink-0 text-primary" aria-hidden="true" />{profile.phoneDisplay}</a>
              <a href={`mailto:${profile.email}`} className="flex min-h-11 min-w-0 items-center gap-2.5 break-all hover:text-primary"><Mail size={16} className="shrink-0 text-primary" aria-hidden="true" />{profile.email}</a>
              <span className="flex min-h-11 items-center gap-2.5"><MapPin size={16} className="shrink-0 text-primary" aria-hidden="true" />{t(profile.location)}</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary"><LinkedinIcon size={16} />LinkedIn</a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary"><GithubIcon size={16} />GitHub</a>
              </div>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-xl border border-border bg-card p-5">
              <h3 className={sectionTitle}><GraduationCap size={18} className="shrink-0 text-primary" aria-hidden="true" />{t('Education')}</h3>
              <p className="mt-3 text-xs font-semibold text-primary">{profile.education.period}</p>
              <h4 className="mt-1 font-display font-semibold">{t(profile.education.school)}</h4>
              <p className="mt-2 text-sm text-text-secondary">{t(profile.education.degree)}</p>
              <p className="mt-1 text-sm text-primary">{t(profile.education.classification)}</p>
            </section>
            <section className="rounded-xl border border-accent/25 bg-accent/5 p-5">
              <h3 className={sectionTitle}><Trophy size={18} className="shrink-0 text-accent" aria-hidden="true" />{t('Honors & Awards')}</h3>
              <p className="mt-3 text-xs font-semibold text-accent">{profile.award.year}</p>
              <h4 className="mt-1 font-display font-semibold">{t(profile.award.title)}</h4>
              <p className="mt-2 text-sm text-text-secondary">{profile.award.company}</p>
            </section>
          </div>

          <section>
            <h3 className={sectionTitle}><Briefcase size={18} className="shrink-0 text-purple" aria-hidden="true" />{t('Work experience')}</h3>
            <div className="mt-4 space-y-4">
              {profile.experience.map((job) => (
                <article key={job.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div><h4 className="font-display text-base font-bold">{job.company}</h4><p className="mt-1 text-sm text-primary">{t(job.role)}</p></div>
                    <span className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{t(job.period)}</span>
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-text-secondary">{job.highlights.map((point) => <li key={point}>{t(point)}</li>)}</ul>
                  <div className="mt-4 flex flex-wrap gap-2">{job.tech.map((tech) => <span key={tech} className="rounded-md border border-border bg-bg-primary px-2 py-1 text-xs text-text-secondary">{tech}</span>)}</div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h3 className={sectionTitle}><Code2 size={18} className="shrink-0 text-accent" aria-hidden="true" />{t('Tech Stack')}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">{profile.skillGroups.map((group) => (
              <div key={group.title} className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-display text-sm font-semibold text-primary">{t(group.title)}</h4>
                <ul className="mt-3 flex flex-wrap gap-2">{group.items.map((item) => <li key={item} className="rounded-md border border-border px-2 py-1 text-xs leading-relaxed text-text-secondary">{t(item)}</li>)}</ul>
              </div>
            ))}</div>
          </section>
        </div>

        <footer className="shrink-0 space-y-3 border-t border-border bg-bg-primary p-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex min-h-11 items-center gap-2 text-sm text-text-secondary">
              <span>{t('CV language')}</span>
              <select value={pdfLocale} onChange={(event) => { setChoice({ ui: locale, pdf: event.target.value as 'en' | 'vi' }); setStatus(''); }} className="min-h-11 rounded-lg border border-border bg-card px-3 text-sm text-text">
                <option value="en" lang="en">English</option><option value="vi" lang="vi">Tiếng Việt</option>
              </select>
            </label>
            <span className="text-xs text-text-secondary">{t(pdfLocale === 'vi' ? 'Official CV (PDF, Vietnamese)' : 'Official CV (PDF, English)')}</span>
          </div>
          {locale === 'zh' && pdfLocale === 'en' && <p className="text-xs text-text-secondary">{t('English PDF is selected for the Chinese interface.')}</p>}
          <p role="status" className={status ? 'text-xs text-primary' : 'sr-only'}>{status && t(status)}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copyLink} className={action}>{status === 'Link copied!' ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{t('Copy CV link')}</button>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" hrefLang={pdfLocale} className={action}><ExternalLink size={15} aria-hidden="true" />{t('View online')}</a>
            <a href={pdfUrl} download={selectedFile.filename} hrefLang={pdfLocale} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-bg-primary hover:brightness-110"><Download size={15} aria-hidden="true" />{t('Download PDF')}</a>
          </div>
        </footer>
      </motion.div>
    </Modal>
  );
}
