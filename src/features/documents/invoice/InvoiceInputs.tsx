import React from 'react'
import { useAppStore } from '@/lib/store'
import { Input, Textarea } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { calculateInvoiceTotals } from './invoiceTemplate'
import { formatCurrency } from '@/lib/utils'
import {
  Receipt,
  Plus,
  Trash2,
  RefreshCw,
  Percent,
  Calendar,
  CreditCard,
  FileCheck,
} from 'lucide-react'

export function InvoiceInputs() {
  const { invoice, updateInvoice, client, updateClient } = useAppStore()
  const totals = calculateInvoiceTotals(invoice)

  const handleRegenerateNumber = () => {
    const year = new Date().getFullYear()
    const rand = Math.floor(1000 + Math.random() * 9000)
    updateInvoice({ invoiceNumber: `INV-${year}-${rand}` })
  }

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      description: 'Consulting & Engineering Sprints',
      quantity: 1,
      unitPrice: 500,
    }
    const updated = [...invoice.items, newItem]
    updateInvoice({ items: updated })
    const newSubtotal = updated.reduce((s, it) => s + it.quantity * it.unitPrice, 0)
    updateClient({ packagePrice: newSubtotal })
  }

  const handleUpdateItem = (
    id: string,
    field: 'description' | 'quantity' | 'unitPrice',
    value: string | number
  ) => {
    const updated = invoice.items.map((it) => {
      if (it.id !== id) return it
      return { ...it, [field]: value }
    })
    updateInvoice({ items: updated })
    const newSubtotal = updated.reduce((s, it) => s + it.quantity * it.unitPrice, 0)
    updateClient({ packagePrice: newSubtotal })
  }

  const handleRemoveItem = (id: string) => {
    if (invoice.items.length <= 1) return
    const updated = invoice.items.filter((it) => it.id !== id)
    updateInvoice({ items: updated })
    const newSubtotal = updated.reduce((s, it) => s + it.quantity * it.unitPrice, 0)
    updateClient({ packagePrice: newSubtotal })
  }

  return (
    <Card className="border-hairline shadow-sm">
      <CardHeader className="py-3.5 px-4 bg-surface-2/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[14px]">
            <Receipt className="w-4 h-4 text-primary" />
            Invoice Specifications
          </CardTitle>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sm">
            Active Context
          </span>
        </div>
        <CardDescription className="text-[12px]">
          Configure invoice number, issuance & due dates, down payment percentage, itemized service lines, and remittance instructions.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Invoice Number & Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-ink-muted">Invoice #</label>
              <button
                type="button"
                onClick={handleRegenerateNumber}
                className="text-[11px] text-primary hover:text-primary-hover flex items-center gap-1"
                title="Generate new invoice number"
              >
                <RefreshCw className="w-3 h-3" /> New
              </button>
            </div>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
              className="flex h-9 w-full rounded-md bg-surface-1 px-3 py-1.5 text-[14px] font-mono text-ink border border-hairline focus:outline-none focus:border-primary"
            />
          </div>

          <Input
            label="Invoice Date"
            type="date"
            value={invoice.invoiceDate}
            onChange={(e) => updateInvoice({ invoiceDate: e.target.value })}
          />

          <Input
            label="Due Date"
            type="date"
            value={invoice.dueDate}
            onChange={(e) => updateInvoice({ dueDate: e.target.value })}
          />
        </div>

        {/* Tax & DP Percentage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <Input
            label="Down Payment / Deposit (%)"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="50"
            hint="e.g. 50% upfront deposit"
            value={invoice.dpPercentage}
            onChange={(e) => updateInvoice({ dpPercentage: parseFloat(e.target.value) || 0 })}
          />

          <Input
            label="Sales Tax / VAT (%)"
            type="number"
            min="0"
            max="100"
            step="0.5"
            placeholder="0"
            hint="Set 0 if tax exempt"
            value={invoice.taxPercentage}
            onChange={(e) => updateInvoice({ taxPercentage: parseFloat(e.target.value) || 0 })}
          />
        </div>

        {/* Itemized Line Items */}
        <div className="space-y-2 pt-2 border-t border-hairline/60">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-ink-muted">Itemized Services & Deliverables</label>
            <span className="text-xs font-mono text-ink-subtle">
              Subtotal: {formatCurrency(totals.subtotal)}
            </span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {invoice.items.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-md bg-surface-2/60 border border-hairline space-y-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Description of deliverable..."
                    value={item.description}
                    onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                    className="flex-1 h-8 rounded bg-surface-1 px-2.5 text-xs text-ink border border-hairline focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={invoice.items.length <= 1}
                    className="p-1.5 text-ink-tertiary hover:text-red-400 disabled:opacity-30 disabled:hover:text-ink-tertiary"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-ink-tertiary block mb-0.5">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)
                      }
                      className="w-full h-7 rounded bg-surface-1 px-2 text-xs text-ink font-mono border border-hairline focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-ink-tertiary block mb-0.5">Rate ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)
                      }
                      className="w-full h-7 rounded bg-surface-1 px-2 text-xs text-ink font-mono border border-hairline focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-ink-tertiary block mb-0.5">Total</label>
                    <div className="h-7 flex items-center px-2 bg-surface-1 rounded border border-hairline text-ink-muted font-mono text-xs">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddItem}
            className="w-full h-8 text-xs gap-1.5 mt-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Invoice Line Item
          </Button>
        </div>

        {/* Payment Remittance Info */}
        <Textarea
          label="Payment Details & Instructions"
          hint="Bank accounts, Routing, Wire, Wise, or PayPal"
          rows={3}
          value={invoice.paymentInfo}
          onChange={(e) => updateInvoice({ paymentInfo: e.target.value })}
        />

        {/* Invoice Notes */}
        <Textarea
          label="Invoice Notes & Payment Terms"
          rows={2}
          value={invoice.notes}
          onChange={(e) => updateInvoice({ notes: e.target.value })}
        />
      </CardContent>
    </Card>
  )
}

