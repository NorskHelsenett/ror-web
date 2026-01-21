'use server'

import { getRorApi } from '@/services/ror-api'
import { BackupRun } from '@ror/js-api-client'
import {
  getBackupRunId,
  getBackupRunSource,
  getBackupRunMappedBackupJobId,
} from '@/features/vms/backup/utils/backup-run'

export async function searchBackupRunById(id: string): Promise<BackupRun | null> {
  try {
    const api = await getRorApi()

    // Search for backup run with specific ID
    const params = new URLSearchParams()
    params.set('limit', '1000') // Large limit to catch the specific item
    params.set('offset', '0')

    const backupRunsRes = await api.backupRun.list(params)
    const backupRuns: BackupRun[] = backupRunsRes?.resources ?? []

    // Find the specific backup run by ID or mapped backup job ID
    const found = backupRuns.find(
      (run) => getBackupRunId(run) === id || getBackupRunMappedBackupJobId(run) === id || run.metadata?.uid === id
    )

    return found || null
  } catch (error) {
    console.error('Error searching for backup run:', error)
    return null
  }
}

export async function searchBackupRunsByQuery(query: string, limit: number = 50): Promise<BackupRun[]> {
  try {
    const api = await getRorApi()

    const params = new URLSearchParams()
    params.set('limit', String(limit * 2)) // Get more items to search through
    params.set('offset', '0')

    const backupRunsRes = await api.backupRun.list(params)
    const backupRuns: BackupRun[] = backupRunsRes?.resources ?? []

    // Filter by query (ID match or source match)
    const queryLower = query.toLowerCase()
    const filtered = backupRuns.filter((run) => {
      const id = getBackupRunId(run).toLowerCase()
      const source = getBackupRunSource(run).toLowerCase()
      const backupJobId = getBackupRunMappedBackupJobId(run).toLowerCase()

      return id.includes(queryLower) || source.includes(queryLower) || backupJobId.includes(queryLower)
    })

    return filtered.slice(0, limit)
  } catch (error) {
    console.error('Error searching backup runs:', error)
    return []
  }
}
