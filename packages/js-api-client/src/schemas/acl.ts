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

export const AclV2ProvenanceSchema = z.object({
  scope: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  // 0 = the queried resource itself, 1 = its parent, 2 = grandparent, ...
  level: z.number().optional().nullable(),
})

// Access is e.g. "ror:read", "ror:create", "ror:update" or "kubernetes:<something>"
export const AclV2Schema = z.object({
  access: z.string().optional().nullable(),
  group: z.string().optional().nullable(),
  provenance: z.array(AclV2ProvenanceSchema).optional().nullable(),
})

// Response from GET /v2/acl/lookup/{scope}/{subject}
export const AclV2ResponseSchema = z.object({
  scope: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  accessGroups: z.array(AclV2Schema).optional().nullable(),
})
