import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'
import { getRorApi } from '@/services/ror-api'
import { randomString } from '@/utils/random-string'
import type { Namespace } from '@ror/js-api-client'
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
  const resProjects = await api.projects.list()
  const resNamespaces = await api.namespaces.list()
  const namespaces = resNamespaces?.resources ?? []
  const namespacesNames: string[] = namespaces.flatMap((namespace: Namespace) => namespace.metadata.name ?? [])
  const uniqueNamespaceNames: string[] = [...new Set(namespacesNames)]
  const projects: ProjectType[] = resProjects.data
  const clusterIdSuffix = randomString(4) // unpredictability of suffix is not important

  return (
    <div className='w-full flex flex-col'>
      <Header title='New Cluster' />
      <PageView projects={projects} namespacesNames={uniqueNamespaceNames} clusterIdSuffix={clusterIdSuffix} />
    </div>
  )
}
