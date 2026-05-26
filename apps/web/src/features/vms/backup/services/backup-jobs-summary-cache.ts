// FILE OVERVIEW:
// ------------------------
// Thin wrapper around the global BackupJobs cache.
// Derives a summary (counts + ratios) from the shared job list —
// no independent fetch is started. All fetching lives in global-backup-jobs-cache.ts.

import { getBackupStatus } from '@/features/vms/backup/utils/backup-job'
import type { BackupJob } from '@ror/js-api-client'
import { useMemo } from 'react'
import { useGlobalBackupJobs } from '@/features/backup/cache/backup-jobs-cache'

export type BackupJobsSummary = {
  totalJobs: number
  activeJobs: number
  pausedJobs: number
  inactiveJobs: number
  activeJobRatio: number
  pausedJobRatio: number
  inactiveJobRatio: number
}

const toSummaryWithRatios = (
  counts: Omit<BackupJobsSummary, 'activeJobRatio' | 'pausedJobRatio' | 'inactiveJobRatio'>
) => {
  const { totalJobs, activeJobs, pausedJobs, inactiveJobs } = counts
  return {
    ...counts,
    activeJobRatio: totalJobs > 0 ? Math.round((activeJobs / totalJobs) * 100) : 0,
    pausedJobRatio: totalJobs > 0 ? Math.round((pausedJobs / totalJobs) * 100) : 0,
    inactiveJobRatio: totalJobs > 0 ? Math.round((inactiveJobs / totalJobs) * 100) : 0,
  }
}

const summarizeBackupJobs = (jobs: BackupJob[]): BackupJobsSummary => {
  const totalJobs = jobs.length
  const activeJobs = jobs.filter((job) => getBackupStatus(job) === 'active').length
  const pausedJobs = jobs.filter((job) => getBackupStatus(job) === 'paused').length
  const inactiveJobs = jobs.filter((job) => getBackupStatus(job) === 'inactive').length

  return toSummaryWithRatios({ totalJobs, activeJobs, pausedJobs, inactiveJobs })
}

export const useBackupJobsSummaryHydration = () => {
  const { jobs } = useGlobalBackupJobs()

  return useMemo(() => summarizeBackupJobs(jobs), [jobs])
}
