/*
 * FILE OVERVIEW:
 *
 * Server component that fetches and displays the list of Kubernetes clusters
 * for the authenticated user. Supports pagination, sorting, and filtering.
 * Renders the PageView component with fetched data.
 */

import { getRorApi } from '@/services/ror-api'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/app-shell/header'
import { normalizeParams } from '@/features/cluster/utils/normalize-params'
import { authGuard } from '@/features/auth/utils/auth-guard'
import { PageView } from './page-view'
import { ClusterListViewRowType } from '@ror/js-api-client'

export const metadata: Metadata = {
  title: 'ROR - Clusters',
  description: 'View clusters',
}

export const dynamic = 'force-dynamic'

/**
 * Renders the Clusters page for authenticated users.
 *
 * @param searchParams - A promise resolving to the search parameters from the URL.
 * @returns The rendered Clusters page as a React element.
 */
export default async function ClustersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await authGuard()
  const user = session.user
  const api = await getRorApi()

  const sp = await searchParams
  const params = normalizeParams(sp)
  const skip = (params.page - 1) * params.limit
  const listParams = new URLSearchParams()
  listParams.set('limit', String(params.limit))
  listParams.set('offset', String(skip))
  if (params.sort) listParams.set('sort', params.sort)

  const clusterList = await api.clusterListView.getClusterList(listParams)
  const clusters: ClusterListViewRowType[] = clusterList.rows

  return (
    <div className='w-full flex flex-col'>
      <Header title='Clusters' />

      <PageView user={user} clusters={clusters} params={params} />
    </div>
  )
}
