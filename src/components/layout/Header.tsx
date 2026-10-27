import React from 'react'
import { useAppStore, DocumentType } from '@/lib/store'
import { PaperSize } from '@/lib/paper'
import { Tabs, TabOption } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { useExportPDF } from '@/features/export/useExportPDF'
import { useExportDOCX } from '@/features/export/useExportDOCX'
import {
  FileText,
  Receipt,
  ShieldCheck,
  Mail,
  Download,
  FileCode,
  User,
  Printer,
  ChevronDown,
} from 'lucide-react'

export function Header() {
  const {
    documentType,
    setDocumentType,
    paperSize,
    setPaperSize,
    setIsProfileModalOpen,
  } = useAppStore()

  const { exportPDF, isExporting: isPdfExporting } = useExportPDF()
  const { exportDOCX, isExporting: isDocxExporting } = useExportDOCX()

  const docTabs: TabOption<DocumentType>[] = [
    { id: 'proposal', label: 'Proposal', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'invoice', label: 'Invoice', icon: <Receipt className="w-3.5 h-3.5" /> },
    { id: 'agreement', label: 'Agreement', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'welcome', label: 'Welcome Email', icon: <Mail className="w-3.5 h-3.5" /> },
  ]

  const handlePrint = () => {
    window.print()
  }

  return (
    <header className="h-14 bg-canvas border-b border-hairline px-6 flex items-center justify-between shrink-0 select-none z-20">
      {/* Context Tabs (Document Switcher) */}
      <div className="flex items-center gap-4">
        <Tabs<DocumentType>
          tabs={docTabs}
          activeTab={documentType}
          onChange={(tab) => setDocumentType(tab)}
        />
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-3">
        {/* Paper Size Selector */}
        <div className="flex items-center gap-1 bg-surface-1 border border-hairline rounded-md p-0.5">
          {(['A4', 'Letter'] as PaperSize[]).map((size) => (
            <button
              key={size}
              onClick={() => setPaperSize(size)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-all ${
                paperSize === size
                  ? 'bg-surface-3 text-ink shadow-xs border border-hairline-strong'
                  : 'text-ink-subtle hover:text-ink'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Profile Settings Modal Trigger */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsProfileModalOpen(true)}
          className="text-xs"
        >
          <User className="w-3.5 h-3.5 text-primary" />
          My Profile
        </Button>

        {/* Browser Print */}
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePrint}
          className="text-xs"
          title="Print or Save via System Dialog"
        >
          <Printer className="w-3.5 h-3.5" />
          Print
        </Button>

        {/* Export DOCX */}
        <Button
          variant="secondary"
          size="sm"
          onClick={exportDOCX}
          disabled={isDocxExporting}
          className="text-xs"
        >
          <FileCode className="w-3.5 h-3.5 text-ink-subtle" />
          {isDocxExporting ? 'Building...' : 'DOCX'}
        </Button>

        {/* Export PDF */}
        <Button
          variant="primary"
          size="sm"
          onClick={exportPDF}
          disabled={isPdfExporting}
          className="text-xs shadow-md"
        >
          <Download className="w-3.5 h-3.5" />
          {isPdfExporting ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      </div>
    </header>
  )
}

