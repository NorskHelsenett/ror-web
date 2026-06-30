import type { Metadata } from 'next'
import { getRorApi } from '@/services/ror-api'
import { normalizeParams } from '@/features/policy-report/utils/normalize-params'
import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'

export const metadata: Metadata = {
  title: 'ROR - Policy Reports',
  description: 'View policy reports',
}

export const dynamic = 'force-dynamic'

export default async function PolicyReportsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const api = await getRorApi()

  const sp = await searchParams
  const params = normalizeParams(sp)
  const skip = (params.page - 1) * params.limit
  const listParams = new URLSearchParams()
  listParams.set('limit', String(params.limit))
  listParams.set('offset', String(skip))
  if (params.sort) listParams.set('sort', params.sort)

  const [policyReports, clusterList] = await Promise.all([
    api.policyReport.list(listParams),
    api.clusterListView.getClusterList(new URLSearchParams()),
  ])

  const clusterNameMap = new Map<string, string>()
  for (const row of clusterList?.rows ?? []) {
    const uid = row.clusterUid?.fieldValue
    const name = row.clusterName?.fieldValue
    if (uid && name) clusterNameMap.set(uid, name)
  }

  return (
    <div className='w-full flex flex-col'>
      <Header title='Policy reports' />
      <div className='p-6'>
        <PageView policyReports={policyReports?.resources ?? []} clusterNameMap={clusterNameMap} params={params} />
      </div>
    </div>
  )
}
