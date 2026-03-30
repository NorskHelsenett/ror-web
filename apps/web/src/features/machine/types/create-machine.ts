import {
  MachineBackup,
  MachineCPU,
  MachineOS,
  CloudProviderConfig,
  CloudInitConfig,
  MachineSpecDisk,
} from '../utils/machines'

export interface CreateMachineForm {
  name: string
  machineClass: string
  machineType: string
  size: 'small' | 'medium' | 'large'
  tags?: { [key: string]: string }
  cpu?: MachineCPU
  memory?: number
  disks?: MachineSpecDisk[]
  network?: string
  os?: MachineOS
  provider?: string
  providerConfig?: CloudProviderConfig
  sshKeys?: string[]
  userData?: string
  securityGroups?: string[]
  monitoring?: boolean
  backup?: MachineBackup
  cloudInit?: CloudInitConfig
}
