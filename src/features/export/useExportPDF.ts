import { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useAppStore } from '@/lib/store'
import { PAPER_CONFIGS } from '@/lib/paper'
import { getDocumentPageCount } from './pagination'

export function useExportPDF() {
  const [isExporting, setIsExporting] = useState(false)
  const { documentType, paperSize, client } = useAppStore()

  const exportPDF = async () => {
    setIsExporting(true)
    try {
      const config = PAPER_CONFIGS[paperSize]
      const totalPages = getDocumentPageCount(documentType)

      // Initialize jsPDF with selected paper format
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: paperSize === 'A4' ? 'a4' : 'letter',
        compress: true,
      })

      const brandSlug = (client.brandName || 'client')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
      const fileName = `${documentType}-${brandSlug}-${new Date().toISOString().split('T')[0]}.pdf`

      for (let pageIdx = 1; pageIdx <= totalPages; pageIdx++) {
        const pageElement = document.getElementById(`paper-page-${pageIdx}`)

        if (pageElement) {
          // Render page to canvas with high resolution
          const canvas = await html2canvas(pageElement, {
            scale: 2, // 2x for sharp print quality
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
          })

          const imgData = canvas.toDataURL('image/jpeg', 0.95)

          if (pageIdx > 1) {
            pdf.addPage(paperSize === 'A4' ? 'a4' : 'letter', 'portrait')
          }

          // Full page bleed into target paper dimensions
          pdf.addImage(
            imgData,
            'JPEG',
            0,
            0,
            config.widthMm,
            config.heightMm,
            undefined,
            'FAST'
          )
        }
      }

      pdf.save(fileName)
    } catch (error) {
      console.error('Failed to export PDF:', error)
      alert('Could not export PDF. Please check that document pages are rendered properly.')
    } finally {
      setIsExporting(false)
    }
  }

  return { exportPDF, isExporting }
}

