'use client'
import type { Cluster } from '@ror/js-api-client'
import clsxm from '@/utils/clsxm'
import { Tile, CodeSnippet, Layer, DefinitionDescription, DefinitionList, DefinitionTerm } from '@ror/react'

interface ClusterMetadataCardProps {
  cluster: Cluster
  className?: string
}

export function ClusterMetadataCard({ cluster, className }: ClusterMetadataCardProps) {
  const { clusterId, clusterName, workspace, metadata } = cluster

  const classes = clsxm('p-5', className)

  return (
    <Tile className={classes}>
      <div className=''>
        <h3 className='text-base pb-3 mb-5 border-b border-b-(--r-border-subtle)'>Information</h3>
        <DefinitionList className='grid-cols-4'>
          <div className='flex flex-col gap-1'>
            <DefinitionTerm>Project</DefinitionTerm>
            <DefinitionDescription>{metadata?.project?.name ?? 'Missing…'}</DefinitionDescription>
          </div>
          <div className='flex flex-col gap-1'>
            <DefinitionTerm>Cluster ID</DefinitionTerm>
            <DefinitionDescription>
              <Layer layer={1}>
                <CodeSnippet type='inline'>{clusterId}</CodeSnippet>
              </Layer>
            </DefinitionDescription>
          </div>
          <div className='flex flex-col gap-1'>
            <DefinitionTerm>Cluster Name</DefinitionTerm>
            <DefinitionDescription>{clusterName}</DefinitionDescription>
          </div>
          <div className='flex flex-col gap-1'>
            <DefinitionTerm>Workspace</DefinitionTerm>
            <DefinitionDescription>{workspace.name}</DefinitionDescription>
          </div>
          <div className='flex flex-col gap-1'>
            <DefinitionTerm>Datacenter</DefinitionTerm>
            <DefinitionDescription>{workspace.datacenter.name}</DefinitionDescription>
          </div>
          <div className='flex flex-col gap-1'>
            <DefinitionTerm>Provider</DefinitionTerm>
            <DefinitionDescription>{workspace.datacenter.provider}</DefinitionDescription>
          </div>
        </DefinitionList>
      </div>
    </Tile>
  )
}
