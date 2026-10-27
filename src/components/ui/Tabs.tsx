import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TabOption<T extends string = string> {
  id: T
  label: string
  icon?: React.ReactNode
  badge?: string | number
}

export interface TabsProps<T extends string = string> {
  tabs: TabOption<T>[]
  activeTab: T
  onChange: (tabId: T) => void
  className?: string
  variant?: 'pill' | 'segmented'
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'pill',
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-pill bg-canvas border border-hairline',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill text-[13px] font-medium transition-all duration-150 select-none',
              isActive
                ? 'bg-surface-2 text-ink border border-hairline-strong shadow-xs'
                : 'text-ink-subtle hover:text-ink hover:bg-surface-1/60 border border-transparent'
            )}
          >
            {tab.icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-pill bg-primary/20 text-primary-hover font-mono font-normal">
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

