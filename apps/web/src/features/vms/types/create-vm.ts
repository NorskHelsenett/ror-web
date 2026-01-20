export interface CreateVmForm {
  name: string
  project: string
  workspace: string
  provider: string
  region: string
  datacenter: string
  serviceId: string
  size: string
  image: string
  extensions: Record<string, string>
  securityBaseline: Record<string, string>
  osConfig: Record<string, string>
  tags: Record<string, string>
}

export type Datacenter = '' | 'trd1' | 'trd2' | 'trd3' | 'osl1' | 'osl2' | 'tromsø1' | 'bergen1'
export type Image = '' | 'rhel9_64Guest' | 'windows9Server64Guest' | 'vmwarePhoton64Guest' //to be continued
export type Extensions = '' | 'cortex' | 'uCMDB' | 'SCOM' | 'Chocolatey'
