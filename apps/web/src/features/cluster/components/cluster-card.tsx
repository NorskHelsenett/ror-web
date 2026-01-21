'use client'

import * as React from 'react'

import { Pill } from '@/components/shadcn/pill'
import { cn } from '@/utils/clsxm'
import type { KubernetesCluster } from '@ror/js-api-client'
import { Layer } from '@ror/react'
import { ExternalLink } from 'lucide-react'
import { User } from 'next-auth'
import Link from 'next/link'
import { CodeSnippet } from '../../../components/ui/code-snippet'
import { ClusterCardDisplayData } from '../types/display-data'
import { ResourceType } from '../types/resource'
import {
  getClusterId,
  getClusterName,
  getClusterResource,
  getDatacenter,
  getEnvironment,
  getHealthCondition,
  getKubectlLogin,
  getNodePools,
  getPrices,
  getProvider,
  getRorLogin,
  getRormetaTags,
  getTools,
  getVersions,
} from '../utils/cluster'
import { envColors, getHighDifferenceEnvironmentColors } from '../utils/env-colors'
import { formatResource } from '../utils/formats'
import { HealthCircle } from './health-circle'
import { Environment } from '../types/environment'
import { routes } from '@/config/routes'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn('bg-[var(--r-layer)] text-card-foreground flex flex-col rounded-xl py-6 shadow-sm', className)}
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

interface ClusterCardProps {
  className?: string
  user?: User
  cluster: KubernetesCluster
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
const ClusterCard = ({ className, user, cluster, displayData }: ClusterCardProps) => {
  const clusterId = getClusterId(cluster)
  const clusterName = getClusterName(cluster)
  const env = getEnvironment(cluster)
  const tools = getTools(cluster)
  const cpu = getClusterResource(cluster, 'cpu')
  const memory = getClusterResource(cluster, 'memory')
  const gpu = getClusterResource(cluster, 'gpu')
  const disk = getClusterResource(cluster, 'disk')
  const nodePools = getNodePools(cluster)
  const nodePoolsAmount = nodePools?.length || 0
  const nodesAmount = nodePools?.reduce((total, nodePool) => total + (nodePool.replicas || 0), 0) || 0
  const prices = getPrices(cluster)
  const healthCondition = getHealthCondition(cluster)
  const versions = getVersions(cluster)
  const datacenter = getDatacenter(cluster)
  const rorLogin = getRorLogin(cluster)
  const kubectlLogin = getKubectlLogin(cluster, user?.email || '<user-email missing>')
  const serviceTags = getRormetaTags(cluster)
  const envColor = getHighDifferenceEnvironmentColors(env as Environment)
  const provider = getProvider(cluster)

  const Argo = () => {
    return tools.argo ? (
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
      <p className='flex [@container(max-width:360px)]:flex-col'>
        <span className='font-bold'>ArgoCD &nbsp;</span>
        <span>missing ...</span>
      </p>
    )
  }

  const Grafana = () => {
    return tools.grafana ? (
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

        {displayData?.includes('kubectl') && (
          <div>
            <p className='font-bold'>Kubectl</p>
            <Layer level={2}>
              <CodeSnippet type='single'>{kubectlLogin}</CodeSnippet>
            </Layer>
          </div>
        )}
      </section>
    )
  }

  const resourceFields = [
    { key: 'cpu', label: 'CPU', resource: cpu },
    { key: 'memory', label: 'Memory', resource: memory },
    { key: 'gpu', label: 'GPU', resource: gpu },
    { key: 'disk', label: 'Disk', resource: disk },
  ]

  const ResourceCard = ({
    label,
    type,
    resource,
  }: {
    label: string
    type: ResourceType
    resource: { capacity?: string; used?: string; percentage?: number | null }
  }) => (
    <div>
      <p className='font-bold'>{label}</p>
      <p>{formatResource(type, resource)}</p>
    </div>
  )

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
        <p className='font-bold'>Service tags</p>
        <p className='flex flex-wrap gap-1'>
          {serviceTags.map(
            ({ key, value, properties }: { key: string; value: string; properties: Record<string, string> }) => (
              <Pill key={key} style={{ backgroundColor: properties.color }}>
                {value}
              </Pill>
            )
          )}
        </p>
      </div>
    ) : null
  }

  const Environment = () => {
    return displayData?.includes('environment') ? (
      <div>
        <p className='font-bold'>Environment</p>
        <p>
          <Pill variant={envColors[(env ?? 'undefined') as Environment]} className='px-3'>
            {(env ?? 'Undefined').charAt(0).toUpperCase() + (env ?? 'Undefined').slice(1)}
          </Pill>
        </p>
      </div>
    ) : null
  }

  return (
    <Link
      href={routes.app.cluster.getHref(clusterId)}
      onClick={() => localStorage.setItem('selectedCluster', JSON.stringify(cluster))}
    >
      <Card
        className={cn(
          'w-sm min-w-64 pt-0 hover:bg-[#ededed] dark:hover:bg-neutral-800 hover:cursor-pointer @container container',
          className
        )}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && localStorage.setItem('selectedCluster', JSON.stringify(cluster))}
      >
        <CardHeader className='m-0 mb-7 p-0 w-full'>
          <CardTitle className={cn('text-2xl rounded-t-xl px-6 py-2 flex', envColor[0], envColor[1])}>
            {(clusterName || 'Unnamed Cluster') as string}
          </CardTitle>
          <HealthCircle className='ml-auto mr-4 mt-[-24px] w-[52px] h-[52px] ' healthCondition={healthCondition} />
        </CardHeader>

        <CardContent className='text-sm flex flex-col gap-3'>
          <Tools />
          <CodeSnippetLogins />
          <section className='flex flex-col gap-1.5 [&>div]:grid [&>div]:grid-cols-2 [@container(max-width:360px)]:[&>div]:grid-cols-1'>
            {resourceFields.map(
              ({ key, label, resource }) =>
                displayData?.includes(key as ClusterCardDisplayData) && (
                  <ResourceCard key={key} label={label} type={key as ResourceType} resource={resource} />
                )
            )}

            {displayData?.includes('nodes') && (
              <Info
                label='Nodes'
                value={`${nodesAmount} (${nodePoolsAmount} node pool${nodePoolsAmount > 1 ? 's' : ''})`}
              />
            )}
            {displayData?.includes('monthlyPrice') && <Info label='Monthly price' value={`${prices.monthly} kr`} />}
            {displayData?.includes('yearlyPrice') && <Info label='Yearly price' value={`${prices.yearly} kr`} />}
            {displayData?.includes('agentVersion') && <Info label='ROR agent version' value={versions.agent.version} />}
            {displayData?.includes('kubernetesVersion') && (
              <Info label='Kubernetes version' value={versions.kubernetes.version} />
            )}
            {displayData?.includes('toolingVersion') && (
              <Info label='NHN tooling version' value={versions.nhnTooling.version} />
            )}
            {displayData?.includes('datacenterName') && <Info label='Datacenter' value={datacenter} />}
            {displayData?.includes('datacenterProvider') && <Info label='Datacenter provider' value={provider} />}
            <Environment />
            <ServiceTags />
          </section>
        </CardContent>
      </Card>
    </Link>
  )
}

export { ClusterCard }
