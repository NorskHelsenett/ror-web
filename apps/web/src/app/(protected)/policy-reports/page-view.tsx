'use client'

import { PolicyReport } from '@ror/js-api-client'
import { Params } from '@/types/resources-page'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import {
  getPolicyReportKey,
  getPolicyReportUid,
  groupPolicyReportsByCluster,
  getUniqueFilterValues,
} from '@/features/policy-report/utils/policy-report'
import { loadMorePolicyReports } from '@/features/policy-report/utils/policy-reports-actions'
import { useMemo, useState } from 'react'
import type { PolicyReportFilters } from '@/features/policy-report/utils/policy-report'
import { PolicyReportFilterBar } from '@/features/policy-report/components/policy-report-filter-bar'
import { ClusterPolicyReportCard } from '@/features/policy-report/components/cluster-policy-report-card'

interface PageViewProps {
  className?: string
  policyReports: PolicyReport[]
  clusterNameMap: Map<string, string>
  params: Params
}

const defaultFilters: PolicyReportFilters = { result: 'all', severity: 'all', category: 'all' }

export const PageView = ({ className, policyReports, clusterNameMap, params }: PageViewProps) => {
  const [filters, setFilters] = useState<PolicyReportFilters>(defaultFilters)

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<PolicyReport>({
    initial: policyReports,
    sort: params.sort,
    pageSize: 50,
    getItemId: getPolicyReportUid,
    getItemsKey: getPolicyReportKey,
    loadMore: async (offset, limit) => {
      const res = await loadMorePolicyReports({ offset, limit, sort: params.sort })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  const safeItems = useMemo(() => items.filter((c) => c.metadata?.uid), [items])

  const resultOptions = useMemo(() => getUniqueFilterValues(safeItems, 'result'), [safeItems])
  //const severityOptions = useMemo(() => getUniqueFilterValues(safeItems, 'severity'), [safeItems])
  const categoryOptions = useMemo(() => getUniqueFilterValues(safeItems, 'category'), [safeItems])

  const clusterGroups = useMemo(
    () => groupPolicyReportsByCluster(safeItems, filters, clusterNameMap),
    [safeItems, filters, clusterNameMap]
  )

  return (
    <div className={className}>
      <PolicyReportFilterBar
        filters={filters}
        onFilterChange={setFilters}
        resultOptions={resultOptions}
        categoryOptions={categoryOptions}
      />
      <div className='flex flex-col gap-4'>
        {clusterGroups.map((group) => (
          <ClusterPolicyReportCard key={group.clusterUid} group={group} filters={filters} />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} className='h-8' />}
      {isLoading && <p className='text-sm text-muted-foreground text-center py-4'>Loading…</p>}
    </div>
  )
}
