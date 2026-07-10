/*
 * FILE OVERVIEW:
 *
 * Layout component that provides shared UI structure and context for all cluster-related pages under the [id] route.
 */

import { cache, Fragment, ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'
import { ClusterHeader } from '@/features/cluster/components/cluster-header'
import { ClusterProvider } from '@/context/cluster-context'
import { RenderApiError } from '@/utils/renderApiError'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { fetchClusterViewItem, fetchKubernetesCluster } from '@/features/cluster/services/fetch-clusters'
import { ClusterListItemView, KubernetesCluster } from '@ror/js-api-client'

interface ClusterPageLayoutProps {
  params: Promise<{
    id: string
  }>
  children: ReactNode
}
const {
  cluster,
  clusterIngresses,
  clusterNodePools,
  clusterPolicies,
  clusterVulnerabilities,
  clusterCompliance,
  clusterAbout,
} = routes.app

export interface navigationItemObject {
  label: string
  href: string
}

const oldRorBaseUrl = 'https://legacy.ror.nhn.no/'

const createTabNavigationItems = (clusterId: string, clusterUid: string) => {
  return [
    {
      label: 'Details',
      href: cluster.getHref(clusterUid),
    },
    {
      label: clusterIngresses.label,
      href: `${oldRorBaseUrl}cluster/${clusterId}?tab=ingresses`,
    },
    {
      label: clusterNodePools.label,
      href: `${oldRorBaseUrl}cluster/${clusterId}?tab=nodepools`,
    },
    {
      label: clusterPolicies.label,
      href: clusterPolicies.getHref(clusterUid),
    },
    {
      label: clusterVulnerabilities.label,
      href: `${oldRorBaseUrl}cluster/${clusterId}?tab=vulnerabilityReports`,
    },
    {
      label: clusterCompliance.label,
      href: `${oldRorBaseUrl}cluster/${clusterId}?tab=complianceReports`,
    },
    {
      label: clusterAbout.label,
      href: `${oldRorBaseUrl}cluster/${clusterId}?tab=metadata`,
    },
  ]
}

const fetchCluster = cache(async (id: string) => {
  return fetchClusterViewItem(id)
})

/**
 * Layout component for the Cluster page.
 *
 * This component is responsible for:
 * - Fetching the cluster ID from the provided `params` prop.
 * - Retrieving the selected cluster data from localStorage.
 * - Providing the cluster context to its children.
 * - Rendering the cluster header, navigation tabs, and a development notice.
 * - Displaying a loading message while the cluster data is being loaded.
 *
 * @param params - A promise that resolves to an object containing the cluster ID.
 * @param children - The child components to be rendered within the layout.
 * @returns The layout for the cluster page, including context and navigation.
 */
export default async function ClusterPageLayout({ params, children }: ClusterPageLayoutProps) {
  const { id } = await params

  try {
    const clusterList = (await fetchCluster(id)) as ClusterListItemView
    const cluster = clusterList.rows[0]
    const kubernetesCluster = (await fetchKubernetesCluster(id)) as KubernetesCluster

    if (!cluster) {
      redirect('/clusters')
    }

    const clusterId = cluster.clusterId?.fieldValue || 'missing'
    const clusterUid = cluster.clusterUid?.fieldValue || 'missing'
    const tabs = createTabNavigationItems(clusterId, clusterUid)
    const clusterContextValue = { cluster, kubernetesCluster }

    return (
      <ClusterProvider value={clusterContextValue}>
        <Fragment>
          <div className='border-b'>
            <ClusterHeader tabs={tabs} />
          </div>
          <div className='pt-2 px-6 md:px-6 md:pt-8'>{children}</div>
        </Fragment>
      </ClusterProvider>
    )
  } catch (error) {
    return RenderApiError(error)
  }
}
