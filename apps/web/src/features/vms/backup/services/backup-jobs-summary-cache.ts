import { getBackupStatus } from '@/features/vms/backup/utils/backup-job'
import { loadMoreBackupJobs } from '@/utils/backup-job-actions'
import type { BackupJob } from '@ror/js-api-client'
import { useEffect, useRef, useState } from 'react'

export const backupJobsSummaryCacheKey = 'backup-jobs-summary'
export const backupJobsSummaryCacheTTL = 30 * 60 * 1000
export const backupJobsSummaryBatchSize = 200

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

  return toSummaryWithRatios({
    totalJobs,
    activeJobs,
    pausedJobs,
    inactiveJobs,
  })
}

export const useBackupJobsSummaryHydration = (initialJobs: BackupJob[]) => {
  const [summary, setSummary] = useState<BackupJobsSummary>(() => summarizeBackupJobs(initialJobs))
  const hydrationStartedRef = useRef(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(backupJobsSummaryCacheKey)
      if (!raw) return

      const parsed = JSON.parse(raw) as BackupJobsSummary & { cachedAt?: number }
      if (!parsed?.cachedAt || Date.now() - parsed.cachedAt > backupJobsSummaryCacheTTL) return

      setSummary({
        totalJobs: parsed.totalJobs,
        activeJobs: parsed.activeJobs,
        pausedJobs: parsed.pausedJobs,
        inactiveJobs: parsed.inactiveJobs,
        activeJobRatio: parsed.activeJobRatio,
        pausedJobRatio: parsed.pausedJobRatio,
        inactiveJobRatio: parsed.inactiveJobRatio,
      })
    } catch {
      // Ignore invalid cache payload.
    }
  }, [])

  useEffect(() => {
    if (hydrationStartedRef.current) return
    hydrationStartedRef.current = true

    let cancelled = false

    const hydrateSummary = async () => {
      let offset = 0
      const totals = {
        totalJobs: 0,
        activeJobs: 0,
        pausedJobs: 0,
        inactiveJobs: 0,
      }

      while (!cancelled) {
        const res = await loadMoreBackupJobs({
          offset,
          limit: backupJobsSummaryBatchSize,
          order: 'desc',
        })

        const pageItems = res.items ?? []
        if (!pageItems.length) break

        totals.totalJobs += pageItems.length
        totals.activeJobs += pageItems.filter((job) => getBackupStatus(job) === 'active').length
        totals.pausedJobs += pageItems.filter((job) => getBackupStatus(job) === 'paused').length
        totals.inactiveJobs += pageItems.filter((job) => getBackupStatus(job) === 'inactive').length

        setSummary(toSummaryWithRatios(totals))

        if (!res.hasMore || pageItems.length < backupJobsSummaryBatchSize) break
        offset += backupJobsSummaryBatchSize
      }

      if (!cancelled) {
        try {
          localStorage.setItem(
            backupJobsSummaryCacheKey,
            JSON.stringify({
              ...toSummaryWithRatios(totals),
              cachedAt: Date.now(),
            })
          )
        } catch {
          // Ignore storage quota/write errors.
        }
      }
    }

    void hydrateSummary()

    return () => {
      cancelled = true
    }
  }, [])

  return summary
}
