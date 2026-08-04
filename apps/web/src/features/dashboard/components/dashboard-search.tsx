'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Loader2, Boxes, Monitor } from 'lucide-react'
import { Input } from '@/components/shadcn/input'
import { FavoriteStar } from '@/components/ui/favorite-star'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useSearch } from '@/hooks/use-search'
import type { ClusterListViewRowType, VirtualMachine } from '@ror/js-api-client'
import { fetchAllClustersForSearch, searchVmsForDashboard } from '../utils/search-dashboard'
import { ResourceRegexSearch } from '@/components/ui/resource-regex-search'
import { cn } from '@/utils/clsxm'
import { getTeamIdentifier, getVmName, getVmPowerState, getVmUid } from '@/features/vms/utils/vms'
import { useRouter } from 'next/navigation'
import { routes } from '@/config/routes'
import { getClusterUidView } from '@/features/cluster/utils/cluster'

type Domain = 'cluster' | 'vms'

interface DashboardSearchProps {
  onFavorite?: () => void
}

export function DashboardSearch({ onFavorite }: DashboardSearchProps) {
  const router = useRouter()
  const [domain, setDomain] = useState<Domain>('cluster')
  const [clusterQuery, setClusterQuery] = useState('')
  const [vmQuery, setVmQuery] = useState('')
  const [vmField, setVmField] = useState('virtualmachine.spec.name')
  const [vmResetKey, setVmResetKey] = useState(0)

  const [allClusters, setAllClusters] = useState<ClusterListViewRowType[]>([])
  const [clustersFetched, setClustersFetched] = useState(false)
  const [loadingClusters, setLoadingClusters] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const [resultsOpen, setResultsOpen] = useState(true)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setResultsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [vmResults, setVmResults] = useState<VirtualMachine[]>([])
  const [loadingVms, setLoadingVms] = useState(false)

  const debouncedClusterQuery = useDebouncedValue(clusterQuery, 150)
  const debouncedVmQuery = useDebouncedValue(vmQuery, 300)

  useEffect(() => {
    if (domain === 'cluster' && !clustersFetched) {
      setLoadingClusters(true)
      fetchAllClustersForSearch()
        .then((res) => {
          setAllClusters(res)
          setClustersFetched(true)
        })
        .finally(() => setLoadingClusters(false))
    }
  }, [domain, clustersFetched])

  useEffect(() => {
    if (domain !== 'vms') return
    if (!debouncedVmQuery) {
      setVmResults([])
      return
    }
    setLoadingVms(true)
    searchVmsForDashboard(debouncedVmQuery, vmField)
      .then(setVmResults)
      .finally(() => setLoadingVms(false))
  }, [debouncedVmQuery, vmField, domain])

  const clusterResults = useSearch(allClusters, debouncedClusterQuery, {
    keys: ['clusterName.fieldValue', 'datacenter.fieldValue', 'environment.fieldValue', 'provider.fieldValue'],
    threshold: 0.3,
  })

  const showClusterResults = domain === 'cluster' && debouncedClusterQuery.length > 0
  const showVmResults = domain === 'vms' && (debouncedVmQuery.length > 0 || loadingVms)

  function handleDomainChange(newDomain: Domain) {
    setDomain(newDomain)
    setClusterQuery('')
    setVmQuery('')
    setVmResults([])
    setVmResetKey((k) => k + 1)
    setResultsOpen(true)
  }

  return (
    <div ref={containerRef} className='flex items-center gap-3'>
      {/* Domain toggle tabs */}
      <div className='flex items-center rounded-lg border p-1 gap-0.5 shrink-0'>
        <button
          type='button'
          onClick={() => handleDomainChange('cluster')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
            domain === 'cluster' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Boxes className='w-4 h-4' />
          Clusters
        </button>
        <button
          type='button'
          onClick={() => handleDomainChange('vms')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
            domain === 'vms' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Monitor className='w-4 h-4' />
          VMs
        </button>
      </div>

      {/* Search input + dropdown */}
      <div className='flex-1 relative'>
        {domain === 'cluster' ? (
          <Input
            className='w-full'
            value={clusterQuery}
            onChange={(e) => {
              setClusterQuery(e.target.value)
              setResultsOpen(true)
            }}
            onFocus={() => setResultsOpen(true)}
            placeholder='Find clusters...'
            aria-label='Search clusters'
            icon={loadingClusters ? <Loader2 className='w-4 h-4 animate-spin' /> : <Search className='w-4 h-4' />}
            iconPosition='left'
          />
        ) : (
          <ResourceRegexSearch
            key={vmResetKey}
            className='flex flex-1'
            fields={[
              { value: 'virtualmachine.spec.name', label: 'Name', placeholderLabel: 'name' },
              { value: 'virtualmachine.status.tags.team.description', label: 'Team', placeholderLabel: 'team' },
              {
                value: 'virtualmachine.status.tags.service-id.value',
                label: 'Service-id',
                placeholderLabel: 'service-id',
              },
            ]}
            defaultField='virtualmachine.spec.name'
            searchEntityLabel='VM'
            onFieldChange={setVmField}
            onQueryChange={(q) => {
              setVmQuery(q)
              setResultsOpen(true)
            }}
          />
        )}

        {/* Results list */}
        {resultsOpen && (showClusterResults || showVmResults) && (
          <div className='absolute z-50 top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg max-h-80 overflow-y-auto'>
            {showClusterResults &&
              (clusterResults.length === 0 ? (
                <p className='px-3 py-2 text-sm text-muted-foreground'>No clusters found</p>
              ) : (
                clusterResults.map((cluster) => {
                  const uid = cluster.clusterUid?.fieldValue
                  const name = cluster.clusterName?.fieldValue || 'Unknown cluster'
                  if (!uid) return null
                  return (
                    <div key={uid} className='flex items-center justify-between px-3 py-2 hover:bg-muted/50'>
                      <div>
                        <p
                          className='text-sm font-medium cursor-pointer hover:underline'
                          onClick={() => router.push(routes.app.cluster.getHref(getClusterUidView(cluster)))}
                        >
                          {name}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {[cluster.datacenter?.fieldValue, cluster.environment?.fieldValue]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      </div>
                      <FavoriteStar
                        scale='scale-50'
                        domain='cluster'
                        itemId={uid}
                        onUnfavorite={onFavorite}
                        onFavorite={onFavorite}
                      />
                    </div>
                  )
                })
              ))}

            {showVmResults &&
              (loadingVms ? (
                <div className='flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground'>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Searching...
                </div>
              ) : vmResults.length === 0 ? (
                <p className='px-3 py-2 text-sm text-muted-foreground'>No VMs found</p>
              ) : (
                vmResults.map((vm) => {
                  const uid = getVmUid(vm)
                  const name = getVmName(vm)
                  if (!uid) return null
                  return (
                    <div key={uid} className='flex items-center justify-between px-3 py-2 hover:bg-muted/50'>
                      <div>
                        <p
                          className='text-sm font-medium cursor-pointer hover:underline'
                          onClick={() => {
                            localStorage.setItem('selectedVm', JSON.stringify(vm))
                            router.push(routes.app.vm.getHref(getVmUid(vm)))
                          }}
                        >
                          {name}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {[getVmPowerState(vm), getTeamIdentifier(vm)].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                      <FavoriteStar
                        scale='scale-50'
                        domain='vms'
                        itemId={uid}
                        onUnfavorite={onFavorite}
                        onFavorite={onFavorite}
                      />
                    </div>
                  )
                })
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
