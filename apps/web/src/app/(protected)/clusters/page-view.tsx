// /**
//  * Cluster Management Component
//  *
//  * FILE OVERVIEW
//  * ----------------------
//  * This file contains the main React component for displaying and managing clusters in the ROR web application.
//  *
//  * Features:
//  * - Grid and list views for clusters (switchable)
//  * - Infinite scroll with lazy loading: get more clusters from the API when the user tends to scroll down
//  * - Filtering and sorting of clusters by various criteria
//  * - Export functionality (CSV/Excel) for all or filtered clusters
//  * - Responsive controls for search, filters, sorting, and view switching
//  *
//  * Key Sections:
//  * - Imports: UI components, hooks, types, utilities
//  * - Props and types: PageViewProps, Params, Option
//  * - State and hooks: cluster data, filters, pagination, virtualization
//  * - Utility functions: export, fetch, filtering, sorting
//  * - Render logic: controls, filter section, cluster table/grid, pagination info
//  *
//  * For developer orientation:
//  * - The main export is PageView, which handles all cluster display logic
//  * - Filtering, sorting, and export logic are modular and easy to extend
//  * - Comments throughout the file explain major blocks and logic
//  */

// 'use client'

// import { ClusterCard, ClusterCardDisplayData } from '@/components/ui/cluster/cluster-card'
// import { SortSelect } from '@/components/ui/sort-select'
// import { TabsViewSwitcher } from '@/components/ui/tabs-view-switcher'
// import { ClustersTable } from './cluster-table'
// import { CodeSnippet } from '@ror/react'
// import { Toggle } from '@/components/shadcn/toggle'
// import { Button } from '@/components/shadcn/button'
// import MultipleSelector, { Option } from '@/components/shadcn/multiselect'
// import { ArrowDownNarrowWide, ArrowDownWideNarrow, Download, Funnel, RotateCw } from 'lucide-react'
// import { cn } from '@/utils/clsxm'
// import Link from 'next/link'
// import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import type { KubernetesCluster } from '@ror/js-api-client'
// import { ClusterSearch } from '@/components/ui/cluster/cluster-search'
// import { User } from 'next-auth'
// import { useRouter, usePathname } from 'next/navigation'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/shadcn/dropdown-menu'
// import type { WorkSheet } from 'xlsx'

// interface Params {
//   view?: 'grid' | 'list'
//   page?: number
//   limit?: number
//   sort?: string
//   order?: 'asc' | 'desc'
//   filters?: string
// }

// interface PageViewProps {
//   className?: string
//   user: User
//   clusters: KubernetesCluster[]
//   params: Params
// }

// const displayDataOptions: Option[] = [
//   { value: 'argocd', label: 'ArgoCD' },
//   { value: 'grafana', label: 'Grafana' },
//   { value: 'rorcli', label: 'ROR CLI' },
//   { value: 'kubectl', label: 'Kubectl' },
//   { value: 'cpu', label: 'CPU usage' },
//   { value: 'memory', label: 'Memory usage' },
//   { value: 'gpu', label: 'GPU usage' },
//   { value: 'disk', label: 'Disk usage' },
//   { value: 'nodes', label: 'Num of nodes' },
//   { value: 'monthlyPrice', label: 'Monthly price' },
//   { value: 'yearlyPrice', label: 'Yearly price' },
//   { value: 'agentVersion', label: 'ROR agent version' },
//   { value: 'kubernetesVersion', label: 'Kubernetes version' },
//   { value: 'toolingVersion', label: 'NHN tooling version' },
//   { value: 'datacenterName', label: 'Datacenter name' },
//   { value: 'datacenterProvider', label: 'Datacenter provider' },
//   { value: 'environment', label: 'Environment' },
//   { value: 'serviceTags', label: 'Service tags' },
// ]

// const sortingOptions = [
//   { value: 'clusterName', label: 'Cluster name' },
//   { value: 'cpu', label: 'CPU usage' },
//   { value: 'memory', label: 'Memory usage' },
//   { value: 'nodes', label: 'Num of nodes' },
//   { value: 'monthlyPrice', label: 'Price' },
//   { value: 'datacenterName', label: 'Datacenter' },
//   { value: 'datacenterProvider', label: 'Datacenter provider' },
//   { value: 'environment', label: 'Environment' },
// ]

// const environments: Option[] = [
//   { value: 'dev', label: 'Dev' },
//   { value: 'test', label: 'Test' },
//   { value: 'staging', label: 'Staging' },
//   { value: 'prod', label: 'Prod' },
//   { value: 'qa', label: 'QA' },
// ]

// // TODO: Fetch this from somewhere
// const datacenters: Option[] = [
//   { value: 'trd1-tanzu', label: 'trd1 - tanzu' },
//   { value: 'osl1-tanzu', label: 'osl1 - tanzu' },
//   { value: 'trd1cl02-tanzu', label: 'trd1cl02 - tanzu' },
//   { value: 'norwayeast-aks', label: 'norwayeast - aks' },
//   { value: 'trd1-talos', label: 'trd1 - talos' },
// ]

// // TODO: Fetch this from somewhere
// const workspaces: Option[] = [
//   { value: 'trd1-amk-prod', label: 'trd1-amk-prod' },
//   { value: 'trd1cl02-shp-prod', label: 'trd1cl02-shp-prod' },
//   { value: 'trd1cl02-dcn', label: 'trd1cl02-dcn' },
//   { value: 't-nhn', label: 't-nhn' },
//   { value: 'trd1-amk', label: 'trd1-amk' },
//   { value: 'trd1-app', label: 'trd1-app' },
//   { value: 'trd1-team-kjernejournal-portal', label: 'trd1-team-kjernejournal-portal' },
// ]

// const filterOptions = [
//   { label: 'Environments', placeholder: 'Set environments', data: environments },
//   { label: 'Datacenters', placeholder: 'Set datacenters', data: datacenters },
//   { label: 'Workspaces', placeholder: 'Set workspaces', data: workspaces },
// ]

// type WorksheetWithCols = WorkSheet & { ['!cols']?: { wch: number }[] }
// type RorTag = { key?: string; value?: string; properties?: { color?: string } }
// type WithRorMeta = KubernetesCluster & { rormeta?: { tags?: RorTag[] } }

// export const PageView = ({ className, user, clusters, params }: PageViewProps) => {
//   const DEFAULT_LIMIT = 3
//   const DEFAULT_PAGE = 1

//   const limit = Number(params.limit) || DEFAULT_LIMIT
//   const page = Number(params.page) || DEFAULT_PAGE
//   const filtersOpen = params.filters === 'open'
//   const router = useRouter()
//   const pathname = usePathname()

