/**
 * VMs Page View Component
 * FILE OVERVIEW:
 * ------------------------
 * Renders the main content of the Virtual Machines (VMs) page, including controls for searching, filtering, sorting, and toggling between grid and list views.
 * It also manages the state for selected display data, filters, and search results.
 *
 * Key Features:
 * - Search functionality to filter VMs based on user input.
 * - Multi-select dropdowns for choosing which VM attributes to display and for filtering VMs by specific criteria.
 * - Sorting options to order VMs by various attributes in ascending or descending order.
 * - Toggle switch to open/close the filter section.
 * - View switcher to toggle between grid and list views of VMs.
 * - Pagination support for navigating through large sets of VMs in list view.
 *
 * The component uses React hooks for state management and side effects, and it leverages Next.js navigation features for URL management.
 */

'use client'

import { Option } from '@/components/shadcn/multiselect'
import {
  getVmOperatingSystemId,
  getVmUniqueKey,
  getVmName,
  getVmVersion,
  getVmOperatingSystem,
  getVmPowerState,
  getVmHostName,
  PageViewProps,
  getVmFamily,
  getVmArchitecture,
  getVmToolVersion,
  getVmsKey,
  getTeamIdentifier,
  comparePowerState,
  getVmDiskSizes,
  getSpecMemory,
  getSpecCpuTotal,
  getLocation,
} from '@/features/vms/utils/vms'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { cn } from '@/utils/clsxm'
import { SearchX } from 'lucide-react'
import { useMemo, useCallback, useState, useEffect } from 'react'
import { VMCard } from '@/features/vms/components/vm-card'
import { VMCardData } from '@/features/vms/types/vm-types'
import { displayDataOptions, sortingOptions } from '@/features/vms/config/page-view-options'
import { useDisplayData } from '@/hooks/use-display-data'
import { ResourceControls } from '@/components/ui/resource-controls'
import { exportVmsAsCSV, exportVmsAsExcel } from '@/features/vms/utils/export-helpers'
import { buildSortParams, buildToggledParams } from '@/utils/url-helpers'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFilters } from '@/hooks/use-filters'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { Badge } from '@/components/shadcn/badge'
import { DataTable } from '@/components/ui/data-table'
import { getVMTableColumns } from '@/features/vms/components/vm-columns'
import type { Machine, VirtualMachine } from '@ror/js-api-client'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { loadMoreVMs } from '@/utils/vms-actions'
import { VmFilterSection } from '@/features/vms/components/vm-filter-section'
import { getSpecificLocation } from '@/features/vms/hooks/use-vm-search'
import { getMockCreatedMachines, mergeMockCreatedMachines } from '@/features/machine/services/mock-machine-storage'

type ResourceType = 'virtualmachine' | 'machine'

const formatMachineMemory = (memory?: number | null) => {
  if (typeof memory !== 'number' || Number.isNaN(memory) || memory <= 0) return '—'

  if (memory >= 1024 * 1024) {
    return `${(memory / 1024 / 1024 / 1024).toFixed(1)} GiB`
  }

  return `${(memory / 1024).toFixed(1)} GiB`
}

const formatMachineCpu = (machine: Machine) => {
  const cpu = machine.machine?.spec?.cpu
  const cpuCount = machine.machine?.status?.cpus ?? cpu?.cores

  if (!cpuCount) return '—'

  const topology = [cpu?.sockets, cpu?.cores, cpu?.threadsPerCore].every((value) => typeof value === 'number')
    ? `${cpu?.sockets}S/${cpu?.cores}C/${cpu?.threadsPerCore}T`
    : null

  return topology ? `${cpuCount} vCPU • ${topology}` : `${cpuCount} vCPU`
}

const formatMachineStorage = (machine: Machine) => {
  const disks = machine.machine?.spec?.disks ?? []

  if (disks.length === 0) return '—'

  const totalDiskSize = disks.reduce((sum, disk) => sum + (disk.sizeGB ?? 0), 0)
  return `${totalDiskSize} GB across ${disks.length} disk${disks.length === 1 ? '' : 's'}`
}

const MachineStatusBadge = ({ value }: { value?: string | null }) => {
  const label = value ?? 'Unknown'
  const v = label.toLowerCase()

  if (v === 'running' || v === 'ready' || v === 'true') {
    return (
      <Badge className='border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200'>
        {label}
      </Badge>
    )
  }
  if (v === 'provisioning' || v === 'creating' || v === 'pending') {
    return (
      <Badge className='border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200'>
        {label}
      </Badge>
    )
  }
  if (v === 'stopped' || v === 'false' || v === 'failed') {
    return (
      <Badge className='border-red-300 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300'>
        {label}
      </Badge>
    )
  }
  return <Badge variant='outline'>{label}</Badge>
}

