'use client'

import { Button } from '@/components/shadcn/button'
import { useClusterContext } from '@/context/cluster-context'
import { Layer } from '@ror/react'
import { ExternalLink } from 'lucide-react'
import { User } from 'next-auth'
import { toast } from 'sonner'
import type { Layouts } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { CodeSnippet } from '../../../components/ui/code-snippet'
import { formatObservationDate, formatResource } from '../utils/formats'
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
import { standardLayouts } from '../config/cluster-details-layouts'
import { GridLayoutWrapper } from '@/components/ui/grid-layout-wrapper'
import { CardHeader, CardItem } from '@/components/ui/grid-layout-card'
import { useLayoutPreferences } from '@/hooks/use-layout-preferences'

interface ClusterDetailsProps {
  user?: User
  className?: string
}

/**
 * Displays detailed information about a cluster, including resources, metadata, tools, versions, and pricing.
 *
 * @param user - The current user object, used for personalized cluster access information.
 * @param className - Optional CSS class for custom styling of the grid layout wrapper.
 *
 * @returns A React component rendering cluster details in a draggable, responsive grid layout.
 */
export const ClusterDetails = ({ user, className }: ClusterDetailsProps) => {
  const { cluster } = useClusterContext()

  const {
    layouts,
    setLayouts,
    layoutKey,
    currentBreakpoint,
    setCurrentBreakpoint,
    saveLayouts,
    resetToSaved,
    resetToDefault,
  } = useLayoutPreferences('clusterCards', standardLayouts)
  console.log('key', layoutKey)

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

  const LayoutButtons = () => (
    <div className='flex sm:flex-row flex-col gap-2 mb-3'>
      <Button
        onClick={() => {
          const newLayouts: Layouts = { ...layouts, [currentBreakpoint]: layouts[currentBreakpoint] }
          saveLayouts(newLayouts)
          toast.info('Layout saved')
        }}
      >
        Save layout
      </Button>
      <Button onClick={resetToSaved}>Reset to saved</Button>
      <Button onClick={resetToDefault}>Reset to default</Button>
    </div>
  )

  const MemoryCard = () => (
    <>
      <CardHeader title='Memory' />
      <div className='flex flex-col gap-2'>
        <CardItem label='CPU'>{formatResource('cpu', cpu)}</CardItem>
        <CardItem label='Memory'>{formatResource('memory', memory)}</CardItem>
        <CardItem label='GPU'>{formatResource('gpu', gpu)}</CardItem>
        <CardItem label='Disk'>{formatResource('disk', disk)}</CardItem>
      </div>
    </>
  )

  const InfoCard = () => (
    <>
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
    </>
  )

  const ObservedCard = () => (
    <>
      <CardHeader title='Observed' />
      <div className='flex flex-col gap-2'>
        <CardItem label='Last observed:'>
          {lastObserved ? formatObservationDate(lastObserved.toString()) : 'Missing…'}
        </CardItem>
        <CardItem label='Created:'>{created ? formatObservationDate(created.toString()) : 'Missing…'}</CardItem>
      </div>
    </>
  )

  const ToolsCard = () => (
    <>
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
        <Layer level={2}>
          <CodeSnippet type='single'>{rorLogin}</CodeSnippet>
        </Layer>
        <Layer level={2}>
          <CodeSnippet type='single'>{kubectlLogin}</CodeSnippet>
        </Layer>
      </div>
    </>
  )

  const VersionsCard = () => (
    <>
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
    </>
  )

  const PricesCard = () => (
    <>
      <CardHeader title='Prices' />
      <div className='flex flex-col gap-2'>
        <span>
          <b>Monthly price: </b> {prices.monthly || 0} kr
        </span>
        <span>
          <b>Yearly price: </b> {prices.yearly || 0} kr
        </span>
      </div>
    </>
  )

  return (
    <div>
      <LayoutButtons />
      <GridLayoutWrapper
        className={className}
        layouts={layouts}
        layoutKey={layoutKey}
        onLayoutChange={(layout) => setLayouts({ ...layouts, [currentBreakpoint]: layout })}
        onBreakpointChange={setCurrentBreakpoint}
      >
        <div key='memory' className='drag-handle'>
          <MemoryCard />
        </div>
        <div key='info' className='drag-handle'>
          <InfoCard />
        </div>
        <div key='observed' className='drag-handle'>
          <ObservedCard />
        </div>
        <div key='tools' className='drag-handle'>
          <ToolsCard />
        </div>
        <div key='versions' className='drag-handle'>
          <VersionsCard />
        </div>
        <div key='prices' className='drag-handle'>
          <PricesCard />
        </div>
      </GridLayoutWrapper>
    </div>
  )
}
