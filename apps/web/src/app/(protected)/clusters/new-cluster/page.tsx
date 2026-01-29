import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'
import { getRorApi } from '@/services/ror-api'

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
  const api = await getRorApi()
  const res = await api.projects.list()
  const projects: ProjectType[] = res.data

  return (
    <div className='w-full flex flex-col'>
      <Header title='New Cluster' />
      <PageView projects={projects} />
    </div>
  )
}
