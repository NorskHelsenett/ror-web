import { CodeSnippet } from '@/components/ui/code-snippet'
import { getRorApi } from '@/services/ror-api'
import { Project } from '@ror/js-api-client'
import { PageView } from './page-view'

const ProjectsPage = async () => {
  const api = await getRorApi()
  const projectList = await api.projects.list()
  const projects: Project[] = projectList.data

  return (
    <div className='w-full flex flex-col'>
      <PageView projects={projects} />
    </div>
  )
}

export default ProjectsPage
