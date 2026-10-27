import { create } from 'zustand'
import { PaperSize } from './paper'

export type DocumentType = 'proposal' | 'invoice' | 'agreement' | 'welcome'

export interface ClientData {
  clientName: string
  brandName: string
  instagramHandle: string
  packageName: string
  packagePrice: number
}

export interface ProposalFeature {
  id: string
  name: string
  checked: boolean
}

export interface ProposalData {
  clientPainPoint: string
  solution: string
  features: ProposalFeature[]
  includeTimeline: boolean
  timelineWeeks: number
  portfolioLink: string
  deliverables: string
  nextSteps: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  taxPercentage: number
  dpPercentage: number
  paymentInfo: string
  notes: string
  items: InvoiceItem[]
}

export interface AgreementData {
  startDate: string
  endDate: string
  revisionLimit: number
  paymentTerms: string
  warrantyDays: number
  lateFeePolicy: string
  scopeOfWork: string
  ipOwnership: string
  cancellationPolicy: string
}

export type WelcomeTone = 'professional' | 'friendly' | 'direct'

export interface WelcomeData {
  onboardingLink: string
  kickoffDate: string
  tone: WelcomeTone
  communicationChannels: string
  requiredAssets: string
  workingHours: string
  welcomeMessage: string
}

export interface AppState {
  // Navigation & Page State
  activeSidebarItem: 'doc-generator' | 'leads' | 'projects' | 'assets'
  documentType: DocumentType
  paperSize: PaperSize
  isProfileModalOpen: boolean

  // Preview Pagination & Zoom
  currentPage: number
  totalPages: number
  previewScale: number

  // Shared Client Base Data
  client: ClientData

  // Document Specific Data
  proposal: ProposalData
  invoice: InvoiceData
  agreement: AgreementData
  welcome: WelcomeData

  // Actions
  setActiveSidebarItem: (item: 'doc-generator' | 'leads' | 'projects' | 'assets') => void
  setDocumentType: (type: DocumentType) => void
  setPaperSize: (size: PaperSize) => void
  setIsProfileModalOpen: (open: boolean) => void
  setCurrentPage: (page: number) => void
  setTotalPages: (total: number) => void
  setPreviewScale: (scale: number) => void

  updateClient: (data: Partial<ClientData>) => void
  updateProposal: (data: Partial<ProposalData>) => void
  updateInvoice: (data: Partial<InvoiceData>) => void
  updateAgreement: (data: Partial<AgreementData>) => void
  updateWelcome: (data: Partial<WelcomeData>) => void
  resetAll: () => void
}

function getTodayString(): string {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

function getDueDateString(daysAhead: number = 14): string {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  return d.toISOString().split('T')[0]
}

function generateInvoiceNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `INV-${year}-${random}`
}

const DEFAULT_FEATURES: ProposalFeature[] = [
  { id: '1', name: 'Interactive Hero & Custom 3D/Motion Elements', checked: true },
  { id: '2', name: 'Curated Portfolio Gallery with Filtering', checked: true },
  { id: '3', name: 'High-Converting Lead Capture & Contact Form', checked: true },
  { id: '4', name: 'Full Responsive Layout (Mobile, Tablet, Desktop)', checked: true },
  { id: '5', name: 'Technical SEO Optimization & Meta Tags', checked: true },
  { id: '6', name: 'Headless CMS Integration (Sanity / Strapi)', checked: false },
  { id: '7', name: 'Analytics & Google Tag Manager Setup', checked: true },
]

