import { Datacenter, Image, Extensions } from '../types/create-vm'

export const datacenters: { key: Datacenter; display: string }[] = [
  { key: 'trd1', display: 'TRD1' },
  { key: 'trd2', display: 'TRD2' },
  { key: 'trd3', display: 'TRD3' },
  { key: 'osl1', display: 'OSL1' },
  { key: 'osl2', display: 'OSL2' },
]

export const sizes: { key: string; display: string }[] = [
  { key: 'small', display: 'Small' },
  { key: 'medium', display: 'Medium' },
  { key: 'large', display: 'Large' },
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

export const securityBaselines: { key: string; display: string }[] = [
  { key: 'deactivate-secure-protocols', display: 'Deactivate Secure Protocols' },
  { key: 'deactivate-winRM', display: 'Deactivate WinRM' },
  { key: 'activate-local-firewall', display: 'Activate Local Firewall' },
  { key: 'activate-audit-log', display: 'Activate Audit Log' },
  { key: 'secure-boot', display: 'Secure Boot (UEFI)' },
]

export const osConfigs: { key: string; display: string }[] = [{ key: 'install-vm-tools', display: 'Install VMw Tools' }]
