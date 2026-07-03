'use client'

import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { cn } from '@/utils/clsxm'
import { Params } from '@/types/resources-page'
import { WorkspaceListViewsRowType } from '@ror/js-api-client'
import { getWorkspaceKey, getWorkspaceUidView } from '@/features/workspace/utils/workspace'
import { loadMoreWorkspaces, WorkspaceWithClusters } from '@/features/workspace/utils/workspace-actions'
import { useMemo } from 'react'
import { WorkspaceRowCard } from '@/features/workspace/components/workspace-row-card'

/**
 * Props for the PageView component.
 *
 * @property {string} [className] - Optional CSS class name for custom styling.
 * @property {User} user - The current user object.
 * @property {ClusterListViewRowType[]} clusters - Array of Kubernetes clusters to display.
 * @property {Params} params - Route or query parameters relevant to the page view.
 */
interface PageViewProps {
  className?: string
  workspaces: WorkspaceListViewsRowType[]
  workspacesWithClusters: WorkspaceWithClusters[]
  params: Params
}

/**
 * @param className - Optional CSS class name for the root container.
 * @param workspaces - Initial list of Workspaces to display.
 * @param params
 *
 * @returns The rendered page view component.
 */
export const PageView = ({ className, workspaces, workspacesWithClusters, params }: PageViewProps) => {
  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<WorkspaceListViewsRowType>({
    initial: workspaces,
    sort: params.sort,
    pageSize: 50,
    getItemId: getWorkspaceUidView,
    getItemsKey: getWorkspaceKey,
    loadMore: async (offset, limit) => {
      const res = await loadMoreWorkspaces({ offset, limit, sort: params.sort })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  const safeItems = useMemo(() => items.filter((c) => c.workspaceUid), [items])

  return (
    <div className={cn(className, '@container')}>
      <div className='flex flex-col gap-4'>
        {safeItems.map((group, index) => {
          const key = getWorkspaceUidView(group) || `workspace-${index}`
          return (
            <WorkspaceRowCard
              key={key}
              group={group}
              workspaceWithClusters={workspacesWithClusters.find(
                (wsc) => wsc.workspace.workspaceUid?.fieldValue === group.workspaceUid?.fieldValue
              )}
            />
          )
        })}
      </div>
      {hasMore && <div ref={sentinelRef} className='h-8' />}
      {isLoading && <p className='text-sm text-muted-foreground text-center py-4'>Loading…</p>}
    </div>
  )
}
