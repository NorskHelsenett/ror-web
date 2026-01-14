import { Datacenter, Image, Extensions } from '../types/create-vm'

export const datacenters: { key: Datacenter; display: string }[] = [
  { key: 'trd1', display: 'TRD1' },
  { key: 'trd2', display: 'TRD2' },
  { key: 'trd3', display: 'TRD3' },
  { key: 'osl1', display: 'OSL1' },
  { key: 'osl2', display: 'OSL2' },
]

export const images: { key: Image; display: string }[] = [
  { key: 'rhel9_64Guest', display: 'rhel9_64Guest' },
  { key: 'windows9Server64Guest', display: 'windows9Server64Guest' },
  { key: 'vmwarePhoton64Guest', display: 'vmwarePhoton64Guest' },
]

export const extensions: { key: Extensions; display: string }[] = [
  { key: 'cortex', display: 'cortex' },
  { key: 'uCMDB', display: 'uCMDB' },
  { key: 'SCOM', display: 'SCOM' },
  { key: 'Chocolatey', display: 'Chocolatey' },
]
