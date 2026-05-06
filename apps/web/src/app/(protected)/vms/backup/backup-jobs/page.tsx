/**
 * Backup Jobs Page Component
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that serves as the main entry point for the Backup Jobs page.
 * It handles authentication, data fetching, and rendering of the page layout.
 **/

import { Suspense } from 'react'
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
  const sp = await searchParams
  const params = normalizeParams(sp)

  return (
    <div className='w-full flex flex-col'>
      <Header title='Backup jobs' />
      <Suspense fallback={<BackupJobsPageSkeleton />}>
        <BackupJobsContent params={params} />
      </Suspense>
    </div>
  )
}

async function BackupJobsContent({ params }: { params: any }) {
  const api = await getRorApi()

  const fetchedBackupJobs = await fetchBackupJobs(api, params)
  const backupJobs = fetchedBackupJobs.backupJobs || []
  const backupRuns = await fetchBackupRunsForJobs(api, backupJobs)

  return <PageView backupJobs={backupJobs} backupRuns={backupRuns} params={params} />
}

function BackupJobsPageSkeleton() {
  return (
    <div className='px-12 mt-8 space-y-3 animate-pulse'>
      <div className='h-10 w-full rounded-md bg-muted' />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className='h-12 w-full rounded-md bg-muted/60' />
      ))}
    </div>
  )
}
