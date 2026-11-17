'use client';

import Link from 'next/link';
import { ArrowUpRight, Layers3, Gauge, Smartphone } from 'lucide-react';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { caseStudySlugs } from '@/data/caseStudies';
import { games } from '@/data/games';
import { localizeGame } from '@/components/i18n/game-copy';
import SectionHeader from '@/components/ui/SectionHeader';

const labels = {
  en: { heading: 'Selected engineering case studies', intro: 'Explore the engineering decisions behind three playable experiences. Each includes a demo artifact, design trade-offs and a validation plan.', challenge: 'Engineering challenge', solution: 'Approach', detail: 'Read case study', note: 'Design reviews accompany the playable artifacts; device performance results are not claimed.' },
  vi: { heading: 'Case study kỹ thuật tiêu biểu', intro: 'Khám phá quyết định kỹ thuật đằng sau ba trải nghiệm chơi thử. Mỗi dự án có tệp demo, phân tích đánh đổi và kế hoạch kiểm chứng.', challenge: 'Thách thức kỹ thuật', solution: 'Giải pháp', detail: 'Xem case study', note: 'Phân tích thiết kế đi kèm tệp demo; không đưa ra kết quả hiệu năng thiết bị chưa kiểm chứng.' },
  zh: { heading: '精选工程案例', intro: '了解三个试玩项目背后的工程决策。每个案例均提供试玩文件、设计取舍和验证计划。', challenge: '工程挑战', solution: '解决方案', detail: '查看案例', note: '案例结合试玩文件进行设计分析，未声称已验证设备性能。' },
} as const;

export default function FeaturedGamesSection() {
  const { locale, t } = useLocale();
  const copy = labels[locale];
  const featured = caseStudySlugs.map(slug => games.find(game => game.slug === slug)).filter((game): game is (typeof games)[number] => Boolean(game));
  return (
    <section id="games" aria-labelledby="games-heading" className="relative border-y border-border/50 bg-bg-secondary/35 py-12 md:py-20">
      <div className="section-container">
        <SectionHeader id="games" title={copy.heading} index="02" subtitle={copy.intro} className="mb-8" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {featured.map((source, index) => {
            const game = localizeGame(source, locale);
            const Icon = index === 0 ? Layers3 : index === 1 ? Gauge : Smartphone;
            return (
              <article key={game.slug} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card/80 transition-colors hover:border-primary/60 focus-within:border-primary motion-reduce:transition-none">
                <div className="relative flex min-h-44 items-end overflow-hidden p-6" style={{ background: `linear-gradient(135deg, ${game.coverColor}, ${game.coverColorSecondary})` }}>
                  <span className="absolute right-5 top-5 rounded-full bg-black/30 p-3 text-white"><Icon size={22} aria-hidden="true" /></span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-white/90">{game.engine}</span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div><h3 className="text-xl font-bold text-text">{game.title}</h3><p className="mt-1 text-sm text-text-secondary">{game.subtitle}</p></div>
                  <div><h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">{copy.challenge}</h4><p className="text-sm leading-relaxed text-text-secondary">{game.challenges[0]}</p></div>
                  <div><h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">{copy.solution}</h4><p className="text-sm leading-relaxed text-text-secondary">{game.solutions[0]}</p></div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">{game.tags.slice(0,3).map(tag => <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-text-secondary">{t(tag)}</span>)}</div>
                  <Link href={`/games/${game.slug}`} className="inline-flex min-h-11 items-center justify-between rounded-lg border border-primary/40 px-4 py-2 font-medium text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{copy.detail}<ArrowUpRight size={18} aria-hidden="true" /></Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-text-muted">{copy.note}</p>
      </div>
    </section>
  );
}
