import { z } from 'zod'
import { createV2ResourceResponseSchema, V2ResourceSchema } from './common'

export const NamespaceSchema = V2ResourceSchema.extend({
  namespace: z.object({}),
})

export const NamespaceResponseSchema = createV2ResourceResponseSchema(NamespaceSchema)
