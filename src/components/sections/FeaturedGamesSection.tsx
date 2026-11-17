'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { caseStudyHighlights, caseStudySlugs } from '@/data/caseStudies';
import { games } from '@/data/games';
import SectionHeader from '@/components/ui/SectionHeader';

const labels = {
  en: { heading: 'Selected engineering case studies', intro: 'Custom rendering, spatial interaction and data-driven 3D gameplay. Three projects that make the implementation and engineering decisions visible.', context: 'Product challenge', decision: 'Implemented solution', quality: 'Engineering value', detail: 'Read case study' },
  vi: { heading: 'Case study kỹ thuật tiêu biểu', intro: 'Render tùy biến, tương tác không gian và gameplay 3D từ dữ liệu. Ba sản phẩm thể hiện rõ giải pháp đã triển khai và chiều sâu của quyết định kỹ thuật.', context: 'Bài toán sản phẩm', decision: 'Giải pháp đã triển khai', quality: 'Giá trị kỹ thuật', detail: 'Xem case study' },
  zh: { heading: '精选工程案例', intro: '自定义渲染、空间交互与数据驱动的 3D 玩法。三个项目展示实际实现与工程决策的深度。', context: '产品挑战', decision: '已实现的方案', quality: '工程价值', detail: '查看案例' },
} as const;

export default function FeaturedGamesSection() {
  const { locale, t } = useLocale();
  const copy = labels[locale];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const featured = caseStudySlugs.flatMap(slug => {
    const game = games.find(game => game.slug === slug);
    return game ? [{ game, highlight: caseStudyHighlights[slug] }] : [];
  });
  return (
    <section id="games" aria-labelledby="games-heading" className="relative border-y border-border/50 bg-bg-secondary/35 py-12 md:py-20">
      <div className="section-container">
        <SectionHeader id="games" title={copy.heading} index="01" subtitle={copy.intro} className="mb-8" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {featured.map(({ game, highlight }) => {
            return (
              <article key={game.slug} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card/80 transition-colors hover:border-primary/60 focus-within:border-primary motion-reduce:transition-none">
                <Image src={`${basePath}/images/technical-reviews/${game.slug}.png`} alt={t('Captured from the inspected demo: {title}', { title: game.title })} width={440} height={800} className="h-72 w-full bg-bg-secondary object-contain" />
                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div><h3 className="text-xl font-bold text-text">{game.title}</h3><p className="mt-2 text-sm font-semibold leading-relaxed text-text">{t(highlight.focus)}</p></div>
                  <p className="text-xs font-medium leading-5 text-accent">{t('Sole developer')} · {t('100% of programming')}</p>
                  <div><h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">{copy.context}</h4><p className="text-sm leading-relaxed text-text-secondary">{t(highlight.context)}</p></div>
                  <div><h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">{copy.decision}</h4><p className="text-sm leading-relaxed text-text-secondary">{t(highlight.implementation)}</p></div>
                  <div><h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">{copy.quality}</h4><p className="text-sm leading-relaxed text-text-secondary">{t(highlight.value)}</p></div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">{game.tags.slice(0,3).map(tag => <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-text-secondary">{t(tag)}</span>)}</div>
                  <Link href={`/games/${game.slug}`} className="inline-flex min-h-11 items-center justify-between rounded-lg border border-primary/40 px-4 py-2 font-medium text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{copy.detail}<ArrowUpRight size={18} aria-hidden="true" /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
