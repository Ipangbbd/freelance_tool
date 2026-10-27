import { ClientData, WelcomeData, WelcomeTone } from '@/lib/store'
import { MyProfileState } from '@/features/my-profile/useMyProfileStore'

export interface WelcomeModel {
  client: ClientData
  welcome: WelcomeData
  freelancer: {
    name: string
    brand: string
    email: string
    phone: string
    website: string
    logo: string
  }
}

export function buildWelcomeModel(
  client: ClientData,
  welcome: WelcomeData,
  profile: MyProfileState
): WelcomeModel {
  return {
    client,
    welcome,
    freelancer: {
      name: profile.myFullName,
      brand: profile.myBrandName,
      email: profile.email,
      phone: profile.phone,
      website: profile.website,
      logo: profile.logoBase64,
    },
  }
}

export const TONE_MAPPINGS: Record<
  WelcomeTone,
  { label: string; greeting: string; closing: string }
> = {
  professional: {
    label: 'Corporate Professional',
    greeting: 'Dear',
    closing: 'Sincerely & with best regards,',
  },
  friendly: {
    label: 'Warm & Collaborative',
    greeting: 'Hey there',
    closing: 'Excited to build something incredible together!',
  },
  direct: {
    label: 'Modern Direct (Linear Style)',
    greeting: 'Hi',
    closing: 'Best,',
  },
}

