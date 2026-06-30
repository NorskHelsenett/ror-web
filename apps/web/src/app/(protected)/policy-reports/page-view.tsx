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
import { ReleaseSpotlight } from '@/components/ui/release-spotlight'

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
      {/* Step 1: The whole controls bar */}
      <ReleaseSpotlight
        releaseId='policy-reports-page'
        step={1}
        totalSteps={3}
        title='Search, sort and filter'
        description='Search on cluster name, sort by name or failures, and use the filter panel to narrow results by result, severity, and category.'
        side='bottom'
        align='start'
        className='mb-6'
      >
        <div className='flex items-center gap-3'>
          <ClusterGroupSearch items={clusterGroups} onResultsChange={setFilteredClusterGroups} />
          <ClusterGroupSort value={sortBy} onChange={setSortBy} />
          {/* Step 2: Spotlight specifically on the filter toggle */}
          <ReleaseSpotlight
            releaseId='policy-reports-page'
            step={2}
            totalSteps={3}
            title='Open filters'
            description='Click here to open the filter panel and narrow down results by result, severity, and category.'
            side='left'
            align='end'
          >
            <Toggle
              pressed={filtersOpen}
              onPressedChange={setFiltersOpen}
              variant='outline'
              aria-label={filtersOpen ? 'Close filters' : 'Open filters'}
            >
              <Funnel aria-hidden className='-mr-1' />
              {filtersOpen ? 'Close' : 'Open'} filters
            </Toggle>
          </ReleaseSpotlight>
        </div>
      </ReleaseSpotlight>
      {filtersOpen && (
        <PolicyReportFilterBar
          filters={filters}
          onFilterChange={setFilters}
          resultOptions={resultOptions}
          categoryOptions={categoryOptions}
        />
      )}
      {/* Step 3: The policy report cards */}
      <ReleaseSpotlight
        releaseId='policy-reports-page'
        step={3}
        totalSteps={3}
        title='Policy report cards'
        description='Each card shows policy reports grouped by cluster. Expand a card to see the full list of reports and their result status.'
        side='top'
        align='start'
      >
        <div className='flex flex-col gap-4'>
          {sortedGroups.map((group) => (
            <ClusterPolicyReportCard key={group.clusterUid} group={group} filters={filters} />
          ))}
        </div>
      </ReleaseSpotlight>
      {hasMore && <div ref={sentinelRef} className='h-8' />}
      {isLoading && <p className='text-sm text-muted-foreground text-center py-4'>Loading…</p>}
    </div>
  )
}
