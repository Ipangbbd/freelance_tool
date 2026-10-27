import { DocumentType } from '@/lib/store'
import { PAPER_CONFIGS, PaperSize } from '@/lib/paper'

export interface DocumentPageSpec {
  totalPages: number
  pageTitles: string[]
}

export function getDocumentPageCount(documentType: DocumentType): number {
  switch (documentType) {
    case 'proposal':
      return 2
    case 'invoice':
      return 1
    case 'agreement':
      return 1
    case 'welcome':
      return 1
    default:
      return 1
  }
}

export function getDocumentPageTitles(documentType: DocumentType): string[] {
  switch (documentType) {
    case 'proposal':
      return ['Executive Overview & Scope', 'Deliverables & Commercial Agreement']
    case 'invoice':
      return ['Invoice & Remittance']
    case 'agreement':
      return ['Master Services Terms & Signatures']
    case 'welcome':
      return ['Kickoff Roadmap & Onboarding Protocol']
    default:
      return ['Document Page']
  }
}

export function getPaperPixelDimensions(paperSize: PaperSize, scale: number = 1.0) {
  const config = PAPER_CONFIGS[paperSize]
  // Standard CSS 96 DPI: 1 inch = 96px, 1 mm = 3.7795px
  const baseWidthPx = config.widthMm * 3.7795
  const baseHeightPx = config.heightMm * 3.7795

  return {
    widthPx: Math.round(baseWidthPx * scale),
    heightPx: Math.round(baseHeightPx * scale),
    baseWidthPx: Math.round(baseWidthPx),
    baseHeightPx: Math.round(baseHeightPx),
  }
}

