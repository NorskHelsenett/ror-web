'use client'

import { Server, Box, ChevronRight, Folder } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion'
import { Badge } from '@/components/shadcn/badge'
import type {
  ClusterGroup,
  NamespaceGroup,
  PolicyReportSummary,
  PolicyReportFilters,
} from '../types/policy-report-types'
import { cn } from '@/utils/clsxm'
import { routes } from '@/config/routes'
import { fetchClusterReports } from '../utils/policy-reports-actions'
import { groupPolicyReportsByCluster } from '../utils/policy-report'
import type { PolicyReport, Project } from '@ror/js-api-client'
import { FaSpinner } from 'react-icons/fa'
import { AccordionTriggerRowElement } from '@/components/ui/AccordionTableRow'
import { HealthCircle } from '@/features/cluster/components/health-circle'
import { localizeDate } from '@/utils/time-and-date'

export type ProjectFilters = {}

// -------------------------
// Bi-color pass/fail progress bar
// -------------------------

const PassFailBar = ({ summary }: { summary: PolicyReportSummary }) => {
  const total = summary.pass + summary.fail + summary.error + summary.warn + summary.skip
  if (total === 0) return <div className='h-2 rounded-full bg-muted w-full' />
  const failPct = ((summary.fail + summary.error) / total) * 100
  const passPct = (summary.pass / total) * 100
  return (
    <div className='relative h-2 w-full rounded-full overflow-hidden bg-muted flex'>
      <div className='h-full bg-orange-500' style={{ width: `${failPct}%` }} />
      <div className='h-full bg-blue-500' style={{ width: `${passPct}%` }} />
    </div>
  )
}

// -------------------------
// Namespace row
// -------------------------

const NamespaceRow = ({ ns, clusterUid }: { ns: NamespaceGroup; clusterUid: string }) => {
  const [isNavigating, setIsNavigating] = useState(false)
  const total = ns.summary.pass + ns.summary.fail + ns.summary.error + ns.summary.warn + ns.summary.skip
  return (
    <div className='flex items-center gap-4 px-4 py-3 rounded-lg border border-(--r-border-subtle) bg-card'>
      <Box className='size-4 text-muted-foreground shrink-0' />
      <span className='w-44 shrink-0 truncate text-sm font-medium'>{ns.namespace}</span>
      <div className='w-40 shrink-0'>
        <PassFailBar summary={ns.summary} />
      </div>
      <div className='shrink-0 flex items-center gap-2'>
        {ns.summary.fail + ns.summary.error > 0 && (
          <Badge
            variant='outline'
            className={cn('border-orange-500/60 text-orange-600 dark:text-orange-400 bg-orange-500/10 gap-1')}
          >
            <span>×</span>
            {(ns.summary.fail + ns.summary.error).toLocaleString()} failed
          </Badge>
        )}
        {ns.summary.pass > 0 && (
          <Badge variant='outline' className='border-blue-500/60 text-blue-600 dark:text-blue-400 bg-blue-500/10 gap-1'>
            <span>✓</span>
            {ns.summary.pass.toLocaleString()} passed
          </Badge>
        )}
        {total === 0 && <span className='text-xs text-muted-foreground'>No results</span>}
      </div>
      <div className='flex-1' />
      <Link
        href={`${routes.app.clusterPolicies.getHref(clusterUid)}?namespace=${encodeURIComponent(ns.namespace)}`}
        className='flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground shrink-0'
        onClick={() => setIsNavigating(true)}
      >
        View policies <ChevronRight className='size-4' />
      </Link>
      {isNavigating && <FaSpinner className='size-4 text-muted-foreground shrink-0 animate-spin' />}
    </div>
  )
}

// -------------------------
// Cluster card
// -------------------------

interface ClusterPolicyReportCardProps {
  project: Project
  filters?: ProjectFilters
}

