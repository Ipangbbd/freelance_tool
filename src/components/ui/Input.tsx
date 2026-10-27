import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, hint, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label htmlFor={inputId} className="text-xs font-medium text-ink-muted">
              {label}
            </label>
            {hint && <span className="text-[11px] text-ink-tertiary">{hint}</span>}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'flex h-9 w-full rounded-md bg-surface-1 px-3 py-1.5 text-[14px] text-ink placeholder:text-ink-tertiary border border-hairline transition-all duration-150',
            'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, id, rows = 3, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id || generatedId

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label htmlFor={textareaId} className="text-xs font-medium text-ink-muted">
              {label}
            </label>
            {hint && <span className="text-[11px] text-ink-tertiary">{hint}</span>}
          </div>
        )}
        <textarea
          id={textareaId}
          rows={rows}
          ref={ref}
          className={cn(
            'flex w-full rounded-md bg-surface-1 px-3 py-2 text-[14px] leading-relaxed text-ink placeholder:text-ink-tertiary border border-hairline transition-all duration-150',
            'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
            'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

