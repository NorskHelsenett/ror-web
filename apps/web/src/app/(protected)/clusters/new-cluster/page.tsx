import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'
import { getRorApi } from '@/services/ror-api'
import { randomString } from '@/utils/random-string'
import type { WorkspaceListViewRowType } from '@ror/js-api-client'
import { auth } from '@/config/next-auth'
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

  const session = await auth()
  const api = await getRorApi()
  const resProjects = await api.projects.list()
  const workspaceList = await api.workspaceListView.getWorkspaceList(new URLSearchParams([['limit', '10000']]))
  const workspaceRows: WorkspaceListViewRowType[] = workspaceList.rows
  const namespacesNames: string[] = workspaceRows
    .map((workspace) => workspace.workspaceName?.fieldValue ?? '')
    .filter(Boolean)
  const uniqueNamespaceNames: string[] = [...new Set(namespacesNames)]
  const projects: ProjectType[] = resProjects.data
  const clusterIdSuffix = randomString(4) // unpredictability of suffix is not important

  return (
    <div className='w-full flex flex-col'>
      <Header title='New Cluster' />
      <PageView
        projects={projects}
        namespacesNames={uniqueNamespaceNames}
        clusterIdSuffix={clusterIdSuffix}
        orderer={session?.user?.name || session?.user?.email || ''}
      />
    </div>
  )
}
