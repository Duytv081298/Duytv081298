'use client';

import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mx', `${e.clientX}px`);
        spotlightRef.current.style.setProperty('--my', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="mouse-spotlight fixed inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        zIndex: 2,
        background: `radial-gradient(
          600px circle at var(--mx, 50%) var(--my, 50%),
          rgba(77, 163, 255, 0.04),
          rgba(0, 245, 160, 0.02) 40%,
          transparent 70%
        )`,
      }}
    />
  );
}
