/**
 * VMs Page Component
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that serves as the main entry point for the Virtual Machines (VMs) page.
 * It handles authentication, data fetching, and rendering of the page layout.
 */

import { Suspense } from 'react'
import PageView from './page-view'
import { Header } from '@/components/layout/app-shell/header'
import { normalizeParams } from '@/features/vms/utils/normalize-params'
import { fetchVms } from '@/features/vms/services/fetch-vms'
import { fetchBackupJobs } from '@/features/vms/backup/services/fetch-backupJobs'
import { fetchBackupRuns } from '@/features/vms/backup/services/fetch-backupRuns'
import { fetchBackupRunsForJobs } from '@/features/vms/backup/services/fetch-backupRuns-for-jobs'
import { mapBackupToVM } from '@/features/vms/backup/utils/map-backup-to-vm'
import { getRorApi } from '@/services/ror-api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROR - VM',
  description: 'View virtual machines',
}

export const dynamic = 'force-dynamic'

export default async function VMPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const params = normalizeParams(sp)

  return (
    <div className='w-full flex flex-col'>
      <Header title='Virtual machines' />
      <Suspense fallback={<VMsPageSkeleton />}>
        <VMsContent params={params} />
      </Suspense>
    </div>
  )
}

async function VMsContent({ params }: { params: any }) {
  const api = await getRorApi()

  const [fetchedVms, fetchedBackupJobs, fetchedBackupRuns] = await Promise.all([
    fetchVms(api, params),
    fetchBackupJobs(api, params).catch(() => ({ backupJobs: [] })),
    fetchBackupRuns(api, { page: 1, limit: 500, order: 'desc' }).catch(() => ({ backupRuns: [] })),
  ])

  const vms = fetchedVms.vms
  const backupJobs = fetchedBackupJobs.backupJobs || []
  const initialBackupRuns = [...(fetchedBackupRuns.backupRuns || [])]
  let mergedBackupRuns = initialBackupRuns

  try {
    const jobSpecificRuns = await fetchBackupRunsForJobs(api, backupJobs).catch(() => [])
    const runIdSet = new Set(initialBackupRuns.map((r) => r?.backuprun?.id))
    const extraRuns = []

    for (const run of jobSpecificRuns) {
      const runId = run?.backuprun?.id
      if (runId && !runIdSet.has(runId)) {
        extraRuns.push(run)
      }
    }

    mergedBackupRuns = [...initialBackupRuns, ...extraRuns]
  } catch (error) {
    console.error('Error fetching job-specific backup runs:', error)
  }

  const vmsWithBackup = mapBackupToVM(vms, backupJobs, mergedBackupRuns)

  return <PageView vms={vmsWithBackup} params={params} />
}

function VMsPageSkeleton() {
  return (
    <div className='px-12 mt-8 space-y-3 animate-pulse'>
      <div className='h-10 w-full rounded-md bg-muted' />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className='h-12 w-full rounded-md bg-muted/60' />
      ))}
    </div>
  )
}
