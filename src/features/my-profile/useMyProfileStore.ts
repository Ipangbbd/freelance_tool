import { create } from 'zustand'

export interface MyProfileState {
  myFullName: string
  myBrandName: string
  email: string
  phone: string
  website: string
  address: string
  logoBase64: string
  signatureBase64: string
  defaultPaymentInfo: string
  setProfile: (data: Partial<MyProfileState>) => void
  resetToDefaults: () => void
}

const DEFAULT_PROFILE = {
  myFullName: 'Alex Rivera',
  myBrandName: 'Studio Rivera Design & Dev',
  email: 'alex@studiorivera.design',
  phone: '+1 (555) 234-5678',
  website: 'https://studiorivera.design',
  address: 'San Francisco, CA 94107',
  logoBase64: '',
  signatureBase64: '',
  defaultPaymentInfo: 'Bank Transfer / ACH: Chase Bank\nRouting: 021000021\nAccount: 88392019482\nWise / PayPal: alex@studiorivera.design',
}

const STORAGE_KEY = 'buildsure_freelance_my_profile'

function loadInitialProfile(): typeof DEFAULT_PROFILE {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(saved) }
    }
  } catch (e) {
    console.error('Failed to parse saved profile:', e)
  }
  return DEFAULT_PROFILE
}

export const useMyProfileStore = create<MyProfileState>((set) => ({
  ...loadInitialProfile(),
  setProfile: (data) =>
    set((state) => {
      const updated = { ...state, ...data }
      try {
        const toSave = {
          myFullName: updated.myFullName,
          myBrandName: updated.myBrandName,
          email: updated.email,
          phone: updated.phone,
          website: updated.website,
          address: updated.address,
          logoBase64: updated.logoBase64,
          signatureBase64: updated.signatureBase64,
          defaultPaymentInfo: updated.defaultPaymentInfo,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
      } catch (err) {
        console.warn('Storage save failed:', err)
      }
      return updated
    }),
  resetToDefaults: () => {
    localStorage.removeItem(STORAGE_KEY)
    set(DEFAULT_PROFILE)
  },
}))

