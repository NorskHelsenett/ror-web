import { string, z } from 'zod'
import { createV2ResourceResponseSchema, V2ResourceSchema } from './common'

// -------------------------
// Machine-spec sub-schemas
// -------------------------

export const MachineCPU = z.object({
  cores: z.number().nullable().optional(),
  threadsPerCore: z.number().nullable().optional(),
  sockets: z.number().nullable().optional(),
})

export const MachineSpecDisk = z.object({
  name: z.string().nullable().optional(),
  sizeGB: z.number().nullable().optional(),
  type: z.string().nullable().optional(),
  boot: z.boolean().nullable().optional(),
  device: z.string().nullable().optional(),
  encrypted: z.boolean().nullable().optional(),
  iops: z.number().nullable().optional(),
  throughput: z.number().nullable().optional(),
})

export const NetworkInterface = z.object({
  name: z.string().nullable().optional(),
  subnet: z.string().nullable().optional(),
  securityGroups: z.array(z.string()).nullable().optional(),
  primary: z.boolean().nullable().optional(),
})

export const MachineNetwork = z.object({
  networkNameSpaceName: z.string().nullable().optional(),
  vpc: z.string().nullable().optional(),
  subnet: z.string().nullable().optional(),
  assignPublicIP: z.boolean().nullable().optional(),
  privateIP: z.string().nullable().optional(),
  publicIP: z.string().nullable().optional(),
  interfaces: z.array(NetworkInterface).nullable().optional(),
})

export const MachineOS = z.object({
  family: z.string().nullable().optional(),
  distribution: z.string().nullable().optional(),
  version: z.string().nullable().optional(),
  architecture: z.string().nullable().optional(),
  imageID: z.string().nullable().optional(),
  isoUri: z.string().nullable().optional(),
  imageFamily: z.string().nullable().optional(),
})

export const CredentialsReference = z.object({
  secretName: z.string().nullable().optional(),
  namespace: z.string().nullable().optional(),
})

export const CloudProviderConfig = z.object({
  name: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  zone: z.string().nullable().optional(),
  config: z.record(z.string(), z.string().nullable().optional()).nullable().optional(),
  credentialsRef: CredentialsReference.nullable().optional(),
})

export const MachineBackup = z.object({
  enabled: z.boolean().nullable().optional(),
  schedule: z.string().nullable().optional(),
  retentionDays: z.number().nullable().optional(),
})

export const CloudInitSecretRef = z.object({
  name: z.string().nullable().optional(),
  key: z.string().nullable().optional(),
})

export const CloudInitMapRef = z.object({
  name: z.string().nullable().optional(),
  key: z.string().nullable().optional(),
})

export const CloudInitConfig = z.object({
  type: string().nullable().optional(),
  userData: string().nullable().optional(),
  userDataBase64: string().nullable().optional(),
  networkData: string().nullable().optional(),
  networkDataBase64: string().nullable().optional(),
  userDataSecretRef: CloudInitSecretRef.nullable().optional(),
  networkDataSecretRef: CloudInitSecretRef.nullable().optional(),
  userDataConfigMapRef: CloudInitMapRef.nullable().optional(),
  networkDataConfigMapRef: CloudInitMapRef.nullable().optional(),
})

// -------------------------
// Machine-status sub-schemas
// -------------------------

export const Time = z.object({})

export const MachineStatusDisk = z.object({
  name: string().nullable().optional(),
  size: z.number().nullable().optional(),
  type: string().nullable().optional(),
  mountPoint: string().nullable().optional(),
  pvcName: string().nullable().optional(),
  volumeMode: string().nullable().optional(),
  accessModes: z.array(string().nullable().optional()).nullable().optional(),
  filesystemType: string().nullable().optional(),
  uuid: string().nullable().optional(),
  label: string().nullable().optional(),
  serialNumber: string().nullable().optional(),
  device: string().nullable().optional(),
  usedBytes: z.number().nullable().optional(),
  availableBytes: z.number().nullable().optional(),
  usagePercent: z.string().nullable().optional(),
})

export const NetworkInterfaceStatus = z.object({
  name: string().nullable().optional(),
  macAddress: string().nullable().optional(),
  ipAddresses: z.array(string().nullable().optional()).nullable().optional(),
  ipv6Addresses: z.array(string().nullable().optional()).nullable().optional(),
  state: string().nullable().optional(),
  mtu: z.number().nullable().optional(),
  type: string().nullable().optional(),
})

export const MachineCondition = z.object({
  type: string().nullable().optional(),
  status: string().nullable().optional(),
  lastTransitionTime: Time.nullable().optional(),
  reason: string().nullable().optional(),
  message: string().nullable().optional(),
})

// -------------------------
// Sub-schemas
// -------------------------

export const MachineSpec = z.object({
  name: z.string().nullable().optional(),
  machineClass: z.string().nullable().optional(),
  machineType: z.string().nullable().optional(),
  cpu: MachineCPU.nullable().optional(),
  memory: z.number().nullable().optional(),
  disks: z.array(MachineSpecDisk).nullable().optional(),
  network: MachineNetwork.nullable().optional(),
  os: MachineOS.nullable().optional(),
  provider: z.string().nullable().optional(),
  providerConfig: CloudProviderConfig.nullable().optional(),
  sshKeys: z.array(z.string()).nullable().optional(),
  userData: z.string().nullable().optional(),
  tags: z.record(z.string(), z.string().nullable().optional()).nullable().optional(),
  securityGroups: z.array(z.string()).nullable().optional(),
  monitoring: z.boolean().nullable().optional(),
  backup: MachineBackup.nullable().optional(),
  cloudInit: CloudInitConfig.nullable().optional(),
})

export const MachineStatus = z.object({
  phase: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  providerID: z.string().nullable().optional(),
  machineID: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  lastUpdated: Time.nullable().optional(),
  provider: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  zone: z.string().nullable().optional(),
  ipAddresses: z.array(z.string()).nullable().optional(),
  ipv6Addresses: z.array(z.string()).nullable().optional(),
  publicIPAddresses: z.array(z.string()).nullable().optional(),
  privateIPAddresses: z.array(z.string()).nullable().optional(),
  hostname: z.string().nullable().optional(),
  architecture: z.string().nullable().optional(),
  operatingSystem: z.string().nullable().optional(),
  operatingSystemVersion: z.string().nullable().optional(),
  kernelVersion: z.string().nullable().optional(),
  cpus: z.number().nullable().optional(),
  memory: z.number().nullable().optional(),
  disks: z.array(MachineStatusDisk).nullable().optional(),
  networkInterfaces: z.array(NetworkInterfaceStatus).nullable().optional(),
  conditions: z.array(MachineCondition).nullable().optional(),
  bootTime: Time.nullable().optional(),
  creationTime: Time.nullable().optional(),
  failureReason: z.string().nullable().optional(),
  failureMessage: z.string().nullable().optional(),
})

// -------------------------
// Main schema
// -------------------------

export const ResourceMachine = V2ResourceSchema.extend({
  machine: z
    .object({
      spec: MachineSpec.nullable().optional(),
      status: MachineStatus.nullable().optional(),
    })
    .nullable()
    .optional(),
})

export const ResourceMachineResponseSchema = createV2ResourceResponseSchema(ResourceMachine)
