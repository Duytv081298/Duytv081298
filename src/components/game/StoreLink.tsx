import type { ReactNode } from 'react';
import { ExternalLink, LockKeyhole } from 'lucide-react';

interface StoreLinkProps {
  label: string;
  href?: string;
  children?: ReactNode;
}

export default function StoreLink({ label, href, children }: StoreLinkProps) {
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-3">{children || label}</span>
      {href ? (
        <ExternalLink size={14} className="shrink-0 text-violet-300" aria-hidden="true" />
      ) : (
        <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-normal text-slate-400">
          <LockKeyhole size={12} aria-hidden="true" /> Coming soon
        </span>
      )}
    </>
  );
  const baseClass = 'flex min-h-16 min-w-0 flex-1 rounded-xl border px-4 py-2.5 text-left text-sm font-semibold';

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`${baseClass} items-center justify-between gap-3 border-violet-500/55 bg-violet-500/10 text-white transition-colors hover:border-violet-400 hover:bg-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300`}
    >
      {content}<span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <button type="button" disabled aria-label={`${label} — Coming soon`}
      title={`${label} — Coming soon`}
      className={`${baseClass} cursor-not-allowed flex-col items-start justify-center gap-1 border-white/10 bg-white/[0.025] text-slate-400 [&_svg]:opacity-50 [&_svg]:grayscale`}
    >
      {content}
    </button>
  );
}
