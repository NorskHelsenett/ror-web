import { z } from 'zod'
import { createV2ResourceResponseSchema, V2ResourceSchema } from './common'
// -------------------------
// Sub-schemas
// -------------------------

export const BackupJobScheduleRetention = z.object({
  duration: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
})

export const BackupJobScheduleDestination = z.object({
  name: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
})

export const BackupJobSchedules = z.object({
  startTime: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
  frequency: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
  retention: BackupJobScheduleRetention.nullable().optional(),
  destination: BackupJobScheduleDestination.nullable().optional(),
})

export const BackupJobActiveTargetSource = z.object({
  name: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  uuid: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
})

export const BackupJobActiveTargets = z.object({
  name: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  externalId: z.string().nullable().optional(),
  source: BackupJobActiveTargetSource.nullable().optional(),
})

export const BackupJobStatusSpec = z.object({
  name: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  policyId: z.string().nullable().optional(),
  schedules: z.array(BackupJobSchedules).nullable().optional(),
  activeTargets: z.array(BackupJobActiveTargets).nullable().optional(),
  indirectBackupTargets: z.array(z.string()).nullable().optional(),
})

export const BackupJobRunIds = z.object({
  backupRunIds: z.array(z.string()).nullable().optional(),
})

export const BackupJobStatus = z.object({
  resourceBackupJobSpec: BackupJobStatusSpec.nullable().optional(),
  location: z.string().nullable().optional(),
  policyName: z.string().nullable().optional(),
  backupRunIds: z.array(z.string()).nullable().optional(),
})

// -------------------------
// Main schema
// -------------------------

export const BackupJobSchema = V2ResourceSchema.extend({
  backupjob: z
    .object({
      id: z.string().nullable().optional(),
      provider: z.string().nullable().optional(),
      source: z.string().nullable().optional(),
      status: BackupJobStatus.nullable().optional(),
      spec: BackupJobStatusSpec.nullable().optional(),
    })
    .nullable()
    .optional(),
})

export const BackupJobResponseSchema = createV2ResourceResponseSchema(BackupJobSchema)
