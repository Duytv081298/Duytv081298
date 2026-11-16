'use client';

import { Gamepad2, Globe, Smartphone, Zap } from 'lucide-react';
import { useLocale } from '@/components/i18n/LocaleProvider';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'accent' | 'purple' | 'danger' | 'neutral';
  icon?: string;
  size?: 'sm' | 'md';
}

const variantStyles = {
  primary: 'bg-primary-dim text-primary border-primary/30',
  accent: 'bg-accent-dim text-accent border-accent/30',
  purple: 'bg-purple-dim text-purple border-purple/30',
  danger: 'bg-danger-dim text-danger border-danger/30',
  neutral: 'bg-card text-text-secondary border-border',
};

export default function Badge({
  label,
  variant = 'primary',
  icon,
  size = 'sm',
}: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-[11px]',
    md: 'px-3 py-1.5 text-xs',
  };

  return (
    <span
      className={`
        badge ${variantStyles[variant]} ${sizeStyles[size]}
        transition-all duration-200 hover:scale-105
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}

// Pre-defined platform badges
export function PlatformBadge({ platform }: { platform: string }) {
  const { t } = useLocale();
  const Icon = platform === 'Mobile' ? Smartphone : platform === 'Web' ? Globe : platform === 'Instant Game' ? Zap : Gamepad2;
  return <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs text-primary"><Icon size={13} aria-hidden="true" />{t(platform)}</span>;
}
