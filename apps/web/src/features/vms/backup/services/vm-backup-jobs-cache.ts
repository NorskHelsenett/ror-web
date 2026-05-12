// FILE OVERVIEW:
// ------------------------
// Thin wrapper around the global BackupJobs cache.
// Provides `useVmBackupJobsHydration` (enrich VMs with backup status) and
// re-exports `readCachedJobs` for synchronous access in display components.
// All fetching and caching logic lives in global-backup-jobs-cache.ts.

import { useMemo } from 'react'
import type { VirtualMachine } from '@ror/js-api-client'
import { mapBackupToVM, type VMWithBackupStatus } from '../utils/map-backup-to-vm'
import { useGlobalBackupJobs, readGlobalBackupJobs } from '@/features/backup/cache/global-backup-jobs-cache'

/** Synchronous read of cached jobs — delegates to the global cache. */
export const readCachedJobs = readGlobalBackupJobs

const toVMWithBackupStatus = (
  vm: VirtualMachine | VMWithBackupStatus,
  jobs: ReturnType<typeof readGlobalBackupJobs>
): VMWithBackupStatus => {
  if ('backupStatus' in vm) return vm
  return mapBackupToVM([vm as VirtualMachine], jobs, [])[0]
}

/**
 * Enriches VMs with backup job status on the client side.
 * Uses the global jobs cache — no independent fetch is started.
 */
export const useVmBackupJobsHydration = (items: (VirtualMachine | VMWithBackupStatus)[]): VMWithBackupStatus[] => {
  const { jobs } = useGlobalBackupJobs()

  return useMemo(() => {
    return items.map((vm) => toVMWithBackupStatus(vm, jobs))
  }, [items, jobs])
}
