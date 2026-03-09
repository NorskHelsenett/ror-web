import z from 'zod'
import { createPaginationSchema } from './common'

export const ProjectSchema = z
  .object({
    active: z.boolean(),
    created: z.string(),
    description: z.string(),
    id: z.string(),
    name: z.string(),
    projectMetadata: z.object({
      billing: z.object({
        workorder: z.string(),
      }),
      roles: z.array(
        z.object({
          contactInfo: z.object({
            email: z.string(),
            phone: z.string(),
            upn: z.string(),
          }),
          roleDefinition: z.string(),
        })
      ),
      serviceTags: z.record(z.string(), z.string()).nullable().optional(),
    }),
    updated: z.string(),
  })
  .passthrough()

export const ProjectListSchema = z.array(ProjectSchema)
export const ProjectResponseSchema = createPaginationSchema(ProjectSchema)
