'use client'

import * as React from 'react'

import { Pill } from '@/components/shadcn/pill'
import { cn } from '@/utils/clsxm'
import type { ClusterListViewRowType } from '@ror/js-api-client'
import { Layer } from '@ror/react'
import { Dot, ExternalLink } from 'lucide-react'
import { CodeSnippet } from '../../../components/ui/code-snippet'
import type { ClusterCardDisplayData } from '../types/display-data'
import {
  getArgocdUrlView,
  getAZView,
  getClusterNameView,
  getClusterUidView,
  getCountryView,
  getDatacenterView,
  getEnvironmentView,
  getGrafanaUrlView,
  getKubernetesVersionView,
  getNhnToolVersionView,
  getNodePoolsView,
  getNodesView,
  getPriceMonthView,
  getPriceYearView,
  getProviderView,
  getRegionView,
  getResourcesCpuUsedMilliView,
  getResourcesCpuUsedPercentNumberView,
  getResourcesCpuView,
  getResourcesMemoryUsedPercentNumberView,
  getResourcesMemoryUsedView,
  getResourcesMemoryView,
  getRorAgentVersionView,
  getRorLoginView,
  getServiceIdView,
  getStatusView,
  getWorkspaceView,
} from '../utils/cluster'
import { envColors, getHighDifferenceEnvironmentColors } from '../utils/env-colors'
import { HealthCircle } from './health-circle'
import { Environment } from '../types/environment'
import { routes } from '@/config/routes'
import { useRouter } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'
import { Progress } from '@/components/shadcn/progress'
import { negativeColors } from '@/utils/scale-colors'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn('bg-(--r-layer) text-card-foreground flex flex-col rounded-xl py-6 shadow-sm', className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-header' className={cn('@container/card-header h-10', className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-title' className={cn('leading-none font-semibold', className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn('px-6', className)} {...props} />
}

const missingText = 'Missing ... '

interface ClusterCardProps {
  className?: string
  cluster: ClusterListViewRowType
  displayData?: ClusterCardDisplayData[]
}

/**
 * Renders a card displaying detailed information about a Kubernetes cluster.
 *
 * @param className - Optional CSS class for custom styling.
 * @param user - The current user object, used for login code snippets.
 * @param cluster - The cluster object containing all relevant data.
 * @param displayData - Array of keys specifying which data fields to display on the card.
 *
 * @returns A clickable card component linking to the cluster details page.
 */
const ClusterCard = ({ className, cluster, displayData }: ClusterCardProps) => {
  // const clusterUid = getClusterUidView(cluster)
  // const clusterId = getClusterIdView(cluster)
  const clusterName = getClusterNameView(cluster) || missingText
  const provider = getProviderView(cluster) || missingText
  const datacenter = getDatacenterView(cluster) || missingText
  const az = getAZView(cluster) || missingText
  const country = getCountryView(cluster) || missingText
  const region = getRegionView(cluster) || missingText
  const workspace = getWorkspaceView(cluster) || missingText
  const env = getEnvironmentView(cluster) || missingText
  const cpu = getResourcesCpuView(cluster) || missingText
  const memory = getResourcesMemoryView(cluster) || missingText
  const cpuUsedMilli = getResourcesCpuUsedMilliView(cluster) || missingText
  const memoryUsed = getResourcesMemoryUsedView(cluster) || missingText
  const cpuUsedPercentNumber = getResourcesCpuUsedPercentNumberView(cluster)
  const memoryUsedPercentNumber = getResourcesMemoryUsedPercentNumberView(cluster)
  const nodesAmount = getNodesView(cluster) || 0
  const nodePools = getNodePoolsView(cluster) || 0
  const monthlyPrices = getPriceMonthView(cluster)
  const yearlyPrices = getPriceYearView(cluster)
  const argocdUrl = getArgocdUrlView(cluster)
  const grafanaUrl = getGrafanaUrlView(cluster)
  const rorAgentVersion = getRorAgentVersionView(cluster) || missingText
  const kubernetesVersion = getKubernetesVersionView(cluster) || missingText
  const nhnToolingVersion = getNhnToolVersionView(cluster) || missingText
  const serviceId = getServiceIdView(cluster) || missingText
  // const serviceTags = getTagsView(cluster) || []
  const healthCondition = getStatusView(cluster)
  // const created = getCreatedView(cluster)
  // const lastSeen = getLastSeenView(cluster)

  const rorLogin = getRorLoginView(cluster)
  const envColor = getHighDifferenceEnvironmentColors(env as Environment)

  let priceString = ''

  if (monthlyPrices && yearlyPrices) {
    priceString = monthlyPrices + ' kr/' + yearlyPrices + ' kr'
  } else if (monthlyPrices && !yearlyPrices) {
    priceString = monthlyPrices + ' kr/' + monthlyPrices * 12 + ' kr'
  } else if (!monthlyPrices && yearlyPrices) {
    priceString = yearlyPrices / 12 + ' kr/' + yearlyPrices * 12 + ' kr'
  } else {
    priceString = missingText
  }

  const Argo = () => {
    return argocdUrl ? (
      <a
        onClick={(e) => e.stopPropagation()}
        href={`https://${argocdUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='flex gap-2 font-bold text-blue-500 w-fit'
      >
        <span>ArgoCD</span>
        <ExternalLink className='w-5 h-5' />
      </a>
    ) : (
      <p className='flex [@container(max-width:360px)]:flex-col'>
        <span className='font-bold'>ArgoCD &nbsp;</span>
        <span>missing ...</span>
      </p>
    )
  }

  const Grafana = () => {
    return grafanaUrl ? (
      <a
        onClick={(e) => e.stopPropagation()}
        href={`https://${grafanaUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='flex gap-2 font-bold text-blue-500 w-fit'
      >
        <span>Grafana</span>
        <ExternalLink className='w-5 h-5' />
      </a>
    ) : (
      <p className='flex [@container(max-width:360px)]:flex-col '>
        <span className='font-bold'>Grafana &nbsp;</span>
        <span>missing ...</span>
      </p>
    )
  }

  const Tools = () => {
    return (
      <section className='grid grid-cols-2'>
        {displayData?.includes('argocd') && <Argo />}
        {displayData?.includes('grafana') && <Grafana />}
      </section>
    )
  }

  const CodeSnippetLogins = () => {
    return (
      <section className='flex flex-col gap-1.5 [&>div]:gap-0.5'>
        {displayData?.includes('rorcli') && (
          <div>
            <p className='font-bold'>ROR CLI</p>
            <Layer level={2}>
              <CodeSnippet type='single'>{rorLogin}</CodeSnippet>
            </Layer>
          </div>
        )}
      </section>
    )
  }

  const ResourceCard = ({
    label,
    resource,
  }: {
    label: string
    resource: { capacity?: string; used?: string; percentage?: number | null }
  }) => {
    const barColor = negativeColors(resource.percentage ?? 0).join(' ')

    return (
      <div>
        <p className='font-bold'>{label}</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='flex items-center'>
              <Progress value={resource.percentage ?? 0} indicatorColor={barColor} className='flex-1 mr-1' />
              <span className='w-10 text-right text-sm text-muted-foreground tabular-nums'>
                {resource.percentage == null ? '—' : `${resource.percentage.toFixed(0)}%`}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Used: {resource.used ? resource.used : 'data missing'}</p>
            <p>Capacity: {resource.capacity ? resource.capacity : 'data missing'}</p>
            <p>Percentage: {resource.percentage ? resource.percentage + '%' : 'data missing'}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }

  const Info = ({ label, value }: { label: string; value: string | number }) => {
    return (
      <div>
        <p className='font-bold'>{label}</p>
        <p>{value}</p>
      </div>
    )
  }

  const ServiceTags = () => {
    return displayData?.includes('serviceTags') ? (
      <div>
        <p className='font-bold'>Tags</p>
        <p className='flex flex-wrap gap-1'>
          {/* {serviceTags.map(
            ({ key, value, properties }: { key: string; value: string; properties: Record<string, string> }) => (
              <Pill key={key} style={{ backgroundColor: properties.color }}>
                {value}
              </Pill>
            )
          )} */}
        </p>
      </div>
    ) : null
  }

  const basicItems: React.ReactNode[] = []

  if (displayData?.includes('datacenterProvider') && provider) {
    basicItems.push(<span key='provider'>{provider}</span>)
  }

  // if (displayData?.includes('datacenterName') && datacenter) {
  //   basicItems.push(<span key='datacenter'>{datacenter}</span>)
  // }

  if (displayData?.includes('environment')) {
    basicItems.push(
      <Pill key='environment' variant={envColors[(env ?? 'undefined') as Environment]} className='px-3'>
        {(env ?? 'Undefined').charAt(0).toUpperCase() + (env ?? 'Undefined').slice(1)}
      </Pill>
    )
  }

  basicItems.push(<span key='datacenter'>{datacenter}</span>)

  const router = useRouter()

  const handleCardClick = () => {
    localStorage.setItem('selectedCluster', JSON.stringify(cluster))
    router.push(routes.app.cluster.getHref(getClusterUidView(cluster)))
  }

  return (
    <Card
      className={cn(
        'w-sm min-w-64 pt-0 hover:bg-[#ededed] dark:hover:bg-neutral-800 hover:cursor-pointer @container container',
        className
      )}
      role='button'
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.key === ' ') e.preventDefault()
          handleCardClick()
        }
      }}
    >
      <CardHeader className='m-0 mb-7 p-0 w-full'>
        <CardTitle className={cn('text-2xl rounded-t-xl px-6 py-2 flex', envColor[0], envColor[1])}>
          {(clusterName || 'Unnamed Cluster') as string}
        </CardTitle>
        <HealthCircle className='ml-auto mr-4 -mt-6 w-13 h-13 ' healthCondition={healthCondition} />
      </CardHeader>

      <CardContent className='text-sm flex flex-col gap-3'>
        <section className='flex items-center gap-2'>
          {basicItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Dot />}
              {item}
            </React.Fragment>
          ))}
        </section>

        <hr />

        <section className='flex flex-col gap-1.5 [&>div]:grid [&>div]:grid-cols-2 [@container(max-width:360px)]:[&>div]:grid-cols-1'>
          {displayData?.includes('nodes') && (
            <Info label='Nodes' value={`${nodesAmount} (${nodePools} pool${nodePools !== 1 ? 's' : ''})`} />
          )}
          {displayData?.includes('cpu') && (
            <ResourceCard
              label={'CPU'}
              resource={{
                capacity: cpu,
                used: cpuUsedMilli,
                percentage: cpuUsedPercentNumber,
              }}
            />
          )}
          {displayData?.includes('memory') && (
            <ResourceCard
              label={'Memory'}
              resource={{
                capacity: memory,
                used: memoryUsed,
                percentage: memoryUsedPercentNumber,
              }}
            />
          )}
          {displayData?.includes('price') && <Info label='Price (month/year)' value={priceString} />}
        </section>

        <hr />

        <section className='flex flex-col gap-2'>
          <Tools />
          <CodeSnippetLogins />
        </section>

        <hr />

        <section className='flex flex-col gap-1.5 [&>div]:grid [&>div]:grid-cols-2 [@container(max-width:360px)]:[&>div]:grid-cols-1'>
          {displayData?.includes('agentVersion') && <Info label='ROR agent version' value={rorAgentVersion} />}
          {displayData?.includes('kubernetesVersion') && <Info label='Kubernetes version' value={kubernetesVersion} />}
          {displayData?.includes('toolingVersion') && <Info label='NHN tooling version' value={nhnToolingVersion} />}
        </section>

        <hr />

        <div className='flex flex-col gap-1.5 [&>div]:grid [&>div]:grid-cols-2 [@container(max-width:360px)]:[&>div]:grid-cols-1'>
          <Info label='Service ID' value={serviceId} />
        </div>
        <ServiceTags />

        <hr />

        <section className='flex flex-col gap-1.5 [&>div]:grid [&>div]:grid-cols-2 [@container(max-width:360px)]:[&>div]:grid-cols-1'>
          <Info label='Region' value={`${region} (${country})`} />
          <Info label='Availability zone' value={az} />
          <Info label='Workspace' value={workspace} />
        </section>
      </CardContent>
    </Card>
  )
}

export { ClusterCard }
