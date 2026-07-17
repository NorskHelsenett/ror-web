import { getRorApi } from '@/services/ror-api'

const ProjectsPage = async () => {
  const api = await getRorApi()
  const projects = api.projects.list()
  console.log('projects:', projects)
  return (
    <div className='w-full flex flex-col'>
      <p>Projects</p>
    </div>
  )
}

export default ProjectsPage
