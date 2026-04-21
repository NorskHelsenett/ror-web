// FILE OVERVIEW:
// ------------------------
// This file defines a custom React hook `useBackupInfoHydration` that manages the hydration of backup information for virtual machines (VMs) in a web application.
// The hook retrieves cached backup information from local storage, identifies VMs that require backup information hydration, and fetches the necessary backup run data to update the cache and provide a more complete backup status for each VM.

import {
  type LastBackupInfo,
  getBackupRunActiveTargets,
  getBackupRunInfo,
} from '@/features/vms/backup/utils/backup-run'
import { useRef, useState, useEffect, useMemo } from 'react'
import { getVmExternalId } from '@/features/vms/utils/vms'
import type { BackupRun, VirtualMachine } from '@ror/js-api-client'
import type { VMWithBackupStatus } from '../utils/map-backup-to-vm'

export const vmBackupUpCacheKey = 'vm-last-backup-info'
export const vmBackupUpCacheTTL = 6 * 60 * 60 * 1000
export const vmBackupRunBatchSize = 200
export const runIdsPerJob = 3

export type BackupInfoCacheEntry = LastBackupInfo & { cachedAt: number }
export type BackupInfoCacheMap = Record<string, BackupInfoCacheEntry>

type HydratableVm = VirtualMachine | VMWithBackupStatus

const hasBackupStatus = (item: HydratableVm): item is VMWithBackupStatus => 'backupStatus' in item

export const useBackupInfoHydration = (items: HydratableVm[]) => {
  const [hydratedBackupInfoByVmId, setHydratedBackupInfoByVmId] = useState<BackupInfoCacheMap>({})
  const requestedRunIdsRef = useRef<Set<string>>(new Set())
  const hydrateInFlightRef = useRef(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(vmBackupUpCacheKey)
      if (!raw) return

      const parsed = JSON.parse(raw) as BackupInfoCacheMap
      const now = Date.now()
      const next: BackupInfoCacheMap = {}

      for (const [vmExternalId, entry] of Object.entries(parsed)) {
        if (entry?.cachedAt && now - entry.cachedAt < vmBackupUpCacheTTL) {
          next[vmExternalId] = entry
        }
      }

      setHydratedBackupInfoByVmId(next)
    } catch {
      // Ignore invalid cache payload.
    }
  }, [])

  const hydratedItems = useMemo(() => {
    return items.map((item) => {
      if (!hasBackupStatus(item)) {
        return item
      }

      if (item.backupStatus?.lastBackupInfo) {
        return item
      }

      const vmExternalId = getVmExternalId(item)
      if (!vmExternalId) {
        return item
      }

      const cached = hydratedBackupInfoByVmId[vmExternalId]
      if (!cached) {
        return item
      }

      return {
        ...item,
        backupStatus: {
          ...item.backupStatus,
          lastBackupInfo: {
            startTime: cached.startTime,
            endTime: cached.endTime,
            expiryTime: cached.expiryTime,
          },
        },
      }
    })
  }, [items, hydratedBackupInfoByVmId])

  useEffect(() => {
    if (hydrateInFlightRef.current) return

    const vmCandidateRunIds = new Map<string, Set<string>>()
    const candidateRunIds: string[] = []
    const seenCandidateRunIds = new Set<string>()

    for (const item of items) {
      if (!hasBackupStatus(item)) continue

      const backupStatus = item.backupStatus
      if (!backupStatus?.hasBackupRun || backupStatus.lastBackupInfo) continue

      const vmExternalId = getVmExternalId(item)
      if (!vmExternalId || hydratedBackupInfoByVmId[vmExternalId]) continue

      const runIdSet = new Set<string>()

      for (const job of backupStatus.relatedBackupJobs ?? []) {
        const runIds = job?.backupjob?.status?.backupRunIds ?? []
        for (const runId of runIds.slice(0, runIdsPerJob)) {
          if (!runId) continue
          runIdSet.add(runId)
        }
      }

      if (!runIdSet.size) continue

      vmCandidateRunIds.set(vmExternalId, runIdSet)

      for (const runId of runIdSet) {
        if (requestedRunIdsRef.current.has(runId) || seenCandidateRunIds.has(runId)) continue
        seenCandidateRunIds.add(runId)
        candidateRunIds.push(runId)
      }
    }

    if (!candidateRunIds.length || !vmCandidateRunIds.size) return

    const runIdsBatch = candidateRunIds.slice(0, vmBackupRunBatchSize)
    for (const runId of runIdsBatch) {
      requestedRunIdsRef.current.add(runId)
    }

    hydrateInFlightRef.current = true

    void (async () => {
      try {
        const response = await fetch('/api/vm-backup-runs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ runIds: runIdsBatch }),
        })

        if (!response.ok) return

        const payload = (await response.json()) as { backupRuns?: BackupRun[] }
        const fetchedRuns = payload.backupRuns ?? []
        if (!fetchedRuns.length) return

        const now = Date.now()
        const updates: BackupInfoCacheMap = {}

        for (const [vmExternalId, runIdSet] of vmCandidateRunIds.entries()) {
          let latestBackupInfo: LastBackupInfo | null = null
          let latestTs = 0

          for (const run of fetchedRuns) {
            const runId = run?.backuprun?.id
            if (!runId || !runIdSet.has(runId)) continue

            const targets = getBackupRunActiveTargets(run)
            const targetsVm = targets.some((target) => target.externalId === vmExternalId)
            if (!targetsVm) continue

            const info = getBackupRunInfo(run)
            if (!info.startTime) continue

            const ts = Date.parse(info.startTime)
            if (!Number.isFinite(ts) || ts < latestTs) continue

            latestTs = ts
            latestBackupInfo = {
              startTime: info.startTime,
              endTime: info.endTime,
              expiryTime: info.expiryTime,
            }
          }

          if (latestBackupInfo) {
            updates[vmExternalId] = {
              ...latestBackupInfo,
              cachedAt: now,
            }
          }
        }

        if (!Object.keys(updates).length) return

        setHydratedBackupInfoByVmId((prev) => {
          const next = { ...prev, ...updates }
          try {
            localStorage.setItem(vmBackupUpCacheKey, JSON.stringify(next))
          } catch {
            // Ignore storage quota/write errors.
          }
          return next
        })
      } catch {
        // Keep page resilient if hydration fetch fails.
      } finally {
        hydrateInFlightRef.current = false
      }
    })()
  }, [items, hydratedBackupInfoByVmId])

  return hydratedItems
}
