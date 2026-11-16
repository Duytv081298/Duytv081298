'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Gamepad2 } from 'lucide-react';

/** Keep game tiles useful when a third-party store removes or blocks its artwork. */
export default function GameArtwork({ src, title, color, secondary, className = '', sizes = '80px' }: {
  src?: string; title: string; color: string; secondary: string; className?: string; sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`relative block h-full w-full overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, ${color}, ${secondary})` }} aria-hidden="true">
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/20 p-1 text-white">
        <Gamepad2 className="h-[45%] w-[45%]" strokeWidth={1.6} />
        <span className="max-w-full truncate text-[8px] font-bold uppercase tracking-wide">{title.slice(0, 12)}</span>
      </span>
      {src && !failed && <Image unoptimized src={src} alt="" fill sizes={sizes} loading="lazy" className="object-cover" onError={() => setFailed(true)} />}
    </span>
  );
}
