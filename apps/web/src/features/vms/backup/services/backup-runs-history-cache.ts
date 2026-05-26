// FILE OVERVIEW:
// ------------------------
// Thin wrapper around the global BackupRuns cache.
// Derives a 30-day run history (BackupRunsHistoryPoint[]) from the shared run list —
// no independent fetch is started. All fetching lives in global-backup-runs-cache.ts.
//
// A localStorage warm-start entry is still written so the chart renders immediately
// on the next hard refresh, before the global cache re-populates.

import type { BackupRun } from '@ror/js-api-client'
import { format, startOfDay, subDays } from 'date-fns'
import { useEffect, useMemo, useRef } from 'react'
import { useGlobalBackupRuns } from '@/features/backup/cache/backup-runs-cache'
import { useState } from 'react'

export const backupRunsHistoryCacheKey = 'backup-runs-history-summary'
export const backupRunsHistoryCacheTTL = 30 * 60 * 1000

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
    return { date: point.date, successful: entry.successful, failed: entry.failed }
  })
}

const readHistoryFromStorage = (): BackupRunsHistoryPoint[] | null => {
  try {
    const raw = localStorage.getItem(backupRunsHistoryCacheKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { points?: BackupRunsHistoryPoint[]; cachedAt?: number }
    if (!parsed?.cachedAt || Date.now() - parsed.cachedAt > backupRunsHistoryCacheTTL) return null
    if (!parsed.points || !Array.isArray(parsed.points)) return null
    return parsed.points
  } catch {
    return null
  }
}

export const useBackupRunsHistoryHydration = () => {
  const { runs, isLoading } = useGlobalBackupRuns()
  const persistedRef = useRef(false)

  // Warm start: read localStorage cache synchronously on first render
  const [storedHistory] = useState<BackupRunsHistoryPoint[] | null>(() => readHistoryFromStorage())

  // Derive history from global runs whenever they update
  const derivedHistory = useMemo(() => summarizeRunsToHistory(runs), [runs])

  // Use derived history once we have real data; fall back to stored history
  const historySummary = runs.length > 0 ? derivedHistory : (storedHistory ?? getDefaultHistory())

  // Persist the derived history to localStorage once the global fetch completes
  useEffect(() => {
    if (isLoading || persistedRef.current || runs.length === 0) return
    persistedRef.current = true
    try {
      localStorage.setItem(backupRunsHistoryCacheKey, JSON.stringify({ points: derivedHistory, cachedAt: Date.now() }))
    } catch {
      // Ignore storage quota/write errors.
    }
  }, [isLoading, runs.length, derivedHistory])

  return historySummary
}
