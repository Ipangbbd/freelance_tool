import React from 'react'
import { useAppStore } from '@/lib/store'
import { useMyProfileStore } from '@/features/my-profile/useMyProfileStore'
import { buildInvoiceModel } from './invoiceTemplate'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Building, CreditCard, Mail, Phone } from 'lucide-react'

export interface InvoicePreviewProps {
  pageNumber?: number
}

export function InvoicePreview({ pageNumber = 1 }: InvoicePreviewProps) {
  const { client, invoice } = useAppStore()
  const profile = useMyProfileStore()
  const model = buildInvoiceModel(client, invoice, profile)
  const { totals } = model

  return (
    <div className="flex flex-col h-full justify-between text-neutral-800 text-[11pt] leading-[1.5] select-text">
      <div>
        {/* Invoice Top Header */}
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
                {model.freelancer.name} • {model.freelancer.email}
              </p>
              {model.freelancer.address && (
                <p className="text-[8.5pt] text-neutral-400 font-mono">{model.freelancer.address}</p>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block bg-neutral-900 text-white font-mono text-[9pt] font-bold tracking-widest px-3 py-1 rounded uppercase">
              INVOICE
            </span>
            <p className="text-[11pt] font-mono font-bold text-neutral-900 mt-1.5">{invoice.invoiceNumber}</p>
            <p className="text-[8.5pt] text-neutral-500 font-mono">Issued: {formatDate(invoice.invoiceDate)}</p>
            <p className="text-[8.5pt] font-mono text-neutral-800 font-semibold">
              Due Date: {formatDate(invoice.dueDate)}
            </p>
          </div>
        </div>

        {/* Client & Billing Info Banner */}
        <div className="bg-neutral-50 border border-neutral-200 rounded p-4 mb-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[8pt] font-mono uppercase tracking-wider text-neutral-400">Billed To</p>
            <h2 className="text-[12pt] font-bold text-neutral-900 mt-0.5">{model.client.clientName}</h2>
            <p className="text-[10pt] text-neutral-700 font-semibold">{model.client.brandName}</p>
            {model.client.instagramHandle && (
              <p className="text-[8.5pt] text-neutral-500 font-mono">{model.client.instagramHandle}</p>
            )}
          </div>

          <div className="text-right">
            <p className="text-[8pt] font-mono uppercase tracking-wider text-neutral-400">Payment Status</p>
            <span className="inline-block bg-amber-100 text-amber-800 font-mono text-[8pt] font-bold px-2 py-0.5 rounded mt-1 uppercase tracking-wide">
              {invoice.dpPercentage > 0 && invoice.dpPercentage < 100
                ? `${invoice.dpPercentage}% Deposit Due`
                : 'Payment Due'}
            </span>
            <p className="text-[8.5pt] text-neutral-500 font-mono mt-2">
              Engagement: {client.packageName || 'Professional Creative Services'}
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-neutral-900 text-[8.5pt] font-mono uppercase tracking-wider text-neutral-500">
                <th className="py-2.5 font-bold">Item Description</th>
                <th className="py-2.5 text-center w-16">Qty</th>
                <th className="py-2.5 text-right w-28">Rate</th>
                <th className="py-2.5 text-right w-28">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-[9.5pt]">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 font-medium text-neutral-900">{item.description}</td>
                  <td className="py-3 text-center text-neutral-600 font-mono">{item.quantity}</td>
                  <td className="py-3 text-right text-neutral-600 font-mono">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="py-3 text-right font-semibold text-neutral-900 font-mono">
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Summary & Breakdown */}
        <div className="flex justify-end mb-6">
          <div className="w-72 space-y-1.5 text-[9pt] font-mono">
            <div className="flex justify-between text-neutral-600 py-0.5">
              <span>Subtotal:</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            {invoice.taxPercentage > 0 && (
              <div className="flex justify-between text-neutral-600 py-0.5">
                <span>Tax ({invoice.taxPercentage}%):</span>
                <span>{formatCurrency(totals.taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-900 font-bold border-t border-neutral-300 pt-1.5 text-[10pt]">
              <span>Total Contract Value:</span>
              <span>{formatCurrency(totals.totalAmount)}</span>
            </div>

            {invoice.dpPercentage > 0 && invoice.dpPercentage < 100 && (
              <>
                <div className="flex justify-between text-neutral-900 font-bold bg-neutral-100 p-2 rounded mt-1 border border-neutral-300 text-[10pt]">
                  <span>Amount Due Now ({invoice.dpPercentage}%):</span>
                  <span>{formatCurrency(totals.depositAmount)}</span>
                </div>
                <div className="flex justify-between text-neutral-500 text-[8pt] px-2">
                  <span>Balance upon delivery:</span>
                  <span>{formatCurrency(totals.balanceRemaining)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Payment Remittance Instructions */}
        <div className="bg-neutral-50 border border-neutral-200 rounded p-4 mb-4">
          <h3 className="text-[9pt] font-bold uppercase tracking-wider text-neutral-900 mb-1.5 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-neutral-700 inline" />
            Payment Instructions & Wire Details
          </h3>
          <p className="text-[9pt] text-neutral-700 whitespace-pre-line font-mono leading-relaxed">
            {model.freelancer.paymentInfo}
          </p>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="text-[8.5pt] text-neutral-600 leading-relaxed pl-1">
            <span className="font-semibold text-neutral-800">Terms & Notes: </span>
            {invoice.notes}
          </div>
        )}
      </div>

      {/* Invoice Footer */}
      <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-[8pt] text-neutral-400 font-mono">
        <span>{model.freelancer.brand} • Thank you for your partnership</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  )
}

