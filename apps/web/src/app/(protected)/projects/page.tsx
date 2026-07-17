import { CodeSnippet } from '@/components/ui/code-snippet'
import { getRorApi } from '@/services/ror-api'

const ProjectsPage = async () => {
  const api = await getRorApi()
  const projects = api.projects.list()

  return (
    <div className='w-full flex flex-col'>
      <p>Projects</p>
      <CodeSnippet type={'multi'}>{JSON.stringify(projects)}</CodeSnippet>
    </div>
  )
}

export default ProjectsPage
