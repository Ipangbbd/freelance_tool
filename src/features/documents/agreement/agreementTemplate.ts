import { ClientData, AgreementData } from '@/lib/store'
import { MyProfileState } from '@/features/my-profile/useMyProfileStore'

export interface AgreementModel {
  agreementDate: string
  client: ClientData
  agreement: AgreementData
  freelancer: {
    name: string
    brand: string
    email: string
    phone: string
    address: string
    signature: string
  }
}

export function buildAgreementModel(
  client: ClientData,
  agreement: AgreementData,
  profile: MyProfileState
): AgreementModel {
  return {
    agreementDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    client,
    agreement,
    freelancer: {
      name: profile.myFullName,
      brand: profile.myBrandName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      signature: profile.signatureBase64,
    },
  }
}

