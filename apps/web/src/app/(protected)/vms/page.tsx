/**
 * VMs Page Component
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that serves as the main entry point for the Virtual Machines (VMs) page.
 * It handles authentication and initial VM data fetching. Backup data is hydrated client-side
 * via `useVmBackupJobsHydration` in page-view, so it does not block the initial render.
 */

import { Suspense } from 'react'
import PageView from './page-view'
import { Header } from '@/components/layout/app-shell/header'
import { normalizeParams, type NormalizeParamsResult } from '@/features/vms/utils/normalize-params'
import { fetchVms } from '@/features/vms/services/fetch-vms'
import { getRorApi } from '@/services/ror-api'
import type { Metadata } from 'next'
import { Loader } from 'lucide-react'

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

async function VMsContent({ params }: { params: NormalizeParamsResult }) {
  const api = await getRorApi()
  const fetchedVms = await fetchVms(api, params)

  return <PageView vms={fetchedVms.vms} params={params} />
}

function VMsPageSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 min-h-[60vh] gap-3'>
      <Loader className='h-6 w-6 animate-spin text-muted-foreground' />
      <span className='text-sm text-muted-foreground'>Loading virtual machines...</span>
    </div>
  )
}