export const PageView = ({ className, vms, machines, params }: PageViewProps) => {
  const searchParams = useSearchParams()
  const [resourceType, setResourceType] = useState<ResourceType>(
    searchParams.get('resource') === 'machine' ? 'machine' : 'virtualmachine'
  )
  const isCreating = searchParams.get('creating-vm') === 'true'
  const [createdMachines, setCreatedMachines] = useState<Machine[]>([])
  const [showCreatingBanner, setShowCreatingBanner] = useState(isCreating)
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '.'
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const syncCreatedMachines = () => {
      setCreatedMachines(getMockCreatedMachines())
    }

    syncCreatedMachines()
    window.addEventListener('storage', syncCreatedMachines)

    return () => window.removeEventListener('storage', syncCreatedMachines)
  }, [])

  const filtersOpen = params.filterPanel === 'open'
  const [searchResetKey, setSearchResetKey] = useState(0)

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<VirtualMachine | VMWithBackupStatus>({
    initial: vms,
    sort: params.sort,
    pageSize: 50,
    getItemId: getVmUniqueKey,
    getItemsKey: getVmsKey,
    loadMore: async (offset, limit) => {
      const currentSearch = new URLSearchParams(window.location.search).get('search')?.trim() || undefined
      const res = await loadMoreVMs({
        offset,
        limit,
        sort: params.sort,
        order: params.order,
        search: currentSearch,
      })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  const safeItems = useMemo(
    () => items.filter((c) => getVmOperatingSystem(c) && typeof getVmOperatingSystem(c) === 'object'),
    [items]
  )

  const filterDefinitions = [
    { key: 'Power States', extractor: (vm: VirtualMachine | VMWithBackupStatus) => getVmPowerState(vm) },
    {
      key: 'Location',
      extractor: (vm: VirtualMachine | VMWithBackupStatus) => {
        const location = getLocation(vm)
        return location?.split(' ')[0]
      },
    },
    { key: 'Teams', extractor: (vm: VirtualMachine | VMWithBackupStatus) => getTeamIdentifier(vm) },
    {
      key: 'Backup',
      extractor: (vm: VirtualMachine | VMWithBackupStatus) => {
        if ('backupStatus' in vm) {
          const backupStatus = vm.backupStatus as { hasBackupJob: boolean; hasBackupRun: boolean }
          if (backupStatus.hasBackupJob && backupStatus.hasBackupRun) return 'activeBackup'
          if (backupStatus.hasBackupRun) return 'historicalBackup'
          if (backupStatus.hasBackupJob) return 'configuredBackup'
          return 'noBackup'
        }
        return 'noBackup'
      },
    },
  ]
  const definitions: SortDefinition<VirtualMachine | VMWithBackupStatus>[] = [
    { key: 'hostName', extractor: (vm) => getVmHostName(vm) },
    { key: 'name', extractor: (vm) => getVmName(vm) },
    { key: 'id', extractor: (vm) => getVmOperatingSystemId(vm) },
    { key: 'family', extractor: (vm) => getVmFamily(vm) },
    { key: 'architecture', extractor: (vm) => getVmArchitecture(vm) },
    { key: 'version', extractor: (vm) => getVmVersion(vm) },
    { key: 'toolVersion', extractor: (vm) => getVmToolVersion(vm) },
    { key: 'powerState', extractor: getVmPowerState, compareFn: comparePowerState },
    { key: 'team', extractor: (vm) => getTeamIdentifier(vm) },
    { key: 'disk-usage', extractor: (vm) => getVmDiskSizes(vm).reduce((a, b) => a + b, 0) },
    { key: 'memory', extractor: (vm) => getSpecMemory(vm) },
    { key: 'cpu', extractor: (vm) => getSpecCpuTotal(vm) },
    {
      key: 'activeBackup',
      extractor: (vm) => {
        if ('backupStatus' in vm) {
          const backupStatus = vm.backupStatus as { hasBackupJob: boolean; hasBackupRun: boolean }
          if (backupStatus.hasBackupJob && backupStatus.hasBackupRun) return 1 // Active backup
          if (backupStatus.hasBackupRun) return 2 // Historical backup
          if (backupStatus.hasBackupJob) return 3 // Configured backup
          return 4 // No backup
        }
        return 4 // No backup data
      },
      compareFn: (a, b) => {
        const getBackupPriority = (vm: VirtualMachine | VMWithBackupStatus) => {
          if ('backupStatus' in vm) {
            const backupStatus = vm.backupStatus as { hasBackupJob: boolean; hasBackupRun: boolean }
            if (backupStatus.hasBackupJob && backupStatus.hasBackupRun) return 1 // Active backup (highest priority)
            if (backupStatus.hasBackupRun) return 2 // Historical backup
            if (backupStatus.hasBackupJob) return 3 // Configured backup
            return 4 // No backup
          }
          return 4 // No backup data
        }

        return getBackupPriority(a) - getBackupPriority(b)
      },
    },
  ]
  const { selectedFilters, setSelectedFilters, filteredItems, resetFilters } = useFilters<
    VirtualMachine | VMWithBackupStatus
  >(safeItems, filterDefinitions)
  const { selectedDisplayData, setSelectedDisplayData } = useDisplayData<VMCardData>('vms')

  const sortedItems = useSorting({ items: filteredItems, sortKey: params.sort, sortOrder: params.order, definitions })

  // Handler for display data changes
  const onDisplayChange = (selected: Option[]) => setSelectedDisplayData(selected.map((i) => i.value as VMCardData))

  const pathname = usePathname()
  const router = useRouter()
  const isSearching = searchParams.get('search')?.trim() || undefined

  const updateFiltersInUrl = useCallback(
    (searchQuery: string) => {
      const next = new URLSearchParams(searchParams.toString())
      const q = (searchQuery ?? '').trim()

      if (q) next.set('search', q)
      else next.delete('search')

      next.delete('page')
      router.replace(`${pathname}?${next.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const handleSearchResultsChange = useCallback(
    (_results: (VirtualMachine | VMWithBackupStatus)[], searchQuery?: string) => {
      if (typeof searchQuery === 'string') {
        updateFiltersInUrl(searchQuery)
      }
    },
    [updateFiltersInUrl]
  )

  const clearUrl = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  const handleRefreshFilters = useCallback(() => {
    resetFilters()
    setSelectedDisplayData([])
    clearUrl()
    setSearchResetKey((k) => k + 1)
  }, [resetFilters, setSelectedDisplayData, clearUrl])

  useEffect(() => {
    if (!isCreating) return

    const timer = setTimeout(() => {
      setShowCreatingBanner(false)
      router.replace(pathname, { scroll: false })
    }, 10000)

    return () => clearTimeout(timer)
  }, [isCreating, pathname, router])

  // ---------- Toggle/Sort params ----------
  const toggleParams = useMemo(() => buildToggledParams(params, 'filterPanel', 'open', 'vms').url, [params])
  const toggleSortParams = useMemo(() => buildSortParams(params, 'vms'), [params])

  const displayedItems = sortedItems
  const displayedMachines = useMemo(
    () => mergeMockCreatedMachines(machines, createdMachines),
    [machines, createdMachines]
  )
  const creatingResourceLabel = searchParams.get('resource') === 'machine' ? 'Machine' : 'VM'

  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <ResourceControls
        safeItems={safeItems}
        searchText='Find VMs...'
        selectedDisplayData={selectedDisplayData}
        onDisplayChange={onDisplayChange}
        onSearchResultsChange={handleSearchResultsChange}
        searchResetKey={searchResetKey}
        displayDataOptions={displayDataOptions}
        params={params}
        toggleSortParams={toggleSortParams}
        filtersOpen={filtersOpen}
        toggleParams={toggleParams}
        handleRefreshFilters={handleRefreshFilters}
        domain='vms'
        sortingOptions={sortingOptions}
        searchKeys={['label', 'hostName', 'powerState', 'family', 'location']}
        mapItem={(vm) => ({
          ...vm,
          label: vm.metadata?.name ?? vm.virtualmachine?.spec?.name,
          hostName: getVmHostName(vm),
          powerState: getVmPowerState(vm),
          family: getVmFamily(vm),
          location: getLocation(vm),
          fullLocation: getSpecificLocation(getLocation(vm) || ''),
        })}
        getItemsKey={getVmsKey}
        exportAsCSV={exportVmsAsCSV}
        exportAsExcel={exportVmsAsExcel}
        allItems={items}
        filteredItems={filteredItems}
      />
    </div>
  )

  if (safeItems.length === 0) {
    return (
      <div className={cn(className, '@container')}>
        <div className={cn('border-b', filtersOpen && 'pb-2')}>
          <div className={cn('mx-12 flex items-center min-h-28 py-6 ', filtersOpen && 'w-[calc(100%-6rem)] border-b')}>
            {renderControls()}
          </div>
          <VmFilterSection
            filtersOpen={filtersOpen}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-4 py-24 text-center text-muted-foreground'>
          <SearchX className='size-12 opacity-40' strokeWidth={1.5} />
          <div className='flex flex-col gap-1'>
            <h3 className='text-lg font-semibold text-foreground'>No VMs found</h3>
            <p className='text-sm'>Try adjusting your search or filters to find what you&apos;re looking for.</p>
          </div>
          {(isSearching || Object.values(selectedFilters).some((v) => v.length > 0)) && (
            <div className='mt-2 flex flex-col items-center gap-3'>
              {isSearching && (
                <p className='text-xs'>
                  Searching for: <span className='font-medium text-foreground'>&quot;{isSearching}&quot;</span>
                </p>
              )}
              {Object.values(selectedFilters).some((v) => v.length > 0) && (
                <p className='text-xs'>
                  {Object.entries(selectedFilters)
                    .filter(([, v]) => v.length > 0)
                    .map(([key]) => key)
                    .join(', ')}{' '}
                  filters active
                </p>
              )}
              <button
                onClick={() => {
                  handleRefreshFilters()
                }}
                className='mt-1 rounded-md border border-border bg-background px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted'
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const GridView = () => {
    return (
      <div>
        <div className='flex flex-row flex-wrap gap-6'>
          {displayedItems.map((vm, vmIdx) => (
            <div key={getVmHostName(vm) || vmIdx}>
              <VMCard
                vm={vm}
                vmDisplayData={
                  selectedDisplayData.length > 0
                    ? selectedDisplayData
                    : displayDataOptions
                        .filter((opt) => !['version'].includes(opt.value))
                        .map((opt) => opt.value as VMCardData) || []
                }
              />
            </div>
          ))}
          <div ref={sentinelRef} className='h-px w-full' />
        </div>
        {isLoading && !isSearching && <div style={{ textAlign: 'center', padding: 16 }}>Loading...</div>}
        {!hasMore && <div style={{ textAlign: 'center', padding: 16, color: '#888' }}>All VMs are loaded.</div>}
      </div>
    )
  }

  const TableView = () => {
    return (
      <div>
        <DataTable
          data={displayedItems}
          columns={getVMTableColumns(selectedDisplayData)}
          hasMore={hasMore}
          isLoading={isLoading && !isSearching}
          sentinelRef={sentinelRef}
        />
      </div>
    )
  }

  const MachineView = () => (
    <div className='flex flex-col gap-4'>
      {displayedMachines.length === 0 ? (
        <p className='text-muted-foreground text-sm'>No machines found.</p>
      ) : (
        <div className='overflow-hidden rounded-xl border bg-background shadow-sm'>
          <div className='border-b bg-muted/30 px-5 py-4'></div>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[1100px] text-sm'>
              <thead>
                <tr className='border-b bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground'>
                  <th className='px-5 py-3 text-left font-semibold'>Machine</th>
                  <th className='px-4 py-3 text-left font-semibold'>Status</th>
                  <th className='px-4 py-3 text-left font-semibold'>Compute</th>
                  <th className='px-4 py-3 text-left font-semibold'>Location</th>
                  <th className='px-4 py-3 text-left font-semibold'>Network</th>
                  <th className='px-5 py-3 text-left font-semibold'>Metadata</th>
                </tr>
              </thead>
              <tbody>
                {displayedMachines.map((machine, idx) => (
                  <tr
                    key={machine.metadata?.uid ?? machine.metadata?.name ?? idx}
                    className={cn(
                      'border-b align-top transition-colors',
                      machine.metadata?.namespace === 'mock-machines' && 'bg-primary/5'
                    )}
                  >
                    <td className='px-5 py-4'>
                      <div className='flex flex-col gap-1.5'>
                        <div className='flex items-center gap-2'>
                          <span className='font-mono text-xs text-foreground'>{machine.metadata?.name ?? '—'}</span>
                          {machine.metadata?.namespace === 'mock-machines' && (
                            <Badge className='border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200'>
                              New
                            </Badge>
                          )}
                        </div>
                        <div className='text-sm font-medium text-foreground'>
                          {machine.machine?.spec?.machineClass ?? '—'} / {machine.machine?.spec?.machineType ?? '—'}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Namespace: {machine.metadata?.namespace ?? '—'}
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex flex-col gap-2'>
                        <div className='flex flex-wrap gap-2'>
                          <MachineStatusBadge value={machine.machine?.status?.phase} />
                          <MachineStatusBadge value={machine.machine?.status?.state} />
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Condition: {machine.machine?.status?.conditions?.[0]?.type ?? '—'}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          {machine.machine?.status?.message ?? 'No status message'}
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex flex-col gap-1.5'>
                        <div className='font-medium text-foreground'>{formatMachineCpu(machine)}</div>
                        <div className='text-xs text-muted-foreground'>
                          Memory:{' '}
                          {formatMachineMemory(machine.machine?.status?.memory ?? machine.machine?.spec?.memory)}
                        </div>
                        <div className='text-xs text-muted-foreground'>Storage: {formatMachineStorage(machine)}</div>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex flex-col gap-1.5'>
                        <div className='font-medium text-foreground'>
                          {machine.machine?.status?.provider ?? machine.machine?.spec?.provider ?? '—'}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          {machine.machine?.status?.region ?? machine.machine?.spec?.providerConfig?.region ?? '—'}
                          {' / '}
                          {machine.machine?.status?.zone ?? machine.machine?.spec?.providerConfig?.zone ?? '—'}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Host: {machine.machine?.status?.hostname ?? '—'}
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex flex-col gap-1.5'>
                        <div className='font-medium text-foreground'>
                          {machine.machine?.spec?.network?.vpc ?? '—'} / {machine.machine?.spec?.network?.subnet ?? '—'}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Private IP:{' '}
                          {machine.machine?.spec?.network?.privateIP ||
                            machine.machine?.status?.privateIPAddresses?.[0] ||
                            '—'}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Public IP:{' '}
                          {machine.machine?.spec?.network?.publicIP ||
                            machine.machine?.status?.publicIPAddresses?.[0] ||
                            '—'}
                        </div>
                      </div>
                    </td>
                    <td className='px-5 py-4'>
                      <div className='flex flex-col gap-1.5'>
                        <div className='text-xs text-muted-foreground'>UID: {machine.metadata?.uid ?? '—'}</div>
                        <div className='text-xs text-muted-foreground'>
                          Owner: {machine.rormeta?.ownerref?.subject ?? '—'}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Backup: {machine.machine?.spec?.backup?.enabled ? 'Enabled' : 'Disabled'}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )

  const renderResourceToggle = () => (
    <div className='flex items-center gap-1 rounded-md border bg-muted p-1'>
      <button
        onClick={() => setResourceType('virtualmachine')}
        className={cn(
          'rounded px-3 py-1 text-sm font-medium transition-colors',
          resourceType === 'virtualmachine'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Virtual Machines
      </button>
      <button
        onClick={() => setResourceType('machine')}
        className={cn(
          'rounded px-3 py-1 text-sm font-medium transition-colors',
          resourceType === 'machine'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Machines
        {displayedMachines.length > 0 && (
          <span className='ml-2 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary'>
            {displayedMachines.length}
          </span>
        )}
      </button>
    </div>
  )

  return (
    <div className={cn(className, '@container')}>
      <div className={cn('border-b', filtersOpen && 'pb-2')}>
        <div className={cn('mx-12 flex items-center min-h-28 py-6 ', filtersOpen && 'w-[calc(100%-6rem)] border-b')}>
          {renderControls()}
        </div>
        <VmFilterSection
          filtersOpen={filtersOpen}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        {renderResourceToggle()}
      </div>

      {showCreatingBanner && (
        <div className='mx-12 my-6 border-3 rounded-md bg-blue-400 dark:bg-blue-500 border-blue-600 dark:border-blue-700 text-black px-4 py-2'>
          {creatingResourceLabel} is being created {dots}
        </div>
      )}

      {!showCreatingBanner && (
        <NotReadyMessage className='mx-12 my-6'>
          Welcome to the new ROR web! This site is currently under development, so feel free to look around, but do not
          expect finished functionality or that all data is present. The development team is working hard on delivering
          a complete product as quick as possible :)
        </NotReadyMessage>
      )}

      <section className='px-12 my-8'>
        {resourceType === 'machine' ? <MachineView /> : params.view === 'list' ? <TableView /> : <GridView />}
      </section>
    </div>
  )
}

export default PageView
