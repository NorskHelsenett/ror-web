import { BackupJob, BackupRun, VirtualMachine } from '@ror/js-api-client'
import { getVmExternalId } from '@/features/vms/utils/vms'
import { getBackupJobActiveTargets, getBackupJobAllRunIds } from '@/features/vms/backup/utils/backup-job'
import { getBackupRunActiveTargets, getVMLastBackupInfo } from '@/features/vms/backup/utils/backup-run'
import type { LastBackupInfo } from '@/features/vms/backup/utils/backup-run'

export type VMWithBackupStatus = VirtualMachine & {
  backupStatus: {
    hasBackupJob: boolean
    hasBackupRun: boolean
    lastBackupInfo?: LastBackupInfo | null
    relatedBackupJobs?: BackupJob[]
    relatedBackupRuns?: BackupRun[]
  }
}

export function mapBackupToVM(
  vms: VirtualMachine[],
  backupJobs: BackupJob[],
  backupRuns: BackupRun[]
): VMWithBackupStatus[] {
  return vms.map((vm) => {
    const vmExternalId = getVmExternalId(vm)

    const relatedJobs = backupJobs.filter((job) => {
      const activeTargets = getBackupJobActiveTargets(job)
      return activeTargets.some((target) => target.externalId === vmExternalId)
    })

    const relatedRuns = backupRuns.filter((run) => {
      const activeTargets = getBackupRunActiveTargets(run)
      return activeTargets.some((target) => target.externalId === vmExternalId)
    })

    // Some VM pages only preload a sample of backup runs.
    // Use backup job run IDs to avoid classifying active backups as only configured.
    const hasBackupRunsFromJobs = relatedJobs.some((job) => getBackupJobAllRunIds(job).length > 0)
    const hasBackupRun = relatedRuns.length > 0 || hasBackupRunsFromJobs

    const lastBackupInfo = getVMLastBackupInfo(relatedJobs, backupRuns, relatedRuns)

    return {
      ...vm,
      backupStatus: {
        hasBackupJob: relatedJobs.length > 0,
        hasBackupRun,
        lastBackupInfo,
        relatedBackupJobs: relatedJobs,
        relatedBackupRuns: relatedRuns,
      },
    }
  })
}
