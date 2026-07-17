import { ProjectCard } from '@/features/projects/components/project-card'
import { Project } from '@ror/js-api-client'

interface PageViewProps {
  projects: Project[]
}

export const PageView = ({ projects }: PageViewProps) => {
  return (
    <div className='p-6 flex flex-col gap-4'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
