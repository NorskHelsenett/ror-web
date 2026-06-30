import { getRorApi } from '@/services/ror-api'
import { groupByNamespaceAndPolicy } from '@/features/policy-report/utils/policy-report'
import { NamespacePolicyReportCard } from '@/features/policy-report/components/namespace-policy-report-card'
import { ReleaseSpotlight } from '@/components/ui/release-spotlight'

export const dynamic = 'force-dynamic'

export default async function ClusterPoliciesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { id: clusterUid } = await params
  const sp = await searchParams
  const expandedNamespace = typeof sp.namespace === 'string' ? sp.namespace : undefined

  const api = await getRorApi()
  const policyReportsResponse = await api.policyReport.listByCluster(clusterUid)
  const reports = policyReportsResponse?.resources ?? []

  const namespaceGroups = groupByNamespaceAndPolicy(reports)

  if (namespaceGroups.length === 0) {
    return <p className='text-sm text-muted-foreground'>No policy reports found.</p>
  }

  return (
    <ReleaseSpotlight
      releaseId='policy-reports-cluster-tab'
      step={1}
      totalSteps={1}
      title='Policy reports'
      description='View policy report results grouped by namespace for this cluster.'
      side='top'
      align='start'
    >
      <div className='flex flex-col gap-3'>
        {namespaceGroups.map((group) => (
          <NamespacePolicyReportCard
            key={group.namespace}
            group={group}
            defaultOpen={group.namespace === expandedNamespace}
          />
        ))}
      </div>
    </ReleaseSpotlight>
  )
}
