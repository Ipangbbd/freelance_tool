import React, { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Input, Textarea } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  FileText,
  Clock,
  ExternalLink,
  Plus,
  Trash2,
  CheckSquare,
  Square,
  Sparkles,
} from 'lucide-react'

export function ProposalInputs() {
  const { proposal, updateProposal } = useAppStore()
  const [newFeatureText, setNewFeatureText] = useState('')

  const handleToggleFeature = (id: string) => {
    const updated = proposal.features.map((f) =>
      f.id === id ? { ...f, checked: !f.checked } : f
    )
    updateProposal({ features: updated })
  }

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return
    const newFeature = {
      id: Date.now().toString(),
      name: newFeatureText.trim(),
      checked: true,
    }
    updateProposal({ features: [...proposal.features, newFeature] })
    setNewFeatureText('')
  }

  const handleRemoveFeature = (id: string) => {
    const updated = proposal.features.filter((f) => f.id !== id)
    updateProposal({ features: updated })
  }

  return (
    <Card className="border-hairline shadow-sm">
      <CardHeader className="py-3.5 px-4 bg-surface-2/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[14px]">
            <FileText className="w-4 h-4 text-primary" />
            Proposal Specifications
          </CardTitle>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sm">
            Active Context
          </span>
        </div>
        <CardDescription className="text-[12px]">
          Define the client's problem, your tailored strategic solution, scope features, and estimated delivery timeline.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Pain Point */}
        <Textarea
          label="Client Core Challenge / Pain Point"
          hint="What roadblock is the client facing?"
          rows={3}
          placeholder="e.g. Current website fails to convey luxury tier, suffering high bounce rates..."
          value={proposal.clientPainPoint}
          onChange={(e) => updateProposal({ clientPainPoint: e.target.value })}
        />

        {/* Proposed Solution */}
        <Textarea
          label="Your Strategic Architecture / Solution"
          hint="How will your deliverable overcome their challenge?"
          rows={3}
          placeholder="e.g. Design a bespoke conversion-focused web architecture with micro-interactions..."
          value={proposal.solution}
          onChange={(e) => updateProposal({ solution: e.target.value })}
        />

        {/* Features Checklist */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-ink-muted flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Included Scope Features
            </label>
            <span className="text-[11px] text-ink-tertiary">
              {proposal.features.filter((f) => f.checked).length} of {proposal.features.length} selected
            </span>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {proposal.features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between px-3 py-2 rounded-md bg-surface-2/60 border border-hairline hover:border-hairline-strong transition-colors group"
              >
                <button
                  type="button"
                  onClick={() => handleToggleFeature(feature.id)}
                  className="flex items-center gap-2.5 text-left text-xs flex-1 text-ink"
                >
                  {feature.checked ? (
                    <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-ink-tertiary shrink-0" />
                  )}
                  <span className={feature.checked ? 'text-ink' : 'text-ink-tertiary line-through'}>
                    {feature.name}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(feature.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-ink-tertiary hover:text-red-400 transition-opacity"
                  title="Remove feature"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add custom feature input */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              placeholder="Add another feature (e.g. Dark Mode Toggle)..."
              value={newFeatureText}
              onChange={(e) => setNewFeatureText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddFeature()
                }
              }}
              className="flex-1 h-8 rounded-md bg-surface-1 px-3 text-xs text-ink placeholder:text-ink-tertiary border border-hairline focus:outline-none focus:border-primary"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddFeature}
              className="h-8 px-2.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>
        </div>

        {/* Timeline Toggle & Estimation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-hairline/60">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink-muted flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Include Timeline
              </span>
              <input
                type="checkbox"
                checked={proposal.includeTimeline}
                onChange={(e) => updateProposal({ includeTimeline: e.target.checked })}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
            </label>
            {proposal.includeTimeline && (
              <Input
                type="number"
                min="1"
                max="52"
                label="Estimated Timeline (Weeks)"
                value={proposal.timelineWeeks}
                onChange={(e) => updateProposal({ timelineWeeks: parseInt(e.target.value) || 1 })}
              />
            )}
          </div>

          <div>
            <Input
              label="Relevant Case Study / Portfolio URL"
              placeholder="https://yourportfolio.design/case-study"
              value={proposal.portfolioLink}
              onChange={(e) => updateProposal({ portfolioLink: e.target.value })}
              hint="Shown in Proposal review"
            />
          </div>
        </div>

        {/* Deliverables Breakdown */}
        <Textarea
          label="Detailed Deliverables List"
          hint="Formatted list for client review"
          rows={3}
          value={proposal.deliverables}
          onChange={(e) => updateProposal({ deliverables: e.target.value })}
        />

        {/* Next Steps */}
        <Textarea
          label="Project Next Steps"
          hint="Call to action for client approval"
          rows={3}
          value={proposal.nextSteps}
          onChange={(e) => updateProposal({ nextSteps: e.target.value })}
        />
      </CardContent>
    </Card>
  )
}

