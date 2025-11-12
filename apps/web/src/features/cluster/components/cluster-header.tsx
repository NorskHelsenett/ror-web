/*
 * FILE OVERVIEW:
 *
 * A header component for displaying cluster information, including a title,
 * navigation tabs, and a status area.
 */

'use client'

import { HealthCircle } from './health-circle'
import { navigationItemObject } from '@/app/(protected)/clusters/[id]/layout'
import { useClusterContext } from '@/context/cluster-context'
import { getEnvironmentColors } from '../utils/env-colors'
import { getClusterName, getEnvironment, getHealthCondition } from '../utils/cluster'
import { ResourceHeader } from '@/components/ui/resource-header'

interface ClusterHeaderProps {
  className?: string
  tabs: navigationItemObject[]
}

/**
 * Renders the header section for a cluster resource, displaying the cluster name, environment, and health status.
 *
 * @param className - Optional additional CSS classes to apply to the header.
 * @param tabs - An array of tab definitions to be rendered in the header.
 */
export const ClusterHeader = ({ className, tabs }: ClusterHeaderProps) => {
  const { cluster } = useClusterContext()
  const environment = getEnvironment(cluster)
  const [lightmode, darkmode] = getEnvironmentColors(environment)
  const healthCondition = getHealthCondition(cluster)
  const clusterName = getClusterName(cluster)

  const rightContent = (
    <div className='flex items-center gap-4'>
      <HealthCircle className='w-20 h-20 hidden lg:block' healthCondition={healthCondition} />
      <div className='flex flex-col font-bold xl:font-normal'>
        <p className='text-lg flex'>
          <span className='hidden xl:block'>Environment:&nbsp;</span>
          <span className='hidden md:block'>{environment?.toUpperCase() ?? 'UNKNOWN'}</span>
        </p>
        <p className='text-lg flex'>
          <span className='hidden xl:block'>Status:&nbsp;</span>
          <span className='hidden md:block'>
            {healthCondition?.status
              ? healthCondition.status.charAt(0).toUpperCase() + healthCondition.status.slice(1)
              : 'Unknown'}
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <ResourceHeader
      className={className}
      title={clusterName}
      tabs={tabs}
      rightContent={rightContent}
      lightmodeColor={lightmode}
      darkmodeColor={darkmode}
    />
  )
}
