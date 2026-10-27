import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:opacity-40 disabled:pointer-events-none select-none active:scale-[0.98]'

    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary-hover active:bg-primary-focus shadow-sm',
      secondary:
        'bg-surface-1 text-ink border border-hairline hover:bg-surface-2 hover:border-hairline-strong active:bg-surface-3',
      tertiary:
        'bg-canvas text-ink border border-hairline hover:bg-surface-1 hover:border-hairline-strong',
      inverse:
        'bg-white text-black hover:bg-inverse-surface1 font-semibold active:bg-inverse-surface2',
      ghost:
        'bg-transparent text-ink-subtle hover:text-ink hover:bg-surface-1',
      danger:
        'bg-red-950/40 text-red-400 border border-red-900/40 hover:bg-red-900/50 hover:text-red-300',
    }

    const sizes = {
      sm: 'text-xs h-7 px-2.5 rounded-sm gap-1.5',
      md: 'text-[14px] leading-[1.20] h-9 px-3.5 rounded-md gap-2',
      lg: 'text-[15px] h-11 px-5 rounded-md gap-2.5',
      icon: 'h-9 w-9 p-0 rounded-md',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