//   // pagination
//   const pageSize = 50
//   const [isLoading, setIsLoading] = useState(false)
//   const [hasMore, setHasMore] = useState(true)
//   const [items, setItems] = useState<KubernetesCluster[]>([])
//   // const [offset, setOffset] = useState(0)
//   const sentinelRef = useRef<HTMLDivElement>(null)

//   const fetchMoreClusters = useCallback(
//     async ({ offset, limit }: { offset: number; limit: number }) => {
//       if (isLoading || !hasMore) return
//       setIsLoading(true)
//       try {
//         console.log('start to fetch')
//         const params = new URLSearchParams({
//           apiversion: 'general.ror.internal/v1alpha1',
//           kind: 'KubernetesCluster',
//           offset: String(offset),
//           limit: String(limit),
//         })
//         const res = await fetch(`http://localhost:10000/v2/resources?${params.toString()}`)
//         if (!res.ok) {
//           const text = await res.text()
//           console.error('API error: ' + res.status + ' - ' + text)
//           setHasMore(false)
//           return
//         }
//         const data = await res.json()
//         setItems((prev) => {
//           const existingIds = new Set(
//             prev.map((c: KubernetesCluster) => c.kubernetescluster?.spec?.data?.clusterId || c.metadata?.name)
//           )
//           const newClusters = (data.resources ?? []).filter((c: KubernetesCluster) => {
//             const id = c.kubernetescluster?.spec?.data?.clusterId || c.metadata?.name
//             return id && !existingIds.has(id)
//           })
//           return newClusters.length ? [...prev, ...newClusters] : prev
//         })
//         console.log('fetch response:', res)
//         if (!data.resources || data.resources.length < limit) {
//           setHasMore(false)
//         }
//         console.log('HasMore:', hasMore)
//         console.log('fetch complete')
//         console.log('Items length: ', items.length)
//       } catch (error) {
//         console.error('Error fetching more clusters:', error)
//       } finally {
//         setIsLoading(false)
//       }
//     },
//     [isLoading, hasMore, items.length]
//   )

//   useEffect(() => {
//     const scrollElement = sentinelRef.current
//     if (!scrollElement) return

//     const io = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0]
//         if (entry.isIntersecting && !isLoading && hasMore) {
//           fetchMoreClusters({ offset: items.length, limit: pageSize })
//         }
//       },
//       {
//         root: null,
//         rootMargin: '600px',
//         threshold: 0,
//       }
//     )

//     io.observe(scrollElement)
//     return () => io.disconnect()
//   }, [items.length, isLoading, hasMore, fetchMoreClusters])

//   useEffect(() => {
//     setItems(clusters)
//   }, [clusters])

//   const safeItems = useMemo(
//     () => items.filter((c) => c.kubernetescluster?.spec?.data && typeof c.kubernetescluster.spec.data === 'object'),
//     [items]
//   )

//   const [selectedDisplayData, setSelectedDisplayData] = useState<ClusterCardDisplayData[]>([])
//   const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
//   const [searchResults, setSearchResults] = useState<KubernetesCluster[]>(safeItems)

//   useEffect(() => {
//     const stored = localStorage.getItem('selectedDisplayData')
//     setSelectedDisplayData(stored ? JSON.parse(stored) : [])
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('selectedDisplayData', JSON.stringify(selectedDisplayData))
//   }, [selectedDisplayData])

//   const paginationState = {
//     pageIndex: page - 1,
//     pageSize: limit,
//   }

//   const clearUrl = () => {
//     router.replace(pathname, { scroll: false })
//   }

//   const handleRefreshFilters = () => {
//     setSelectedFilters({})
//     setSelectedDisplayData([])
//     clearUrl()
//   }

//   const exportableFromCluster = (c: KubernetesCluster) => {
//     const spec = c.kubernetescluster?.spec
//     const data = spec?.data ?? {}
//     const workers = spec?.topology?.workers?.nodePools ?? []

//     const state = c.kubernetescluster?.status?.state ?? {}
//     const cluster = state.cluster ?? {}
//     const resources = cluster.resources ?? {}
//     const price = cluster.price ?? {}

//     const versions = state.versions ?? []
//     const versionByName = (name: string) => versions.find((v) => v?.name === name)?.version ?? null

//     const tagsArr = (c as WithRorMeta)?.rormeta?.tags ?? []
//     const serviceTags = Array.isArray(tagsArr)
//       ? tagsArr
//           .map((t) => t?.value ?? t?.key ?? '')
//           .filter(Boolean)
//           .join(' ')
//       : ''

//     const nodePoolCount =
//       Array.isArray(workers) && workers.length > 0
//         ? workers.length
//         : Array.isArray(cluster.nodepools)
//           ? cluster.nodepools.length
//           : null

//     return {
//       clusterId: data?.clusterId ?? '',
//       clusterName: c.metadata?.name ?? '',
//       workspaceName: data?.workspace ?? '',
//       datacenterName: data?.datacenter ?? '',
//       provider: data?.provider ?? '',
//       environment: data?.environment ?? '',

//       cpuPercentage: resources?.cpu?.percentage ?? null,
//       memoryPercentage: resources?.memory?.percentage ?? null,
//       gpuPercentage: resources?.gpu?.percentage ?? null,
//       diskPercentage: resources?.disk?.percentage ?? null,
//       nodePoolCount,

//       monthlyPrice: price?.monthly ?? null,
//       yearlyPrice: price?.yearly ?? null,

//       rorAgentVersion: versionByName('agent'),
//       kubernetesVersion: versionByName('kubernetes'),
//       nhnToolingVersion: versionByName('nhnTooling'),

//       serviceTags,
//     }
//   }

//   const toCSV = (rows: Array<Record<string, unknown>>) => {
//     if (!rows.length) return ''
//     const headers = Object.keys(rows[0])
//     const esc = (v: unknown) => {
//       if (v === null || v === undefined) return ''
//       const s = String(v)
//       return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
//     }
//     const lines = [headers.join(',')]
//     for (const row of rows) lines.push(headers.map((h) => esc(row[h])).join(','))
//     return lines.join('\n')
//   }

//   const downloadBlob = (content: string, filename: string, type = 'text/csv;charset=utf-8;') => {
//     const blob = new Blob([content], { type })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = filename
//     document.body.appendChild(a)
//     a.click()
//     a.remove()
//     URL.revokeObjectURL(url)
//   }

//   const autosizeCols = (rows: Array<Record<string, unknown>>) => {
//     if (!rows.length) return []
//     const headers = Object.keys(rows[0])
//     return headers.map((h) => {
//       const maxLen = Math.max(h.length, ...rows.map((r) => (r[h] == null ? 0 : String(r[h]).length)))
//       return { wch: Math.min(Math.max(maxLen + 2, 10), 40) }
//     })
//   }

//   // ---------- Toggle/Sort params ----------

//   const toggleParams = useMemo(() => {
//     const entries: [string, string][] = (Object.entries(params) as Array<[string, unknown]>)
//       .filter(([, v]) => v !== undefined && v !== null)
//       .map(([k, v]) => [k, String(v)])

