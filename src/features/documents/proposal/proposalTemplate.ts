import { ClientData, ProposalData } from '@/lib/store'
import { MyProfileState } from '@/features/my-profile/useMyProfileStore'

export interface ProposalModel {
  date: string
  proposalId: string
  freelancer: {
    name: string
    brand: string
    email: string
    phone: string
    website: string
    logo: string
  }
  client: ClientData
  proposal: ProposalData
}

export function buildProposalModel(
  client: ClientData,
  proposal: ProposalData,
  profile: MyProfileState
): ProposalModel {
  return {
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    proposalId: `PROP-${new Date().getFullYear()}-${client.brandName.substring(0, 3).toUpperCase() || 'CLI'}`,
    freelancer: {
      name: profile.myFullName,
      brand: profile.myBrandName,
      email: profile.email,
      phone: profile.phone,
      website: profile.website,
      logo: profile.logoBase64,
    },
    client,
    proposal,
  }
}

