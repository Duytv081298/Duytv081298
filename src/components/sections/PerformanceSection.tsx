'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import SectionHeader from '@/components/ui/SectionHeader';

const metrics = [
  { label: 'Target frame rate', value: '60', unit: 'FPS', detail: 'On low-end mobile devices', color: '#38BDF8' },
  { label: 'Playable size budgets', value: '2–5', unit: 'MB', detail: 'Across major ad networks', color: '#9B74FF' },
  { label: 'Manual deployment time', value: '−70', unit: '%', detail: 'Reduced through internal automation', color: '#00D97E' },
  { label: 'Years of experience', value: '6+', unit: '', detail: 'From concept to launch', color: '#F59E0B' },
];
export default function PerformanceSection() {
  const { t } = useLocale();
  return <section id="performance" className="relative border-b border-border/50 py-10">
    <div className="section-container">
      <SectionHeader id="performance" title={t('Engineering impact')} subtitle={t('Rendering performance, lean builds and automated delivery.')} className="mb-5" />
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{metrics.map((metric) => (
        <div key={metric.label} className="flex min-h-44 flex-col rounded-xl border bg-card/65 p-4 sm:p-5" style={{ borderColor: `${metric.color}40` }}>
          <dt className="text-xs font-semibold leading-relaxed" style={{ color: metric.color }}>{t(metric.label)}</dt>
          <dd className="mt-3 font-code text-3xl font-bold" style={{ color: metric.color }}>{metric.value}<span className="ml-1 text-sm">{metric.unit}</span></dd>
          <dd className="mt-auto pt-3 text-xs leading-relaxed text-text-secondary">{t(metric.detail)}</dd>
        </div>
      ))}</dl>
    </div>
  </section>;
}
