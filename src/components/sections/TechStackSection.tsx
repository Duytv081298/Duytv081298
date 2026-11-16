'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { Flame, GitBranch, Hexagon, Orbit, PackageOpen, PanelsTopLeft } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

interface MarkProps {
  className?: string;
}

function CocosMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 4.5c2.8 6.1 10.8 12.4 10.8 23.2 0 7-4.3 12.3-10.8 12.3S13.2 34.7 13.2 27.7C13.2 16.9 21.2 10.6 24 4.5Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M24 7c2.5 5.6 9 11.4 9 20.2C33 33.7 29.4 38 24 38s-9-4.3-9-10.8C15 18.4 21.5 12.6 24 7Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M18.7 25.5 24 22l5.3 3.5v6L24 35l-5.3-3.5v-6Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="21.5" cy="28.2" r="1" fill="currentColor" />
      <circle cx="26.5" cy="28.2" r="1" fill="currentColor" />
    </svg>
  );
}

function UnityMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="m22 5-4.7 8.2L7 15.5l7.7 7.4L12.5 34 23 30.9 31 39l2.8-10.5L43 22l-10.6-2L30 9.4 22 5Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="m18 14 12-3 2 10-8 8-9-7 3-8Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="m18 14 6 15m8-8-17 1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function TypeScriptMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="38" height="38" rx="4" fill="currentColor" />
      <path d="M13 19h18M22 19v17M29.5 33.2c1 1.8 2.6 2.8 4.8 2.8 2.4 0 4.2-1.3 4.2-3.5 0-2-1.2-3-3.8-4l-1.2-.5c-1.4-.6-2-1.1-2-2 0-1 .8-1.6 2-1.6 1.4 0 2.2.7 2.9 1.8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebGlMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden="true">
      <ellipse cx="32" cy="24" rx="27" ry="14" stroke="currentColor" strokeWidth="2.2" />
      <path d="M6 24h10l3-7 4.5 14 4.5-14 3 7h27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

function JavaScriptMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="2" fill="#F7DF1E" />
      <path d="M11.2 18.2c0 2-1.1 2.9-2.8 2.9-1.5 0-2.4-.8-2.9-1.8l1.6-1c.3.6.6 1 1.2 1 .5 0 .9-.2.9-1.1v-6h2v6Zm1.6.8 1.6-1c.5.8 1.1 1.3 2.1 1.3.9 0 1.4-.4 1.4-1 0-.7-.6-.9-1.5-1.3l-.5-.2c-1.5-.6-2.5-1.5-2.5-3.2 0-1.6 1.2-2.8 3.1-2.8 1.3 0 2.3.5 3 1.7l-1.6 1c-.4-.7-.8-.9-1.4-.9-.6 0-1 .4-1 .9 0 .6.4.9 1.3 1.3l.5.2c1.8.8 2.8 1.6 2.8 3.3 0 1.9-1.5 3-3.5 3-2 .1-3.3-.9-3.8-2.3Z" fill="#101010" />
    </svg>
  );
}

function HtmlMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 2h18l-1.7 18L12 22l-7.3-2L3 2Z" fill="#E34F26" />
      <path d="M12 4v15.8l5.4-1.5L18.8 4H12Z" fill="#F06529" />
      <path d="M7.1 7h9.8l-.3 2.2H9.7l.2 2h6.5l-.6 5.3-3.8 1-3.8-1-.3-2.9h2.2l.1 1.2 1.8.5 1.8-.5.2-1.4H7.8L7.1 7Z" fill="#fff" />
    </svg>
  );
}

const featuredTech = [
  {
    name: 'Cocos Creator',
    color: '#55BDF6',
    mark: CocosMark,
    description: 'Cross-platform game engine for fast, flexible playable development.',
  },
  {
    name: 'Unity',
    color: '#9ED9F3',
    mark: UnityMark,
    description: 'Industry-standard engine for polished 2D and 3D games.',
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    mark: TypeScriptMark,
    description: 'Typed JavaScript for maintainable, scalable game codebases.',
  },
  {
    name: 'WebGL',
    color: '#F05252',
    mark: WebGlMark,
    description: 'High-performance graphics with a tightly optimized GPU pipeline.',
  },
] as const;

const workflowTools = [
  { name: 'JavaScript', color: '#F7DF1E', icon: <JavaScriptMark className="size-5" /> },
  { name: 'HTML5', color: '#E34F26', icon: <HtmlMark className="size-5" /> },
  { name: 'Firebase', color: '#FFCA28', icon: <Flame className="size-5" strokeWidth={1.9} aria-hidden="true" /> },
  { name: 'Node.js', color: '#67A84B', icon: <Hexagon className="size-5" strokeWidth={1.9} aria-hidden="true" /> },
  { name: 'Webpack', color: '#8ED6FB', icon: <PackageOpen className="size-5" strokeWidth={1.9} aria-hidden="true" /> },
  { name: 'Git', color: '#F05032', icon: <GitBranch className="size-5" strokeWidth={1.9} aria-hidden="true" /> },
  { name: 'TexturePacker', color: '#4F8EF7', icon: <PanelsTopLeft className="size-5" strokeWidth={1.9} aria-hidden="true" /> },
  { name: 'Spine', color: '#C46BFF', icon: <Orbit className="size-5" strokeWidth={1.9} aria-hidden="true" /> },
] as const;

export default function TechStackSection() {
  const { t } = useLocale();
  return (
    <section id="tech" className="relative border-b border-border/50 bg-bg-secondary/35 py-12 md:py-14">
      <div className="section-container">
        <SectionHeader
          id="tech"
          index="03"
          title={t('Tech Stack')}
          subtitle={t('Tools and engines I use to build high-quality games.')}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTech.map((tech) => {
            const Mark = tech.mark;

            return (
              <article
                key={tech.name}
                className="flex min-h-[190px] flex-col rounded-xl border bg-card/70 p-5 sm:p-6"
                style={{
                  borderColor: `${tech.color}58`,
                  backgroundImage: `linear-gradient(145deg, ${tech.color}08 0%, transparent 58%)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="shrink-0" style={{ color: tech.color }} aria-hidden="true">
                    <Mark className="size-11" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-text">{tech.name}</h3>
                </div>
                <p className="mt-auto max-w-[17rem] pt-5 text-[13px] leading-5 text-text-secondary">
                  {t(tech.description)}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-7">
          <p className="mb-2.5 font-code text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
            {t('Tools & Workflow')}
          </p>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8" aria-label={t('Tools & Workflow')}>
            {workflowTools.map((tool) => (
              <li
                key={tool.name}
                className="flex min-h-10 min-w-0 items-center gap-2.5 rounded-md border border-border/70 bg-card/55 px-3 text-[11px] font-semibold text-text-secondary"
                style={{ color: tool.color }}
              >
                <span className="shrink-0" aria-hidden="true">
                  {tool.icon}
                </span>
                <span className="truncate text-text-secondary">{tool.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
