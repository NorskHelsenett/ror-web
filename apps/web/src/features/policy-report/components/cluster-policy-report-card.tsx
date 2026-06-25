'use client'

import { Server, Box, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion'
import { Badge } from '@/components/shadcn/badge'
import type { ClusterGroup, NamespaceGroup, PolicyReportSummary } from '../utils/policy-report'
import { cn } from '@/utils/clsxm'
import { routes } from '@/config/routes'
import { fetchClusterReports } from '../utils/policy-reports-actions'
import { groupPolicyReportsByCluster } from '../utils/policy-report'
import type { PolicyReportFilters } from '../utils/policy-report'
import type { PolicyReport } from '@ror/js-api-client'
import { FaSpinner } from 'react-icons/fa'

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
  group: ClusterGroup
  filters: PolicyReportFilters
}

export const ClusterPolicyReportCard = ({ group, filters }: ClusterPolicyReportCardProps) => {
  const [loadedReports, setLoadedReports] = useState<PolicyReport[] | null>(null)
  const [isLoadingNamespaces, setIsLoadingNamespaces] = useState(false)

  useEffect(() => {
    let cancelled = false
    setIsLoadingNamespaces(true)
    fetchClusterReports(group.clusterUid).then((reports) => {
      if (!cancelled) {
        setLoadedReports(reports)
        setIsLoadingNamespaces(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [group.clusterUid])

  const handleAccordionChange = async (value: string) => {
    if (value && loadedReports === null && !isLoadingNamespaces) {
      setIsLoadingNamespaces(true)
      const reports = await fetchClusterReports(group.clusterUid)
      setLoadedReports(reports)
      setIsLoadingNamespaces(false)
    }
  }

  const loadedGroups = useMemo(() => {
    if (loadedReports === null) return null
    const groups = groupPolicyReportsByCluster(loadedReports, filters)
    return groups[0] ?? null
  }, [loadedReports, filters])

  const namespacesToRender = loadedGroups?.namespaces ?? group.namespaces
  const summaryToRender = loadedGroups?.summary ?? group.summary

  const displayFail = summaryToRender.fail + summaryToRender.error
  const displayPass = summaryToRender.pass

  return (
    <div className='rounded-xl border border-(--r-border-subtle) bg-card overflow-hidden'>
      <Accordion type='single' collapsible onValueChange={handleAccordionChange}>
        <AccordionItem value={group.clusterUid} className='border-b-0'>
          <AccordionTrigger className='px-6 py-4 hover:no-underline hover:bg-muted/40 [&[data-state=open]]:bg-muted/40'>
            <div className='flex items-center gap-4 flex-1 min-w-0'>
              <Server className='size-4 text-muted-foreground shrink-0' />
              <span className='w-48 shrink-0 truncate text-base font-semibold'>{group.clusterName}</span>
              <div className='w-40 shrink-0'>
                {isLoadingNamespaces ? (
                  <div className='h-2 rounded-full bg-muted w-full animate-pulse' />
                ) : (
                  <PassFailBar summary={summaryToRender} />
                )}
              </div>
              <div className='flex-1' />
              <div className='shrink-0 flex items-center gap-2'>
                {isLoadingNamespaces ? (
                  <FaSpinner className='size-4 text-muted-foreground animate-spin' />
                ) : (
                  <>
                    {displayFail > 0 && (
                      <Badge
                        variant='outline'
                        className='border-orange-500/60 text-orange-600 dark:text-orange-400 bg-orange-500/10 gap-1'
                      >
                        <span>×</span>
                        {displayFail.toLocaleString()} failed
                      </Badge>
                    )}
                    {displayPass > 0 && (
                      <Badge
                        variant='outline'
                        className='border-blue-500/60 text-blue-600 dark:text-blue-400 bg-blue-500/10 gap-1'
                      >
                        <span>✓</span>
                        {displayPass.toLocaleString()} passed
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className='px-6 pb-4'>
            <p className='text-sm text-muted-foreground mb-3 mt-2'>Namespaces</p>
            {isLoadingNamespaces ? (
              <p className='text-sm text-muted-foreground'>Loading…</p>
            ) : (
              <div className='flex flex-col gap-2'>
                {namespacesToRender.map((ns) => (
                  <NamespaceRow key={ns.namespace} ns={ns} clusterUid={group.clusterUid} />
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
