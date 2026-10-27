import React, { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { PAPER_CONFIGS } from '@/lib/paper'
import { getDocumentPageCount, getDocumentPageTitles } from '@/features/export/pagination'
import { ProposalPreview } from './proposal/ProposalPreview'
import { InvoicePreview } from './invoice/InvoicePreview'
import { AgreementPreview } from './agreement/AgreementPreview'
import { WelcomePreview } from './welcome/WelcomePreview'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Sliders,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function DocumentPreviewContainer() {
  const {
    documentType,
    paperSize,
    currentPage,
    setCurrentPage,
    previewScale,
    setPreviewScale,
  } = useAppStore()

  const [viewMode, setViewMode] = useState<'single' | 'all'>('single')

  const totalPages = getDocumentPageCount(documentType)
  const pageTitles = getDocumentPageTitles(documentType)
  const config = PAPER_CONFIGS[paperSize]

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handleZoom = (delta: number) => {
    const newScale = Math.min(Math.max(previewScale + delta, 0.6), 1.4)
    setPreviewScale(parseFloat(newScale.toFixed(2)))
  }

  const renderDocumentPage = (pageIdx: number) => {
    switch (documentType) {
      case 'proposal':
        return <ProposalPreview pageNumber={pageIdx} />
      case 'invoice':
        return <InvoicePreview pageNumber={pageIdx} />
      case 'agreement':
        return <AgreementPreview pageNumber={pageIdx} />
      case 'welcome':
        return <WelcomePreview pageNumber={pageIdx} />
      default:
        return null
    }
  }

  // Calculate paper style dimensions based on config mm
  // At 96 DPI: 1mm = 3.7795px
  // A4 = 210mm x 297mm => ~794px x 1123px
  const paperBaseWidth = config.widthMm * 3.7795
  const paperBaseHeight = config.heightMm * 3.7795

  return (
    <div className="flex-1 flex flex-col h-full bg-[#030407] overflow-hidden select-none">
      {/* Preview Top Control Bar */}
      <div className="h-11 bg-surface-1 border-b border-hairline px-4 flex items-center justify-between shrink-0 text-xs">
        {/* Left: Document Info */}
        <div className="flex items-center gap-2">
          <Badge variant="primary" className="text-[10px] uppercase font-mono">
            {documentType}
          </Badge>
          <span className="text-ink-subtle font-mono text-[11px]">
            {config.name} ({config.widthMm} × {config.heightMm} mm)
          </span>
        </div>

        {/* Center: Pagination Controls */}
        <div className="flex items-center gap-2">
          {totalPages > 1 && (
            <div className="flex items-center gap-2 bg-surface-2/80 border border-hairline rounded-md px-2 py-1">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPage <= 1 || viewMode === 'all'}
                className="p-1 rounded text-ink-subtle hover:text-ink hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] font-mono font-medium text-ink px-1">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages || viewMode === 'all'}
                className="p-1 rounded text-ink-subtle hover:text-ink hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Page Slider */}
              <input
                type="range"
                min="1"
                max={totalPages}
                value={currentPage}
                disabled={viewMode === 'all'}
                onChange={(e) => setCurrentPage(parseInt(e.target.value) || 1)}
                className="w-16 h-1 accent-primary bg-surface-3 rounded cursor-pointer disabled:opacity-30"
                title="Page Slider"
              />
            </div>
          )}

          {/* Toggle All Pages View if multi-page */}
          {totalPages > 1 && (
            <button
              onClick={() => setViewMode(viewMode === 'single' ? 'all' : 'single')}
              className={`px-2 py-1 rounded text-[11px] font-mono border transition-colors flex items-center gap-1 ${
                viewMode === 'all'
                  ? 'bg-primary/20 text-primary-hover border-primary/40'
                  : 'bg-surface-2 text-ink-subtle border-hairline hover:text-ink'
              }`}
              title="Show all pages stacked"
            >
              <Layers className="w-3 h-3" />
              {viewMode === 'all' ? 'All Pages' : 'Single'}
            </button>
          )}
        </div>

        {/* Right: Zoom controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-1 rounded text-ink-subtle hover:text-ink hover:bg-surface-2 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono text-ink-muted w-10 text-center">
            {Math.round(previewScale * 100)}%
          </span>

          <button
            onClick={() => handleZoom(0.1)}
            className="p-1 rounded text-ink-subtle hover:text-ink hover:bg-surface-2 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setPreviewScale(1.0)}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-2 text-ink-subtle hover:text-ink border border-hairline ml-1"
            title="Reset Zoom"
          >
            100%
          </button>
        </div>
      </div>

      {/* Real Paper Display Area */}
      <div className="flex-1 overflow-auto p-6 md:p-10 flex flex-col items-center justify-start gap-8 bg-[radial-gradient(#14151a_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Render pages according to mode */}
        {viewMode === 'all' || totalPages === 1 ? (
          Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pNum) => (
            <div key={pNum} className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-mono text-ink-tertiary">
                Page {pNum} — {pageTitles[pNum - 1] || 'Document Sheet'}
              </span>

              {/* Paper Sheet Container */}
              <div
                id={`paper-page-${pNum}`}
                style={{
                  width: `${paperBaseWidth}px`,
                  minHeight: `${paperBaseHeight}px`,
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top center',
                  padding: '24mm',
                  boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)',
                }}
                className="bg-white rounded-[2px] transition-transform duration-150 relative text-black print-page"
              >
                {renderDocumentPage(pNum)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-ink-tertiary">
              Page {currentPage} of {totalPages} — {pageTitles[currentPage - 1]}
            </span>

            {/* Hidden DOM elements for remaining pages to allow PDF export engine to snapshot all pages at once */}
            <div className="relative">
              <div
                id={`paper-page-${currentPage}`}
                style={{
                  width: `${paperBaseWidth}px`,
                  minHeight: `${paperBaseHeight}px`,
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top center',
                  padding: '24mm',
                  boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)',
                }}
                className="bg-white rounded-[2px] transition-transform duration-150 relative text-black print-page"
              >
                {renderDocumentPage(currentPage)}
              </div>

              {/* Invisible offscreen container for other pages for PDF export */}
              <div className="absolute top-0 left-0 pointer-events-none opacity-0 -z-50 overflow-hidden h-0">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                  .filter((p) => p !== currentPage)
                  .map((otherPage) => (
                    <div
                      key={otherPage}
                      id={`paper-page-${otherPage}`}
                      style={{
                        width: `${paperBaseWidth}px`,
                        minHeight: `${paperBaseHeight}px`,
                        padding: '24mm',
                      }}
                      className="bg-white"
                    >
                      {renderDocumentPage(otherPage)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

