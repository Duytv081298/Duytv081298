'use client';

import { Code2, MapPin, Trophy } from 'lucide-react';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { cvFiles, profile } from '@/data/profile';
import SectionHeader from '@/components/ui/SectionHeader';

const focus = [
  { title: 'Client architecture', detail: profile.experience[1].highlights[1] },
  { title: 'Production automation', detail: profile.experience[0].highlights[1] },
  { title: 'Cross-platform delivery', detail: profile.experience[2].highlights[0] },
];

export default function AboutSection() {
  const { t } = useLocale();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-border/50 py-12 md:py-16">
      <div className="section-container grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div className="min-w-0">
          <SectionHeader id="about" title={t('About Me')} className="mb-5" />
          <p className="max-w-3xl text-sm leading-7 text-text-secondary">{t(profile.summary)}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary">
            <span className="inline-flex items-center gap-2"><MapPin size={17} aria-hidden="true" />{t(profile.location)}</span>
            <span className="inline-flex items-center gap-2"><Trophy size={17} className="text-accent" aria-hidden="true" />{t(profile.award.title)} · {profile.award.company}</span>
          </div>
          <p className="mt-5 text-sm text-text-secondary">{profile.education.period} · {t(profile.education.school)} · {t(profile.education.degree)} · {t(profile.education.classification)}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {Object.entries(cvFiles).map(([language, file]) => (
              <a key={language} href={`${basePath}/cv/${file.filename}`} hrefLang={language} type="application/pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10">
                {t(language === 'vi' ? 'Official CV (PDF, Vietnamese)' : 'Official CV (PDF, English)')}
              </a>
            ))}
          </div>
        </div>
        <ul className="grid content-start gap-3">
          {focus.map(({ title, detail }) => (
            <li key={title} className="rounded-xl border border-border bg-card/70 p-5">
              <h3 className="flex items-center gap-2 text-base font-semibold"><Code2 size={18} className="shrink-0 text-primary" aria-hidden="true" />{t(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{t(detail)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
