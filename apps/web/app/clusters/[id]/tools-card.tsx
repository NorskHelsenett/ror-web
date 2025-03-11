import { Cluster } from '@ror/js-api-client'
import { DefinitionDescription, DefinitionList, DefinitionTerm } from '@ror/react'
import { CodeSnippet } from '@ror/react/components/code-snippet'
import { Layer } from '@ror/react/components/layer'
import { Tile } from '@ror/react/components/tile'
import { User } from 'next-auth'

export function ClusterToolsCard({ cluster, user }: { cluster: Cluster; user: User | undefined }) {
  const serverUrl =
    cluster.workspace.datacenter.apiEndpoint.length > 0 ? cluster.workspace.datacenter.apiEndpoint : '<missing>'

  const rorLogin = `ror login ${cluster.clusterId}`
  const kubectlLogin = `kubectl vsphere login --server=${serverUrl} -u ${user?.email} --insecure-skip-tls-verify --tanzu-kubernetes-cluster-namespace ${cluster?.workspace?.name} --tanzu-kubernetes-cluster-name ${cluster?.clusterName}`

  return (
    <Tile className='p-5 col-span-2'>
      <h3 className='text-base pb-3 mb-5 border-b border-b-(--r-border-subtle)'>Tools</h3>
      <Layer layer={1}>
        <DefinitionList direction='vertical'>
          <DefinitionTerm>ROR CLI</DefinitionTerm>
          <DefinitionDescription className='mb-2'>
            <CodeSnippet type='single'>{rorLogin}</CodeSnippet>
          </DefinitionDescription>
          <DefinitionTerm>Kubectl</DefinitionTerm>
          <DefinitionDescription>
            <CodeSnippet type='single'>{kubectlLogin}</CodeSnippet>
          </DefinitionDescription>
        </DefinitionList>
      </Layer>
    </Tile>
  )
}
