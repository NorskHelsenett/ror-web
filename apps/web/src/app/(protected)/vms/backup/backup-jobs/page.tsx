/**
 * Backup Jobs Page Component
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that serves as the main entry point for the Backup Jobs page.
 * It handles authentication, data fetching, and rendering of the page layout.
 **/

import { normalizeParams } from '@/features/vms/utils/normalize-params'
import { getRorApi } from '@/services/ror-api'
import { Metadata } from 'next'
import { fetchBackupJobs } from '@/features/vms/backup/services/fetch-backupJobs'
import { fetchBackupRunsForJobs } from '@/features/vms/backup/services/fetch-backupRuns-for-jobs'
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

  // Fetch jobs first for immediate page render
  const fetchedBackupJobs = await fetchBackupJobs(api, params)
  const backupJobs = fetchedBackupJobs.backupJobs || []

  // Fetch runs in parallel, don't block initial page render
  const runsPromise = fetchBackupRunsForJobs(api, backupJobs)

  return (
    <div className='w-full flex flex-col'>
      <Header title='Backup jobs' />
      <BackupJobsContent backupJobs={backupJobs} runsPromise={runsPromise} params={params} />
    </div>
  )
}

async function BackupJobsContent({
  backupJobs,
  runsPromise,
  params,
}: {
  backupJobs: any[]
  runsPromise: Promise<any[]>
  params: any
}) {
  // Resolve runs while page is already rendering
  const backupRuns = await runsPromise

  return <PageView backupJobs={backupJobs} backupRuns={backupRuns} params={params} />
}
