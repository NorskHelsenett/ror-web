import { z } from 'zod'
import { createV2ResourceResponseSchema, V2ResourceSchema } from './common'

// -------------------------
// Sub-schemas
// -------------------------

export const BackupRunTargetSource = z.object({
  name: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  uuid: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
})

export const BackupRunTargetSize = z.object({
  unit: z.string().nullable().optional(),
  sourceSize: z.number().nullable().optional(),
  logicalSize: z.number().nullable().optional(),
  physicalSize: z.number().nullable().optional(),
})

export const BackupRunTarget = z.object({
  name: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  externalId: z.string().nullable().optional(),
  source: BackupRunTargetSource.nullable().optional(),
  size: BackupRunTargetSize.nullable().optional(),
})

export const BackupRunDestination = z.object({
  name: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
})

export const BackupRunStorage = z.object({
  unit: z.string().nullable().optional(),
  sourceSize: z.number().nullable().optional(),
  logicalSize: z.number().nullable().optional(),
  physicalSize: z.number().nullable().optional(),
})

export const BackupRunStatus = z.object({
  id: z.string().nullable().optional(),
  backupJobId: z.string().nullable().optional(),
  backupTargets: z.array(BackupRunTarget).nullable().optional(),
  backupDestinations: z.array(BackupRunDestination).nullable().optional(),
  startTime: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
  expiryTime: z.string().nullable().optional(),
  backupStorage: BackupRunStorage.nullable().optional(),
})

export const BackupRunSpec = z.object({
  delete: z.boolean().nullable().optional(),
})

export const LastBackupRunInfo = z.object({
  startTime: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
  expiryTime: z.string().nullable().optional(),
})

// -------------------------
// Main schema
// -------------------------

export const BackupRunSchema = V2ResourceSchema.extend({
  backuprun: z
    .object({
      id: z.string().nullable().optional(),
      provider: z.string().nullable().optional(),
      source: z.string().nullable().optional(),
      status: BackupRunStatus.nullable().optional(),
      spec: BackupRunSpec.nullable().optional(),
    })
    .nullable()
    .optional(),
})

export const BackupRunResponseSchema = createV2ResourceResponseSchema(BackupRunSchema)
