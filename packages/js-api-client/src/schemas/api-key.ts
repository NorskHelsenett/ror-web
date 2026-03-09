import z from 'zod'
import { createPaginationSchema } from './common'

export const CreateApiKeyRequestSchema = z.object({
  name: z.string().min(1),
  ttl: z.number().int().positive().nullable().optional(),
})
export const CreateApiKeyResponseSchema = z.object({
  token: z.string(),
  expires: z.string().nullable().optional(),
})
export const DeleteApiKeyResponseSchema = z.boolean()
export const ApiKeySchema = z
  .object({
    id: z.string(),
    identifier: z.string(),
    displayName: z.string(),
    type: z.string(),
    readOnly: z.boolean(),
    expires: z.string().nullable().optional(),
    created: z.string(),
    lastUsed: z.string().nullable().optional(),
    Hash: z.string().optional(), // note capital H from backend
  })
  .passthrough()

export const ApiKeyListSchema = z.array(ApiKeySchema)
export const ApiKeyListResponseSchema = createPaginationSchema(ApiKeySchema)
