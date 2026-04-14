'use client'

/*
 * FILE OVERVIEW:
 *
 * Layout component that provides shared UI structure and context for all cluster-related pages under the [id] route.
 */

import { Fragment, ReactNode } from 'react'
import { routes } from '@/config/routes'
import { ClusterHeader } from '@/features/cluster/components/cluster-header'
import { ClusterProvider } from '@/context/cluster-context'
import { RenderApiError } from '@/utils/renderApiError'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { useClusterLayout } from '@/features/cluster/hooks/use-cluster-layout'

interface ClusterPageLayoutProps {
  params: Promise<{
    id: string
  }>
  children: ReactNode
}

// TODO: Uncomment the following lines when the respective components are available
const {
  cluster,
  // clusterIngresses,
  clusterNodePools,
  // clusterPolicies,
  clusterVulnerabilities,
  // clusterCompliance,
  // clusterAbout,
  clusterRawData,
} = routes.app

export interface navigationItemObject {
  label: string
  href: string
}

const createTabNavigationItems = (clusterId: string) => {
  return [
    {
      label: 'Details',
      href: cluster.getHref(clusterId),
    },
    // {
    //   label: clusterIngresses.label,
    //   href: clusterIngresses.getHref(clusterId),
    // },
    {
      label: clusterNodePools.label,
      href: clusterNodePools.getHref(clusterId),
    },
    // {
    //   label: clusterPolicies.label,
    //   href: clusterPolicies.getHref(clusterId),
    // },
    {
      label: clusterVulnerabilities.label,
      href: clusterVulnerabilities.getHref(clusterId),
    },
    // {
    //   label: clusterCompliance.label,
    //   href: clusterCompliance.getHref(clusterId),
    // },
    // {
    //   label: clusterAbout.label,
    //   href: clusterAbout.getHref(clusterId),
    // },
    {
      label: clusterRawData.label,
      href: clusterRawData.getHref(clusterId),
    },
  ]
}

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
export default function ClusterPageLayout({ params, children }: ClusterPageLayoutProps) {
  const { id, cluster, isLoading, error } = useClusterLayout({ params })

  try {
    if (isLoading) {
      return <div>Loading Cluster data...</div>
    }

    if (error || !cluster) {
      return (
        <div className='p-6'>
          <h1 className='text-2xl font-bold text-red-600'>VM Not Found</h1>
          <p>{error || 'Could not load VM data. Please go back and select a VM.'}</p>
        </div>
      )
    }

    const tabs = createTabNavigationItems(id)
    const clusterContextValue = { cluster }

    return (
      <ClusterProvider value={clusterContextValue}>
        <Fragment>
          <div className='border-b'>
            <ClusterHeader tabs={tabs} />
          </div>
          <NotReadyMessage className='mx-6 mt-8'>
            The page is still under development, so some data and functionality is missing.
          </NotReadyMessage>
          <div className='pt-2 px-6 md:px-6 md:pt-8'>{children}</div>
        </Fragment>
      </ClusterProvider>
    )
  } catch (error) {
    return RenderApiError(error)
  }
}
