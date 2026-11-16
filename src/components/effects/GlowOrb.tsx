'use client';

import { motion, useReducedMotion } from 'motion/react';

interface GlowOrbProps {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  delay?: number;
}

export default function GlowOrb({
  color = '#4DA3FF',
  size = 400,
  top = '20%',
  left = '60%',
  delay = 0,
}: GlowOrbProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color}15, ${color}05, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      aria-hidden="true"
      animate={reduceMotion ? { opacity: 0.4 } : {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}
