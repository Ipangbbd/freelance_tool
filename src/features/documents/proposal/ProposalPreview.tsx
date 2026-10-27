import React from 'react'
import { useAppStore } from '@/lib/store'
import { useMyProfileStore } from '@/features/my-profile/useMyProfileStore'
import { buildProposalModel } from './proposalTemplate'
import { formatCurrency } from '@/lib/utils'
import { PAPER_CONFIGS } from '@/lib/paper'
import { CheckCircle2, Clock, Calendar, Globe, Mail, Phone } from 'lucide-react'

export interface ProposalPreviewProps {
  pageNumber?: number
}

export function ProposalPreview({ pageNumber = 1 }: ProposalPreviewProps) {
  const { client, proposal, paperSize } = useAppStore()
  const profile = useMyProfileStore()
  const model = buildProposalModel(client, proposal, profile)

  const activeFeatures = proposal.features.filter((f) => f.checked)

  // Page 1: Strategic Vision, Pain Point & Proposed Solution, Selected Scope Features
  if (pageNumber === 1) {
    return (
      <div className="flex flex-col h-full justify-between text-neutral-800 text-[11pt] leading-[1.5] select-text">
        {/* Top Header */}
        <div>
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
                Project Proposal
              </span>
              <p className="text-[9pt] font-mono text-neutral-500 mt-1">{model.proposalId}</p>
              <p className="text-[9pt] text-neutral-500">{model.date}</p>
            </div>
          </div>

          {/* Client & Project Banner */}
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4 mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[8pt] font-mono uppercase tracking-wider text-neutral-400">Prepared Exclusively For</p>
              <h2 className="text-[13pt] font-bold text-neutral-900 mt-0.5">{model.client.clientName}</h2>
              <p className="text-[10pt] text-neutral-600 font-medium">{model.client.brandName}</p>
              {model.client.instagramHandle && (
                <p className="text-[9pt] text-neutral-400 font-mono mt-0.5">{model.client.instagramHandle}</p>
              )}
            </div>

            <div>
              <p className="text-[8pt] font-mono uppercase tracking-wider text-neutral-400">Target Deliverable</p>
              <h3 className="text-[11pt] font-semibold text-neutral-900 mt-0.5 leading-snug">
                {model.client.packageName || 'Comprehensive Bespoke Deliverable'}
              </h3>
              {proposal.includeTimeline && (
                <p className="text-[9pt] text-neutral-600 font-mono mt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500 inline" />
                  Estimated Delivery: {proposal.timelineWeeks} Weeks from Kickoff
                </p>
              )}
            </div>
          </div>

          {/* 1. Core Challenge / Pain Point */}
          <div className="mb-6">
            <h3 className="text-[10.5pt] font-bold uppercase tracking-wider text-neutral-900 mb-1.5 border-b border-neutral-200 pb-1 flex items-center justify-between">
              <span>01. Strategic Context & Challenge</span>
            </h3>
            <p className="text-neutral-700 text-[10.5pt] leading-relaxed text-justify">
              {proposal.clientPainPoint ||
                'The current ecosystem requires modernization to effectively engage target audiences and maximize conversion rates.'}
            </p>
          </div>

          {/* 2. Proposed Architecture / Solution */}
          <div className="mb-6">
            <h3 className="text-[10.5pt] font-bold uppercase tracking-wider text-neutral-900 mb-1.5 border-b border-neutral-200 pb-1">
              02. Tailored Strategic Solution
            </h3>
            <p className="text-neutral-700 text-[10.5pt] leading-relaxed text-justify">
              {proposal.solution ||
                'We propose a modern, high-performance architecture built around your brand identity to streamline conversions and reinforce market authority.'}
            </p>
          </div>

          {/* 3. Included Scope Features */}
          <div>
            <h3 className="text-[10.5pt] font-bold uppercase tracking-wider text-neutral-900 mb-2.5 border-b border-neutral-200 pb-1">
              03. Core Capabilities & Included Features
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[10pt]">
              {activeFeatures.map((feat) => (
                <div key={feat.id} className="flex items-start gap-2 bg-neutral-50/80 p-2 rounded border border-neutral-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                  <span className="text-neutral-800 font-medium leading-tight">{feat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-[8pt] text-neutral-400 font-mono">
          <span>{model.freelancer.brand} • Confidential Client Document</span>
          <span>Page 1 of 2</span>
        </div>
      </div>
    )
  }

  // Page 2: Deliverables, Investment, Next Steps, Mutual Authorization
  return (
    <div className="flex flex-col h-full justify-between text-neutral-800 text-[11pt] leading-[1.5] select-text">
      <div>
        {/* Compact Running Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
          <span className="text-[9pt] font-mono text-neutral-500 uppercase tracking-wider">
            {model.freelancer.brand} // {model.client.brandName}
          </span>
          <span className="text-[8pt] font-mono text-neutral-400">Proposal #{model.proposalId}</span>
        </div>

        {/* Deliverables Breakdown */}
        <div className="mb-6">
          <h3 className="text-[10.5pt] font-bold uppercase tracking-wider text-neutral-900 mb-2 border-b border-neutral-200 pb-1">
            04. Scope of Deliverables
          </h3>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-3.5 text-[10pt] text-neutral-700 whitespace-pre-line leading-relaxed font-mono">
            {proposal.deliverables || 'Full production deployment and documentation handed over upon milestone sign-off.'}
          </div>
        </div>

        {/* Investment Summary */}
        <div className="mb-6">
          <h3 className="text-[10.5pt] font-bold uppercase tracking-wider text-neutral-900 mb-2 border-b border-neutral-200 pb-1">
            05. Commercial Investment
          </h3>
          <div className="border border-neutral-900 rounded p-4 flex items-center justify-between bg-neutral-900 text-white">
            <div>
              <p className="text-[9pt] text-neutral-300 font-mono uppercase tracking-wider">Total Project Investment</p>
              <h4 className="text-[18pt] font-bold tracking-tight text-white mt-0.5">
                {formatCurrency(client.packagePrice)}
              </h4>
              <p className="text-[8.5pt] text-neutral-400 mt-1">
                Structured as 50% deposit ({formatCurrency(client.packagePrice * 0.5)}) upon commencement, 50% balance at completion.
              </p>
            </div>
            {proposal.portfolioLink && (
              <a
                href={proposal.portfolioLink}
                target="_blank"
                rel="noreferrer"
                className="text-right text-[9pt] text-neutral-300 hover:text-white underline font-mono"
              >
                View Case Study ↗
              </a>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="text-[10.5pt] font-bold uppercase tracking-wider text-neutral-900 mb-2 border-b border-neutral-200 pb-1">
            06. Execution Roadmap & Next Steps
          </h3>
          <div className="text-[10pt] text-neutral-700 whitespace-pre-line leading-relaxed pl-1">
            {proposal.nextSteps || 'Review, sign confirmation, and remit deposit to lock project sprint dates.'}
          </div>
        </div>

        {/* Authorization & Acceptance */}
        <div className="border-t-2 border-neutral-900 pt-4 mt-6">
          <h3 className="text-[9.5pt] font-bold uppercase tracking-wider text-neutral-900 mb-3">
            Authorization & Acceptance
          </h3>
          <p className="text-[8.5pt] text-neutral-500 leading-normal mb-5">
            By signing below, the Client authorizes the commencement of services specified in this proposal under the agreed terms.
          </p>

          <div className="grid grid-cols-2 gap-8 text-[9pt]">
            <div>
              <p className="font-semibold text-neutral-900 mb-8">{model.freelancer.brand}</p>
              <div className="border-b border-neutral-300 mb-1.5 h-6 flex items-end">
                {profile.signatureBase64 && (
                  <img
                    src={profile.signatureBase64}
                    alt="Signature"
                    className="max-h-8 object-contain filter invert contrast-200"
                  />
                )}
              </div>
              <p className="text-neutral-500 text-[8pt]">Authorized Signature • {model.freelancer.name}</p>
            </div>

            <div>
              <p className="font-semibold text-neutral-900 mb-8">{model.client.brandName}</p>
              <div className="border-b border-neutral-300 mb-1.5 h-6" />
              <p className="text-neutral-500 text-[8pt]">Client Acceptance • {model.client.clientName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 Footer */}
      <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-[8pt] text-neutral-400 font-mono">
        <span>{model.freelancer.brand} • Confidential Client Document</span>
        <span>Page 2 of 2</span>
      </div>
    </div>
  )
}