//     const newParams = new URLSearchParams(entries)
//     if (filtersOpen) {
//       newParams.delete('filters')
//     } else {
//       newParams.set('filters', 'open')
//     }
//     return `/clusters?${newParams.toString()}`
//   }, [params, filtersOpen])

//   const toggleSortParams = useMemo(() => {
//     if (!params.sort) return null
//     const entries: [string, string][] = (Object.entries(params) as Array<[string, unknown]>)
//       .filter(([, v]) => v !== undefined && v !== null)
//       .map(([k, v]) => [k, String(v)])

//     const newParams = new URLSearchParams(entries)
//     const currentOrder = newParams.get('order') === 'desc' ? 'desc' : 'asc'
//     newParams.set('order', currentOrder === 'desc' ? 'asc' : 'desc')
//     return { url: `/clusters?${newParams.toString()}`, isDesc: currentOrder === 'desc' }
//   }, [params])

//   // Reset search results when safeItems changes
//   useEffect(() => {
//     setSearchResults(safeItems)
//   }, [safeItems])

//   const filteredItems = useMemo(() => {
//     return safeItems.filter((cluster) => {
//       const env = cluster.kubernetescluster?.spec?.data?.environment
//       const dc = cluster.kubernetescluster?.spec?.data?.datacenter
//       const ws = cluster.kubernetescluster?.spec?.data?.workspace

//       const envFilter = selectedFilters['Environments']
//       const dcFilter = selectedFilters['Datacenters']
//       const wsFilter = selectedFilters['Workspaces']

//       if (envFilter?.length && !env) return false
//       if (dcFilter?.length && !dc) return false
//       if (wsFilter?.length && !ws) return false

//       return (
//         (!envFilter?.length || (env && envFilter.includes(env))) &&
//         (!dcFilter?.length || (dc && dcFilter.includes(dc))) &&
//         (!wsFilter?.length || (ws && wsFilter.includes(ws)))
//       )
//     })
//   }, [safeItems, selectedFilters])

//   const sortedItems = useMemo(() => {
//     if (!params.sort) return filteredItems
//     const sortOrder = params.order === 'desc' ? -1 : 1
//     const isNumericMetric = ['cpu', 'memory', 'nodes', 'monthlyPrice', 'yearlyPrice'].includes(params.sort || '')

//     return [...filteredItems].sort((a, b) => {
//       let valueA: string | number, valueB: string | number
//       switch (params.sort) {
//         case 'clusterName':
//           valueA = a.metadata?.name || ''
//           valueB = b.metadata?.name || ''
//           break
//         case 'cpu':
//           valueA = Number(a.kubernetescluster?.status?.state?.cluster?.resources?.cpu?.percentage) || 0
//           valueB = Number(b.kubernetescluster?.status?.state?.cluster?.resources?.cpu?.percentage) || 0
//           return (valueB - valueA) * sortOrder
//         case 'memory':
//           valueA = Number(a.kubernetescluster?.status?.state?.cluster?.resources?.memory?.percentage) || 0
//           valueB = Number(b.kubernetescluster?.status?.state?.cluster?.resources?.memory?.percentage) || 0
//           return (valueB - valueA) * sortOrder
//         case 'nodes':
//           valueA = Number(a.kubernetescluster?.status?.state?.cluster?.nodepools?.length) || 0
//           valueB = Number(b.kubernetescluster?.status?.state?.cluster?.nodepools?.length) || 0
//           return (valueB - valueA) * sortOrder
//         case 'monthlyPrice':
//           valueA = Number(a.kubernetescluster?.status?.state?.cluster?.price?.monthly) || 0
//           valueB = Number(b.kubernetescluster?.status?.state?.cluster?.price?.monthly) || 0
//           return (valueB - valueA) * sortOrder
//         case 'yearlyPrice':
//           valueA = Number(a.kubernetescluster?.status?.state?.cluster?.price?.yearly) || 0
//           valueB = Number(b.kubernetescluster?.status?.state?.cluster?.price?.yearly) || 0
//           return (valueB - valueA) * sortOrder
//         case 'datacenterName':
//           valueA = a.kubernetescluster?.spec?.data?.datacenter || ''
//           valueB = b.kubernetescluster?.spec?.data?.datacenter || ''
//           break
//         case 'datacenterProvider':
//           valueA = a.kubernetescluster?.spec?.data?.provider || ''
//           valueB = b.kubernetescluster?.spec?.data?.provider || ''
//           break
//         case 'environment':
//           valueA = a.kubernetescluster?.spec?.data?.environment || ''
//           valueB = b.kubernetescluster?.spec?.data?.environment || ''
//           break
//         default:
//           valueA = a.metadata?.name || ''
//           valueB = b.metadata?.name || ''
//       }

//       if (isNumericMetric && typeof valueA === 'number' && typeof valueB === 'number') {
//         return (valueB - valueA) * sortOrder
//       }
//       if (typeof valueA === 'string' && typeof valueB === 'string') {
//         return valueA.localeCompare(valueB) * sortOrder
//       }
//       return String(valueA).localeCompare(String(valueB)) * sortOrder
//     })
//   }, [filteredItems, params.sort, params.order])

//   const displayedItems = useMemo(() => {
//     const base = params.sort ? sortedItems : filteredItems
//     if (!searchResults?.length) return base

//     const ids = new Set(searchResults.map((sr) => sr.kubernetescluster?.spec?.data?.clusterId || sr.metadata?.name))

//     return base.filter((c) => ids.has(c.kubernetescluster?.spec?.data?.clusterId || c.metadata?.name))
//   }, [sortedItems, filteredItems, searchResults])

//   const handleExportAllCSV = () => {
//     try {
//       const rows = safeItems.map(exportableFromCluster)
//       const csv = toCSV(rows)
//       if (!csv) return console.warn('[Export] No data to export')
//       downloadBlob(csv, 'ror-clusters-all.csv')
//     } catch (e) {
//       console.error('[Export] Export All CSV failed', e)
//     }
//   }

//   const handleExportAllExcel = async () => {
//     try {
//       const rows = safeItems.map(exportableFromCluster)
//       if (!rows.length) return console.warn('[Export] No data to export')
//       const XLSX = await import('xlsx')
//       const ws = XLSX.utils.json_to_sheet(rows) as WorksheetWithCols
//       ws['!cols'] = autosizeCols(rows)
//       const wb = XLSX.utils.book_new()
//       XLSX.utils.book_append_sheet(wb, ws, 'Clusters')
//       XLSX.writeFile(wb, 'ror-clusters-all.xlsx', { bookType: 'xlsx' })
//     } catch (e) {
//       console.error('[Export] Export All Excel failed', e)
//     }
//   }

