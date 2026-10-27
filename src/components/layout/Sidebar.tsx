import React from 'react'
import { useAppStore } from '@/lib/store'
import { useMyProfileStore } from '@/features/my-profile/useMyProfileStore'
import {
  FileText,
  Users,
  FolderKanban,
  Database,
  UserCheck,
  Settings,
  Sparkles,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { activeSidebarItem, setActiveSidebarItem, setIsProfileModalOpen } = useAppStore()
  const profile = useMyProfileStore()

  const navItems = [
    {
      id: 'doc-generator',
      label: 'Document Generator',
      icon: FileText,
      active: true,
      badge: null,
    },
    {
      id: 'leads',
      label: 'Lead Tracker',
      icon: Users,
      active: false,
      badge: 'Soon',
    },
    {
      id: 'projects',
      label: 'Project Tracker',
      icon: FolderKanban,
      active: false,
      badge: 'Soon',
    },
    {
      id: 'assets',
      label: 'Asset Bank',
      icon: Database,
      active: false,
      badge: 'Soon',
    },
  ]

  return (
    <aside className="w-64 bg-surface-1 border-r border-hairline flex flex-col justify-between shrink-0 h-screen select-none">
      {/* Brand & Logo Header */}
      <div>
        <div className="h-14 px-4 flex items-center justify-between border-b border-hairline">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-white shadow-sm font-bold text-sm">
              ⚡
            </div>
            <div>
              <span className="font-semibold text-ink text-[14px] tracking-[-0.3px]">
                DocCraft
              </span>
              <span className="ml-1.5 text-[10px] font-mono text-primary font-medium px-1.5 py-0.2 rounded bg-primary/10 border border-primary/20">
                PRO
              </span>
            </div>
          </div>
        </div>

        {/* Section label */}
        <div className="px-4 pt-5 pb-2">
          <p className="text-[11px] font-mono uppercase tracking-wider text-ink-tertiary">
            Workspaces
          </p>
        </div>

        {/* Navigation list */}
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isSelected = activeSidebarItem === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.active) {
                    setActiveSidebarItem(item.id as any)
                  }
                }}
                disabled={!item.active}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150',
                  isSelected
                    ? 'bg-surface-2 text-ink border border-hairline-strong shadow-xs'
                    : item.active
                    ? 'text-ink-subtle hover:text-ink hover:bg-surface-2/50 border border-transparent'
                    : 'text-ink-tertiary/60 cursor-not-allowed border border-transparent'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      'w-4 h-4',
                      isSelected ? 'text-primary' : 'text-ink-tertiary'
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-mono text-ink-tertiary bg-surface-2 px-1.5 py-0.5 rounded border border-hairline">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Profile & Settings Footer */}
      <div className="p-3 border-t border-hairline">
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="w-full flex items-center justify-between p-2 rounded-md bg-surface-2/60 border border-hairline hover:border-hairline-strong hover:bg-surface-2 transition-all group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {profile.logoBase64 ? (
              <img
                src={profile.logoBase64}
                alt="Profile"
                className="w-7 h-7 rounded object-contain bg-black/40 border border-hairline"
              />
            ) : (
              <div className="w-7 h-7 rounded bg-surface-3 border border-hairline text-ink font-semibold flex items-center justify-center text-xs">
                {profile.myBrandName ? profile.myBrandName.charAt(0) : 'M'}
              </div>
            )}
            <div className="text-left truncate">
              <p className="text-xs font-semibold text-ink truncate group-hover:text-primary transition-colors">
                {profile.myBrandName || profile.myFullName}
              </p>
              <p className="text-[11px] text-ink-subtle truncate">
                {profile.email}
              </p>
            </div>
          </div>
          <Settings className="w-4 h-4 text-ink-tertiary group-hover:text-ink shrink-0" />
        </button>
      </div>
    </aside>
  )
}

