'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Gamepad2 } from 'lucide-react';

/** Keep game tiles useful when a third-party store removes or blocks its artwork. */
export default function GameArtwork({ src, color, secondary, className = '', sizes = '80px' }: {
  src?: string; title: string; color: string; secondary: string; className?: string; sizes?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string>();
  // Request a thumbnail close to its rendered size; retain original artwork URLs elsewhere.
  const width = Math.min(256, Math.max(96, Math.ceil((Number.parseInt(sizes, 10) || 80) * 1.5)));
  const thumbnail = src?.startsWith('https://play-lh.googleusercontent.com/')
    ? src.replace(/=s\d+(?:-[a-z]+)?$/, `=s${width}-rw`) : src;
  return (
    <span className={`relative block h-full w-full overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, ${color}, ${secondary})` }} aria-hidden="true">
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/20 p-1 text-white">
        <Gamepad2 className="h-[45%] w-[45%]" strokeWidth={1.6} />
      </span>
      {thumbnail && failedSrc !== thumbnail && <Image unoptimized src={thumbnail} alt="" fill sizes={sizes} loading="lazy" className="object-cover" onError={() => setFailedSrc(thumbnail)} />}
    </span>
  );
}
