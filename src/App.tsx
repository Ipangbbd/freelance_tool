import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { ClientBaseForm } from '@/features/client-input/ClientBaseForm'
import { ProposalInputs } from '@/features/documents/proposal/ProposalInputs'
import { InvoiceInputs } from '@/features/documents/invoice/InvoiceInputs'
import { AgreementInputs } from '@/features/documents/agreement/AgreementInputs'
import { WelcomeInputs } from '@/features/documents/welcome/WelcomeInputs'
import { DocumentPreviewContainer } from '@/features/documents/DocumentPreviewContainer'
import { Modal } from '@/components/ui/Modal'
import { MyProfileForm } from '@/features/my-profile/MyProfileForm'
import { useAppStore } from '@/lib/store'
import { Sparkles, Layers, SlidersHorizontal } from 'lucide-react'

export function App() {
  const { documentType, isProfileModalOpen, setIsProfileModalOpen, activeSidebarItem } = useAppStore()

  const renderContextualInputs = () => {
    switch (documentType) {
      case 'proposal':
        return <ProposalInputs />
      case 'invoice':
        return <InvoiceInputs />
      case 'agreement':
        return <AgreementInputs />
      case 'welcome':
        return <WelcomeInputs />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-ink">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Top Header */}
        <Header />

        {/* Workspace Body: Split Left Form / Right Real-Paper Preview */}
        {activeSidebarItem === 'doc-generator' ? (
          <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* Left Column: Contextual Dynamic Input Forms */}
            <div className="w-full lg:w-[480px] xl:w-[520px] 2xl:w-[560px] border-r border-hairline bg-surface-1/40 flex flex-col h-full shrink-0">
              {/* Form Header info */}
              <div className="px-5 py-3 border-b border-hairline/70 bg-surface-1/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-ink uppercase tracking-wider font-mono">
                    Dynamic Document Engine
                  </span>
                </div>
                <span className="text-[11px] text-ink-subtle">
                  Inputs adapt to active tab
                </span>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* 1. Shared Client Inputs (Always visible at top) */}
                <ClientBaseForm />

                {/* 2. Document Specific Inputs (Dynamically swapped based on documentType) */}
                <div className="transition-all duration-200">
                  {renderContextualInputs()}
                </div>
              </div>
            </div>

            {/* Right Column: Real Paper Standard Preview & Controls */}
            <DocumentPreviewContainer />
          </main>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-ink-subtle">
            <div className="max-w-md space-y-3">
              <Layers className="w-10 h-10 text-primary mx-auto opacity-80" />
              <h2 className="text-lg font-semibold text-ink">Workspace Coming Soon</h2>
              <p className="text-xs text-ink-subtle">
                The {activeSidebarItem} module is currently scheduled for the next release milestone.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Freelancer Profile Configuration Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="My Freelance Profile & Brand Assets"
        description="Configure your personal brand, digital logo, signature, and default payment remittance details."
        maxWidth="lg"
      >
        <MyProfileForm onSaved={() => setIsProfileModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default App

