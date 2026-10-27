import { ClientData, InvoiceData, InvoiceItem } from '@/lib/store'
import { MyProfileState } from '@/features/my-profile/useMyProfileStore'

export interface InvoiceTotals {
  subtotal: number
  taxAmount: number
  totalAmount: number
  depositAmount: number
  balanceRemaining: number
}

export function calculateInvoiceTotals(invoice: InvoiceData): InvoiceTotals {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0),
    0
  )
  const taxAmount = (subtotal * (invoice.taxPercentage || 0)) / 100
  const totalAmount = subtotal + taxAmount
  const depositAmount = (totalAmount * (invoice.dpPercentage || 0)) / 100
  const balanceRemaining = totalAmount - depositAmount

  return {
    subtotal,
    taxAmount,
    totalAmount,
    depositAmount,
    balanceRemaining,
  }
}

export function buildInvoiceModel(
  client: ClientData,
  invoice: InvoiceData,
  profile: MyProfileState
) {
  const totals = calculateInvoiceTotals(invoice)
  return {
    client,
    invoice,
    totals,
    freelancer: {
      name: profile.myFullName,
      brand: profile.myBrandName,
      email: profile.email,
      phone: profile.phone,
      website: profile.website,
      address: profile.address,
      logo: profile.logoBase64,
      paymentInfo: invoice.paymentInfo || profile.defaultPaymentInfo,
    },
  }
}

