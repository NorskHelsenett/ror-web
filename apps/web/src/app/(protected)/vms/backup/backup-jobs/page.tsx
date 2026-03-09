/**
 * Backup Jobs Page Component
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that serves as the main entry point for the Backup Jobs page.
 * It handles authentication, data fetching, and rendering of the page layout.
 **/

import { normalizeParams } from '@/features/cluster/utils/normalize-params'
import { getRorApi } from '@/services/ror-api'
import { Metadata } from 'next'
import { fetchBackupJobs } from '@/features/vms/backup/services/fetch-backupJobs'
import { fetchBackupRuns } from '@/features/vms/backup/services/fetch-backupRuns'
import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'

export const metadata: Metadata = {
  title: 'ROR - Backup Jobs',
  description: 'View backup jobs',
}

export const dynamic = 'force-dynamic'

export default async function BackupJobPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const api = await getRorApi()
  const sp = await searchParams
  const params = normalizeParams(sp)

  const [fetchedBackupJobs, fetchedBackupRuns] = await Promise.all([
    fetchBackupJobs(api, params),
    fetchBackupRuns(api, params),
  ])

  const backupJobs = fetchedBackupJobs.backupJobs || []
  const backupRuns = fetchedBackupRuns.backupRuns || []
  const backupJobId = sp?.backupJobId as string | undefined

  return (
    <div className='w-full flex flex-col'>
      <Header title='Backup jobs' />
      <PageView backupJobs={backupJobs} backupRuns={backupRuns} params={params} backupJobId={backupJobId} />
    </div>
  )
}
