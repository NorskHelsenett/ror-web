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
import type { PolicyReportFilters, ClusterGroup } from '@/features/policy-report/types/policy-report-types'
import { PolicyReportFilterBar } from '@/features/policy-report/components/policy-report-filter-bar'
import type { ClusterGroupSortBy } from '@/features/policy-report/components/policy-report-filter-bar'
import { ClusterPolicyReportCard } from '@/features/policy-report/components/cluster-policy-report-card'
import { ClusterGroupSearch } from '@/features/policy-report/components/cluster-group-search'
import { ClusterGroupSort } from '@/features/policy-report/components/cluster-group-sort'
import { Toggle } from '@/components/shadcn/toggle'
import { Funnel } from 'lucide-react'

interface PageViewProps {
  className?: string
  policyReports: PolicyReport[]
  clusterNameMap: Map<string, string>
  params: Params
}

const defaultFilters: PolicyReportFilters = { result: 'all', severity: 'all', category: 'all' }

export const PageView = ({ className, policyReports, clusterNameMap, params }: PageViewProps) => {
  const [filters, setFilters] = useState<PolicyReportFilters>(defaultFilters)
  const [sortBy, setSortBy] = useState<ClusterGroupSortBy>('name-asc')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filteredClusterGroups, setFilteredClusterGroups] = useState<ClusterGroup[]>([])

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

  const sortedGroups = useMemo(() => {
    const copy = [...filteredClusterGroups]
    switch (sortBy) {
      case 'name-asc':
        return copy.sort((a, b) => a.clusterName.localeCompare(b.clusterName))
      case 'name-desc':
        return copy.sort((a, b) => b.clusterName.localeCompare(a.clusterName))
      case 'failures-desc':
        return copy.sort((a, b) => b.summary.fail - a.summary.fail)
      case 'failures-asc':
        return copy.sort((a, b) => a.summary.fail - b.summary.fail)
    }
  }, [filteredClusterGroups, sortBy])

  return (
    <div className={className}>
      <div className='flex items-center gap-3 mb-6'>
        <ClusterGroupSearch items={clusterGroups} onResultsChange={setFilteredClusterGroups} />
        <ClusterGroupSort value={sortBy} onChange={setSortBy} />
        <Toggle
          pressed={filtersOpen}
          onPressedChange={setFiltersOpen}
          variant='outline'
          aria-label={filtersOpen ? 'Close filters' : 'Open filters'}
        >
          <Funnel aria-hidden className='-mr-1' />
          {filtersOpen ? 'Close' : 'Open'} filters
        </Toggle>
      </div>
      {filtersOpen && (
        <PolicyReportFilterBar
          filters={filters}
          onFilterChange={setFilters}
          resultOptions={resultOptions}
          categoryOptions={categoryOptions}
        />
      )}
      <div className='flex flex-col gap-4'>
        {sortedGroups.map((group) => (
          <ClusterPolicyReportCard key={group.clusterUid} group={group} filters={filters} />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} className='h-8' />}
      {isLoading && <p className='text-sm text-muted-foreground text-center py-4'>Loading…</p>}
    </div>
  )
}
