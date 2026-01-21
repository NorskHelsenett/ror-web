import type { BackupJob, BackupRun, VirtualMachine } from '@ror/js-api-client'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import type { LastBackupInfo } from '@/features/vms/backup/utils/backup-run'

type VMTableRow = VirtualMachine | VMWithBackupStatus

interface BackupStatusResult {
  hasBackup: boolean
  isDataLoaded: boolean
  hasBackupJob: boolean
  hasBackupRun: boolean
  hasActiveBackup: boolean
  lastBackupInfo?: LastBackupInfo | null
}

/**
 * Custom hook to determine backup status for a VM
 * @param vm - The VM object (with or without backup status)
 * @returns Object containing backup status information
 */
export const useBackupStatus = (vm: VMTableRow): BackupStatusResult => {
  const isDataLoaded = 'backupStatus' in vm

  if (isDataLoaded) {
    const backupStatus = vm.backupStatus as {
      hasBackupJob: boolean
      hasBackupRun: boolean
      lastBackupInfo?: LastBackupInfo | null
      relatedBackupJobs?: BackupJob[]
      relatedBackupRuns?: BackupRun[]
    }
    const hasBackupJob = backupStatus.hasBackupJob
    const hasBackupRun = backupStatus.hasBackupRun
    const hasBackup = hasBackupJob || hasBackupRun
    const hasActiveBackup = hasBackupJob // Active backup means VM has a backup job configured

    return {
      hasBackup, // Overall backup status (true if job OR run exists)
      isDataLoaded: true, // Indicates data is available
      hasBackupJob,
      hasBackupRun,
      hasActiveBackup, // True only if VM has backup job (actively being backed up)
      lastBackupInfo: backupStatus.lastBackupInfo,
    }
  }

  //fallback for unenhanced VMs
  return {
    hasBackup: false,
    isDataLoaded: false,
    hasBackupJob: false,
    hasBackupRun: false,
    hasActiveBackup: false,
    lastBackupInfo: null,
  }
}

/**
 * Utility function to get backup status for a VM (non-hook version for sorting)
 * @param vm - The VM object to check
 * @returns Whether the VM has backup (job OR run)
 */
export const getVMBackupStatus = (vm: VMTableRow): boolean => {
  if ('backupStatus' in vm) {
    const backupStatus = vm.backupStatus as { hasBackupJob: boolean; hasBackupRun: boolean }
    return backupStatus.hasBackupJob || backupStatus.hasBackupRun
  }
  return false
}

/**
 * Utility function to check if VM has active backup (backup job configured)
 * @param vm - The VM object to check
 * @returns Whether the VM has an active backup job
 */
export const getVMActiveBackupStatus = (vm: VMTableRow): boolean => {
  if ('backupStatus' in vm) {
    const backupStatus = vm.backupStatus as { hasBackupJob: boolean; hasBackupRun: boolean }
    return backupStatus.hasBackupJob
  }
  return false
}

/**
 * Specialized hook focused on active backup status
 * @param vm - The VM object to check
 * @returns Object with active backup information
 */
export const useActiveBackupStatus = (vm: VMTableRow) => {
  const fullStatus = useBackupStatus(vm)

  return {
    hasActiveBackup: fullStatus.hasActiveBackup,
    isDataLoaded: fullStatus.isDataLoaded,
    hasHistoricalBackup: fullStatus.hasBackupRun && !fullStatus.hasBackupJob, // Has runs but no job
    hasConfiguredBackup: fullStatus.hasBackupJob && !fullStatus.hasBackupRun, // Has job but no runs
  }
}

/**
 * Utility function for sorting VMs by backup status (any backup - job OR run)
 * @param vmA - First VM to compare
 * @param vmB - Second VM to compare
 * @returns Sort comparison result (-1, 0, 1)
 */
export const compareVMsByBackupStatus = (vmA: VMTableRow, vmB: VMTableRow): number => {
  const hasBackupA = getVMBackupStatus(vmA)
  const hasBackupB = getVMBackupStatus(vmB)

  // VMs with backup come first (return -1), VMs without backup come last (return 1)
  return hasBackupA === hasBackupB ? 0 : hasBackupA ? -1 : 1
}

/**
 * Utility function for sorting VMs by ACTIVE backup status (backup job only)
 * @param vmA - First VM to compare
 * @param vmB - Second VM to compare
 * @returns Sort comparison result (-1, 0, 1)
 */
export const compareVMsByActiveBackupStatus = (vmA: VMTableRow, vmB: VMTableRow): number => {
  const hasActiveBackupA = getVMActiveBackupStatus(vmA)
  const hasActiveBackupB = getVMActiveBackupStatus(vmB)

  // VMs with active backup come first (return -1), VMs without active backup come last (return 1)
  return hasActiveBackupA === hasActiveBackupB ? 0 : hasActiveBackupA ? -1 : 1
}
