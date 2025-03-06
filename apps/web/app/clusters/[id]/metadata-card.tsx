'use client'
import copy from 'clipboard-copy'
import type { Cluster } from '@ror/js-api-client'
import { DefinitionDescription, DefinitionList, DefinitionTerm } from '@ror/react/components/definition-list'
import { CopyButton } from '@ror/react/components/copy-button'
import { Tile } from '@ror/react/components/tile'

interface ClusterMetadataCardProps {
  cluster: Cluster
}

export function ClusterMetadataCard({ cluster }: ClusterMetadataCardProps) {
  const { clusterId, clusterName, workspace, metadata } = cluster

  const handleOnCopyClick = () => {
    void copy(clusterId)
  }

  return (
    <Tile className='p-4'>
      <div className=''>
        <DefinitionList className='grid-cols-4'>
          <div className='flex flex-col gap-1'>
            <DefinitionTerm>Project</DefinitionTerm>
            <DefinitionDescription>{metadata?.project?.name ?? 'Missing…'}</DefinitionDescription>
          </div>
          <div className='flex flex-col gap-1'>
            <DefinitionTerm>Cluster ID</DefinitionTerm>
            <DefinitionDescription>
              <div className='flex items-center gap-2'>
                {clusterId}
                <CopyButton onClick={handleOnCopyClick} />
              </div>
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
