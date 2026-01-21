'use client'

import { CodeSnippet } from '@/components/ui/code-snippet'
import { CardHeader, CardItem } from '@/components/ui/grid-layout-card'
import { useClusterContext } from '@/context/cluster-context'
import { Layer } from '@ror/react'
import 'gridstack/dist/gridstack.min.css'
import { ExternalLink } from 'lucide-react'
import { User } from 'next-auth'
import { useCallback } from 'react'
import { standardLayouts } from '../config/cluster-details-layouts'
import {
  getClusterId,
  getClusterResource,
  getCreated,
  getDatacenter,
  getHaClusterPlaneValue,
  getKubectlLogin,
  getLastObserved,
  getPrices,
  getProject,
  getProvider,
  getRorLogin,
  getTools,
  getVersions,
  getWorkspace,
} from '../utils/cluster'
import { formatObservationDate, formatResource } from '../utils/formats'
import { GridLayoutWrapper } from '@/components/ui/grid-layout-wrapper'

interface ClusterDetailsProps {
  user?: User
  className?: string
}

export const ClusterDetails = ({ user }: ClusterDetailsProps) => {
  const { cluster } = useClusterContext()

  const clusterId = getClusterId(cluster)
  const cpu = getClusterResource(cluster, 'cpu')
  const memory = getClusterResource(cluster, 'memory')
  const gpu = getClusterResource(cluster, 'gpu')
  const disk = getClusterResource(cluster, 'disk')
  const tools = getTools(cluster)
  const prices = getPrices(cluster)
  const lastObserved = getLastObserved(cluster)
  const created = getCreated(cluster)
  const rorLogin = getRorLogin(cluster)
  const kubectlLogin = getKubectlLogin(cluster, user?.email || '<user-email missing>')
  const versions = getVersions(cluster)
  const project = getProject(cluster)
  const workspace = getWorkspace(cluster)
  const datacenter = getDatacenter(cluster)
  const provider = getProvider(cluster)

  const MemoryCard = useCallback(
    () => (
      <div className='h-full w-full flex flex-col bg-(--r-layer) p-4 rounded-md'>
        <CardHeader title='Memory' />
        <div className='flex flex-col gap-2'>
          <CardItem label='CPU'>{formatResource('cpu', cpu)}</CardItem>
          <CardItem label='Memory'>{formatResource('memory', memory)}</CardItem>
          <CardItem label='GPU'>{formatResource('gpu', gpu)}</CardItem>
          <CardItem label='Disk'>{formatResource('disk', disk)}</CardItem>
        </div>
      </div>
    ),
    [cpu, memory, gpu, disk]
  )

  const InfoCard = useCallback(
    () => (
      <div className='h-full w-full flex flex-col bg-(--r-layer) p-4 rounded-md'>
        <CardHeader title='Information' />
        <div className='flex gap-2'>
          <div className='flex flex-1 flex-col gap-2'>
            <CardItem label='Cluster ID:'>{clusterId}</CardItem>
            <CardItem label='Project:'>{project}</CardItem>
            <CardItem label='Workspace:'>{workspace}</CardItem>
            <CardItem label='Datacenter:'>{datacenter}</CardItem>
          </div>
          <div className='flex flex-1 flex-col gap-2'>
            <CardItem label='Provider:'>{provider}</CardItem>
            <CardItem label='HA control plane:'>{getHaClusterPlaneValue(cluster)}</CardItem>
            <CardItem label='Egress IP:'>MOCK EGRESS IP</CardItem>
          </div>
        </div>
      </div>
    ),
    [cluster, clusterId, datacenter, provider, project, workspace]
  )

  const ObservedCard = useCallback(
    () => (
      <div className='h-full w-full flex flex-col bg-(--r-layer) p-4 rounded-md'>
        <CardHeader title='Observed' />
        <div className='flex flex-col gap-2'>
          <CardItem label='Last observed:'>
            {lastObserved ? formatObservationDate(lastObserved.toString()) : 'Missing…'}
          </CardItem>
          <CardItem label='Created:'>{created ? formatObservationDate(created.toString()) : 'Missing…'}</CardItem>
        </div>
      </div>
    ),
    [lastObserved, created]
  )

  const ToolsCard = useCallback(
    () => (
      <div className='h-full w-full flex flex-col bg-(--r-layer) p-4 rounded-md'>
        <CardHeader title='Tools' />
        <div className='flex flex-col gap-2'>
          <section className='flex flex-col'>
            {tools.argo ? (
              <a
                onClick={(e) => e.stopPropagation()}
                href={`https://${tools.argo}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex gap-2 font-bold text-blue-500 w-fit'
              >
                <span>ArgoCD</span>
                <ExternalLink className='w-5 h-5' />
              </a>
            ) : (
              <p className='flex [@container(max-width:360px)]:flex-col overflow-none'>
                <span className='font-bold'>ArgoCD &nbsp;</span>
                <span>missing ...</span>
              </p>
            )}
          </section>
          <section className='flex flex-col'>
            {tools.grafana ? (
              <a
                onClick={(e) => e.stopPropagation()}
                href={`https://${tools.grafana}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex gap-2 font-bold text-blue-500 w-fit'
              >
                <span>Grafana</span>
                <ExternalLink className='w-5 h-5' />
              </a>
            ) : (
              <p className='flex [@container(max-width:360px)]:flex-col overflow-none'>
                <span className='font-bold'>Grafana &nbsp;</span>
                <span>missing ...</span>
              </p>
            )}
          </section>
          <Layer level={2}>
            <CodeSnippet type='single'>{rorLogin}</CodeSnippet>
          </Layer>
          <Layer level={2}>
            <CodeSnippet type='single'>{kubectlLogin}</CodeSnippet>
          </Layer>
        </div>
      </div>
    ),
    [tools, rorLogin, kubectlLogin]
  )

  const VersionsCard = useCallback(
    () => (
      <div className='h-full w-full flex flex-col bg-(--r-layer) p-4 rounded-md'>
        <CardHeader title='Versions' />
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <b>Tooling version: </b>
            <span>{versions.nhnTooling.version}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <b>Agent version: </b>
            <span>{versions.agent.version}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <b>Kubernetes version: </b>
            <span>{versions.kubernetes.version}</span>
          </div>
        </div>
      </div>
    ),
    [versions]
  )

  const PricesCard = useCallback(
    () => (
      <div className='h-full w-full flex flex-col bg-(--r-layer) p-4 rounded-md'>
        <CardHeader title='Prices' />
        <div className='flex flex-col gap-2'>
          <span>
            <b>Monthly price: </b> {prices.monthly || 0} kr
          </span>
          <span>
            <b>Yearly price: </b> {prices.yearly || 0} kr
          </span>
        </div>
      </div>
    ),
    [prices]
  )

  const widgetContent: Record<string, React.ReactNode> = {
    memory: <MemoryCard />,
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
