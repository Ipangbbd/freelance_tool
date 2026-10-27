import React from 'react'
import { useAppStore, WelcomeTone } from '@/lib/store'
import { Input, Textarea } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Mail, Calendar, Link2, MessageSquare, Clock, CheckSquare } from 'lucide-react'

export function WelcomeInputs() {
  const { welcome, updateWelcome } = useAppStore()

  const tones: Array<{ id: WelcomeTone; label: string; desc: string }> = [
    { id: 'professional', label: 'Professional', desc: 'Corporate, respectful, executive' },
    { id: 'friendly', label: 'Warm & Friendly', desc: 'Approachable, warm, energetic' },
    { id: 'direct', label: 'Modern Direct', desc: 'Concise, high-velocity, Linear style' },
  ]

  return (
    <Card className="border-hairline shadow-sm">
      <CardHeader className="py-3.5 px-4 bg-surface-2/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[14px]">
            <Mail className="w-4 h-4 text-primary" />
            Welcome & Onboarding Guide Inputs
          </CardTitle>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sm">
            Active Context
          </span>
        </div>
        <CardDescription className="text-[12px]">
          Equip your new client with the kickoff schedule, client portal link, communication norms, and required asset intake.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Tone Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink-muted">Communication Tone</label>
          <div className="grid grid-cols-3 gap-2">
            {tones.map((t) => {
              const isSelected = welcome.tone === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => updateWelcome({ tone: t.id })}
                  className={`p-2.5 rounded-md border text-left transition-all ${
                    isSelected
                      ? 'bg-surface-2 border-primary text-ink ring-1 ring-primary'
                      : 'bg-surface-1 border-hairline text-ink-muted hover:border-hairline-strong'
                  }`}
                >
                  <p className="text-xs font-semibold">{t.label}</p>
                  <p className="text-[10px] text-ink-subtle mt-0.5">{t.desc}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Kickoff Date & Portal Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Kickoff Workshop Date"
            type="date"
            value={welcome.kickoffDate}
            onChange={(e) => updateWelcome({ kickoffDate: e.target.value })}
          />

          <Input
            label="Client Onboarding / Portal Link"
            placeholder="https://yourbrand.design/portal"
            value={welcome.onboardingLink}
            onChange={(e) => updateWelcome({ onboardingLink: e.target.value })}
            hint="Notion, Google Drive, or Portal"
          />
        </div>

        {/* Personalized Welcome Message */}
        <Textarea
          label="Introductory Welcome Message"
          rows={3}
          value={welcome.welcomeMessage}
          onChange={(e) => updateWelcome({ welcomeMessage: e.target.value })}
        />

        {/* Required Assets Intake */}
        <Textarea
          label="Required Assets Checklist (From Client)"
          hint="Logos, brand books, credentials, copy doc"
          rows={3}
          value={welcome.requiredAssets}
          onChange={(e) => updateWelcome({ requiredAssets: e.target.value })}
        />

        {/* Communication Channels & Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Textarea
            label="Communication Channels"
            hint="Slack, Email, Zoom, Loom"
            rows={2}
            value={welcome.communicationChannels}
            onChange={(e) => updateWelcome({ communicationChannels: e.target.value })}
          />

          <Textarea
            label="Working Hours & SLA"
            hint="Available response windows"
            rows={2}
            value={welcome.workingHours}
            onChange={(e) => updateWelcome({ workingHours: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  )
}

