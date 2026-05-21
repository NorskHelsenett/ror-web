// FILE OVERVIEW:
// ------------------------
// Module-level singleton cache for recent BackupRuns.
//
// Key design decisions:
// - Module-level variables (_runs, _fetchPromise, _subscribers) survive React
//   component mounts/unmounts during client-side navigation, so only ONE fetch
//   is ever in-flight regardless of how many pages consume this cache.
// - Fetches up to MAX_PAGES pages (200/batch) in descending order, covering
//   the most recent runs. This is enough for history charts and most VM lookups.
// - Progressive updates: subscribers are notified after each page so the UI
//   can render partial results while fetching continues.
// - NOT persisted to localStorage (full run objects are too large). Derived
//   consumers (history chart, VM last-run info) maintain their own compact
//   localStorage entries.
// - `getGlobalBackupRunsSnapshot()` is a synchronous read safe to use in
//   effects or outside React — does NOT trigger a fetch.
// - `findGlobalBackupRunById()` allows point lookups without subscribing.

import { useEffect, useState } from 'react'
import type { BackupRun } from '@ror/js-api-client'
import { loadMoreBackupRuns } from '@/utils/backup-run-actions'

export const GLOBAL_BACKUP_RUNS_TTL = 30 * 60 * 1000 // 30 minutes
const BATCH_SIZE = 200
const MAX_PAGES = 100

// --- Module-level singleton (persists across React navigation) ---
let _runs: BackupRun[] | null = null
let _partialRuns: BackupRun[] = []
let _loadedAt = 0
let _fetchPromise: Promise<void> | null = null
const _subscribers = new Set<(runs: BackupRun[]) => void>()

function isFresh(): boolean {
  return _runs !== null && Date.now() - _loadedAt < GLOBAL_BACKUP_RUNS_TTL
}

function notify(runs: BackupRun[]) {
  for (const sub of _subscribers) sub(runs)
}

function ensureFetching() {
  if (isFresh() || _fetchPromise) return

  _partialRuns = []

  _fetchPromise = (async () => {
    try {
      for (let page = 0; page < MAX_PAGES; page++) {
        const offset = page * BATCH_SIZE
        const result = await loadMoreBackupRuns({ offset, limit: BATCH_SIZE, order: 'desc' })
        const pageItems = result.items ?? []
        if (!pageItems.length) break

        _partialRuns.push(...pageItems)
        notify([..._partialRuns]) // progressive update per page

        if (!result.hasMore || pageItems.length < BATCH_SIZE) break
      }
      _runs = _partialRuns
      _loadedAt = Date.now()
      // Final notification with the complete set
      notify(_runs)
    } catch {
      // Keep previous cache on error; do not wipe _runs
    } finally {
      _fetchPromise = null
    }
  })()
}

/**
 * Returns the current in-memory snapshot — either the complete list or partial
 * results accumulated so far during an in-flight fetch.
 * Does NOT trigger a fetch. Safe to call outside React.
 */
export function getGlobalBackupRunsSnapshot(): BackupRun[] {
  return _runs ?? _partialRuns
}

/**
 * Looks up a single BackupRun by ID from the in-memory snapshot.
 * Returns undefined if not found (may be absent if fetch is still loading
 * or the run is older than MAX_PAGES × BATCH_SIZE).
 */
export function findGlobalBackupRunById(runId: string): BackupRun | undefined {
  return getGlobalBackupRunsSnapshot().find((r) => r?.backuprun?.id === runId)
}

/**
 * React hook — returns all fetched BackupRuns and a loading flag.
 * Triggers a background fetch if the cache is stale. Receives progressive
 * updates as each page arrives so consumers can render partial data early.
 * All hook instances share the same module-level data so only one fetch is
 * ever in flight.
 */
export function useGlobalBackupRuns(): { runs: BackupRun[]; isLoading: boolean } {
  const [runs, setRuns] = useState<BackupRun[]>(() => getGlobalBackupRunsSnapshot())
  const [isLoading, setIsLoading] = useState(() => !isFresh())

  useEffect(() => {
    const handler = (newRuns: BackupRun[]) => {
      setRuns([...newRuns])
      if (_runs !== null) setIsLoading(false)
    }

    _subscribers.add(handler)

    // Sync state if already fresh from a previous navigation
    if (isFresh() && _runs) {
      setRuns(_runs)
      setIsLoading(false)
    } else {
      // Show any partial results already accumulated
      if (_partialRuns.length > 0) setRuns([..._partialRuns])
      ensureFetching()
    }

    return () => {
      _subscribers.delete(handler)
    }
  }, [])

  return { runs, isLoading }
}
