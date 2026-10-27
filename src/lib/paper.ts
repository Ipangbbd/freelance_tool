export type PaperSize = 'A4' | 'Letter'

export interface PaperConfig {
  name: PaperSize
  widthMm: number
  heightMm: number
  widthInches: number
  heightInches: number
  widthPt: number
  heightPt: number
  marginMm: number
  marginPt: number
  aspectRatio: number
}

// 1 inch = 25.4 mm
// 1 pt = 1/72 inch = 0.352778 mm
export const PAPER_CONFIGS: Record<PaperSize, PaperConfig> = {
  A4: {
    name: 'A4',
    widthMm: 210,
    heightMm: 297,
    widthInches: 8.27,
    heightInches: 11.69,
    widthPt: 595.28,
    heightPt: 841.89,
    marginMm: 20,
    marginPt: 56.69,
    aspectRatio: 210 / 297, // ~0.707
  },
  Letter: {
    name: 'Letter',
    widthMm: 215.9,
    heightMm: 279.4,
    widthInches: 8.5,
    heightInches: 11.0,
    widthPt: 612,
    heightPt: 792,
    marginMm: 20,
    marginPt: 56.69,
    aspectRatio: 8.5 / 11, // ~0.7727
  },
}

export const PAPER_TYPOGRAPHY = {
  lineHeight: 1.5,
  paragraphSpacingPt: 12,
  bodyFontSizePt: 11,
  captionFontSizePt: 9,
  titleFontSizePt: 20,
  headingFontSizePt: 14,
  subheadingFontSizePt: 12,
}

