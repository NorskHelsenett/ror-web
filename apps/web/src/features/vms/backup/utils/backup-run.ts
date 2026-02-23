import type { BackupRun, BackupJob } from '@ror/js-api-client'
import { BackupActiveTarget } from '@/features/vms/backup/utils/backup-job'
import { getLastBackupRun } from '@/features/vms/backup/utils/backup-job'
import { Params } from '@/types/resources-page'

export interface PageViewProps {
  className?: string
  backupRuns: BackupRun[]
  params: Params
  backupJobId?: string
  backupRunId?: string | null
}

export interface LastBackupInfo {
  startTime: string | null
  endTime: string | null
  expiryTime: string | null
}

export interface BackupRunInfo {
  id: string | null
  startTime: string | null
  endTime: string | null
  expiryTime: string | null
  size: {
    sourceSize: number | null
    logicalSize: number | null
    physicalSize: number | null
  } | null
  backupDestinations:
    | {
        name: string | null
        id: string | null
        type: string | null
        status: string | null
      }[]
    | null
}

export const getBackupRunId = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.id ?? 'No ID'
}

export const getBackupRunKey = (backupRun: BackupRun[] = []) =>
  Array.isArray(backupRun) ? backupRun.map(getBackupRunId).join('|') : ''

export const getBackupRunSource = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.source ?? 'No source'
}

export const getBackupRunActiveTargetsColumns = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.backupTargets ?? []
}

export const getBackupRunStartTime = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.startTime ?? 'No start time'
}

export const getBackupRunEndTime = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.endTime ?? 'No end time'
}

export const getBackupRunExpiryTime = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.expiryTime ?? 'No expiry time'
}

export const getBackupRunMappedBackupJobId = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.backupJobId ?? 'No mapped BackupJob ID'
}

export const getBackupRunSourceSize = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.backupStorage?.sourceSize ?? null
}

export const getBackupRunLogicalSize = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.backupStorage?.logicalSize ?? null
}

export const getBackupRunPhysicalSize = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.backupStorage?.physicalSize ?? null
}

export const getBackupRunSizeUnit = (backupRun: BackupRun) => {
  return backupRun?.backuprun?.status?.backupStorage?.unit ?? null
}

export const getBackupRunActiveTargets = (backupRun: BackupRun): BackupActiveTarget[] => {
  const activeTargets = backupRun?.backuprun?.status?.backupTargets ?? []
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

// export const getBackupRunExternalId = (backupActiveTarget: BackupActiveTarget) => {
//   return backupActiveTarget?.externalId ?? 'No backupRun External ID'
// }

export const getBackupRunInfo = (backupRun: BackupRun) => {
  const storage = backupRun?.backuprun?.status?.backupStorage
  const destinations = backupRun?.backuprun?.status?.backupDestinations ?? []

  return {
    id: backupRun?.backuprun?.id ?? null,
    startTime: backupRun?.backuprun?.status?.startTime ?? null,
    endTime: backupRun?.backuprun?.status?.endTime ?? null,
    expiryTime: backupRun?.backuprun?.status?.expiryTime ?? null,
    size: storage
      ? {
          sourceSize: storage.sourceSize ?? null,
          logicalSize: storage.logicalSize ?? null,
          physicalSize: storage.physicalSize ?? null,
        }
      : null,
    backupDestinations:
      destinations.length > 0
        ? destinations.map((dest) => ({
            name: dest?.name ?? null,
            id: dest?.id ?? null,
            type: dest?.type ?? null,
            status: dest?.status ?? null,
          }))
        : null,
  }
}

/**
 * Finds the last backup run info for a given backup job
 * @param backupJob - The backup job to get the last run ID from
 * @param backupRuns - Array of all backup runs to search through
 * @returns Last backup run info or null if not found
 */
export const getLastBackupRunInfoFromJob = (backupJob: BackupJob, backupRuns: BackupRun[]) => {
  const lastBackupRunId = getLastBackupRun(backupJob)
  if (!lastBackupRunId) {
    return null
  }

  const matchingBackupRun = backupRuns.find((run) => run?.backuprun?.id === lastBackupRunId)
  if (!matchingBackupRun) {
    return null
  }

  return getBackupRunInfo(matchingBackupRun)
}

/**
 * Gets the most recent backup run info for a VM from related backup jobs and runs
 * @param relatedBackupJobs - Backup jobs that target this VM
 * @param backupRuns - Array of all backup runs
 * @param relatedBackupRuns - Backup runs that directly target this VM (for historical runs)
 * @returns Most recent backup run info or null
 */
export const getVMLastBackupInfo = (
  relatedBackupJobs: BackupJob[],
  backupRuns: BackupRun[],
  relatedBackupRuns?: BackupRun[]
) => {
  let latestBackupInfo = null
  let latestDate = null

  for (const job of relatedBackupJobs) {
    const backupInfo = getLastBackupRunInfoFromJob(job, backupRuns)

    if (backupInfo?.startTime) {
      const backupDate = new Date(backupInfo.startTime)

      if (!latestDate || backupDate > latestDate) {
        latestDate = backupDate
        latestBackupInfo = backupInfo
      }
    }
  }

  if (!latestBackupInfo && relatedBackupRuns) {
    for (const run of relatedBackupRuns) {
      const backupInfo = getBackupRunInfo(run)

      if (backupInfo?.startTime) {
        const backupDate = new Date(backupInfo.startTime)

        if (!latestDate || backupDate > latestDate) {
          latestDate = backupDate
          latestBackupInfo = backupInfo
        }
      }
    }
  }

  return latestBackupInfo
}

/**
 * Gets backup run info for multiple run IDs
 * @param runIds - Array of backup run IDs
 * @param backupRuns - Array of all backup runs to search through
 * @returns Array of backup run info objects
 */
export const getBackupRunsInfoFromIds = (runIds: string[], backupRuns: BackupRun[]) => {
  return runIds
    .map((runId) => {
      const matchingRun = backupRuns.find((run) => run?.backuprun?.id === runId)
      return matchingRun ? getBackupRunInfo(matchingRun) : null
    })
    .filter(Boolean)
}
