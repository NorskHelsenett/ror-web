'use client'

import { CardHeader, CardItem } from '@/components/ui/grid-layout-card'
import { useClusterContext } from '@/context/cluster-context'
import 'gridstack/dist/gridstack.min.css'
import { Copy, ExternalLink } from 'lucide-react'
import { useCallback } from 'react'
import { standardLayouts } from '../config/cluster-details-layouts'
import {
  getArgocdUrlView,
  getAZView,
  getClusterIdView,
  getClusterUidView,
  getCountryView,
  getCreatedView,
  getDatacenterView,
  getGrafanaUrlView,
  getKubernetesVersionView,
  getLastSeenView,
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
  getWorkspaceView,
} from '../utils/cluster'
import { formatObservationDate } from '../utils/formats'
import { GridLayoutWrapper } from '@/components/ui/grid-layout-wrapper'
import { missingText } from './cluster-card'
import { ResourceBar } from './resource-bar'
import { Button } from '@/components/shadcn/button'
import { copyToClipboard } from '@/utils/copy-to-clipboard'

export const ClusterDetails = () => {
  const { cluster } = useClusterContext()

  const clusterId = getClusterIdView(cluster) || missingText
  const clusterUid = getClusterUidView(cluster) || missingText
  const provider = getProviderView(cluster) || missingText
  const datacenter = getDatacenterView(cluster) || missingText
  const az = getAZView(cluster) || missingText
  const country = getCountryView(cluster) || missingText
  const region = getRegionView(cluster) || missingText
  const workspace = getWorkspaceView(cluster) || missingText
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
  const created = getCreatedView(cluster) || missingText
  const lastSeen = getLastSeenView(cluster) || missingText
  const rorLogin = getRorLoginView(cluster) || missingText

  const cardStyling = 'h-full w-full flex flex-col bg-(--r-layer) p-4 rounded-md'

  const MemoryCard = useCallback(
    () => (
      <div className={cardStyling}>
        <CardHeader title='Memory' />
        <div className='flex flex-col gap-2'>
          <CardItem label='CPU'>
            <ResourceBar capacity={cpu} used={cpuUsedMilli} percentage={cpuUsedPercentNumber} />
          </CardItem>
          <CardItem label='Memory'>
            <ResourceBar capacity={memory} used={memoryUsed} percentage={memoryUsedPercentNumber} />
          </CardItem>
        </div>
      </div>
    ),
    [cpu, cpuUsedMilli, cpuUsedPercentNumber, memory, memoryUsed, memoryUsedPercentNumber]
  )

  const NodesCard = useCallback(
    () => (
      <div className={cardStyling}>
        <CardHeader title='Node information' />
        <div className='flex flex-col gap-2'>
          <CardItem label='Node pools'>{nodePools}</CardItem>
          <CardItem label='Nodes'>{nodesAmount}</CardItem>
        </div>
      </div>
    ),
    [nodePools, nodesAmount]
  )

  const InfoCard = useCallback(
    () => (
      <div className={cardStyling}>
        <CardHeader title='Information' />
        <div className='grid grid-cols-2 gap-2'>
          <CardItem label='Cluster UID' className='col-span-2'>
            {clusterUid}
          </CardItem>
          <CardItem label='Cluster ID' className='col-span-2'>
            {clusterId}
          </CardItem>
          {/* TODO: ADD PROJECT <CardItem label='Project'>{project}</CardItem> */}
          <CardItem label='Workspace'>{workspace}</CardItem>
          <CardItem label='Datacenter'>{datacenter}</CardItem>
          <CardItem label='Provider'>{provider}</CardItem>
          <CardItem label='Service ID'>{serviceId}</CardItem>
          <CardItem label='Availability zone'>{az}</CardItem>
          <CardItem label='Location'>
            {region} - {country}
          </CardItem>
          {/* TODO: ADD HA (THROUGH CONTROL PLANE OVER 1 <CardItem label='HA control plane'>{getHaClusterPlaneValue(cluster)}</CardItem> */}
          {/* TODO: ADD EGRESS IP<CardItem label='Egress IP'>MOCK EGRESS IP</CardItem> */}
        </div>
      </div>
    ),
    [az, clusterId, clusterUid, country, datacenter, provider, region, serviceId, workspace]
  )

  const ObservedCard = useCallback(
    () => (
      <div className={cardStyling}>
        <CardHeader title='Observed' />
        <div className='flex flex-col gap-2'>
          <CardItem label='Last observed'>
            {lastSeen ? formatObservationDate(lastSeen.toString()) : 'Missing…'}
          </CardItem>
          <CardItem label='Created'>{created ? formatObservationDate(created.toString()) : 'Missing…'}</CardItem>
        </div>
      </div>
    ),
    [lastSeen, created]
  )

  const ToolsCard = useCallback(
    () => (
      <div className={cardStyling}>
        <CardHeader title='Tools' />
        <div className='flex flex-col gap-2'>
          {!argocdUrl ? (
            <Button variant='argocd' disabled className='font-bold'>
              <ExternalLink className='w-5 h-5' /> ArgoCD
            </Button>
          ) : (
            <Button variant='argocd' className='font-bold' asChild>
              <a href={argocdUrl} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
                <ExternalLink className='w-5 h-5' /> ArgoCD
              </a>
            </Button>
          )}

          {!grafanaUrl ? (
            <Button variant='grafana' disabled className='font-bold'>
              <ExternalLink className='w-5 h-5' /> Grafana
            </Button>
          ) : (
            <Button variant='grafana' className='font-bold' asChild>
              <a href={grafanaUrl} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
                <ExternalLink className='w-5 h-5' /> Grafana
              </a>
            </Button>
          )}

          {!rorLogin ? (
            <Button
              variant='rorcli'
              disabled
              onClick={() => {
                void copyToClipboard(rorLogin).catch(() => {})
              }}
              className='font-bold'
            >
              <Copy /> ROR CLI
            </Button>
          ) : (
            <Button
              variant='rorcli'
              onClick={() => {
                void copyToClipboard(rorLogin).catch(() => {})
              }}
              className='font-bold'
            >
              <Copy /> ROR CLI
            </Button>
          )}
        </div>
      </div>
    ),
    [argocdUrl, grafanaUrl, rorLogin]
  )

  const VersionsCard = useCallback(
    () => (
      <div className={cardStyling}>
        <CardHeader title='Versions' />
        <div className='flex flex-col gap-3'>
          <CardItem label='Tooling version'>{nhnToolingVersion}</CardItem>
          <CardItem label='Agent version'>{rorAgentVersion}</CardItem>
          <CardItem label='Kubernetes version'>{kubernetesVersion}</CardItem>
        </div>
      </div>
    ),
    [kubernetesVersion, nhnToolingVersion, rorAgentVersion]
  )

  const PricesCard = useCallback(
    () => (
      <div className={cardStyling}>
        <CardHeader title='Prices' />
        <div className='flex flex-col gap-2'>
          <CardItem label='Monthly price'>{monthlyPrices || 0} kr</CardItem>
          <CardItem label='Yearly price'>{yearlyPrices || 0} kr</CardItem>
        </div>
      </div>
    ),
    [monthlyPrices, yearlyPrices]
  )

  const widgetContent: Record<string, React.ReactNode> = {
    memory: <MemoryCard />,
    nodes: <NodesCard />,
    info: <InfoCard />,
    observed: <ObservedCard />,
    tools: <ToolsCard />,
    versions: <VersionsCard />,
    prices: <PricesCard />,
  }

  return (
    <div>
      <GridLayoutWrapper preferenceKey={'clusterCards'} standardLayouts={standardLayouts} contentMap={widgetContent} />
    </div>
  )
}