//   const handleExportFilteredCSV = () => {
//     try {
//       const rows = displayedItems.map(exportableFromCluster)
//       const csv = toCSV(rows)
//       if (!csv) return console.warn('[Export] No data to export')
//       downloadBlob(csv, 'ror-clusters-filtered.csv')
//     } catch (e) {
//       console.error('[Export] Filtered CSV export failed', e)
//     }
//   }

//   const handleExportFilteredExcel = async () => {
//     try {
//       const rows = displayedItems.map(exportableFromCluster)
//       if (!rows.length) return console.warn('[Export] No data to export')
//       const XLSX = await import('xlsx')
//       const ws = XLSX.utils.json_to_sheet(rows) as WorksheetWithCols
//       ws['!cols'] = autosizeCols(rows)
//       const wb = XLSX.utils.book_new()
//       XLSX.utils.book_append_sheet(wb, ws, 'Clusters')
//       XLSX.writeFile(wb, 'ror-clusters-filtered.xlsx', { bookType: 'xlsx' })
//     } catch (e) {
//       console.error('[Export] Filtered Excel export failed', e)
//     }
//   }
//   const pageCount = Math.ceil(filteredItems.length / limit)

//   const renderControls = () => (
//     <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6 '>
//       <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
//         <ClusterSearch items={safeItems} onResultsChange={(res) => setSearchResults(res)} />

//         <MultipleSelector
//           className='w-52'
//           commandProps={{ label: 'Display data' }}
//           value={displayDataOptions.filter((opt) => selectedDisplayData?.includes(opt.value as ClusterCardDisplayData))}
//           onChange={(selected) => setSelectedDisplayData(selected.map((item) => item.value as ClusterCardDisplayData))}
//           defaultOptions={displayDataOptions}
//           placeholder='Set display data'
//           hideClearAllButton
//           hidePlaceholderWhenSelected
//           emptyIndicator={<p className='text-center text-sm'>No results found</p>}
//         />

//         <SortSelect options={sortingOptions} currentSort={params.sort} />

//         {toggleSortParams && (
//           <Link href={toggleSortParams.url}>
//             <Button variant='outline' className='border-[var(--input)]'>
//               {toggleSortParams.isDesc ? (
//                 <span className='flex gap-1 items-center'>
//                   <ArrowDownWideNarrow className='w-4 h-4' />
//                   DESC
//                 </span>
//               ) : (
//                 <span className='flex gap-1 items-center'>
//                   <ArrowDownNarrowWide className='w-4 h-4' />
//                   ASC
//                 </span>
//               )}
//             </Button>
//           </Link>
//         )}

//         <Link className='[@container(max-width:1000px)]:hidden' href={toggleParams}>
//           <Toggle pressed={filtersOpen} variant='outline' aria-label='Open filters'>
//             <Funnel />
//           </Toggle>
//         </Link>
//       </div>

//       <div className='flex flex-row gap-4'>
//         <Link className='[@container(min-width:1001px)]:hidden' href={toggleParams}>
//           <Toggle pressed={filtersOpen} variant='outline' aria-label='Open filters'>
//             <Funnel />
//           </Toggle>
//         </Link>

//         <Button
//           type='button'
//           onClick={handleRefreshFilters}
//           aria-label='Reset filters'
//           title='Reset filters'
//           className='gap-2'
//         >
//           <RotateCw className='h-4 w-4' />
//           Refresh
//         </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button>
//               <Download />
//               Export
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem onClick={handleExportFilteredCSV}>Export Filtered (CSV)</DropdownMenuItem>
//             <DropdownMenuItem onClick={handleExportFilteredExcel}>Export Filtered (Excel)</DropdownMenuItem>
//             <DropdownMenuItem onClick={handleExportAllCSV}>Export All (CSV)</DropdownMenuItem>
//             <DropdownMenuItem onClick={handleExportAllExcel}>Export All (Excel)</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         <TabsViewSwitcher />
//       </div>
//     </div>
//   )

//   // Render filter section (multi-selects for environments, datacenters, workspaces)
//   const renderFilterSection = () =>
//     filtersOpen && (
//       <div className='flex flex-wrap items-center gap-x-4 gap-y-6 min-h-28 mx-12 mt-6'>
//         {filterOptions.map((option) => (
//           <MultipleSelector
//             key={option.label}
//             className='w-52'
//             commandProps={{ label: option.label }}
//             value={(selectedFilters[option.label] || []).map((v) => ({ value: v, label: v }))}
//             onChange={(selectedOptions) => {
//               setSelectedFilters((prev) => ({
//                 ...prev,
//                 [option.label]: selectedOptions.map((opt) => opt.value),
//               }))
//             }}
//             defaultOptions={option.data}
//             placeholder={option.placeholder}
//             hideClearAllButton
//             hidePlaceholderWhenSelected
//             emptyIndicator={<p className='text-center text-sm'>No results found</p>}
//           />
//         ))}
//       </div>
//     )

//   // Main render: container, controls, filter section, cluster list/grid/table
//   return (
//     <div className={cn(className, '@container')}>
//       <div className={cn('border-b', filtersOpen && 'pb-2')}>
//         <div className={cn('mx-12 flex items-center min-h-28 py-6 ', filtersOpen && 'w-[calc(100%-6rem)] border-b')}>
//           {renderControls()}
//         </div>
//         {renderFilterSection()}
//       </div>

//       <section className='px-12 my-8'>
//         {params.view === 'list' ? (
//           <ClustersTable
//             key='table'
//             user={user}
//             data={(params.sort ? sortedItems : filteredItems)
//               .filter((c) =>
//                 searchResults.some(
//                   (sr) =>
//                     sr.metadata?.name === c.metadata?.name ||
//                     sr.kubernetescluster?.spec?.data?.clusterId === c.kubernetescluster?.spec?.data?.clusterId
//                 )
//               )
//               .slice(
//                 paginationState.pageIndex * paginationState.pageSize,
//                 (paginationState.pageIndex + 1) * paginationState.pageSize
//               )}
//             selectedDisplayData={selectedDisplayData}
//             pagination={paginationState}
//             totalCount={
//               (params.sort ? sortedItems : filteredItems).filter((c) =>
//                 searchResults.some(
//                   (sr) =>
//                     sr.metadata?.name === c.metadata?.name ||
//                     sr.kubernetescluster?.spec?.data?.clusterId === c.kubernetescluster?.spec?.data?.clusterId
//                 )
//               ).length
//             }
//             pageCount={pageCount}
//           />
//         ) : (
//           <div>
//             <div className='flex flex-row flex-wrap gap-6'>
//               {displayedItems.map((cluster, idx) => (
//                 <div key={cluster.kubernetescluster?.spec?.data?.clusterId || idx}>
//                   <ClusterCard
//                     user={user}
//                     cluster={cluster}
//                     displayData={
//                       selectedDisplayData?.length > 0
//                         ? selectedDisplayData
//                         : displayDataOptions?.map((o) => o.value as ClusterCardDisplayData) || []
//                     }
//                   />
//                 </div>
//               ))}
//               <div ref={sentinelRef} className='h-px' />
//             </div>
//             {isLoading && <div style={{ textAlign: 'center', padding: 16 }}>Loading...</div>}
//             {!hasMore && (
//               <div style={{ textAlign: 'center', padding: 16, color: '#888' }}>All clusters are loaded.</div>
//             )}
//           </div>
//         )}
//       </section>

