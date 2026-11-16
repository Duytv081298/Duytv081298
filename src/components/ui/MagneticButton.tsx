'use client';

import { useReducedMotion } from '@/lib/useReducedMotion';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  magnetic = true,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const buttonRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: MouseEvent) => {
    if (reduceMotion || !magnetic || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: MouseEvent) => {
    if (!buttonRef.current) return;
    if (reduceMotion) { onClick?.(); return; }
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    onClick?.();
  };

  const variantStyles = {
    primary:
      'bg-primary text-bg-primary hover:shadow-[0_0_20px_#4DA3FF44,0_4px_12px_rgba(0,0,0,0.3)]',
    ghost:
      'bg-transparent text-text border border-border hover:border-primary hover:text-primary hover:bg-primary-dim',
    accent:
      'bg-accent text-bg-primary hover:shadow-[0_0_20px_#00F5A044,0_4px_12px_rgba(0,0,0,0.3)]',
  };

  const sizeStyles = {
    sm: 'py-2 text-sm gap-1.5',
    md: 'py-3 text-sm gap-2',
    lg: 'py-4 text-base gap-2.5',
  };

  const baseStyles = `
    inline-flex items-center justify-center font-display font-medium
    rounded-[10px] cursor-pointer transition-all duration-300
    relative overflow-hidden select-none no-underline whitespace-nowrap flex-shrink-0
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  const content = (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
          }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const horizontalPadding = {
    sm: '16px',
    md: '22px',
    lg: '28px',
  };

  const motionProps = {
    className: baseStyles,
    style: {
      paddingLeft: horizontalPadding[size],
      paddingRight: horizontalPadding[size],
    },
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 300, damping: 20, mass: 0.5 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    whileTap: reduceMotion ? undefined : { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button"
      {...motionProps}
      ref={buttonRef as React.Ref<HTMLButtonElement>}
    >
      {content}
    </motion.button>
  );
}