export const ProjectCard = ({ project, filters }: ClusterPolicyReportCardProps) => {
  //   const [loadedReports, setLoadedReports] = useState<PolicyReport[] | null>(null)
  //   const [isLoadingNamespaces, setIsLoadingNamespaces] = useState(false)

  //   useEffect(() => {
  //     let cancelled = false
  //     setIsLoadingNamespaces(true)
  //     fetchClusterReports(group.clusterUid).then((reports) => {
  //       if (!cancelled) {
  //         setLoadedReports(reports)
  //         setIsLoadingNamespaces(false)
  //       }
  //     })
  //     return () => {
  //       cancelled = true
  //     }
  //   }, [group.clusterUid])

  const handleAccordionChange = async (value: string) => {
    //     if (value && loadedReports === null && !isLoadingNamespaces) {
    //       setIsLoadingNamespaces(true)
    //       const reports = await fetchClusterReports(group.clusterUid)
    //       setLoadedReports(reports)
    //       setIsLoadingNamespaces(false)
    //     }
  }

  //   const loadedGroups = useMemo(() => {
  //     if (loadedReports === null) return null
  //     const groups = groupPolicyReportsByCluster(loadedReports, filters)
  //     return groups[0] ?? null
  //   }, [loadedReports, filters])

  //   const namespacesToRender = loadedGroups?.namespaces ?? group.namespaces
  //   const summaryToRender = loadedGroups?.summary ?? group.summary

  //   const displayFail = summaryToRender.fail + summaryToRender.error
  //   const displayPass = summaryToRender.pass

  return (
    <div className='rounded-xl border border-(--r-border-subtle) bg-card overflow-hidden'>
      <Accordion type='single' collapsible onValueChange={handleAccordionChange}>
        <AccordionItem value={project.id} className='border-b-0'>
          <AccordionTrigger className='px-6 py-4 hover:no-underline hover:bg-muted/40 data-[state=open]:bg-muted/40'>
            <div className='flex items-center gap-4 flex-1 min-w-0'>
              <Folder className='size-4 text-muted-foreground shrink-0' />
              <span className='w-96 shrink-0 truncate text-base font-semibold'>{project.name}</span>
              <AccordionTriggerRowElement
                title='Workorder'
                text={project.projectMetadata.billing.workorder}
                className='w-28 shrink-0'
              />
              <div className='flex-1' />
              {project.active ? <HealthCircle healthCondition={'ok'} /> : <HealthCircle healthCondition={'error'} />}
            </div>
          </AccordionTrigger>

          <AccordionContent className='px-6 pb-4'>
            <div className='grid grid-cols-3 gap-2'>
              <div className='border p-2 rounded-lg'>
                <h2 className='text-xl'>Description</h2>
                <p>{project.description}</p>
              </div>
              <div className='border p-2 rounded-lg'>
                <h2 className='text-xl'>Roles</h2>
                <div className='grid grid-cols-2'>
                  {project.projectMetadata.roles.map((role, index) => (
                    <div key={index}>
                      <h3 className='text-base'>{role.roleDefinition}</h3>
                      <p>{role.contactInfo.email}</p>
                      <p>{role.contactInfo.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='border p-2 rounded-lg'>
                <h2 className='text-xl'>Metadata</h2>
                <div className='grid grid-cols-2'>
                  <p>Created</p>
                  <p>{localizeDate(project.created)}</p>
                </div>
                <div className='grid grid-cols-2'>
                  <p>Updated</p>
                  <p>{localizeDate(project.updated)}</p>
                </div>
                <div className='grid grid-cols-2'>
                  <p>Tags</p>
                  <div className='flex flex-wrap gap-2'>
                    {project.projectMetadata.serviceTags &&
                    Object.keys(project.projectMetadata.serviceTags).length > 0 ? (
                      Object.entries(project.projectMetadata.serviceTags).map(([key, value]) => (
                        <Badge key={key} variant='outline'>
                          {value ? `${key}: ${value}` : key}
                        </Badge>
                      ))
                    ) : (
                      <span className='text-sm text-muted-foreground'>No tags</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/*  <p className={contentTitleStyling}>Clusters</p>
          <div className={contentRowsStyling}>
            {workspaceWithClusters?.clusters.map((c) => (
              <Link key={getClusterUidView(c)} href={routes.app.cluster.getHref(getClusterUidView(c))}>
                <AccordionContentRow
                  icon={<Boxes className='size-4 text-muted-foreground shrink-0' />}
                  title={c.clusterName?.fieldValue || 'Unknown name'}
                >
                  <span className='w-12'>
                    <EnvironmentTag environment={getEnvironmentView(c)} />
                  </span>
                  <span className='flex flex-col gap-1'>
                    <b>CPU</b>
                    <span className='w-64'>
                      <ResourceBar
                        capacity={getResourcesCpuView(c)}
                        used={getResourcesCpuUsedMilliView(c)}
                        percentage={getResourcesCpuUsedPercentNumberView(c)}
                        showPercentage={false}
                      />
                    </span>
                  </span>
                  <span className='flex flex-col gap-1'>
                    <b>Memory</b>
                    <span className='w-64'>
                      <ResourceBar
                        capacity={getResourcesMemoryView(c)}
                        used={getResourcesMemoryUsedView(c)}
                        percentage={getResourcesMemoryUsedPercentNumberView(c)}
                        showPercentage={false}
                      />
                    </span>
                  </span>
                  <div className='flex-1' />
                  <span className='shrink-0 flex items-center gap-2 w-44 px-3 py-1.5 border rounded-full'>
                    <Waypoints size='16' />
                    {`${getNodesView(c)} nodes (${getNodePoolsView(c)} pools)`}
                  </span>
                </AccordionContentRow>
              </Link>
            ))}
          </div> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
