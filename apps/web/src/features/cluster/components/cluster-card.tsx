'use client'

import * as React from 'react'

import { Pill } from '@/components/shadcn/pill'
import { cn } from '@/utils/clsxm'
import type { ClusterListViewRowType } from '@ror/js-api-client'
import { Copy, Dot, ExternalLink } from 'lucide-react'
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
import { Button } from '@/components/shadcn/button'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { ResourceBar } from './resource-bar'

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

export const missingText = 'Missing ... '

interface ClusterCardProps {
  className?: string
  cluster: ClusterListViewRowType
  displayData?: ClusterCardDisplayData[]
}

function getPriceString(monthly: number | null | undefined, yearly: number | null | undefined): string {
  const m = monthly ?? (yearly != null ? yearly / 12 : null)
  const y = yearly ?? (monthly != null ? monthly * 12 : null)

  if (m == null && y == null) return missingText
  return `${m} kr / ${y} kr`
}

function displayDataContains(
  displayData: ClusterCardDisplayData[] | undefined,
  ...keys: ClusterCardDisplayData[]
): boolean {
  return keys.some((k) => displayData?.includes(k))
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className='font-bold'>{label}</p>
      <p>{value}</p>
    </div>
  )
}

const colsMap: Record<number, string> = {
  0: 'grid-cols-1',
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
}

function externalLinkNum(shows: (...keys: ClusterCardDisplayData[]) => boolean): string {
  const count = (['argocd', 'grafana', 'rorcli'] as ClusterCardDisplayData[]).filter((k) => shows(k)).length
  return colsMap[count] ?? 'grid-cols-3'
}

function ExternalTool({
  name,
  type,
  url,
}: {
  name: string
  type: 'argocd' | 'grafana'
  url: string | null | undefined
}) {
  if (!url)
    return (
      <Button variant={type} disabled className='font-bold'>
        <ExternalLink className='w-5 h-5' /> {name}
      </Button>
    )
  return (
    <Button variant={type} className='font-bold' asChild>
      <a href={url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
        <ExternalLink className='w-5 h-5' /> {name}
      </a>
    </Button>
  )
}

const infoSectionCls =
  'flex flex-col gap-1.5 [&>div]:grid [&>div]:grid-cols-2 [@container(max-width:360px)]:[&>div]:grid-cols-1'

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
  const healthCondition = getStatusView(cluster)
  // TODO: implement tags when view has tags
  // const serviceTags = getTagsView(cluster) || []

  const rorLogin = getRorLoginView(cluster)
  const envColor = getHighDifferenceEnvironmentColors(env as Environment)

  const shows = (...keys: ClusterCardDisplayData[]) => displayDataContains(displayData, ...keys)

  const basicItems: React.ReactNode[] = []

  if (shows('datacenterProvider') && provider) basicItems.push(<span key='provider'>{provider}</span>)

  if (shows('environment')) {
    basicItems.push(
      <Pill key='environment' variant={envColors[(env ?? 'undefined') as Environment]} className='px-3'>
        {(env ?? 'Undefined').charAt(0).toUpperCase() + (env ?? 'Undefined').slice(1)}
      </Pill>
    )
  }

  if (shows('datacenterName')) basicItems.push(<span key='datacenter'>{datacenter}</span>)

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
        {basicItems.length > 0 && (
          <>
            <section className='flex items-center gap-2'>
              {basicItems.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Dot />}
                  {item}
                </React.Fragment>
              ))}
            </section>
            <hr />
          </>
        )}

        {shows('nodes', 'cpu', 'memory', 'price', 'workspace') && (
          <>
            <section className={infoSectionCls}>
              {shows('nodes') && (
                <Info label='Nodes' value={`${nodesAmount} (${nodePools} pool${nodePools !== 1 ? 's' : ''})`} />
              )}
              {shows('cpu') && (
                <div>
                  <p className='font-bold'>CPU</p>
                  <ResourceBar capacity={cpu} used={cpuUsedMilli} percentage={cpuUsedPercentNumber} />
                </div>
              )}
              {shows('memory') && (
                <div>
                  <p className='font-bold'>Memory</p>
                  <ResourceBar capacity={memory} used={memoryUsed} percentage={memoryUsedPercentNumber} />
                </div>
              )}
              {shows('price') && (
                <Info label='Price (month/year)' value={getPriceString(monthlyPrices, yearlyPrices)} />
              )}
              {shows('workspace') && <Info label='Workspace' value={workspace} />}
            </section>
            <hr />
          </>
        )}

        {shows('argocd', 'grafana', 'rorcli') && (
          <>
            <section className={cn('grid gap-2', externalLinkNum(shows))}>
              {shows('argocd') && <ExternalTool name='ArgoCD' type='argocd' url={argocdUrl} />}
              {shows('grafana') && <ExternalTool name='Grafana' type='grafana' url={grafanaUrl} />}
              {shows('rorcli') && (
                <Button
                  variant='rorcli'
                  onClick={(e) => {
                    e.stopPropagation()
                    void copyToClipboard(rorLogin).catch(() => {})
                  }}
                  className='font-bold'
                >
                  <Copy /> ROR CLI
                </Button>
              )}
            </section>
            <hr />
          </>
        )}

        {shows('agentVersion', 'kubernetesVersion', 'toolingVersion') && (
          <>
            <section className={infoSectionCls}>
              {shows('agentVersion') && <Info label='ROR agent version' value={rorAgentVersion} />}
              {shows('kubernetesVersion') && <Info label='Kubernetes version' value={kubernetesVersion} />}
              {shows('toolingVersion') && <Info label='NHN tooling version' value={nhnToolingVersion} />}
            </section>
            <hr />
          </>
        )}

        {shows('serviceId') && (
          <>
            <section className={infoSectionCls}>
              <Info label='Service ID' value={serviceId} />
            </section>
            <hr />
          </>
        )}

        {shows('region', 'az') && (
          <section className={infoSectionCls}>
            {shows('region') && <Info label='Region' value={`${region} (${country})`} />}
            {shows('az') && <Info label='Availability zone' value={az} />}
          </section>
        )}
      </CardContent>
    </Card>
  )
}

export { ClusterCard }
