import React from 'react'
import { useAppStore } from '@/lib/store'
import { Input, Textarea } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { ShieldCheck, Calendar, RefreshCcw, DollarSign, AlertCircle } from 'lucide-react'

export function AgreementInputs() {
  const { agreement, updateAgreement } = useAppStore()

  return (
    <Card className="border-hairline shadow-sm">
      <CardHeader className="py-3.5 px-4 bg-surface-2/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[14px]">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Master Service Agreement Terms
          </CardTitle>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sm">
            Active Context
          </span>
        </div>
        <CardDescription className="text-[12px]">
          Set enforceable project parameters: timelines, revision rounds, copyright transfer, post-launch warranty, and late fees.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Effective Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Agreement Start Date"
            type="date"
            value={agreement.startDate}
            onChange={(e) => updateAgreement({ startDate: e.target.value })}
          />

          <Input
            label="Estimated Completion Date"
            type="date"
            value={agreement.endDate}
            onChange={(e) => updateAgreement({ endDate: e.target.value })}
          />
        </div>

        {/* Revision Limit & Warranty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <Input
            label="Revision Limit (Rounds)"
            type="number"
            min="1"
            max="10"
            placeholder="3"
            hint="Rounds of revisions included"
            value={agreement.revisionLimit}
            onChange={(e) => updateAgreement({ revisionLimit: parseInt(e.target.value) || 1 })}
          />

          <Input
            label="Post-Launch Warranty (Days)"
            type="number"
            min="0"
            max="180"
            placeholder="30"
            hint="Bug-fixing warranty period"
            value={agreement.warrantyDays}
            onChange={(e) => updateAgreement({ warrantyDays: parseInt(e.target.value) || 0 })}
          />
        </div>

        {/* Payment Terms */}
        <Textarea
          label="Payment Schedule & Milestones"
          hint="Deposit & balance milestone schedule"
          rows={2}
          value={agreement.paymentTerms}
          onChange={(e) => updateAgreement({ paymentTerms: e.target.value })}
        />

        {/* Late Fee Policy */}
        <Textarea
          label="Late Payment Fee Policy"
          hint="Enforce on overdue milestones"
          rows={2}
          value={agreement.lateFeePolicy}
          onChange={(e) => updateAgreement({ lateFeePolicy: e.target.value })}
        />

        {/* Scope of Work Boundary */}
        <Textarea
          label="Scope of Work & Change Orders"
          hint="Definition of included scope vs out-of-scope work"
          rows={3}
          value={agreement.scopeOfWork}
          onChange={(e) => updateAgreement({ scopeOfWork: e.target.value })}
        />

        {/* IP Ownership */}
        <Textarea
          label="Intellectual Property & Copyright Assignment"
          hint="When ownership transfers to the client"
          rows={2}
          value={agreement.ipOwnership}
          onChange={(e) => updateAgreement({ ipOwnership: e.target.value })}
        />

        {/* Cancellation Policy */}
        <Textarea
          label="Early Termination / Cancellation Policy"
          hint="Notice period and prorated work settlement"
          rows={2}
          value={agreement.cancellationPolicy}
          onChange={(e) => updateAgreement({ cancellationPolicy: e.target.value })}
        />
      </CardContent>
    </Card>
  )
}

