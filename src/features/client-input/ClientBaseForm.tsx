import React from 'react'
import { useAppStore } from '@/lib/store'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { UserCheck, Sparkles, DollarSign } from 'lucide-react'

export function ClientBaseForm() {
  const { client, updateClient } = useAppStore()

  return (
    <Card className="border-hairline shadow-sm">
      <CardHeader className="py-3.5 px-4 bg-surface-2/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[14px]">
            <UserCheck className="w-4 h-4 text-primary" />
            Client & Engagement Foundation
          </CardTitle>
          <span className="text-[11px] font-mono text-ink-subtle uppercase tracking-wider bg-surface-3 px-2 py-0.5 rounded-sm">
            Shared Context
          </span>
        </div>
        <CardDescription className="text-[12px]">
          Always synced across your Proposal, Invoice, Master Agreement, and Onboarding Welcome Guide.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Client Contact Person"
            placeholder="e.g. Sophia Montgomery"
            value={client.clientName}
            onChange={(e) => updateClient({ clientName: e.target.value })}
            required
          />
          <Input
            label="Client Business / Brand Name"
            placeholder="e.g. Aura Lifestyle & Co."
            value={client.brandName}
            onChange={(e) => updateClient({ brandName: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              label="Selected Service Package"
              placeholder="e.g. Full Brand Identity & Web Architecture"
              value={client.packageName}
              onChange={(e) => updateClient({ packageName: e.target.value })}
            />
          </div>
          <div>
            <Input
              label="Package Investment ($)"
              type="number"
              min="0"
              step="50"
              placeholder="4850"
              value={client.packagePrice || ''}
              onChange={(e) => updateClient({ packagePrice: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div>
          <Input
            label="Client Social / Instagram Handle"
            placeholder="e.g. @auralifestyle.co"
            value={client.instagramHandle}
            onChange={(e) => updateClient({ instagramHandle: e.target.value })}
            hint="Optional branding touch"
          />
        </div>
      </CardContent>
    </Card>
  )
}

