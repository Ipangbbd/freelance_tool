import React, { useRef, useState } from 'react'
import { useMyProfileStore } from './useMyProfileStore'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Upload, Trash2, CheckCircle2, User, Building, Mail, Phone, Globe, MapPin, CreditCard, PenTool } from 'lucide-react'

export interface MyProfileFormProps {
  onSaved?: () => void
}

export function MyProfileForm({ onSaved }: MyProfileFormProps) {
  const profile = useMyProfileStore()
  const [copiedSuccess, setCopiedSuccess] = useState(false)

  const logoInputRef = useRef<HTMLInputElement>(null)
  const sigInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logoBase64' | 'signatureBase64'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit to 2MB image
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be under 2MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      profile.setProfile({ [field]: base64 })
    }
    reader.readAsDataURL(file)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setCopiedSuccess(true)
    setTimeout(() => {
      setCopiedSuccess(false)
      onSaved?.()
    }, 1000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 text-sm">
      <div className="bg-surface-2/60 border border-hairline rounded-lg p-3 text-xs text-ink-muted flex items-start gap-2.5">
        <User className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div>
          Your personal and business credentials configured here are automatically synchronized into document letterheads, invoices, agreements, and sign-off blocks.
        </div>
      </div>

      {/* Grid of basic info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Your Full Name"
          placeholder="e.g. Alex Rivera"
          value={profile.myFullName}
          onChange={(e) => profile.setProfile({ myFullName: e.target.value })}
          required
        />
        <Input
          label="Studio / Brand Name"
          placeholder="e.g. Studio Rivera Design"
          value={profile.myBrandName}
          onChange={(e) => profile.setProfile({ myBrandName: e.target.value })}
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="alex@domain.com"
          value={profile.email}
          onChange={(e) => profile.setProfile({ email: e.target.value })}
          required
        />
        <Input
          label="Phone Number"
          placeholder="+1 (555) 234-5678"
          value={profile.phone}
          onChange={(e) => profile.setProfile({ phone: e.target.value })}
        />
        <Input
          label="Portfolio / Website URL"
          placeholder="https://yourportfolio.design"
          value={profile.website}
          onChange={(e) => profile.setProfile({ website: e.target.value })}
        />
        <Input
          label="Studio Address / Location"
          placeholder="City, State / Country"
          value={profile.address}
          onChange={(e) => profile.setProfile({ address: e.target.value })}
        />
      </div>

      {/* Brand Assets Upload: Logo & Signature */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Brand Logo Upload */}
        <div className="p-4 rounded-lg bg-surface-2/40 border border-hairline space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-primary" />
              Brand Logo
            </span>
            {profile.logoBase64 && (
              <button
                type="button"
                onClick={() => profile.setProfile({ logoBase64: '' })}
                className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            )}
          </div>

          <div
            onClick={() => logoInputRef.current?.click()}
            className="cursor-pointer border border-dashed border-hairline-strong rounded-md p-3 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors bg-surface-1 min-h-[90px]"
          >
            {profile.logoBase64 ? (
              <img
                src={profile.logoBase64}
                alt="Brand Logo"
                className="max-h-16 max-w-full object-contain"
              />
            ) : (
              <>
                <Upload className="w-5 h-5 text-ink-tertiary" />
                <span className="text-xs text-ink-subtle">Upload Logo (PNG, SVG, JPG)</span>
              </>
            )}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'logoBase64')}
            />
          </div>
        </div>

        {/* Digital Signature Upload */}
        <div className="p-4 rounded-lg bg-surface-2/40 border border-hairline space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-primary" />
              Digital Signature
            </span>
            {profile.signatureBase64 && (
              <button
                type="button"
                onClick={() => profile.setProfile({ signatureBase64: '' })}
                className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            )}
          </div>

          <div
            onClick={() => sigInputRef.current?.click()}
            className="cursor-pointer border border-dashed border-hairline-strong rounded-md p-3 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors bg-surface-1 min-h-[90px]"
          >
            {profile.signatureBase64 ? (
              <img
                src={profile.signatureBase64}
                alt="Signature"
                className="max-h-16 max-w-full object-contain filter invert contrast-200"
              />
            ) : (
              <>
                <Upload className="w-5 h-5 text-ink-tertiary" />
                <span className="text-xs text-ink-subtle">Upload Signature PNG</span>
              </>
            )}
            <input
              ref={sigInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'signatureBase64')}
            />
          </div>
        </div>
      </div>

      {/* Default Payment Info */}
      <Textarea
        label="Default Payment Instructions"
        hint="Injected into invoices & agreements"
        rows={3}
        placeholder="e.g. Bank wire details, PayPal handle, ACH account info..."
        value={profile.defaultPaymentInfo}
        onChange={(e) => profile.setProfile({ defaultPaymentInfo: e.target.value })}
      />

      <div className="flex items-center justify-between pt-2 border-t border-hairline">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => profile.resetToDefaults()}
          className="text-xs text-ink-tertiary"
        >
          Reset to Sample Data
        </Button>

        <Button type="submit" variant="primary">
          {copiedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              Saved!
            </>
          ) : (
            'Save Profile & Sync Documents'
          )}
        </Button>
      </div>
    </form>
  )
}

