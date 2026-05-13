import { loadMoreBackupRuns } from '@/utils/backup-run-actions'
import type { BackupRun } from '@ror/js-api-client'
import { format, startOfDay, subDays } from 'date-fns'
import { useEffect, useRef, useState } from 'react'

export const backupRunsHistoryCacheKey = 'backup-runs-history-summary'
export const backupRunsHistoryCacheTTL = 30 * 60 * 1000
export const backupRunsHistoryBatchSize = 200
export const backupRunsHistoryMaxPages = 100

export type BackupRunsHistoryPoint = {
  date: string
  successful: number
  failed: number
}

const getDefaultHistory = (): BackupRunsHistoryPoint[] => {
  const today = startOfDay(new Date())
  const points: BackupRunsHistoryPoint[] = []

  for (let i = 29; i >= 0; i--) {
    points.push({ date: format(subDays(today, i), 'MMM dd'), successful: 0, failed: 0 })
  }

  return points
}

const summarizeRunsToHistory = (runs: BackupRun[]): BackupRunsHistoryPoint[] => {
  const map = new Map<string, { successful: number; failed: number }>()

  for (const point of getDefaultHistory()) {
    map.set(point.date, { successful: 0, failed: 0 })
  }

  for (const run of runs) {
    const startTime = run?.backuprun?.status?.startTime
    if (!startTime) continue

    const startDate = startOfDay(new Date(startTime))
    if (Number.isNaN(startDate.getTime())) continue

    const key = format(startDate, 'MMM dd')
    const entry = map.get(key)
    if (!entry) continue

    const status = (run?.backuprun?.status?.backupDestinations?.[0]?.status ?? '').toLowerCase()
    if (status === 'succeeded' || status === 'completed') entry.successful += 1
    if (status === 'failed') entry.failed += 1
  }

  return getDefaultHistory().map((point) => {
    const entry = map.get(point.date) ?? { successful: 0, failed: 0 }
    return {
      date: point.date,
      successful: entry.successful,
      failed: entry.failed,
    }
  })
}

export const useBackupRunsHistoryHydration = (initialRuns: BackupRun[]) => {
  const [historySummary, setHistorySummary] = useState<BackupRunsHistoryPoint[]>(() =>
    summarizeRunsToHistory(initialRuns)
  )
  const hydrationStartedRef = useRef(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(backupRunsHistoryCacheKey)
      if (!raw) return

      const parsed = JSON.parse(raw) as { points?: BackupRunsHistoryPoint[]; cachedAt?: number }
      if (!parsed?.cachedAt || Date.now() - parsed.cachedAt > backupRunsHistoryCacheTTL) return
      if (!parsed.points || !Array.isArray(parsed.points)) return

      setHistorySummary(parsed.points)
    } catch {
      // Ignore invalid cache payload.
    }
  }, [])

  useEffect(() => {
    if (hydrationStartedRef.current) return
    hydrationStartedRef.current = true

    let cancelled = false

    const hydrateHistory = async () => {
      const allRuns: BackupRun[] = []

      for (let page = 0; page < backupRunsHistoryMaxPages && !cancelled; page++) {
        const offset = page * backupRunsHistoryBatchSize
        const res = await loadMoreBackupRuns({
          offset,
          limit: backupRunsHistoryBatchSize,
          order: 'desc',
        })

        const pageItems = res.items ?? []
        if (!pageItems.length) break

        allRuns.push(...pageItems)
        setHistorySummary(summarizeRunsToHistory(allRuns))

        if (!res.hasMore || pageItems.length < backupRunsHistoryBatchSize) break
      }

      if (!cancelled) {
        try {
          localStorage.setItem(
            backupRunsHistoryCacheKey,
            JSON.stringify({
              points: summarizeRunsToHistory(allRuns),
              cachedAt: Date.now(),
            })
          )
        } catch {
          // Ignore storage quota/write errors.
        }
      }
    }

    void hydrateHistory()

    return () => {
      cancelled = true
    }
  }, [])

  return historySummary
}
