'use client';

import { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  FileText
} from 'lucide-react';
import { FacebookIcon } from './BrandIcons';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const experiences = [
  {
    period: '2024 - Nay',
    company: 'PIXON',
    role: 'Game Developer',
    highlights: [
      'Tạo Playable ads với Cocos Creator và Unity.',
      'Tạo tool build Playable ads.'
    ],
    tech: ['Cocos Creator', 'Unity', 'Playable Ads', 'Tooling']
  },
  {
    period: '2023 - 2024',
    company: 'GAME ZOKA',
    role: 'Game Developer',
    highlights: [
      'Tìm kiếm, phân tích, đánh giá và lựa chọn game để xây dựng và phát triển.',
      'Phân chia công việc phát triển game.',
      'Phát triển Instant games trên nền tảng Facebook bằng Cocos.',
      'Sử dụng PlayFab để lưu trữ dữ liệu người dùng, tạo leaderboard.',
      'FrontEnd cho các game bài realtime bằng Cocos.'
    ],
    tech: ['Cocos Creator', 'Facebook Instant Games', 'PlayFab', 'Realtime Games']
  },
  {
    period: '2021 - 2022',
    company: 'SONAT STUDIO',
    role: 'Game Developer',
    highlights: [
      'Tạo Playable ads với library PixiJS và CreateJS.',
      'Phát triển Instant games trên nền tảng Facebook.',
      'Phát triển game puzzle bằng Unity.'
    ],
    tech: ['PixiJS', 'CreateJS', 'Facebook Instant Games', 'Unity']
  },
  {
    period: '2019 - 2020',
    company: 'FPT SOFTWARE',
    role: 'Fresher JavaScript',
    highlights: [
      'Sử dụng các ngôn ngữ cơ bản về HTML/CSS/JS.',
      'Sử dụng framework về JavaScript như Angular.'
    ],
    tech: ['JavaScript', 'Angular', 'HTML5', 'CSS3']
  }
];

const subscribeToClient = () => () => {};

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const [copied, setCopied] = useState(false);
  const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/cv/CV_Trinh_Van_Duy_Cocos_Developer.pdf`;

  const handleCopyLink = async () => {
    const fullUrl = `${window.location.origin}${pdfUrl}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 flex max-h-[85vh] sm:max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-violet-500/40 bg-[#090b14] text-text shadow-[0_0_80px_rgba(139,92,246,0.35)]"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-border/60 bg-bg-primary/90 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                    Curriculum Vitae (CV) - Trịnh Văn Duy
                  </h2>
                  <p className="font-code text-xs text-text-secondary">
                    Game Developer | Cocos Creator & Playable Ads Specialist
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close CV Modal"
                className="grid h-9 w-9 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-white/10 hover:text-text"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="custom-scrollbar overflow-y-auto p-6 md:p-8 space-y-8">
              {/* Profile Brief */}
              <div className="grid gap-6 rounded-xl border border-primary/20 bg-gradient-to-r from-violet-950/20 via-primary/5 to-transparent p-6 md:grid-cols-12">
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-2xl font-extrabold text-text">TRỊNH VĂN DUY</span>
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-code text-[11px] font-bold text-accent">
                      Game Developer
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    Trở thành một game developer chuyên nghiệp, không ngừng nâng cao kỹ năng, kỹ thuật và sáng tạo để phát triển những sản phẩm chất lượng cao. Tối ưu hóa trải nghiệm người chơi và đóng góp vào sự thành công của công ty.
                  </p>
                </div>

                <div className="md:col-span-5 flex flex-col justify-center space-y-2 border-t border-border/40 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6 text-xs text-text-secondary">
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} className="text-primary" />
                    <a href="tel:0369549798" className="hover:text-primary transition-colors">0369 549 798</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={14} className="text-primary" />
                    <a href="mailto:duytv0812@gmail.com" className="hover:text-primary transition-colors">duytv0812@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={14} className="text-primary" />
                    <span>Hà Đông, Hà Nội</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FacebookIcon size={14} className="text-primary" />
                    <a href="https://web.facebook.com/Duytv98" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">fb.com/Duytv98</a>
                  </div>
                </div>
              </div>

              {/* Education & Software Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Education */}
                <div className="rounded-xl border border-border/70 bg-[#0c0e1a] p-5 space-y-3">
                  <div className="flex items-center gap-2.5 text-primary">
                    <GraduationCap size={18} />
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-text">Học Vấn (Education)</h3>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-4 space-y-1">
                    <span className="font-code text-[11px] font-bold text-accent">2016 - 2020</span>
                    <h4 className="font-display text-sm font-semibold text-text">TRƯỜNG ĐẠI HỌC FPT - GREENWICH VIỆT NAM</h4>
                    <p className="text-xs text-text-secondary">Chuyên ngành: Công nghệ thông tin</p>
                    <p className="text-xs font-semibold text-primary">Xếp loại: Giỏi</p>
                  </div>
                </div>

                {/* Software / Skills */}
                <div className="rounded-xl border border-border/70 bg-[#0c0e1a] p-5 space-y-3">
                  <div className="flex items-center gap-2.5 text-accent">
                    <Code2 size={18} />
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-text">Công Nghệ & Phần Mềm</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Cocos Creator', 'Cocos2d', 'Unity', 'VS Code', 'Git', 'Firebase', 'PixiJS', 'CreateJS', 'PlayFab', 'TypeScript', 'JavaScript'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-bg-primary/80 px-2.5 py-1 font-code text-[11px] font-medium text-[#B9C6D8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-purple">
                  <Briefcase size={18} />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-text">Kinh Nghiệm Làm Việc (Work Experience)</h3>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp.company}
                      className="rounded-xl border border-border/60 bg-[#0b0e1b] p-5 transition-all hover:border-violet-500/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
                        <div>
                          <span className="font-display text-base font-bold text-text">{exp.company}</span>
                          <span className="ml-2 font-code text-xs text-primary">• {exp.role}</span>
                        </div>
                        <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-code text-[11px] font-bold text-primary">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="mt-3 space-y-1.5 list-disc list-inside text-xs text-text-secondary">
                        {exp.highlights.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>

                      <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                        {exp.tech.map((t) => (
                          <span key={t} className="rounded bg-white/5 px-2 py-0.5 font-code text-[10px] text-text-muted">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-bg-primary/95 p-4 md:px-8">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                <span className="text-xs text-text-secondary hidden sm:inline">File CV chính thức (.PDF)</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 rounded-lg border border-border bg-bg-primary px-3.5 py-2 font-code text-xs font-semibold text-text-secondary transition-colors hover:border-primary/40 hover:text-text"
                >
                  {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                  <span>{copied ? 'Đã sao chép link!' : 'Copy Link CV'}</span>
                </button>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2 font-code text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  <ExternalLink size={14} />
                  <span>Xem Trực Tuyến</span>
                </a>

                <a
                  href={pdfUrl}
                  download="CV_Trinh_Van_Duy_Cocos_Developer.pdf"
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary via-purple to-accent px-4 py-2 font-code text-xs font-bold text-white shadow-[0_0_15px_rgba(124,92,255,0.4)] transition-opacity hover:opacity-95"
                >
                  <Download size={14} />
                  <span>Tải CV PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
