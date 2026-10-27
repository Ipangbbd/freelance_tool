import React from 'react'
import { useAppStore } from '@/lib/store'
import { useMyProfileStore } from '@/features/my-profile/useMyProfileStore'
import { buildAgreementModel } from './agreementTemplate'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ShieldCheck } from 'lucide-react'

export interface AgreementPreviewProps {
  pageNumber?: number
}

export function AgreementPreview({ pageNumber = 1 }: AgreementPreviewProps) {
  const { client, agreement } = useAppStore()
  const profile = useMyProfileStore()
  const model = buildAgreementModel(client, agreement, profile)

  return (
    <div className="flex flex-col h-full justify-between text-neutral-800 text-[10pt] leading-[1.5] select-text">
      <div>
        {/* Document Header */}
        <div className="text-center border-b-2 border-neutral-900 pb-4 mb-5">
          <h1 className="text-[15pt] font-bold text-neutral-900 tracking-tight uppercase">
            Master Services Agreement
          </h1>
          <p className="text-[8.5pt] font-mono text-neutral-500 mt-1">
            Contract Ref: AGR-{new Date().getFullYear()}-{client.brandName.substring(0, 3).toUpperCase() || 'CLI'} • Effective Date: {formatDate(agreement.startDate)}
          </p>
        </div>

        {/* Preamble */}
        <p className="text-[9pt] text-neutral-700 leading-relaxed mb-4 text-justify">
          This Agreement is executed by and between <strong className="text-neutral-900">{model.freelancer.name}</strong> d/b/a{' '}
          <strong className="text-neutral-900">{model.freelancer.brand}</strong> (&quot;Contractor&quot;), and{' '}
          <strong className="text-neutral-900">{model.client.clientName}</strong> on behalf of{' '}
          <strong className="text-neutral-900">{model.client.brandName}</strong> (&quot;Client&quot;). Contractor and Client are individually referred to as a &quot;Party&quot; and collectively as the &quot;Parties.&quot;
        </p>

        {/* Contract Clauses */}
        <div className="space-y-3.5 text-[9pt] leading-relaxed">
          {/* 1. Scope & Package */}
          <div>
            <h2 className="font-bold text-neutral-900 uppercase text-[9.5pt] tracking-wider border-b border-neutral-200 pb-0.5 mb-1">
              1. Engagement & Deliverables
            </h2>
            <p className="text-neutral-700 text-justify">
              Contractor shall furnish the professional services outlined under the{' '}
              <strong className="text-neutral-900">&quot;{client.packageName || 'Agreed Scope'}&quot;</strong> package. Services commence on{' '}
              <strong className="text-neutral-900">{formatDate(agreement.startDate)}</strong> with anticipated final delivery on or before{' '}
              <strong className="text-neutral-900">{formatDate(agreement.endDate)}</strong>. {agreement.scopeOfWork}
            </p>
          </div>

          {/* 2. Compensation & Terms */}
          <div>
            <h2 className="font-bold text-neutral-900 uppercase text-[9.5pt] tracking-wider border-b border-neutral-200 pb-0.5 mb-1">
              2. Fees & Payment Terms
            </h2>
            <p className="text-neutral-700 text-justify">
              Total project compensation is fixed at <strong className="text-neutral-900">{formatCurrency(client.packagePrice)}</strong>. {agreement.paymentTerms} Payments shall be submitted via Contractor&apos;s specified remittance methods. {agreement.lateFeePolicy}
            </p>
          </div>

          {/* 3. Revisions & Modifications */}
          <div>
            <h2 className="font-bold text-neutral-900 uppercase text-[9.5pt] tracking-wider border-b border-neutral-200 pb-0.5 mb-1">
              3. Revision Limits & Alterations
            </h2>
            <p className="text-neutral-700 text-justify">
              This engagement includes up to <strong className="text-neutral-900">{agreement.revisionLimit} distinct rounds of revisions</strong>. Any subsequent revisions or changes beyond the defined scope shall be billed at Contractor&apos;s prevailing standard rate upon written mutual authorization.
            </p>
          </div>

          {/* 4. Intellectual Property */}
          <div>
            <h2 className="font-bold text-neutral-900 uppercase text-[9.5pt] tracking-wider border-b border-neutral-200 pb-0.5 mb-1">
              4. Intellectual Property & Rights
            </h2>
            <p className="text-neutral-700 text-justify">
              {agreement.ipOwnership || 'Upon receipt of full payment, all custom design files and code are assigned to Client.'} Contractor retains the right to display non-confidential deliverables in professional promotional portfolios.
            </p>
          </div>

          {/* 5. Warranty & Post-Launch Support */}
          <div>
            <h2 className="font-bold text-neutral-900 uppercase text-[9.5pt] tracking-wider border-b border-neutral-200 pb-0.5 mb-1">
              5. Warranty & Quality Assurance
            </h2>
            <p className="text-neutral-700 text-justify">
              Contractor guarantees deliverables against technical defects and bugs for a period of{' '}
              <strong className="text-neutral-900">{agreement.warrantyDays} days</strong> following final handover. Warranty excludes issues arising from third-party hosting, browser depreciations, or unauthorized modifications made by Client.
            </p>
          </div>

          {/* 6. Termination */}
          <div>
            <h2 className="font-bold text-neutral-900 uppercase text-[9.5pt] tracking-wider border-b border-neutral-200 pb-0.5 mb-1">
              6. Cancellation & Termination
            </h2>
            <p className="text-neutral-700 text-justify">
              {agreement.cancellationPolicy}
            </p>
          </div>
        </div>

        {/* Dual Signatures */}
        <div className="border-t-2 border-neutral-900 pt-4 mt-5">
          <p className="text-[8pt] text-neutral-500 mb-4">
            IN WITNESS WHEREOF, the Parties have executed this Master Services Agreement as of the date first above written.
          </p>

          <div className="grid grid-cols-2 gap-8 text-[9pt]">
            <div>
              <p className="font-bold text-neutral-900">CONTRACTOR:</p>
              <p className="text-[8.5pt] text-neutral-700 mb-6">{model.freelancer.brand}</p>
              <div className="border-b border-neutral-300 mb-1.5 h-7 flex items-end">
                {profile.signatureBase64 && (
                  <img
                    src={profile.signatureBase64}
                    alt="Signature"
                    className="max-h-8 object-contain filter invert contrast-200"
                  />
                )}
              </div>
              <p className="text-[8pt] text-neutral-500">By: {model.freelancer.name}</p>
              <p className="text-[7.5pt] text-neutral-400 font-mono">Date: {formatDate(agreement.startDate)}</p>
            </div>

            <div>
              <p className="font-bold text-neutral-900">CLIENT:</p>
              <p className="text-[8.5pt] text-neutral-700 mb-6">{model.client.brandName}</p>
              <div className="border-b border-neutral-300 mb-1.5 h-7" />
              <p className="text-[8pt] text-neutral-500">By: {model.client.clientName}</p>
              <p className="text-[7.5pt] text-neutral-400 font-mono">Date: ________________________</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 pt-2 flex items-center justify-between text-[7.5pt] text-neutral-400 font-mono">
        <span>Master Services Agreement • Legally Binding</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  )
}

