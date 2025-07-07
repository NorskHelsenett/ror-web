import { z } from 'zod'

// TODO: Define schemas
const ResourceMetaDataSchema = z.object({}).passthrough()
const RorMetaDataSchema = z.object({}).passthrough()

/**
 * A schema for all v2 resources
 * No matter what type of resource that is returned it always contains the same fields.
 *
 * @remarks
 * The schema is meant to be extended by other schemas.
 *
 * * @example
 * const schema = V2ResourceSchema.extend({
 *   kubernetesCluster: KubernetesClusterSchema,
 * });
 *
 *
 */
export const V2ResourceSchema = z.object({
  kind: z.string(),
  apiVersion: z.string(),
  metadata: ResourceMetaDataSchema,
  rormeta: RorMetaDataSchema,
  resources: z.any().optional(),
})

/**
 * Create a response schema with the given schema.
 *
 * @remarks
 * A response schema matches what the response might be from the /v2/resources endpoint
 *
 */
export function createV2ResourceResponseSchema<T extends z.ZodType>(schema: T) {
  return z
    .object({
      resources: z.array(schema),
    })
    .nullable()
}
/**
 * Create a Zod schema for pagination response
 *
 * @remarks
 * Useful for validating paginated responses with a schema of choice
 *
 * @example
 * const userSchema = z.object({
 *   id: z.string().uuid(),
 *   email: z.string().email(),
 *   name: z.string().min(2).max(100),
 * })
 * const paginationSchema = createPaginationSchema(userSchema)
 * const validData = paginationSchema.parse({
 *   totalCount: 100,
 *   dataCount: 10,
 *   offset: 0,
 *   data: [
 *     { id: '1', email: 'user1@example.com', name: 'User 1' },
 *     { id: '2', email: 'user2@example.com', name: 'User 2' },
 *   ],
 * })
 *
 */
export function createPaginationSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    totalCount: z.number(),
    dataCount: z.number(),
    offset: z.number(),
    data: z
      .array(itemSchema)
      // The ROR API may respond with a null for an empty list
      .nullable()
      // Transform null to empty array
      .transform((data) => (data === null ? [] : Array.isArray(data) ? data : [])),
  })
}

export interface PaginationResponse<T> {
  totalCount: number
  dataCount: number
  offset: number
  data: T[]
}
