import { useState } from 'react'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  convertMillimetersToTwip,
  PageBreak,
} from 'docx'
import { saveAs } from 'file-saver'
import { useAppStore } from '@/lib/store'
import { useMyProfileStore } from '@/features/my-profile/useMyProfileStore'
import { formatCurrency, formatDate } from '@/lib/utils'
import { calculateInvoiceTotals } from '@/features/documents/invoice/invoiceTemplate'

export function useExportDOCX() {
  const [isExporting, setIsExporting] = useState(false)
  const store = useAppStore()
  const profile = useMyProfileStore()

  const exportDOCX = async () => {
    setIsExporting(true)
    try {
      const { documentType, client, proposal, invoice, agreement, welcome } = store
      const brandSlug = (client.brandName || 'client')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
      const fileName = `${documentType}-${brandSlug}-${new Date().toISOString().split('T')[0]}.docx`

      const pageProperties = {
        page: {
          size: {
            width: convertMillimetersToTwip(210), // A4 width
            height: convertMillimetersToTwip(297), // A4 height
          },
          margin: {
            top: convertMillimetersToTwip(20),
            bottom: convertMillimetersToTwip(20),
            left: convertMillimetersToTwip(20),
            right: convertMillimetersToTwip(20),
          },
        },
      }

      let docSections: any[] = []

      // Modular builders per document type
      if (documentType === 'proposal') {
        const activeFeatures = proposal.features.filter((f) => f.checked)
        docSections = [
          {
            properties: pageProperties,
            children: [
              new Paragraph({
                text: profile.myBrandName,
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${profile.myFullName} • ${profile.email} • ${profile.website}`,
                    size: 18,
                    color: '666666',
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `PROJECT PROPOSAL: ${client.packageName}`,
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 150 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Prepared for: ${client.clientName} (${client.brandName})`,
                    italics: true,
                    size: 20,
                  }),
                ],
                spacing: { after: 400 },
              }),

              // 1. Context
              new Paragraph({
                text: '1. Strategic Context & Client Challenge',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
              }),
              new Paragraph({
                children: [new TextRun({ text: proposal.clientPainPoint, size: 22 })],
                spacing: { after: 300 },
              }),

              // 2. Solution
              new Paragraph({
                text: '2. Tailored Solution Architecture',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
              }),
              new Paragraph({
                children: [new TextRun({ text: proposal.solution, size: 22 })],
                spacing: { after: 300 },
              }),

              // 3. Features
              new Paragraph({
                text: '3. Scope Features & Inclusions',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
              }),
              ...activeFeatures.map(
                (feat) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: '•  ', bold: true }),
                      new TextRun({ text: feat.name, size: 22 }),
                    ],
                    spacing: { after: 80 },
                  })
              ),

              new Paragraph({ children: [new PageBreak()] }),

              // 4. Deliverables
              new Paragraph({
                text: '4. Scope of Deliverables',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
              }),
              new Paragraph({
                children: [new TextRun({ text: proposal.deliverables, size: 22 })],
                spacing: { after: 300 },
              }),

              // 5. Investment
              new Paragraph({
                text: '5. Commercial Investment',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Total Fixed Investment: ${formatCurrency(client.packagePrice)}`,
                    bold: true,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Payment terms: 50% commitment deposit upon agreement execution, 50% balance upon milestone review.',
                    size: 20,
                    italics: true,
                  }),
                ],
                spacing: { after: 300 },
              }),

              // 6. Next Steps & Sign-off
              new Paragraph({
                text: '6. Execution & Authorization',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
              }),
              new Paragraph({
                children: [new TextRun({ text: proposal.nextSteps, size: 22 })],
                spacing: { after: 400 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Authorized by: _______________________ (${client.clientName})`,
                    size: 20,
                  }),
                ],
                spacing: { after: 200 },
              }),
            ],
          },
        ]
      } else if (documentType === 'invoice') {
        const totals = calculateInvoiceTotals(invoice)
        const tableRows = [
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Description', bold: true })] })],
                width: { size: 55, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Qty', bold: true })], alignment: AlignmentType.CENTER })],
                width: { size: 15, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Rate', bold: true })], alignment: AlignmentType.RIGHT })],
                width: { size: 15, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Amount', bold: true })], alignment: AlignmentType.RIGHT })],
                width: { size: 15, type: WidthType.PERCENTAGE },
              }),
            ],
          }),
          ...invoice.items.map(
            (it) =>
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: it.description })] }),
                  new TableCell({ children: [new Paragraph({ text: `${it.quantity}`, alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: formatCurrency(it.unitPrice), alignment: AlignmentType.RIGHT })] }),
                  new TableCell({ children: [new Paragraph({ text: formatCurrency(it.quantity * it.unitPrice), alignment: AlignmentType.RIGHT })] }),
                ],
              })
          ),
        ]

        docSections = [
          {
            properties: pageProperties,
            children: [
              new Paragraph({
                text: profile.myBrandName,
                heading: HeadingLevel.TITLE,
              }),
              new Paragraph({
                text: `${profile.myFullName} • ${profile.email}`,
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `INVOICE ${invoice.invoiceNumber}`, bold: true, size: 28 }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                text: `Date: ${formatDate(invoice.invoiceDate)} | Due: ${formatDate(invoice.dueDate)}`,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: `Billed To: ${client.clientName} - ${client.brandName}`,
                spacing: { after: 300 },
              }),
              new Table({
                rows: tableRows,
                width: { size: 100, type: WidthType.PERCENTAGE },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `\nSubtotal: ${formatCurrency(totals.subtotal)}`,
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { before: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Total Due: ${formatCurrency(totals.totalAmount)}`,
                    bold: true,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { after: 300 },
              }),
              new Paragraph({
                text: 'Payment Remittance Information:',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: invoice.paymentInfo || profile.defaultPaymentInfo,
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [new TextRun({ text: invoice.notes, italics: true })],
              }),
            ],
          },
        ]
      } else if (documentType === 'agreement') {
        docSections = [
          {
            properties: pageProperties,
            children: [
              new Paragraph({
                text: 'MASTER SERVICES AGREEMENT',
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Effective Date: ${formatDate(agreement.startDate)} | Term: ${formatDate(agreement.startDate)} to ${formatDate(agreement.endDate)}`,
                    italics: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),
              new Paragraph({
                text: `This Agreement is executed between ${profile.myFullName} (${profile.myBrandName}) and ${client.clientName} (${client.brandName}).`,
                spacing: { after: 300 },
              }),
              new Paragraph({
                text: '1. Scope of Work & Deliverables',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({ text: agreement.scopeOfWork, spacing: { after: 200 } }),
              new Paragraph({
                text: '2. Fees & Payment Terms',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: `Package: ${client.packageName} (${formatCurrency(client.packagePrice)}). ${agreement.paymentTerms} ${agreement.lateFeePolicy}`,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: '3. Revision Limits',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: `Agreement includes up to ${agreement.revisionLimit} distinct revision rounds. Additional revisions subject to standard hourly rate.`,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: '4. Intellectual Property Rights',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({ text: agreement.ipOwnership, spacing: { after: 200 } }),
              new Paragraph({
                text: '5. Warranty Period',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: `Workmanship warranted for ${agreement.warrantyDays} days following production sign-off.`,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: '6. Termination Policy',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({ text: agreement.cancellationPolicy, spacing: { after: 400 } }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Contractor: ${profile.myFullName}           Client: ${client.clientName}`,
                    bold: true,
                  }),
                ],
              }),
            ],
          },
        ]
      } else {
        // Welcome Email / Guide
        docSections = [
          {
            properties: pageProperties,
            children: [
              new Paragraph({
                text: `Welcome to ${profile.myBrandName}`,
                heading: HeadingLevel.TITLE,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Prepared for ${client.clientName} (${client.brandName})`,
                    italics: true,
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                text: welcome.welcomeMessage,
                spacing: { after: 300 },
              }),
              new Paragraph({
                text: 'Kickoff Roadmap',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: `Kickoff Strategy Workshop: ${formatDate(welcome.kickoffDate)}`,
                spacing: { after: 100 },
              }),
              new Paragraph({
                text: `Client Portal: ${welcome.onboardingLink}`,
                spacing: { after: 300 },
              }),
              new Paragraph({
                text: 'Required Client Assets',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: welcome.requiredAssets,
                spacing: { after: 300 },
              }),
              new Paragraph({
                text: 'Operating Norms & Response SLAs',
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: `${welcome.communicationChannels}\nWorking hours: ${welcome.workingHours}`,
                spacing: { after: 300 },
              }),
              new Paragraph({
                text: `Warm regards,\n${profile.myFullName} • ${profile.myBrandName}`,
              }),
            ],
          },
        ]
      }

      const doc = new Document({
        sections: docSections,
      })

      const blob = await Packer.toBlob(doc)
      saveAs(blob, fileName)
    } catch (error) {
      console.error('Failed to export DOCX:', error)
      alert('Could not export DOCX. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return { exportDOCX, isExporting }
}
