# DocCraft — Modular Freelance Document Studio

Built with **React + Vite + TypeScript + Tailwind CSS + Zustand**, strictly adhering to the **Linear Design System (`design.md`)**.

---

## 🎨 Design System Implementation (`design.md`)
- **Canvas:** `#010102` (deepest dark canvas with faint blue cast)
- **Surfaces:** Four-step surface ladder (`#0f1011`, `#141516`, `#18191a`, `#191a1b`)
- **Hairlines:** Single hairline borders (`#23252a`, `#34343a`, `#3e3e44`)
- **Primary Chromatic Accent:** Linear lavender-blue (`#5e6ad2`, hover `#828fff`, focus `#5e69d1`)
- **Typography:** Inter / SF Pro with measured negative tracking (`display-xl` -3.0px down to `body` -0.05px)
- **Paper Standard:** Real A4 (`210 × 297 mm`) and US Letter (`8.5 × 11 in`), 20-25mm margins, 1.5 line height, realistic paper drop shadows.

---

## 📁 Project Architecture (Microservices & Modular Features)

```text
/src
  /components
    /layout
      ├── Sidebar.tsx          # Nav: Document Generator (active), Leads/Projects/Assets (Soon)
      └── Header.tsx           # Doc Switcher tabs, Paper size toggle (A4/Letter), PDF/DOCX Export
    /ui                        # Shadcn/Linear style components
      ├── Button.tsx           # Primary, secondary, tertiary, inverse, ghost, danger
      ├── Card.tsx             # Surface-1 card panels with hairline borders
      ├── Input.tsx            # Text input & Textarea with Linear focus states
      ├── Tabs.tsx             # Linear pricing-tab style pill switcher
      ├── Badge.tsx            # Semantic status badges
      └── Modal.tsx            # Accessible modal dialog with backdrop
  /features
    /my-profile                # Profile & brand asset management
      ├── MyProfileForm.tsx    # Logo upload, signature upload, name, brand, payment details
      └── useMyProfileStore.ts # Persistent Zustand store with localStorage sync
    /client-input
      └── ClientBaseForm.tsx   # Shared client metadata (Client, Brand, IG, Package, Price)
    /documents
      ├── DocumentPreviewContainer.tsx  # Stage with Zoom, Pagination, Single vs All Pages view
      ├── /proposal
      │   ├── ProposalInputs.tsx        # Pain point, solution, scope checklist, timeline, portfolio
      │   ├── proposalTemplate.ts       # Model transformation & calculation
      │   └── ProposalPreview.tsx       # 2-Page real paper layout with milestones & sign-off
      ├── /invoice
      │   ├── InvoiceInputs.tsx         # Auto INV-..., dates, DP %, tax %, itemized rows
      │   ├── invoiceTemplate.ts        # Financial totals & balance calculation
      │   └── InvoicePreview.tsx        # High-precision invoice paper layout with wire info
      ├── /agreement
      │   ├── AgreementInputs.tsx       # Dates, revisions, terms, warranty, late fees, IP
      │   ├── agreementTemplate.ts      # Contract model builder
      │   └── AgreementPreview.tsx      # Formal Master Services Agreement with dual signatures
      └── /welcome
          ├── WelcomeInputs.tsx         # Onboarding link, kickoff date, tone selector, assets
          ├── welcomeTemplate.ts        # Tone mappings (Professional, Friendly, Direct)
          └── WelcomePreview.tsx        # Client kickoff guide & onboarding packet
    /export
      ├── useExportPDF.ts      # Microservice: High-res multi-page jsPDF + html2canvas export
      ├── useExportDOCX.ts     # Microservice: docx package export with A4 section properties
      └── pagination.ts        # Paper dimension calculators & page estimation
  /lib
    ├── paper.ts               # A4/Letter constants, physical dimensions, mm-to-pt ratios
    ├── store.ts               # Global Zustand application state
    └── utils.ts               # cn class merge & currency/date formatters
```

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```

