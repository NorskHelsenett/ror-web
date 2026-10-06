import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'
import { getRorApi } from '@/services/ror-api'
import { randomString } from '@/utils/random-string'
import type { KubernetesCluster } from '@ror/js-api-client'
import { notFound } from 'next/navigation'

interface BillingType {
  workorder: string
}

interface ContactInfoType {
  email: string
  phone: string
  upn: string
}

interface RoleType {
  contactInfo: ContactInfoType
  roleDefinition: string
}

interface ProjectMetadataType {
  billing: BillingType
  roles: RoleType[]
  serviceTags?: Record<string, string> | null
}

export interface ProjectType {
  active: boolean
  created: string
  description: string
  id: string
  name: string
  projectMetadata: ProjectMetadataType
  updated: string
}

export default async function ClustersPage() {
  if (process.env.IS_NHN !== 'true') notFound()

  const api = await getRorApi()
  const clusterParams = new URLSearchParams()
  const resClusters = await api.kubernetesClusters.list(clusterParams)
  const clusters: KubernetesCluster[] = resClusters?.resources ?? []
  console.log(clusters)
  const clusterprojects = clusters.map((c) => c.kubernetescluster?.spec?.data?.project)
  console.log(clusterprojects)
  const clustersWithNamesProjectsDatacenter = clusters.map((c) => ({
    clusterName: c.metadata.name ?? '',
    project: c.kubernetescluster?.spec?.data?.project ?? '',
    datacenter: c.kubernetescluster?.spec?.data?.datacenter ?? '',
  }))
  console.log(clustersWithNamesProjectsDatacenter)
  const resProjects = await api.projects.list()
  const workspaces = (await api.workspaces.list()).data
  const workspaceNames: string[] = workspaces.map((ws) => ws.name)
  const vitistackWorkspaces: string[] = workspaceNames.filter((wsn) => wsn.slice(0, 9) === 'vitistack')
  // console.log(vitistackWorkspaces)
  const vitistackWorkspacesWOPreSuffixes = vitistackWorkspaces.map((ws) => ws.split('-')[1]) // removes "vitistack-" and "-****"
  const uniqueNamespaceNames: string[] = [...new Set(vitistackWorkspacesWOPreSuffixes)]
  const projects: ProjectType[] = resProjects.data
  const clusterIdSuffix = randomString(4) // unpredictability of suffix is not important

  return (
    <div className='w-full flex flex-col'>
      <Header title='New Cluster' />
      <PageView projects={projects} namespacesNames={uniqueNamespaceNames} clusterIdSuffix={clusterIdSuffix} />
    </div>
  )
}