//       {params.view === 'list' && (
//         <div className='mt-8 px-6'>
//           <details>
//             <summary>Pagination</summary>
//             <CodeSnippet type='multi' hideCopyButton>
//               {JSON.stringify(paginationState, null, 2)}
//             </CodeSnippet>
//           </details>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { createApiClient } from '@ror/js-api-client'
import { env } from '@/config/env'
import { clustersVersion2 } from '@/__mocks__/data/clusters'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import type { KubernetesCluster } from '@ror/js-api-client'
import { User } from 'next-auth'
import { CodeSnippet } from '@ror/react'
import { ClusterCard, ClusterCardDisplayData } from '@/components/ui/cluster/cluster-card'
import { ClustersTable } from './cluster-table'
import { ClusterSearch } from '@/components/ui/cluster/cluster-search'
import { SortSelect } from '@/components/ui/sort-select'
import { TabsViewSwitcher } from '@/components/ui/tabs-view-switcher'
import { Toggle } from '@/components/shadcn/toggle'
import { Button } from '@/components/shadcn/button'
import MultipleSelector, { Option } from '@/components/shadcn/multiselect'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import { ArrowDownNarrowWide, ArrowDownWideNarrow, Download, Funnel, RotateCw } from 'lucide-react'
import { cn } from '@/utils/clsxm'
import type { WorkSheet } from 'xlsx'
import { NotReadyMessage } from '@/components/ui/not-ready-message'

interface Params {
  view?: 'grid' | 'list'
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  filters?: string
}

interface PageViewProps {
  className?: string
  user: User
  clusters: KubernetesCluster[]
  params: Params
}

const displayDataOptions: Option[] = [
  { value: 'argocd', label: 'ArgoCD' },
  { value: 'grafana', label: 'Grafana' },
  { value: 'rorcli', label: 'ROR CLI' },
  { value: 'kubectl', label: 'Kubectl' },
  { value: 'cpu', label: 'CPU usage' },
  { value: 'memory', label: 'Memory usage' },
  { value: 'gpu', label: 'GPU usage' },
  { value: 'disk', label: 'Disk usage' },
  { value: 'nodes', label: 'Num of nodes' },
  { value: 'monthlyPrice', label: 'Monthly price' },
  { value: 'yearlyPrice', label: 'Yearly price' },
  { value: 'agentVersion', label: 'ROR agent version' },
  { value: 'kubernetesVersion', label: 'Kubernetes version' },
  { value: 'toolingVersion', label: 'NHN tooling version' },
  { value: 'datacenterName', label: 'Datacenter name' },
  { value: 'datacenterProvider', label: 'Datacenter provider' },
  { value: 'environment', label: 'Environment' },
  { value: 'serviceTags', label: 'Service tags' },
]

const sortingOptions = [
  { value: 'clusterName', label: 'Cluster name' },
  { value: 'cpu', label: 'CPU usage' },
  { value: 'memory', label: 'Memory usage' },
  { value: 'nodes', label: 'Num of nodes' },
  { value: 'monthlyPrice', label: 'Price' },
  { value: 'datacenterName', label: 'Datacenter' },
  { value: 'datacenterProvider', label: 'Datacenter provider' },
  { value: 'environment', label: 'Environment' },
]

const environments: Option[] = [
  { value: 'dev', label: 'Dev' },
  { value: 'test', label: 'Test' },
  { value: 'staging', label: 'Staging' },
  { value: 'prod', label: 'Prod' },
  { value: 'qa', label: 'QA' },
]

const datacenters: Option[] = [
  { value: 'trd1-tanzu', label: 'trd1 - tanzu' },
  { value: 'osl1-tanzu', label: 'osl1 - tanzu' },
  { value: 'trd1cl02-tanzu', label: 'trd1cl02 - tanzu' },
  { value: 'norwayeast-aks', label: 'norwayeast - aks' },
  { value: 'trd1-talos', label: 'trd1 - talos' },
]

const workspaces: Option[] = [
  { value: 'trd1-amk-prod', label: 'trd1-amk-prod' },
  { value: 'trd1cl02-shp-prod', label: 'trd1cl02-shp-prod' },
  { value: 'trd1cl02-dcn', label: 'trd1cl02-dcn' },
  { value: 't-nhn', label: 't-nhn' },
  { value: 'trd1-amk', label: 'trd1-amk' },
  { value: 'trd1-app', label: 'trd1-app' },
  { value: 'trd1-team-kjernejournal-portal', label: 'trd1-team-kjernejournal-portal' },
]

const filterOptions = [
  { label: 'Environments', placeholder: 'Set environments', data: environments },
  { label: 'Datacenters', placeholder: 'Set datacenters', data: datacenters },
  { label: 'Workspaces', placeholder: 'Set workspaces', data: workspaces },
]

type WorksheetWithCols = WorkSheet & { ['!cols']?: { wch: number }[] }
type RorTag = { key?: string; value?: string; properties?: { color?: string } }
type WithRorMeta = KubernetesCluster & { rormeta?: { tags?: RorTag[] } }

// helpers
const idOf = (c: KubernetesCluster) => c.kubernetescluster?.spec?.data?.clusterId || c.metadata?.name || ''

const idsKey = (arr: KubernetesCluster[]) => arr.map(idOf).join('|')

