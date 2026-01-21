import { z } from 'zod'
import { createV2ResourceResponseSchema, V2ResourceSchema } from './common'
// -------------------------
// Sub-schemas
// -------------------------

export const VirtualMachineCpuSpec = z.object({
  coresPerSocket: z.number().nullable().optional(),
  sockets: z.number().nullable().optional(),
})

export const VirtualMachineDiskSpec = z.object({
  id: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  sizeBytes: z.number().nullable().optional(),
  type: z.string().nullable().optional(),
})

export const VirtualMachineMemorySpec = z.object({
  sizeBytes: z.number().nullable().optional(),
})

export const VirtualMachineSpec = z.object({
  cpu: VirtualMachineCpuSpec.nullable().optional(),
  disks: z.array(VirtualMachineDiskSpec).nullable().optional(),
  memory: VirtualMachineMemorySpec.nullable().optional(),
  name: z.string().nullable().optional(),
})

// -------------------------
// Status sub-schemas
// -------------------------

export const VirtualMachineCpuStatus = z.object({
  coresPerSocket: z.number().nullable().optional(),
  sockets: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
  usage: z.number().nullable().optional(),
})

export const VirtualMachineDiskStatus = z.object({
  id: z.string().nullable().optional(),
  isMounted: z.boolean().nullable().optional(),
  name: z.string().nullable().optional(),
  sizeBytes: z.number().nullable().optional(),
  type: z.string().nullable().optional(),
  usageBytes: z.number().nullable().optional(),
})

export const VirtualMachineNetwork = z.object({
  dns: z.string().nullable().optional(),
  gateway: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  ipv4: z.string().nullable().optional(),
  ipv6: z.string().nullable().optional(),
  mac: z.string().nullable().optional(),
  mask: z.string().nullable().optional(),
})

export const VirtualMachineOperatingSystem = z.object({
  id: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  family: z.string().nullable().optional(),
  version: z.string().nullable().optional(),
  hostName: z.string().nullable().optional(),
  powerState: z.string().nullable().optional(),
  toolVersion: z.string().nullable().optional(),
  architecture: z.string().nullable().optional(),
})

export const VirtualMachineState = z.object({
  reason: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  time: z.string().nullable().optional(),
})

export const VirtualMachineTag = z.object({
  description: z.string().nullable().optional(),
  key: z.string().nullable().optional(),
  value: z.string().nullable().optional(),
})

// tags: dynamic object with arbitrary keys
export const VirtualMachineTags = z.record(z.string(), VirtualMachineTag).nullable().optional()

export const VirtualMachineMemoryStatus = z.object({
  sizeBytes: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
  usage: z.number().nullable().optional(),
})

export const VirtualMachineStatus = z.object({
  cpu: VirtualMachineCpuStatus.nullable().optional(),
  disks: z.array(VirtualMachineDiskStatus).nullable().optional(),
  lastUpdated: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  memory: VirtualMachineMemoryStatus.nullable().optional(),
  networks: z.array(VirtualMachineNetwork).nullable().optional(),
  operatingSystem: VirtualMachineOperatingSystem.nullable().optional(),
  state: VirtualMachineState.nullable().optional(),
  tags: VirtualMachineTags,
})

// -------------------------
// Top-level schema
// -------------------------

export const VirtualMachineType = V2ResourceSchema.extend({
  virtualmachine: z
    .object({
      externalId: z.string().nullable().optional(),
      provider: z.string().nullable().optional(),
      spec: VirtualMachineSpec.nullable().optional(),
      status: VirtualMachineStatus.nullable().optional(),
    })
    .nullable()
    .optional(),
})

export const VMResourceResponseSchema = createV2ResourceResponseSchema(VirtualMachineType)
export type VirtualMachineNetworks = z.infer<typeof VirtualMachineNetwork>
export type VirtualMachineDisks = z.infer<typeof VirtualMachineDiskStatus>
export type VirtualMachineTeam = z.infer<typeof VirtualMachineTag>
