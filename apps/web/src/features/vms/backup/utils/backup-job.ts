import { Params } from '@/types/resources-page'
import type { BackupJob, BackupRun } from '@ror/js-api-client'

export interface ActiveTargetSource {
  name?: string
  id?: string
  uuid?: string
  type?: string
}

export interface BackupActiveTarget {
  name?: string
  id?: string
  externalId?: string
  source: ActiveTargetSource | null
}

export interface PageViewProps {
  className?: string
  backupJobs: BackupJob[]
  backupRuns?: BackupRun[]
  params: Params
}

export const getBackupJobActiveTargets = (backupJob: BackupJob): BackupActiveTarget[] => {
  const activeTargets = backupJob?.backupjob?.status?.resourceBackupJobSpec?.activeTargets ?? []
  return activeTargets.map((target) => ({
    name: target?.name ?? '',
    id: target?.id ?? '',
    externalId: target?.externalId ?? '',
    source: {
      name: target?.source?.name ?? '',
      id: target?.source?.id ?? '',
      uuid: target?.source?.uuid ?? '',
      type: target?.source?.type ?? '',
    },
  }))
}

export const getBackupJobExternalId = (backupActiveTarget: BackupActiveTarget) => {
  return backupActiveTarget?.externalId ?? 'No backupJob External ID'
}

export const getLastBackupRun = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.status?.backupRunIds?.[0] ?? null
}

export const getBackupJobStartTime = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.status?.resourceBackupJobSpec?.schedules?.[0]?.startTime ?? 'No start time'
}

export const getBackupJobRetentionDuration = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.status?.resourceBackupJobSpec?.schedules?.[0]?.retention?.duration ?? 'No retention time'
}

export const getBackupJobRetentionUnit = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.status?.resourceBackupJobSpec?.schedules?.[0]?.retention?.unit ?? 'No retention unit'
}

export const getBackupJobAllRetentions = (backupJob: BackupJob) => {
  const schedules = backupJob?.backupjob?.status?.resourceBackupJobSpec?.schedules ?? []
  return schedules.map((schedule, index) => ({
    scheduleIndex: index,
    duration: schedule?.retention?.duration ?? 'No duration',
    unit: schedule?.retention?.unit ?? 'No unit',
    destination: schedule?.destination?.name ?? 'Unknown destination',
  }))
}

export const getBackupJobRetentionDisplay = (backupJob: BackupJob) => {
  const retentions = getBackupJobAllRetentions(backupJob)
  if (retentions.length === 0) return 'No retention configured'

  return retentions.map((ret) => `${ret.duration} ${ret.unit} (${ret.destination})`).join(', ')
}

export const getBackupJobAllRunIds = (backupJob: BackupJob): string[] => {
  return backupJob?.backupjob?.status?.backupRunIds ?? []
}

export const getBackupJobId = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.id ?? 'No backupJob ID'
}

export const getBackupJobKey = (backupJob: BackupJob[] = []) =>
  Array.isArray(backupJob) ? backupJob.map(getBackupJobId).join('|') : ''

export const getBackupJobLocation = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.status?.location ?? 'No location'
}

export const getBackupJobSource = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.source ?? 'No source'
}

export const getBackupJobSchedules = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.status?.resourceBackupJobSpec?.schedules ?? []
}

export const getBackupJobActiveTargetsColumns = (backupJob: BackupJob) => {
  return backupJob?.backupjob?.status?.resourceBackupJobSpec?.activeTargets ?? []
}
