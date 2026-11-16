'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Wrench, 
  Layers, 
  Code2, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  CheckCircle2
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

interface TimelineItem {
  id: string;
  year: string;
  category: 'work' | 'education';
  company: string;
  role: string;
  highlights: string[];
  tech: string[];
  color: string;
  icon: typeof Gamepad2;
}

const timeline: TimelineItem[] = [
  {
    id: 'pixon',
    year: '2024 – Present',
    category: 'work',
    company: 'PIXON',
    role: 'Game Developer',
    highlights: [
      'Created playable ads with Cocos Creator and Unity.',
      'Built tools to automate playable ad exports across platforms.'
    ],
    tech: ['Cocos Creator', 'Unity', 'Playable Ads', 'Tool Build', 'TypeScript'],
    color: '#00D97E',
    icon: Wrench,
  },
  {
    id: 'game-zoka',
    year: '2023 - 2024',
    category: 'work',
    company: 'GAME ZOKA',
    role: 'Game Developer',
    highlights: [
      'Researched, evaluated and selected games for development.',
      'Coordinated game development tasks within the team.',
      'Developed Facebook Instant Games with Cocos Creator.',
      'Used PlayFab for player data and leaderboards.',
      'Built frontends for real-time card games with Cocos Creator.'
    ],
    tech: ['Cocos Creator', 'Facebook Instant Games', 'PlayFab', 'Realtime Multiplayer'],
    color: '#3EA6FF',
    icon: Gamepad2,
  },
  {
    id: 'sonat-studio',
    year: '2021 - 2022',
    category: 'work',
    company: 'SONAT STUDIO',
    role: 'Game Developer',
    highlights: [
      'Created size-optimized playable ads with PixiJS and CreateJS.',
      'Developed Facebook Instant Games.',
      'Developed puzzle games with Unity.'
    ],
    tech: ['PixiJS', 'CreateJS', 'Facebook Instant Games', 'Unity', 'C#'],
    color: '#9B74FF',
    icon: Layers,
  },
  {
    id: 'fpt-software',
    year: '2019 - 2020',
    category: 'work',
    company: 'FPT SOFTWARE',
    role: 'Junior JavaScript Developer',
    highlights: [
      'Worked with HTML5, CSS3 and JavaScript.',
      'Built web applications with Angular.'
    ],
    tech: ['JavaScript', 'Angular', 'HTML5', 'CSS3'],
    color: '#FF6B6B',
    icon: Code2,
  },
  {
    id: 'fpt-greenwich',
    year: '2016 - 2020',
    category: 'education',
    company: 'FPT – Greenwich Vietnam',
    role: 'BSc in Information Technology',
    highlights: [
      'Information Technology',
      'Graduated with Distinction',
      'Built a strong foundation in computer science and game programming.'
    ],
    tech: ['Information Technology', 'BSc Honors', 'Graduated with Distinction'],
    color: '#FFD93D',
    icon: GraduationCap,
  },
];

export default function TimelineSection() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');

  const filteredTimeline = timeline.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <section id="career" className="relative border-b border-border/50 py-12 md:py-16 overflow-hidden">
      {/* Subtle Orbit Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[radial-gradient(circle,rgba(124,92,255,0.06),transparent_65%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeader
          id="career"
          index="04"
          title={t('My Journey')}
          subtitle={t('From JavaScript development to games and playable ads.')}
        />

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All milestones', count: timeline.length },
            { id: 'work', label: 'Work experience', count: 4 },
            { id: 'education', label: 'Education', count: 1 },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as 'all' | 'work' | 'education')}
                aria-pressed={isActive}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border border-primary/40 bg-primary/15 text-primary shadow-[0_0_15px_rgba(79,142,247,0.25)]'
                    : 'border border-border/60 bg-[#090b14]/70 text-text-secondary hover:border-border hover:text-text'
                }`}
              >
                <span>{t(tab.label)}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    isActive ? 'bg-primary text-bg-primary font-bold' : 'bg-white/10 text-text-muted'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline Grid / List */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Center Line for Desktop */}
          <div
            className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-purple to-accent opacity-30 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredTimeline.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className={`relative flex flex-col md:flex-row md:items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Center Node Icon */}
                    <div
                      className="absolute left-4 -translate-x-1/2 md:left-1/2 z-20 flex size-10 items-center justify-center rounded-full border-2 bg-[#080911] shadow-lg"
                      style={{
                        borderColor: item.color,
                        boxShadow: `0 0 15px ${item.color}60`,
                        color: item.color,
                      }}
                    >
                      <Icon className="size-5" />
                    </div>

                    {/* Content Card Side */}
                    <div className="ml-12 md:ml-0 md:w-[calc(50%-2.5rem)]">
                      <div
                        className="group relative rounded-2xl border bg-[#0b0e1c]/90 p-6 transition-all duration-300 shadow-lg"
                        style={{
                          borderColor: `${item.color}45`,
                          backgroundImage: `linear-gradient(135deg, ${item.color}0D 0%, transparent 70%)`,
                        }}
                      >
                        {/* Header Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            {item.category === 'education' ? (
                              <GraduationCap className="size-4" style={{ color: item.color }} />
                            ) : (
                              <Building2 className="size-4" style={{ color: item.color }} />
                            )}
                            <span className="font-display text-base font-extrabold tracking-tight text-text">
                              {t(item.company)}
                            </span>
                          </div>

                          <span
                            className="rounded-lg border px-2.5 py-0.5 font-code text-[11px] font-bold"
                            style={{
                              color: item.color,
                              borderColor: `${item.color}60`,
                              backgroundColor: `${item.color}15`,
                            }}
                          >
                            {t(item.year)}
                          </span>
                        </div>

                        {/* Role Title */}
                        <div className="mt-3 flex items-center gap-2">
                          <Briefcase className="size-3.5 text-text-muted" />
                          <h3 className="font-display text-sm font-semibold text-text">{t(item.role)}</h3>
                        </div>

                        {/* Bullet Highlights */}
                        <ul className="mt-3 space-y-2 text-xs text-text-secondary">
                          {item.highlights.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 leading-relaxed">
                              <CheckCircle2
                                className="mt-0.5 size-3.5 shrink-0"
                                style={{ color: item.color }}
                              />
                              <span>{t(point)}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack Tags */}
                        <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {item.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-code text-[10px] font-medium text-text-secondary group-hover:border-white/20 transition-colors"
                            >
                              {t(tech)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
