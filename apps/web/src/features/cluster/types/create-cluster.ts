export interface CreateClusterForm {
  name: string
  project: string
  environment: string
  cp: number
  wpName: string
  wpNumber: number
  wpClass: string
  network: string
  tags: { key: string; value: string }[]
  tempProvider: Provider
  tempRegion: Region
  provider: Provider
  region: Region
}

export type Provider = '' | 'talos' | 'tanzu' | 'azure'
export type Region = '' | 'north' | 'east' | 'west' | 'central' | 'south'

export interface Option {
  provider: Provider
  region: Region
  valid: boolean
}

export interface ChooseButtonProps {
  provider: Provider
  region: Region
}

export interface FormSectionProps {
  title: string
  error?: string
  children: React.ReactNode
  className?: string
}
