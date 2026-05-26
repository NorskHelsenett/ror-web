// FILE OVERVIEW:
// ------------------------
// Module-level singleton cache for all BackupJobs.
//
// Key design decisions:
// - Module-level variables (_jobs, _fetchPromise, _subscribers) survive React
//   component mounts/unmounts during client-side navigation, so only ONE fetch
//   is ever in-flight across the entire session regardless of how many pages
//   or components consume this cache.
// - localStorage provides a warm start on new sessions (30-min TTL).
// - `useGlobalBackupJobs()` subscribes to updates so all consumers re-render
//   when the fetch completes, without any React Context overhead.
// - `readGlobalBackupJobs()` is a synchronous read safe to use in useState
//   lazy initializers or outside React.

import { useEffect, useState } from 'react'
import type { BackupJob } from '@ror/js-api-client'
import { loadMoreBackupJobs } from '@/utils/backup-job-actions'

export const BACKUP_JOBS_STORAGE_KEY = 'backup-jobs'
export const BACKUP_JOBS_TTL = 30 * 60 * 1000 // 30 minutes
const BATCH_SIZE = 200

// --- Module-level singleton (persists across React navigation) ---
let _jobs: BackupJob[] | null = null
let _loadedAt = 0
let _fetchPromise: Promise<void> | null = null
const _subscribers = new Set<(jobs: BackupJob[]) => void>()

function readFromStorage(): BackupJob[] | null {
  try {
    const raw = localStorage.getItem(BACKUP_JOBS_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { jobs: BackupJob[]; cachedAt: number }
    if (!parsed?.cachedAt || Date.now() - parsed.cachedAt > BACKUP_JOBS_TTL) return null
    return parsed.jobs ?? null
  } catch {
    return null
  }
}

function writeToStorage(jobs: BackupJob[]) {
  try {
    localStorage.setItem(BACKUP_JOBS_STORAGE_KEY, JSON.stringify({ jobs, cachedAt: Date.now() }))
  } catch {
    // Ignore storage quota / write errors
  }
}

function isFresh(): boolean {
  return _jobs !== null && Date.now() - _loadedAt < BACKUP_JOBS_TTL
}

function notify(jobs: BackupJob[]) {
  for (const sub of _subscribers) sub(jobs)
}

// Populate _jobs from localStorage if not already done. Returns true if now fresh.
function seedFromStorage(): boolean {
  if (_jobs !== null) return isFresh()
  const stored = readFromStorage()
  if (stored !== null) {
    _jobs = stored
    _loadedAt = Date.now()
  }
  return _jobs !== null
}

function ensureFetching() {
  seedFromStorage()
  if (isFresh() || _fetchPromise) return

  _fetchPromise = (async () => {
    const allJobs: BackupJob[] = []
    let offset = 0
    try {
      while (true) {
        const result = await loadMoreBackupJobs({ offset, limit: BATCH_SIZE, order: 'asc' })
        allJobs.push(...(result.items ?? []))
        if (!result.hasMore) break
        offset += BATCH_SIZE
      }
      _jobs = allJobs
      _loadedAt = Date.now()
      writeToStorage(allJobs)
      notify(allJobs)
    } catch {
      // Keep previous cache on error; do not wipe _jobs
    } finally {
      _fetchPromise = null
    }
  })()
}

/**
 * Synchronous read — returns in-memory cache, then localStorage fallback, then [].
 * Safe to call outside React. Does NOT cause hydration mismatches when called
 * in useEffect (client-only), but must NOT be called in useState initializers
 * during SSR since localStorage is unavailable on the server.
 */
export function readGlobalBackupJobs(): BackupJob[] {
  seedFromStorage()
  return _jobs ?? []
}

/**
 * React hook — returns all BackupJobs and a loading flag.
 * Triggers a background fetch if the cache is stale. All hook instances
 * share the same module-level data so only one fetch is ever in flight.
 */
export function useGlobalBackupJobs(): { jobs: BackupJob[]; isLoading: boolean } {
  // Always start with [] so server and client render identically (no hydration mismatch).
  // localStorage is read in useEffect (client-only).
  const [jobs, setJobs] = useState<BackupJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handler = (newJobs: BackupJob[]) => {
      setJobs(newJobs)
      setIsLoading(false)
    }

    _subscribers.add(handler)

    // ensureFetching seeds from localStorage first, then starts a network fetch if stale
    ensureFetching()

    // Immediately apply whatever is now in _jobs (localStorage warm-start or prior fetch)
    if (_jobs && _jobs.length > 0) {
      setJobs(_jobs)
      if (isFresh()) setIsLoading(false)
    }

    return () => {
      _subscribers.delete(handler)
    }
  }, [])

  return { jobs, isLoading }
}
