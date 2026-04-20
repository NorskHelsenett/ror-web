import type { BackupJob, BackupRun } from '@ror/js-api-client'

export async function fetchBackupRunsForJobs(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  backupJobs: BackupJob[]
) {
  if (!backupJobs.length) {
    return []
  }

  // Collect all unique backup run IDs from the jobs
  const runIdSet = new Set<string>()
  for (const job of backupJobs) {
    const runIds = job?.backupjob?.status?.backupRunIds ?? []
    for (const id of runIds) {
      runIdSet.add(id)
    }
  }

  if (!runIdSet.size) {
    return []
  }

  // Fetch backup runs in batches to get the ones referenced by these jobs
  // Start by fetching a reasonable amount and filtering by job IDs
  const allRunIds = Array.from(runIdSet)
  const batchSize = 500
  const maxPages = 100

  const fetchedRuns: BackupRun[] = []
  const jobIdSet = new Set(allRunIds.slice(0, Math.min(50, allRunIds.length)))

  for (let page = 0; page < maxPages; page++) {
    const offset = page * batchSize
    const params = new URLSearchParams()
    params.set('limit', String(batchSize))
    params.set('offset', String(offset))
    params.set('order', 'desc')

    const backupRunsRes = await api.backupRun.list(params)
    const backupRuns: BackupRun[] = backupRunsRes?.resources ?? []

    // Filter runs to only those referenced by our jobs
    for (const run of backupRuns) {
      const runId = run?.backuprun?.id
      if (runId && allRunIds.includes(runId)) {
        fetchedRuns.push(run)
      }
    }

    if (backupRuns.length < batchSize) {
      break
    }

    // Stop if we've fetched enough
    if (fetchedRuns.length >= allRunIds.length) {
      break
    }
  }

  return fetchedRuns
}
