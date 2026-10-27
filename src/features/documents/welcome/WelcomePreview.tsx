import React from 'react'
import { useAppStore } from '@/lib/store'
import { useMyProfileStore } from '@/features/my-profile/useMyProfileStore'
import { buildWelcomeModel, TONE_MAPPINGS } from './welcomeTemplate'
import { formatDate } from '@/lib/utils'
import { Calendar, CheckCircle2, ExternalLink, Mail, MessageSquare, Clock } from 'lucide-react'

export interface WelcomePreviewProps {
  pageNumber?: number
}

export function WelcomePreview({ pageNumber = 1 }: WelcomePreviewProps) {
  const { client, welcome } = useAppStore()
  const profile = useMyProfileStore()
  const model = buildWelcomeModel(client, welcome, profile)
  const toneConfig = TONE_MAPPINGS[welcome.tone] || TONE_MAPPINGS.professional

  return (
    <div className="flex flex-col h-full justify-between text-neutral-800 text-[10.5pt] leading-[1.5] select-text">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between border-b-2 border-neutral-900 pb-5 mb-6">
          <div className="flex items-center gap-3">
            {model.freelancer.logo ? (
              <img
                src={model.freelancer.logo}
                alt={model.freelancer.brand}
                className="h-11 max-w-[130px] object-contain"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-neutral-900 text-white font-bold flex items-center justify-center text-base tracking-wider">
                {model.freelancer.brand.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-[17pt] font-bold text-neutral-900 tracking-tight leading-tight">
                {model.freelancer.brand}
              </h1>
              <p className="text-[9pt] text-neutral-500 font-mono tracking-wide">
                {model.freelancer.name} • {model.freelancer.website || model.freelancer.email}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block bg-neutral-100 text-neutral-800 font-mono text-[8pt] font-semibold tracking-widest px-2.5 py-1 rounded uppercase">
              Client Onboarding Packet
            </span>
            <p className="text-[9pt] font-mono text-neutral-500 mt-1">Project Kickoff Guide</p>
            <p className="text-[8.5pt] text-neutral-500">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Personalized Salutation & Message */}
        <div className="mb-6">
          <h2 className="text-[13pt] font-bold text-neutral-900 mb-2">
            {toneConfig.greeting} {client.clientName || 'Partner'},
          </h2>
          <p className="text-neutral-700 leading-relaxed text-justify">
            {welcome.welcomeMessage ||
              'Welcome aboard! We are thrilled to kick off this collaboration. This onboarding packet details our roadmap, communication channels, and initial milestones.'}
          </p>
        </div>

        {/* Kickoff Milestone & Portal Access Card */}
        <div className="bg-neutral-900 text-white rounded p-4 mb-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[8pt] text-neutral-300 font-mono uppercase tracking-wider">Strategy Kickoff Session</p>
            <h3 className="text-[13pt] font-bold text-white mt-0.5">
              {formatDate(welcome.kickoffDate) || 'To be scheduled'}
            </h3>
            <p className="text-[8.5pt] text-neutral-400 mt-1">
              60-minute interactive workshop covering creative direction, brand architecture, and milestone locks.
            </p>
          </div>

          <div className="border-l border-neutral-700 pl-4 flex flex-col justify-between">
            <div>
              <p className="text-[8pt] text-neutral-300 font-mono uppercase tracking-wider">Client Notion Portal</p>
              <p className="text-[8.5pt] text-neutral-300 mt-1 truncate font-mono">
                {welcome.onboardingLink || 'https://clientportal.workspace'}
              </p>
            </div>
            {welcome.onboardingLink && (
              <a
                href={welcome.onboardingLink}
                target="_blank"
                rel="noreferrer"
                className="text-[8.5pt] text-neutral-300 hover:text-white underline font-mono flex items-center gap-1 mt-2"
              >
                Access Portal Space ↗
              </a>
            )}
          </div>
        </div>

        {/* Section 1: Required Client Assets */}
        <div className="mb-6">
          <h3 className="text-[10pt] font-bold uppercase tracking-wider text-neutral-900 mb-2 border-b border-neutral-200 pb-1">
            01. Required Intake Assets Checklist
          </h3>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-3 text-[9pt] text-neutral-700 whitespace-pre-line leading-relaxed font-mono">
            {welcome.requiredAssets ||
              '• Brand vectors and typeface licenses\n• Photography library in shared folder\n• Copywriting and content catalog\n• Domain registrar and DNS credentials'}
          </div>
        </div>

        {/* Section 2: Communication Protocols & Availability */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-neutral-200 rounded p-3 bg-neutral-50">
            <h4 className="text-[9pt] font-bold uppercase tracking-wider text-neutral-900 mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-700 inline" />
              Communication Channels
            </h4>
            <p className="text-[8.5pt] text-neutral-600 whitespace-pre-line font-mono leading-relaxed">
              {welcome.communicationChannels || 'Slack Workspace Connect\nWeekly Zoom Sync\nAsync Loom Reviews'}
            </p>
          </div>

          <div className="border border-neutral-200 rounded p-3 bg-neutral-50">
            <h4 className="text-[9pt] font-bold uppercase tracking-wider text-neutral-900 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-700 inline" />
              Office Hours & SLA
            </h4>
            <p className="text-[8.5pt] text-neutral-600 whitespace-pre-line font-mono leading-relaxed">
              {welcome.workingHours || 'Monday - Thursday: 9am - 5pm PST\nResponse SLA: within 4 business hours'}
            </p>
          </div>
        </div>

        {/* Sign-off */}
        <div className="pt-2">
          <p className="text-[9pt] text-neutral-600 mb-3">{toneConfig.closing}</p>
          <div className="flex items-center gap-4">
            {profile.signatureBase64 && (
              <img
                src={profile.signatureBase64}
                alt="Signature"
                className="max-h-8 object-contain filter invert contrast-200"
              />
            )}
            <div>
              <p className="text-[9.5pt] font-bold text-neutral-900">{model.freelancer.name}</p>
              <p className="text-[8pt] text-neutral-500 font-mono">{model.freelancer.brand}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-[8pt] text-neutral-400 font-mono">
        <span>{model.freelancer.brand} • Welcome & Onboarding Guide</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  )
}

