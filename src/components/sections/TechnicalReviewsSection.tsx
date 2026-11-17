'use client';

import Image from 'next/image';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { technicalReviews } from '@/data/technicalReviews';
import technicalEvidence from '@/data/technicalDemoEvidence.json';

export default function TechnicalReviewsSection() {
  const { locale, t } = useLocale();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return <section id="technical-evidence" aria-labelledby="technical-evidence-heading" className="relative py-12 md:py-20">
    <div className="section-container">
      <h2 id="technical-evidence-heading" className="text-2xl font-bold sm:text-3xl">{t('More engineering strengths')}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">{t('Camera mathematics, selective physics and angle-aware rendering: three more examples of implementation depth across playable projects.')}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {technicalReviews.map(review => {
          const evidence = technicalEvidence[review.slug];
          const counts: Record<string, number> = evidence.components;
          return <article key={review.slug} aria-labelledby={`review-${review.slug}`} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card/80">
            <Image src={`${basePath}/images/technical-reviews/${review.slug}.png`} alt={t('Captured from the inspected demo: {title}', { title: review.title })} width={440} height={800} className="h-72 w-full bg-bg-secondary object-contain" />
            <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
              <div><h3 id={`review-${review.slug}`} className="text-xl font-bold">{review.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-primary">{t(review.focus)}</p></div>
              <p className="text-xs font-medium leading-5 text-accent">{t('Sole developer')} · {t('100% of programming')}</p>
              <div><h4 className="text-xs font-bold uppercase tracking-wide text-primary">{t('Implemented solution')}</h4><p className="mt-2 text-sm leading-7 text-text-secondary">{t(review.implementation)}</p></div>
              <div><h4 className="text-xs font-bold uppercase tracking-wide text-primary">{t('Engineering value')}</h4><p className="mt-2 text-sm leading-7 text-text-secondary">{t(review.value)}</p></div>
              <details className="rounded-lg border border-border p-3">
                <summary className="min-h-11 cursor-pointer rounded font-semibold leading-6 text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{t('Technical evidence')}</summary>
                <div className="mt-4 space-y-5 text-sm leading-7 text-text-secondary">
                  <p>{t(review.observation)}</p>
                  <dl className="grid gap-2 rounded-lg border border-border p-3 text-xs">
                {review.components.map(name => <div key={name} className="flex min-w-0 items-start justify-between gap-3"><dt className="break-all font-code text-text-secondary">{name}</dt><dd className="font-semibold">{(counts[name] || 0).toLocaleString(locale)}</dd></div>)}
              </dl>
                  <p className="text-xs">{t('Examples are linked to the packaged demos. Scene counts include inactive objects; device performance requires a separate benchmark.')}</p>
                  <div><h4 className="font-semibold text-text">{t('Inspected component methods')}</h4>
                    <ul className="mt-2 space-y-2 font-code text-xs">{Object.entries(review.methods).map(([name, methods]) => <li key={name} className="break-words">{name}: {methods.join(', ')}</li>)}</ul>
                  </div>
                  <p className="break-all font-code text-xs">SHA-256: {evidence.sha256}</p>
                  <div><h4 className="font-semibold text-text">{t('Further development')}</h4><p className="mt-1">{t(review.recommendation)}</p></div>
                </div>
              </details>
              <a href={`${basePath}${evidence.publicPath}`} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/40 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{t('Open playable demo')}<span className="sr-only"> — {review.title}</span></a>
            </div>
          </article>;
        })}
      </div>
      <a href={`${basePath}/evidence/3d-demo-audit.json`} className="mt-3 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">{t('View the inspection manifest')}</a>
    </div>
  </section>;
}
