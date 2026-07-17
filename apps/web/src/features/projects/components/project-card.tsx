'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion'
import { Badge } from '@/components/shadcn/badge'
import type { Project } from '@ror/js-api-client'
import { AccordionTriggerRowElement } from '@/components/ui/AccordionTableRow'
import { HealthCircle } from '@/features/cluster/components/health-circle'
import { localizeDate } from '@/utils/time-and-date'
import { Folder } from 'lucide-react'

interface ClusterPolicyReportCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ClusterPolicyReportCardProps) => (
  <div className='rounded-xl border border-(--r-border-subtle) bg-card overflow-hidden'>
    <Accordion type='single' collapsible>
      <AccordionItem value={project.id} className='border-b-0'>
        <AccordionTrigger className='px-6 py-4 hover:no-underline hover:bg-muted/40 data-[state=open]:bg-muted/40'>
          <div className='flex items-center gap-4 flex-1 min-w-0'>
            <Folder className='size-4 text-muted-foreground shrink-0' />
            <span className='w-96 shrink-0 truncate text-base font-semibold'>{project.name}</span>
            <AccordionTriggerRowElement
              title='Workorder'
              text={project.projectMetadata.billing.workorder}
              className='w-28 shrink-0'
            />
            <div className='flex-1' />
            {project.active ? <HealthCircle healthCondition={'ok'} /> : <HealthCircle healthCondition={'error'} />}
          </div>
        </AccordionTrigger>
        <AccordionContent className='px-6 pb-4'>
          <div className='grid grid-cols-3 gap-2'>
            <div className='border p-2 rounded-lg'>
              <h2 className='text-xl'>Description</h2>
              <p>{project.description}</p>
            </div>
            <div className='border p-2 rounded-lg'>
              <h2 className='text-xl'>Roles</h2>
              <div className='grid grid-cols-2'>
                {project.projectMetadata.roles.map((role, index) => (
                  <div key={index}>
                    <h3 className='text-base'>{role.roleDefinition}</h3>
                    <p>{role.contactInfo.email}</p>
                    <p>{role.contactInfo.phone}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='border p-2 rounded-lg'>
              <h2 className='text-xl'>Metadata</h2>
              <div className='grid grid-cols-2'>
                <p>Created</p>
                <p>{localizeDate(project.created)}</p>
              </div>
              <div className='grid grid-cols-2'>
                <p>Updated</p>
                <p>{localizeDate(project.updated)}</p>
              </div>
              <div className='grid grid-cols-2'>
                <p>Tags</p>
                <div className='flex flex-wrap gap-2'>
                  {project.projectMetadata.serviceTags &&
                  Object.keys(project.projectMetadata.serviceTags).length > 0 ? (
                    Object.entries(project.projectMetadata.serviceTags).map(([key, value]) => (
                      <Badge key={key} variant='outline'>
                        {value ? `${key}: ${value}` : key}
                      </Badge>
                    ))
                  ) : (
                    <span className='text-sm text-muted-foreground'>No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
)
