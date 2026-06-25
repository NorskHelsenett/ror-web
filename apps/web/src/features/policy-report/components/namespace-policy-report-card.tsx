'use client'

import { Box, Shield, CheckCircle2, XCircle, ChevronDown } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/shadcn/collapsible'
import { Badge } from '@/components/shadcn/badge'
import { cn } from '@/utils/clsxm'
import type { NamespacePolicyGroup, PolicyGroup, PolicyResultItem } from '../utils/policy-report'

// -------------------------
// Pass/fail progress bar
// -------------------------

const PassFailBar = ({ pass, fail }: { pass: number; fail: number }) => {
  const total = pass + fail
  if (total === 0) return <div className='h-2 rounded-full bg-muted w-full' />
  const failPct = (fail / total) * 100
  const passPct = (pass / total) * 100
  return (
    <div className='relative h-2 w-full rounded-full overflow-hidden bg-muted flex'>
      <div className='h-full bg-orange-500' style={{ width: `${failPct}%` }} />
      <div className='h-full bg-blue-500' style={{ width: `${passPct}%` }} />
    </div>
  )
}

// -------------------------
// Severity badge color
// -------------------------

const severityClass = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'high':
    case 'critical':
      return 'border-red-500/60 text-red-600 dark:text-red-400 bg-red-500/10'
    case 'medium':
      return 'border-orange-500/60 text-orange-600 dark:text-orange-400 bg-orange-500/10'
    case 'low':
      return 'border-yellow-500/60 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10'
    default:
      return 'border-border text-muted-foreground'
  }
}

// -------------------------
// Individual result row
// -------------------------
// TODO: Check to see if this is correct (should it be properties, or just message returned)
const PolicyResultRow = ({ result }: { result: PolicyResultItem }) => {
  const isPassed = result.result === 'pass'
  const ruleName = result.properties?.rule ?? result.policy
  const kind = result.resources?.[0]?.kind ?? result.properties?.kind

  return (
    <div className='flex items-start gap-3 px-4 py-2.5'>
      {isPassed ? (
        <CheckCircle2 className='size-4 text-green-500 mt-0.5 shrink-0' />
      ) : (
        <XCircle className='size-4 text-red-500 mt-0.5 shrink-0' />
      )}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between gap-4'>
          <span className='text-sm font-medium'>{ruleName}</span>
          {kind && (
            <Badge variant='outline' className='text-xs shrink-0 text-muted-foreground'>
              {kind}
            </Badge>
          )}
        </div>
        {result.message && <p className='text-xs text-muted-foreground mt-0.5 leading-snug'>{result.message}</p>}
      </div>
    </div>
  )
}

// -------------------------
// Policy accordion card
// -------------------------

const PolicyCard = ({ policy }: { policy: PolicyGroup }) => {
  return (
    <AccordionItem
      value={policy.policyName}
      className='ring-1 ring-(--r-border-subtle) rounded-lg overflow-hidden bg-muted/40'
    >
      <AccordionTrigger className='px-4 py-3 hover:no-underline hover:bg-muted/40 [&[data-state=open]]:bg-muted/40'>
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          <Shield className='size-4 text-muted-foreground shrink-0' />
          <div className='flex-1 min-w-0 flex items-center gap-2'>
            <span className='text-sm font-semibold truncate'>{policy.policyName}</span>
            {policy.category && (
              <Badge variant='outline' className='text-xs shrink-0'>
                {policy.category}
              </Badge>
            )}
            {policy.severity && (
              <Badge variant='outline' className={cn('text-xs shrink-0 capitalize', severityClass(policy.severity))}>
                {policy.severity}
              </Badge>
            )}
          </div>
          <div className='w-50 shrink-0'>
            <PassFailBar pass={policy.summary.pass} fail={policy.summary.fail} />
          </div>
          <div className='w-44 shrink-0 flex items-center gap-2 justify-end'>
            {policy.summary.fail > 0 && (
              <Badge
                variant='outline'
                className='border-orange-500/60 text-orange-600 dark:text-orange-400 bg-orange-500/10 text-xs'
              >
                {policy.summary.fail} failed
              </Badge>
            )}
            {policy.summary.pass > 0 && (
              <Badge
                variant='outline'
                className='border-blue-500/60 text-blue-600 dark:text-blue-400 bg-blue-500/10 text-xs'
              >
                {policy.summary.pass} passed
              </Badge>
            )}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className='divide-y divide-(--r-border-subtle) border-t border-(--r-border-subtle)'>
          {policy.results.map((result, i) => (
            <PolicyResultRow key={i} result={result} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

// -------------------------
// Namespace policy report card
// -------------------------

interface NamespacePolicyReportCardProps {
  group: NamespacePolicyGroup
  defaultOpen?: boolean
}

export const NamespacePolicyReportCard = ({ group, defaultOpen = false }: NamespacePolicyReportCardProps) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className='pb-2'>
      <CollapsibleTrigger className='flex items-center gap-2 pb-3 border-b border-(--r-border-subtle) w-full text-left group'>
        <Box className='size-4 text-muted-foreground shrink-0' />
        <span className='text-base font-semibold'>{group.namespace}</span>
        {group.summary.fail > 0 && (
          <span className='text-sm text-orange-500 dark:text-orange-400'>{group.summary.fail} failed</span>
        )}
        {group.summary.fail > 0 && group.summary.pass > 0 && <span className='text-sm text-muted-foreground'>·</span>}
        {group.summary.pass > 0 && (
          <span className='text-sm text-blue-500 dark:text-blue-400'>{group.summary.pass} passed</span>
        )}
        <ChevronDown className='size-4 text-muted-foreground ml-auto transition-transform group-data-[state=open]:rotate-180' />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Accordion type='multiple' className='flex flex-col gap-2 pt-3'>
          {group.policies.map((policy) => (
            <PolicyCard key={policy.policyName} policy={policy} />
          ))}
        </Accordion>
      </CollapsibleContent>
    </Collapsible>
  )
}
