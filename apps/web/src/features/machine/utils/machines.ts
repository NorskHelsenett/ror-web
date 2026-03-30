// --------------------------------------------------------------------------
// MachineStatus

export interface MachineSpec {
  name?: string
  machineClass?: string
  machineType?: string
  cpu?: MachineCPU
  memory?: number
  disks?: MachineSpecDisk[]
  network?: MachineNetwork
  os?: MachineOS
  provider?: string
  providerConfig?: CloudProviderConfig
  sshKeys?: string[]
  userData?: string
  tags?: { [key: string]: string }
  securityGroups?: string[]
  monitoring?: boolean
  backup?: MachineBackup
  cloudInit?: CloudInitConfig
}

export interface MachineCPU {
  cores?: number
  threadsPerCore?: number
  sockets?: number
}

export interface MachineSpecDisk {
  name?: string
  sizeGB?: number
  type?: string
  boot?: boolean
  device?: string
  encrypted?: boolean
  iops?: number
  throughput?: number
}
export interface NetworkInterface {
  name?: string
  subnet?: string
  securityGroups?: string[]
  primary?: boolean
}

export interface MachineNetwork {
  networkNamespaceName?: string
  vpc?: string
  subnet?: string
  assignPublicIP?: boolean
  privateIP?: string
  publicIP?: string
  interfaces?: NetworkInterface[]
}
export interface CloudInitConfigMapRef {
  name: string
  key?: string
}
export interface CloudInitSecretRef {
  name: string
  key?: string
}
export interface CloudInitConfig {
  type?: string
  userData?: string
  userDataBase64?: string
  networkData?: string
  networkDataBase64?: string
  userDataSecretRef?: CloudInitSecretRef
  networkDataSecretRef?: CloudInitSecretRef
  userDataConfigMapRef?: CloudInitConfigMapRef
  networkDataConfigMapRef?: CloudInitConfigMapRef
}
export interface MachineBackup {
  enabled?: boolean
  schedule?: string
  retentionDays?: number
}
export interface CredentialsReference {
  secretName?: string
  namespace?: string
}
export interface CloudProviderConfig {
  name?: string
  region?: string
  zone?: string
  config?: { [key: string]: string }
  credentialsRef?: CredentialsReference
}
export interface MachineOS {
  family?: string
  distribution?: string
  version?: string
  architecture?: string
  imageID?: string
  isoUri?: string
  imageFamily?: string
}

// --------------------------------------------------------------------------
// MachineStatus

export interface Time {}

export interface MachineCondition {
  type?: string
  status?: string
  lastTransitionTime?: Time
  reason?: string
  message?: string
}

export interface NetworkInterfaceStatus {
  name?: string
  macAddress?: string
  ipAddresses?: string[]
  ipv6Addresses?: string[]
  state?: string
  mtu?: number
  type?: string
}
export interface MachineStatusDisk {
  name?: string
  size?: number
  type?: string
  mountPoint?: string
  pvcName?: string
  volumeMode?: string
  accessModes?: string[]
  filesystemType?: string
  uuid?: string
  label?: string
  serialNumber?: string
  device?: string
  usedBytes?: number
  availableBytes?: number
  usagePercent?: string
}
export interface MachineStatus {
  phase?: string
  message?: string
  providerID?: string
  machineID?: string
  state?: string
  lastUpdated?: Time
  provider?: string
  region?: string
  zone?: string
  ipAddresses?: string[]
  ipv6Addresses?: string[]
  publicIPAddresses?: string[]
  privateIPAddresses?: string[]
  hostname?: string
  architecture?: string
  operatingSystem?: string
  operatingSystemVersion?: string
  kernelVersion?: string
  cpus?: number
  memory?: number
  disks?: MachineStatusDisk[]
  networkInterfaces?: NetworkInterfaceStatus[]
  conditions?: MachineCondition[]
  bootTime?: Time
  creationTime?: Time
  failureReason?: string
  failureMessage?: string
}
