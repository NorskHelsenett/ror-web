import { BackupJob, BackupRun, VirtualMachine } from '@ror/js-api-client'
import { getVmExternalId } from '@/features/vms/utils/vms'
import { getBackupJobActiveTargets } from '@/features/vms/backup/utils/backup-job'
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

    const lastBackupInfo = getVMLastBackupInfo(relatedJobs, backupRuns, relatedRuns)

    return {
      ...vm,
      backupStatus: {
        hasBackupJob: relatedJobs.length > 0,
        hasBackupRun: relatedRuns.length > 0,
        lastBackupInfo,
        relatedBackupJobs: relatedJobs,
        relatedBackupRuns: relatedRuns,
      },
    }
  })
}
