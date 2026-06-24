'use client'

import { Server, Box, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion'
import { Badge } from '@/components/shadcn/badge'
import type { ClusterGroup, NamespaceGroup, PolicyReportSummary } from '../utils/policy-report'
import { cn } from '@/utils/clsxm'
import { routes } from '@/config/routes'
import { fetchClusterReports } from '../utils/policy-reports-actions'
import { groupPolicyReportsByCluster } from '../utils/policy-report'
import type { PolicyReportFilters } from '../utils/policy-report'
import type { PolicyReport } from '@ror/js-api-client'

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
      <div className='h-full bg-red-500' style={{ width: `${failPct}%` }} />
      <div className='h-full bg-green-500' style={{ width: `${passPct}%` }} />
    </div>
  )
}

// -------------------------
// Namespace row
// -------------------------

const NamespaceRow = ({ ns, clusterUid }: { ns: NamespaceGroup; clusterUid: string }) => {
  const total = ns.summary.pass + ns.summary.fail + ns.summary.error + ns.summary.warn + ns.summary.skip
  return (
    <div className='flex items-center gap-4 px-4 py-3 rounded-lg border border-(--r-border-subtle) bg-card'>
      <Box className='size-4 text-muted-foreground shrink-0' />
      <span className='w-44 truncate text-sm font-medium'>{ns.namespace}</span>
      <div className='flex-1 min-w-20'>
        <PassFailBar summary={ns.summary} />
      </div>
      {ns.summary.fail + ns.summary.error > 0 && (
        <Badge
          variant='outline'
          className={cn('border-red-500/60 text-red-600 dark:text-red-400 bg-red-500/10 gap-1 shrink-0')}
        >
          <span>×</span>
          {(ns.summary.fail + ns.summary.error).toLocaleString()} failed
        </Badge>
      )}
      {ns.summary.pass > 0 && (
        <Badge
          variant='outline'
          className='border-green-500/60 text-green-600 dark:text-green-400 bg-green-500/10 gap-1 shrink-0'
        >
          <span>✓</span>
          {ns.summary.pass.toLocaleString()} passed
        </Badge>
      )}
      {total === 0 && <span className='text-xs text-muted-foreground shrink-0'>No results</span>}
      <Link
        href={`${routes.app.clusterPolicies.getHref(clusterUid)}?namespace=${encodeURIComponent(ns.namespace)}`}
        className='flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground shrink-0 ml-2'
      >
        View policies <ChevronRight className='size-4' />
      </Link>
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
              <span className='text-base font-semibold truncate'>{group.clusterName}</span>
              <div className='flex-1 min-w-24 max-w-72'>
                <PassFailBar summary={summaryToRender} />
              </div>
              <div className='flex items-center gap-2 shrink-0'>
                {displayFail > 0 && (
                  <Badge
                    variant='outline'
                    className='border-red-500/60 text-red-600 dark:text-red-400 bg-red-500/10 gap-1'
                  >
                    <span>×</span>
                    {displayFail.toLocaleString()} failed
                  </Badge>
                )}
                {displayPass > 0 && (
                  <Badge
                    variant='outline'
                    className='border-green-500/60 text-green-600 dark:text-green-400 bg-green-500/10 gap-1'
                  >
                    <span>✓</span>
                    {displayPass.toLocaleString()} passed
                  </Badge>
                )}
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className='px-6 pb-4'>
            <p className='text-sm text-muted-foreground mb-3'>Namespaces</p>
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
