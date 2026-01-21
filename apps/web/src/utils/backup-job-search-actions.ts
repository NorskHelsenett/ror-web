'use server'

import { getRorApi } from '@/services/ror-api'
import { BackupJob } from '@ror/js-api-client'
import { getBackupJobId, getBackupJobSource, getBackupJobLocation } from '@/features/vms/backup/utils/backup-job'

export async function searchBackupJobById(id: string): Promise<BackupJob | null> {
  try {
    const api = await getRorApi()

    // Search for backup job with specific ID
    const params = new URLSearchParams()
    params.set('limit', '1000') // Large limit to catch the specific item
    params.set('offset', '0')

    const backupJobsRes = await api.backupJob.list(params)
    const backupJobs: BackupJob[] = backupJobsRes?.resources ?? []

    // Find the specific backup job by ID
    const found = backupJobs.find((job) => getBackupJobId(job) === id || job.metadata?.uid === id)

    return found || null
  } catch (error) {
    console.error('Error searching for backup job:', error)
    return null
  }
}

export async function searchBackupJobsByQuery(query: string, limit: number = 50): Promise<BackupJob[]> {
  try {
    const api = await getRorApi()

    const params = new URLSearchParams()
    params.set('limit', String(limit * 2)) // Get more items to search through
    params.set('offset', '0')

    const backupJobsRes = await api.backupJob.list(params)
    const backupJobs: BackupJob[] = backupJobsRes?.resources ?? []

    // Filter by query (ID match, source match, or location match)
    const queryLower = query.toLowerCase()
    const filtered = backupJobs.filter((job) => {
      const id = getBackupJobId(job).toLowerCase()
      const source = getBackupJobSource(job).toLowerCase()
      const location = getBackupJobLocation(job).toLowerCase()

      return id.includes(queryLower) || source.includes(queryLower) || location.includes(queryLower)
    })

    return filtered.slice(0, limit)
  } catch (error) {
    console.error('Error searching backup jobs:', error)
    return []
  }
}
