import { z } from 'zod'
import { createV2ResourceResponseSchema, V2ResourceSchema } from './common'

const DatacenterLocationSchema = z.object({
  id: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
})

const DatacenterLegacySchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  location: DatacenterLocationSchema.nullable().optional(),
  apiEndpoint: z.string().nullable().optional(),
})

const WorkspaceSchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  datacenterId: z.string().nullable().optional(),
  datacenter: DatacenterLegacySchema.nullable().optional(),
})

const DatacenterSpecSchema = z.object({
  workspaces: z.array(WorkspaceSchema).nullable().optional(),
})

const DatacenterStatusSchema = z.object({
  workspaces: z.array(WorkspaceSchema).nullable().optional(),
  location: DatacenterLocationSchema.nullable().optional(),
  apiEndpoint: z.string().nullable().optional(),
})

export const DatacenterSchema = V2ResourceSchema.extend({
  datacenter: z
    .object({
      spec: DatacenterSpecSchema.nullable().optional(),
      status: DatacenterStatusSchema.nullable().optional(),
      legacy: DatacenterLegacySchema.nullable().optional(),
    })
    .nullable()
    .optional(),
})

export const DatacenterResponseSchema = createV2ResourceResponseSchema(DatacenterSchema)
