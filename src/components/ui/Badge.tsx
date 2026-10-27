import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'primary' | 'outline' | 'warning'
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-surface-2 text-ink-muted border border-hairline',
    success: 'bg-semantic-success/15 text-semantic-success border border-semantic-success/30',
    primary: 'bg-primary/20 text-primary-hover border border-primary/30',
    outline: 'bg-transparent text-ink-subtle border border-hairline',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-[11px] font-medium tracking-wide uppercase font-mono select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

