'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import SectionHeader from '@/components/ui/SectionHeader';

interface MetricData {
  label: string;
  prefix?: string;
  value: string;
  suffix: string;
  color: string;
  sparklineData: readonly number[];
}

const metrics: MetricData[] = [
  {
    label: 'FPS',
    value: '60',
    suffix: 'FPS',
    color: '#38BDF8',
    sparklineData: [42, 48, 45, 52, 46, 51, 49, 55, 53, 57, 50, 54, 58, 55, 60, 57, 54, 56, 52, 51, 47, 50, 45, 48],
  },
  {
    label: 'Memory',
    value: '100',
    suffix: 'MB',
    color: '#9B74FF',
    sparklineData: [35, 40, 43, 39, 46, 48, 45, 51, 54, 50, 55, 58, 53, 57, 61, 56, 52, 50, 47, 49, 45, 42, 44, 40],
  },
  {
    label: 'Optimized',
    value: '150',
    suffix: 'MB',
    color: '#00D97E',
    sparklineData: [31, 45, 38, 49, 44, 52, 47, 55, 51, 43, 40, 48, 54, 58, 53, 57, 61, 59, 62, 57, 60, 58, 63, 61],
  },
  {
    label: 'Load time',
    prefix: '<',
    value: '3',
    suffix: 's',
    color: '#F59E0B',
    sparklineData: [38, 42, 49, 45, 51, 47, 44, 48, 43, 41, 46, 50, 45, 42, 47, 40, 37, 45, 43, 49, 41, 38, 46, 42],
  },
];

function buildSparkline(data: readonly number[]) {
  const width = 240;
  const height = 52;
  const minimum = Math.min(...data);
  const maximum = Math.max(...data);
  const range = maximum - minimum || 1;
  const xStep = width / Math.max(data.length - 1, 1);
  const points = data.map((value, index) => ({
    x: index * xStep,
    y: height - 5 - ((value - minimum) / range) * (height - 12),
  }));

  let line = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const controlOffset = xStep * 0.34;
    line += ` C ${previous.x + controlOffset} ${previous.y}, ${current.x - controlOffset} ${current.y}, ${current.x} ${current.y}`;
  }

  return {
    width,
    height,
    line,
    area: `${line} L ${width} ${height} L 0 ${height} Z`,
  };
}

function Sparkline({ data, color, index }: { data: readonly number[]; color: string; index: number }) {
  const chart = buildSparkline(data);
  const gradientId = `performance-sparkline-${index}`;

  return (
    <svg
      className="mt-2.5 h-[52px] w-full overflow-visible"
      viewBox={`0 0 ${chart.width} ${chart.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={chart.area} fill={`url(#${gradientId})`} />
      <path
        d={chart.line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function PerformanceSection() {
  const { t } = useLocale();
  return (
    <section id="performance" className="relative border-b border-border/50 py-8">
      <div className="section-container">
        <SectionHeader
          id="performance"
          title={t('Performance')}
          subtitle={t('Built with optimization in mind for the best player experience.')}
          className="mb-5"
        />

        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {metrics.map((metric, index) => (
            <div
              key={t(metric.label)}
              className="min-h-[154px] overflow-hidden rounded-xl border bg-card/65 p-4 sm:p-5"
              style={{
                borderColor: `${metric.color}35`,
                backgroundImage: `linear-gradient(150deg, ${metric.color}07 0%, transparent 60%)`,
              }}
            >
              <dt
                className="font-code text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{ color: metric.color }}
              >
                {t(metric.label)}
              </dt>
              <dd className="mt-1 font-code text-[1.7rem] font-bold leading-none" style={{ color: metric.color }}>
                {metric.prefix && <span className="mr-1">{metric.prefix}</span>}
                {metric.value}
                <span className="ml-1 text-xs font-semibold uppercase opacity-85">{metric.suffix}</span>
              </dd>
              <Sparkline data={metric.sparklineData} color={metric.color} index={index} />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
