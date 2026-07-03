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
import { WorkspaceListViewsRowType } from '@ror/js-api-client'
import { matchClustersToWorkspaces } from '@/features/workspace/utils/workspace-actions'
import { PageView } from './page-view'

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
export default async function WorkspacePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const api = await getRorApi()

  const sp = await searchParams
  const params = normalizeParams(sp)
  const listParams = new URLSearchParams()
  if (params.sort) listParams.set('sort', params.sort)
  if (params.order) listParams.set('order', params.order)
  if (params.limit) listParams.set('limit', String(params.limit))
  if (params.page && params.limit) listParams.set('offset', String((params.page - 1) * params.limit))

  const workspaceList = await api.workspaceListView.getWorkspaceList(listParams)
  const workspaces: WorkspaceListViewsRowType[] = workspaceList.rows
  const workspacesWithClusters = await matchClustersToWorkspaces(workspaces)

  return (
    <div className='w-full flex flex-col'>
      <Header title='Workspaces' />

      <PageView
        className='p-6'
        workspaces={workspaces}
        params={params}
        workspacesWithClusters={workspacesWithClusters}
      />
    </div>
  )
}