export const useAppStore = create<AppState>((set) => ({
  activeSidebarItem: 'doc-generator',
  documentType: 'proposal',
  paperSize: 'A4',
  isProfileModalOpen: false,

  currentPage: 1,
  totalPages: 1,
  previewScale: 1.0,

  client: {
    clientName: 'Sophia Montgomery',
    brandName: 'Aura Lifestyle & Co.',
    instagramHandle: '@auralifestyle.co',
    packageName: 'Full Brand Identity & High-Performance Web Architecture',
    packagePrice: 4850,
  },

  proposal: {
    clientPainPoint:
      'Current digital storefront lacks brand cohesion, suffers from high bounce rates on mobile devices, and fails to communicate the premium tier of Aura\'s handcrafted products.',
    solution:
      'Architect a bespoke modern web experience built with high-fidelity visual storytelling, streamlined UX checkout flow, lightning-fast Core Web Vitals, and responsive micro-interactions.',
    features: DEFAULT_FEATURES,
    includeTimeline: true,
    timelineWeeks: 4,
    portfolioLink: 'https://studiorivera.design/work/aura-case-study',
    deliverables:
      '1. Complete UI/UX Figma Design System & Prototypes\n2. Production-ready React / Next.js Responsive Application\n3. Integrated Lead Capture & CRM Pipeline\n4. Cross-browser QA and PageSpeed 95+ Guarantee',
    nextSteps:
      '1. Approve this proposal & sign master service agreement\n2. Remit 50% initial commitment deposit\n3. Schedule our 60-minute strategy kickoff workshop',
  },

  invoice: {
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: getTodayString(),
    dueDate: getDueDateString(14),
    taxPercentage: 0,
    dpPercentage: 50,
    paymentInfo:
      'Bank Transfer / Wire: Chase Commercial Banking\nAccount: 88392019482 | Routing: 021000021\nSwift: CHASUS33\nReference: Mention Invoice # on wire description',
    notes: 'Thank you for your business! Payment is requested within 14 business days. Work kicks off upon deposit confirmation.',
    items: [
      {
        id: '1',
        description: 'Brand Discovery & Strategic Creative Direction',
        quantity: 1,
        unitPrice: 1250,
      },
      {
        id: '2',
        description: 'Bespoke UI/UX Interactive Design (Figma System)',
        quantity: 1,
        unitPrice: 1800,
      },
      {
        id: '3',
        description: 'Full-Stack Frontend Development & Core Web Vitals Optimization',
        quantity: 1,
        unitPrice: 1800,
      },
    ],
  },

  agreement: {
    startDate: getTodayString(),
    endDate: getDueDateString(35),
    revisionLimit: 3,
    paymentTerms: '50% initial non-refundable deposit upon contract execution, 50% final balance upon staging review prior to production launch.',
    warrantyDays: 30,
    lateFeePolicy: '5% recurring late assessment fee applied every 7 calendar days overdue on outstanding balances.',
    scopeOfWork:
      'Contractor agrees to deliver the designated design assets and web platform strictly conforming to approved specifications in the Proposal document. Additional requests outside this scope will be billed at an hourly rate of $120/hr upon mutual written consent.',
    ipOwnership:
      'Upon full receipt of all contractually due payments, Contractor transfers 100% intellectual property rights, code repositories, and design source files to Client.',
    cancellationPolicy:
      'Either party may terminate this agreement with 7 days written notice. In the event of early cancellation, Client is liable for completed milestones and prorated labor to date.',
  },

  welcome: {
    onboardingLink: 'https://studiorivera.design/onboarding/client-portal',
    kickoffDate: getDueDateString(3),
    tone: 'professional',
    communicationChannels: 'Slack Connect Channel: #project-aura-studio | Weekly Sync: Zoom (Tuesdays 10 AM PST)',
    requiredAssets: '• Vector Brand Logos (.SVG / .AI)\n• Photography / Media Assets in Google Drive\n• Copywriting doc or product inventory catalog\n• Domain registrar & hosting credentials',
    workingHours: 'Monday – Thursday: 9:00 AM – 5:00 PM PST (Friday dedicated to code freeze & deploy QA)',
    welcomeMessage:
      'We are genuinely thrilled to partner with Aura Lifestyle. Our shared mission is to transform your digital presence into an elite, high-converting masterpiece.',
  },

  setActiveSidebarItem: (item) => set({ activeSidebarItem: item }),
  setDocumentType: (type) => set({ documentType: type, currentPage: 1 }),
  setPaperSize: (size) => set({ paperSize: size }),
  setIsProfileModalOpen: (open) => set({ isProfileModalOpen: open }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setPreviewScale: (scale) => set({ previewScale: scale }),

  updateClient: (data) =>
    set((state) => ({
      client: { ...state.client, ...data },
    })),

  updateProposal: (data) =>
    set((state) => ({
      proposal: { ...state.proposal, ...data },
    })),

  updateInvoice: (data) =>
    set((state) => ({
      invoice: { ...state.invoice, ...data },
    })),

  updateAgreement: (data) =>
    set((state) => ({
      agreement: { ...state.agreement, ...data },
    })),

  updateWelcome: (data) =>
    set((state) => ({
      welcome: { ...state.welcome, ...data },
    })),

  resetAll: () =>
    set((state) => ({
      documentType: 'proposal',
      currentPage: 1,
      invoice: {
        ...state.invoice,
        invoiceNumber: generateInvoiceNumber(),
        invoiceDate: getTodayString(),
      },
    })),
}))

