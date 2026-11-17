'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { localizeGame } from '@/components/i18n/game-copy';
import { LanguageSelect } from '@/components/layout/Navbar';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { type Game } from '@/data/games';
import { caseStudies } from '@/data/caseStudies';
import demoEvidence from '@/data/demoEvidence.json';
import technicalEvidence from '@/data/technicalDemoEvidence.json';

export default function GameDetailClient({ game: source }: { game: Game }) {
  const { locale, t } = useLocale();
  const game = localizeGame(source, locale);
  const study = caseStudies[game.slug];
  const evidence = demoEvidence[game.slug as keyof typeof demoEvidence];
  const technical = technicalEvidence[game.slug as keyof typeof technicalEvidence];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return <main id="main-content" tabIndex={-1} className="min-h-screen bg-bg-primary text-text">
    <div className="section-container py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/#games" className="inline-flex min-h-11 items-center gap-2 text-sm text-primary"><ArrowLeft size={16} aria-hidden="true" />{t('Back to Portfolio')}</Link>
        <LanguageSelect />
      </div>
      <header className="grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        {technical ? <Image src={`${basePath}/images/technical-reviews/${game.slug}.png`} alt={t('Captured from the inspected demo: {title}', { title: game.title })} width={440} height={800} className="h-80 w-full rounded-2xl border border-border bg-bg-secondary object-contain lg:h-[440px]" /> : <div className="flex h-60 items-center justify-center rounded-2xl p-6 text-center text-3xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${game.coverColor}, ${game.coverColorSecondary})` }}>{game.title}</div>}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">{game.engine} · {t('Playable Ads')}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{game.title}</h1>
          <dl className="mt-5 rounded-xl border border-accent/30 bg-card p-4">
            <dt className="text-xs text-text-secondary">{t('My role')}</dt>
            <dd className="mt-2 text-sm font-semibold leading-6 text-accent">{t('Sole developer')} · {t('100% of programming')}</dd>
          </dl>
          <p className="mt-3 text-sm leading-7 text-text-secondary">{t('I handled all programming for this project, including the systems and technical decisions described below.')}</p>
          <p className="mt-4 text-xl font-semibold leading-relaxed">{study ? t(study.focus) : game.subtitle}</p>
          <p className="mt-4 text-sm leading-7 text-text-secondary">{study ? t(study.context) : game.description}</p>
          {evidence && <a href={`${basePath}${evidence.publicPath}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-lg bg-primary px-5 py-3 font-semibold text-bg-primary">{t('Open playable demo')}<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> — {game.title}</span></a>}
          {study && <dl className="mt-6 grid grid-cols-2 gap-3">{study.proof.map(item => <div key={item.label} className="min-w-0 rounded-xl border border-border bg-card p-4"><dt className="text-xs leading-5 text-text-secondary">{t(item.label)}</dt><dd className="mt-2 text-xl font-bold text-primary">{t(item.value)}</dd></div>)}</dl>}
        </div>
      </header>

      {study && <section aria-labelledby="implementation-heading" className="grid gap-6 border-t border-border py-10 md:grid-cols-2">
        <div><h2 id="implementation-heading" className="text-2xl font-bold">{t('Implemented solution')}</h2><p className="mt-4 text-sm leading-7 text-text-secondary">{t(study.implementation)}</p></div>
        <div className="rounded-xl border border-primary/30 bg-card p-5 sm:p-6"><h2 className="text-2xl font-bold">{t('Engineering value')}</h2><p className="mt-4 text-sm leading-7 text-text-secondary">{t(study.value)}</p></div>
      </section>}

      <section aria-labelledby="architecture-heading" className="border-t border-border py-10">
        <h2 id="architecture-heading" className="text-2xl font-bold">{t('Architecture')}</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-text-secondary">{study ? t(study.architecture) : game.architecture}</p>
      </section>

      {study && <section aria-labelledby="decisions-heading" className="border-t border-border py-10">
        <h2 id="decisions-heading" className="text-2xl font-bold">{t('Key engineering decisions')}</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">{study.decisions.map((decision, index) => <article key={decision.title} className="min-w-0 rounded-xl border border-border bg-card p-5 sm:p-6"><span aria-hidden="true" className="font-code text-sm text-primary">0{index + 1}</span><h3 className="mt-3 text-lg font-semibold">{t(decision.title)}</h3><p className="mt-3 text-sm leading-7 text-text-secondary">{t(decision.body)}</p></article>)}</div>
      </section>}

      {study && <section aria-labelledby="tradeoffs-heading" className="border-t border-border py-10">
        <h2 id="tradeoffs-heading" className="text-2xl font-bold">{t('Engineering trade-offs')}</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-text-secondary">{t(study.tradeoff)}</p>
      </section>}

      {evidence && <details className="my-6 rounded-xl border border-border bg-card p-5 sm:p-6" data-testid="technical-evidence">
        <summary id="evidence-heading" className="min-h-11 cursor-pointer rounded text-lg font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{t('Technical evidence')}</summary>
        <div className="mt-5 space-y-6 text-sm leading-7 text-text-secondary">
          <p>{t('Examples are linked to the packaged demos. Scene counts include inactive objects; device performance requires a separate benchmark.')}</p>
          {study && <div><h3 className="font-semibold text-text">{t('Inspected component methods')}</h3><ul className="mt-2 space-y-2 font-code text-xs">{Object.entries(study.methods).map(([name, methods]) => <li key={name} className="break-words">{name}: {methods.join(', ')}</li>)}</ul></div>}
          <dl className="grid min-w-0 gap-4 sm:grid-cols-2">
            <div><dt>{t('HTML file size')}</dt><dd className="font-code text-primary">{(evidence.bytes / 1_000_000).toFixed(2)} MB · {evidence.bytes.toLocaleString(locale)} {t('bytes')}</dd></div>
            <div><dt>{t('Artifact title')}</dt><dd className="break-words">{evidence.title}</dd></div>
            <div className="min-w-0 sm:col-span-2"><dt>SHA-256</dt><dd className="break-all font-code text-xs">{evidence.sha256}</dd></div>
          </dl>
          {study && <div><h3 className="font-semibold text-text">{t('Further development')}</h3><p className="mt-2">{t(study.nextStep)}</p></div>}
        </div>
      </details>}

      <nav aria-label={t('Explore engineering work')} className="flex flex-wrap gap-4 border-t border-border py-10">
        <Link href="/#games" className="inline-flex min-h-11 items-center rounded-lg border border-primary/40 px-4 py-2 text-sm font-semibold text-primary">{t('Selected engineering case studies')}</Link>
        <Link href="/#technical-evidence" className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 py-2 text-sm text-text-secondary">{t('More 3D engineering evidence')}</Link>
      </nav>
    </div>
  </main>;
}
