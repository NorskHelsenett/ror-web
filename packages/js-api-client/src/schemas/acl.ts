import { z } from 'zod'
import { createPaginationSchema } from './common'

export const AclSchema = z
  .object({
    id: z.string().optional().nullable(),
    version: z.number().optional().nullable(),
    group: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    subject: z.string().optional().nullable(),
    access: z
      .object({
        read: z.boolean().optional().nullable(),
        create: z.boolean().optional().nullable(),
        update: z.boolean().optional().nullable(),
        delete: z.boolean().optional().nullable(),
        owner: z.boolean().optional().nullable(),
      })
      .optional()
      .nullable(),
    kubernetes: z
      .object({
        logon: z.boolean().optional().nullable(),
      })
      .optional()
      .nullable(),
    created: z.string().optional().nullable(),
    issuedBy: z.string().optional().nullable(),
  })
  .passthrough()

export const AclResponseSchema = createPaginationSchema(AclSchema)