export const PageView = ({ className, user, clusters, params }: PageViewProps) => {
  // Get NextAuth session (client-side)
  const { data: session } = useSession()
  const DEFAULT_LIMIT = 3
  const DEFAULT_PAGE = 1

  const limit = Number(params.limit) || DEFAULT_LIMIT
  const page = Number(params.page) || DEFAULT_PAGE
  const filtersOpen = params.filters === 'open'
  const router = useRouter()
  const pathname = usePathname()

  // pagination + infinite scroll
  const pageSize = 50
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState<KubernetesCluster[]>([])
  const sentinelRef = useRef<HTMLDivElement>(null)
  const inFlightRef = useRef(false)

  // ⭐ only adopt new server data if *contents* changed
  const lastClustersKeyRef = useRef('')
  useEffect(() => {
    const nextKey = idsKey(clusters)
    if (nextKey !== lastClustersKeyRef.current) {
      lastClustersKeyRef.current = nextKey
      setItems(clusters)
    }
  }, [clusters])

  // --- js-api-client integration ---
  // Always use the latest accessToken from NextAuth session
  const getApiClient = useCallback(() => {
    if (typeof window === 'undefined') return null
    return createApiClient({
      baseUrl: env.NEXT_PUBLIC_ROR_API_URL,
      accessToken: session?.accessToken || '',
    })
  }, [session?.accessToken])

  const fetchMoreClusters = useCallback(
    async ({ offset, limit }: { offset: number; limit: number }) => {
      if (inFlightRef.current || isLoading || !hasMore) return
      inFlightRef.current = true
      setIsLoading(true)
      try {
        let data
        if (env.NEXT_PUBLIC_MOCKING_ENABLED === 'true') {
          // Use mock data
          data = { resources: clustersVersion2.resources.slice(offset, offset + limit) as KubernetesCluster[] }
        } else {
          // Use real API client
          const apiClient = getApiClient()
          if (!apiClient) return
          const params = new URLSearchParams({
            offset: String(offset),
            limit: String(limit),
          })
          data = await apiClient.kubernetesClusters.list(params)
        }
        setItems((prev) => {
          const existing = new Set(prev.map(idOf))
          const newOnes = (data.resources ?? []).filter((c: KubernetesCluster) => {
            const id = idOf(c)
            return id && !existing.has(id)
          })
          return newOnes.length ? [...prev, ...newOnes] : prev
        })
        if (!data.resources || data.resources.length < limit) {
          setHasMore(false)
        }
      } catch (e) {
        console.error('Error fetching more clusters:', e)
      } finally {
        setIsLoading(false)
        inFlightRef.current = false
      }
    },
    [isLoading, hasMore, getApiClient]
  )

  // observe sentinel once per items.length / flags change
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !isLoading && hasMore) {
          fetchMoreClusters({ offset: items.length, limit: pageSize })
        }
      },
      { root: null, rootMargin: '600px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [items.length, isLoading, hasMore, fetchMoreClusters])

  const safeItems = useMemo(
    () => items.filter((c) => c.kubernetescluster?.spec?.data && typeof c.kubernetescluster.spec.data === 'object'),
    [items]
  )

  const [selectedDisplayData, setSelectedDisplayData] = useState<ClusterCardDisplayData[]>([])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [searchResults, setSearchResults] = useState<KubernetesCluster[]>(safeItems)

  // —— stable, equality-guarded handlers (avoid parent setState loops)
  const onSearchResultsChange = useCallback((res: KubernetesCluster[]) => {
    setSearchResults((prev) => {
      if (prev.length === res.length) {
        const a = idsKey(prev)
        const b = idsKey(res)
        if (a === b) return prev
      }
      return res
    })
  }, [])

  const onDisplayChange = useCallback((selected: Option[]) => {
    const next = selected.map((i) => i.value as ClusterCardDisplayData)
    setSelectedDisplayData((prev) => {
      if (prev.length === next.length && prev.every((v, i) => v === next[i])) return prev
      return next
    })
  }, [])

  // load display selections once
  useEffect(() => {
    try {
      const stored = localStorage.getItem('selectedDisplayData')
      if (stored) {
        const parsed = JSON.parse(stored) as ClusterCardDisplayData[]
        setSelectedDisplayData((prev) => {
          if (prev.length === parsed.length && prev.every((v, i) => v === parsed[i])) return prev
          return parsed
        })
      }
    } catch {
      // ignore
    }
  }, [])

  // persist display selections (no-op if unchanged)
  useEffect(() => {
    try {
      const serialized = JSON.stringify(selectedDisplayData)
      if (localStorage.getItem('selectedDisplayData') !== serialized) {
        localStorage.setItem('selectedDisplayData', serialized)
      }
    } catch {
      // ignore
    }
  }, [selectedDisplayData])

  // sync safeItems → searchResults only if content differs
  const lastSafeKeyRef = useRef('')
  useEffect(() => {
    const nextKey = idsKey(safeItems)
    if (nextKey !== lastSafeKeyRef.current) {
      lastSafeKeyRef.current = nextKey
      setSearchResults((prev) => {
        const prevKey = idsKey(prev)
        return prevKey === nextKey ? prev : safeItems
      })
    }
  }, [safeItems])

  const paginationState = {
    pageIndex: page - 1,
    pageSize: limit,
  }

  const clearUrl = () => {
    router.replace(pathname, { scroll: false })
  }

  const handleRefreshFilters = () => {
    setSelectedFilters({})
    setSelectedDisplayData([])
    clearUrl()
  }

  // ---------- Export helpers ----------
  const exportableFromCluster = (c: KubernetesCluster) => {
    const spec = c.kubernetescluster?.spec
    const data = spec?.data ?? {}
    const workers = spec?.topology?.workers?.nodePools ?? []

    const state = c.kubernetescluster?.status?.state ?? {}
    const cluster = state.cluster ?? {}
    const resources = cluster.resources ?? {}
    const price = cluster.price ?? {}

    const versions = state.versions ?? []
    type Version = { name?: string | null; version?: string | null }
    const versionByName = (name: string) => (versions as Version[]).find((v) => v?.name === name)?.version ?? null

    const tagsArr = (c as WithRorMeta)?.rormeta?.tags ?? []
    const serviceTags = Array.isArray(tagsArr)
      ? tagsArr
          .map((t) => t?.value ?? t?.key ?? '')
          .filter(Boolean)
          .join(' ')
      : ''

    const nodePoolCount =
      Array.isArray(workers) && workers.length > 0
        ? workers.length
        : Array.isArray(cluster.nodepools)
          ? cluster.nodepools.length
          : null

    return {
      clusterId: data?.clusterId ?? '',
      clusterName: c.metadata?.name ?? '',
      workspaceName: data?.workspace ?? '',
      datacenterName: data?.datacenter ?? '',
      provider: data?.provider ?? '',
      environment: data?.environment ?? '',

      cpuPercentage: resources?.cpu?.percentage ?? null,
      memoryPercentage: resources?.memory?.percentage ?? null,
      gpuPercentage: resources?.gpu?.percentage ?? null,
      diskPercentage: resources?.disk?.percentage ?? null,
      nodePoolCount,

      monthlyPrice: price?.monthly ?? null,
      yearlyPrice: price?.yearly ?? null,

      rorAgentVersion: versionByName('agent'),
      kubernetesVersion: versionByName('kubernetes'),
      nhnToolingVersion: versionByName('nhnTooling'),

      serviceTags,
    }
  }

  const toCSV = (rows: Array<Record<string, unknown>>) => {
    if (!rows.length) return ''
    const headers = Object.keys(rows[0])
    const esc = (v: unknown) => {
      if (v == null) return ''
      const s = String(v)
      return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }
    const lines = [headers.join(',')]
    for (const row of rows) lines.push(headers.map((h) => esc(row[h])).join(','))
    return lines.join('\n')
  }

  const downloadBlob = (content: string, filename: string, type = 'text/csv;charset=utf-8;') => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const autosizeCols = (rows: Array<Record<string, unknown>>) => {
    if (!rows.length) return []
    const headers = Object.keys(rows[0])
    return headers.map((h) => {
      const maxLen = Math.max(h.length, ...rows.map((r) => (r[h] == null ? 0 : String(r[h]).length)))
      return { wch: Math.min(Math.max(maxLen + 2, 10), 40) }
    })
  }

  const handleExportAllCSV = () => {
    try {
      const rows = safeItems.map(exportableFromCluster)
      const csv = toCSV(rows)
      if (!csv) return console.warn('[Export] No data to export')
      downloadBlob(csv, 'ror-clusters-all.csv')
    } catch (e) {
      console.error('[Export] Export All CSV failed', e)
    }
  }

  const handleExportAllExcel = async () => {
    try {
      const rows = safeItems.map(exportableFromCluster)
      if (!rows.length) return console.warn('[Export] No data to export')
      const XLSX = await import('xlsx')
      const ws = XLSX.utils.json_to_sheet(rows) as WorksheetWithCols
      ws['!cols'] = autosizeCols(rows)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Clusters')
      XLSX.writeFile(wb, 'ror-clusters-all.xlsx', { bookType: 'xlsx' })
    } catch (e) {
      console.error('[Export] Export All Excel failed', e)
    }
  }

  const handleExportFilteredCSV = () => {
    try {
      const rows = displayedItems.map(exportableFromCluster)
      const csv = toCSV(rows)
      if (!csv) return console.warn('[Export] No data to export')
      downloadBlob(csv, 'ror-clusters-filtered.csv')
    } catch (e) {
      console.error('[Export] Filtered CSV export failed', e)
    }
  }

  const handleExportFilteredExcel = async () => {
    try {
      const rows = displayedItems.map(exportableFromCluster)
      if (!rows.length) return console.warn('[Export] No data to export')
      const XLSX = await import('xlsx')
      const ws = XLSX.utils.json_to_sheet(rows) as WorksheetWithCols
      ws['!cols'] = autosizeCols(rows)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Clusters')
      XLSX.writeFile(wb, 'ror-clusters-filtered.xlsx', { bookType: 'xlsx' })
    } catch (e) {
      console.error('[Export] Filtered Excel export failed', e)
    }
  }

  // ---------- Toggle/Sort params ----------
  const toggleParams = useMemo(() => {
    const entries: [string, string][] = (Object.entries(params) as Array<[string, unknown]>)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [k, String(v)])

    const newParams = new URLSearchParams(entries)
    if (filtersOpen) newParams.delete('filters')
    else newParams.set('filters', 'open')

    return `/clusters?${newParams.toString()}`
  }, [params, filtersOpen])

  const toggleSortParams = useMemo(() => {
    if (!params.sort) return null
    const entries: [string, string][] = (Object.entries(params) as Array<[string, unknown]>)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [k, String(v)])

    const newParams = new URLSearchParams(entries)
    const currentOrder = newParams.get('order') === 'desc' ? 'desc' : 'asc'
    newParams.set('order', currentOrder === 'desc' ? 'asc' : 'desc')
    return { url: `/clusters?${newParams.toString()}`, isDesc: currentOrder === 'desc' }
  }, [params])

  // ---------- Filtering / Sorting ----------
  const filteredItems = useMemo(() => {
    return safeItems.filter((cluster) => {
      const env = cluster.kubernetescluster?.spec?.data?.environment
      const dc = cluster.kubernetescluster?.spec?.data?.datacenter
      const ws = cluster.kubernetescluster?.spec?.data?.workspace

      const envFilter = selectedFilters['Environments']
      const dcFilter = selectedFilters['Datacenters']
      const wsFilter = selectedFilters['Workspaces']

      if (envFilter?.length && !env) return false
      if (dcFilter?.length && !dc) return false
      if (wsFilter?.length && !ws) return false

      return (
        (!envFilter?.length || (env && envFilter.includes(env))) &&
        (!dcFilter?.length || (dc && dcFilter.includes(dc))) &&
        (!wsFilter?.length || (ws && wsFilter.includes(ws)))
      )
    })
  }, [safeItems, selectedFilters])

  const sortedItems = useMemo(() => {
    if (!params.sort) return filteredItems
    const sortOrder = params.order === 'desc' ? -1 : 1
    const isNumeric = ['cpu', 'memory', 'nodes', 'monthlyPrice', 'yearlyPrice'].includes(params.sort || '')

    return [...filteredItems].sort((a, b) => {
      let valueA: string | number, valueB: string | number
      switch (params.sort) {
        case 'clusterName':
          valueA = a.metadata?.name || ''
          valueB = b.metadata?.name || ''
          break
        case 'cpu':
          valueA = Number(a.kubernetescluster?.status?.state?.cluster?.resources?.cpu?.percentage) || 0
          valueB = Number(b.kubernetescluster?.status?.state?.cluster?.resources?.cpu?.percentage) || 0
          return (valueB - valueA) * sortOrder
        case 'memory':
          valueA = Number(a.kubernetescluster?.status?.state?.cluster?.resources?.memory?.percentage) || 0
          valueB = Number(b.kubernetescluster?.status?.state?.cluster?.resources?.memory?.percentage) || 0
          return (valueB - valueA) * sortOrder
        case 'nodes':
          valueA = Number(a.kubernetescluster?.status?.state?.cluster?.nodepools?.length) || 0
          valueB = Number(b.kubernetescluster?.status?.state?.cluster?.nodepools?.length) || 0
          return (valueB - valueA) * sortOrder
        case 'monthlyPrice':
          valueA = Number(a.kubernetescluster?.status?.state?.cluster?.price?.monthly) || 0
          valueB = Number(b.kubernetescluster?.status?.state?.cluster?.price?.monthly) || 0
          return (valueB - valueA) * sortOrder
        case 'yearlyPrice':
          valueA = Number(a.kubernetescluster?.status?.state?.cluster?.price?.yearly) || 0
          valueB = Number(b.kubernetescluster?.status?.state?.cluster?.price?.yearly) || 0
          return (valueB - valueA) * sortOrder
        case 'datacenterName':
          valueA = a.kubernetescluster?.spec?.data?.datacenter || ''
          valueB = b.kubernetescluster?.spec?.data?.datacenter || ''
          break
        case 'datacenterProvider':
          valueA = a.kubernetescluster?.spec?.data?.provider || ''
          valueB = b.kubernetescluster?.spec?.data?.provider || ''
          break
        case 'environment':
          valueA = a.kubernetescluster?.spec?.data?.environment || ''
          valueB = b.kubernetescluster?.spec?.data?.environment || ''
          break
        default:
          valueA = a.metadata?.name || ''
          valueB = b.metadata?.name || ''
      }

      if (isNumeric && typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueB - valueA) * sortOrder
      }
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * sortOrder
      }
      return String(valueA).localeCompare(String(valueB)) * sortOrder
    })
  }, [filteredItems, params.sort, params.order])

  const displayedItems = useMemo(() => {
    const base = params.sort ? sortedItems : filteredItems
    if (!searchResults?.length) return base
    const ids = new Set(searchResults.map(idOf))
    return base.filter((c) => ids.has(idOf(c)))
  }, [sortedItems, filteredItems, searchResults, params.sort])

  const pageCount = Math.ceil(filteredItems.length / limit)

  // ---------- Controls ----------
  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
        <ClusterSearch items={safeItems} onResultsChange={onSearchResultsChange} />

        <MultipleSelector
          className='w-52'
          commandProps={{ label: 'Display data' }}
          value={displayDataOptions.filter((opt) => selectedDisplayData?.includes(opt.value as ClusterCardDisplayData))}
          onChange={onDisplayChange}
          defaultOptions={displayDataOptions}
          placeholder='Set display data'
          hideClearAllButton
          hidePlaceholderWhenSelected
          emptyIndicator={<p className='text-center text-sm'>No results found</p>}
        />

        <SortSelect options={sortingOptions} currentSort={params.sort} />

        {toggleSortParams && (
          <Link href={toggleSortParams.url}>
            <Button variant='outline' className='border-[var(--input)]'>
              {toggleSortParams.isDesc ? (
                <span className='flex gap-1 items-center'>
                  <ArrowDownWideNarrow className='w-4 h-4' />
                  DESC
                </span>
              ) : (
                <span className='flex gap-1 items-center'>
                  <ArrowDownNarrowWide className='w-4 h-4' />
                  ASC
                </span>
              )}
            </Button>
          </Link>
        )}

        <Toggle
          asChild
          pressed={filtersOpen}
          variant='outline'
          className='[@container(max-width:1000px)]:hidden'
          aria-label='Open filters'
        >
          <Link href={toggleParams}>
            <Funnel aria-hidden='true' />
          </Link>
        </Toggle>
      </div>

      <div className='flex flex-row gap-4'>
        <Toggle
          asChild
          pressed={filtersOpen}
          variant='outline'
          className='[@container(min-width:1001px)]:hidden'
          aria-label='Open filters'
        >
          <Link href={toggleParams}>
            <Funnel aria-hidden='true' />
          </Link>
        </Toggle>

        <Button
          type='button'
          onClick={handleRefreshFilters}
          aria-label='Reset filters'
          title='Reset filters'
          className='gap-2'
        >
          <RotateCw className='h-4 w-4' />
          Refresh
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Download />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleExportFilteredCSV}>Export Filtered (CSV)</DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportFilteredExcel}>Export Filtered (Excel)</DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportAllCSV}>Export All (CSV)</DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportAllExcel}>Export All (Excel)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <TabsViewSwitcher />
      </div>
    </div>
  )

  const renderFilterSection = () =>
    filtersOpen && (
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6 min-h-28 mx-12 mt-6'>
        {filterOptions.map((option) => (
          <MultipleSelector
            key={option.label}
            className='w-52'
            commandProps={{ label: option.label }}
            value={(selectedFilters[option.label] || []).map((v) => ({ value: v, label: v }))}
            onChange={(selectedOptions) => {
              const next = selectedOptions.map((opt) => opt.value)
              setSelectedFilters((prev) => {
                const curr = prev[option.label] || []
                const same = curr.length === next.length && curr.every((v, i) => v === next[i])
                if (same) return prev
                return { ...prev, [option.label]: next }
              })
            }}
            defaultOptions={option.data}
            placeholder={option.placeholder}
            hideClearAllButton
            hidePlaceholderWhenSelected
            emptyIndicator={<p className='text-center text-sm'>No results found</p>}
          />
        ))}
      </div>
    )

  return (
    <div className={cn(className, '@container')}>
      <div className={cn('border-b', filtersOpen && 'pb-2')}>
        <div className={cn('mx-12 flex items-center min-h-28 py-6 ', filtersOpen && 'w-[calc(100%-6rem)] border-b')}>
          {renderControls()}
        </div>
        {renderFilterSection()}
      </div>

      <NotReadyMessage className='mx-12 my-6'>
        Welcome to the new ROR web! This site is currently under development, so feel free to look around, but do not
        expect finished functionality or that all data is present. The development team is working hard on delivering a
        complete product as quick as possible :)
      </NotReadyMessage>

      <section className='px-12 my-8'>
        {params.view === 'list' ? (
          <ClustersTable
            key='table'
            user={user}
            data={(params.sort ? sortedItems : filteredItems)
              .filter((c) =>
                searchResults.some(
                  (sr) =>
                    sr.metadata?.name === c.metadata?.name ||
                    sr.kubernetescluster?.spec?.data?.clusterId === c.kubernetescluster?.spec?.data?.clusterId
                )
              )
              .slice(
                paginationState.pageIndex * paginationState.pageSize,
                (paginationState.pageIndex + 1) * paginationState.pageSize
              )}
            selectedDisplayData={selectedDisplayData}
            pagination={paginationState}
            totalCount={
              (params.sort ? sortedItems : filteredItems).filter((c) =>
                searchResults.some(
                  (sr) =>
                    sr.metadata?.name === c.metadata?.name ||
                    sr.kubernetescluster?.spec?.data?.clusterId === c.kubernetescluster?.spec?.data?.clusterId
                )
              ).length
            }
            pageCount={pageCount}
          />
        ) : (
          <div>
            <div className='flex flex-row flex-wrap gap-6'>
              {displayedItems.map((cluster, idx) => (
                <div key={idOf(cluster) || idx}>
                  <ClusterCard
                    user={user}
                    cluster={cluster}
                    displayData={
                      selectedDisplayData?.length > 0
                        ? selectedDisplayData
                        : displayDataOptions?.map((o) => o.value as ClusterCardDisplayData) || []
                    }
                  />
                </div>
              ))}
              <div ref={sentinelRef} className='h-px' />
            </div>
            {isLoading && <div style={{ textAlign: 'center', padding: 16 }}>Loading...</div>}
            {!hasMore && (
              <div style={{ textAlign: 'center', padding: 16, color: '#888' }}>All clusters are loaded.</div>
            )}
          </div>
        )}
      </section>

      {params.view === 'list' && (
        <div className='mt-8 px-6'>
          <details>
            <summary>Pagination</summary>
            <CodeSnippet type='multi' hideCopyButton>
              {JSON.stringify(paginationState, null, 2)}
            </CodeSnippet>
          </details>
        </div>
      )}
    </div>
  )
}
