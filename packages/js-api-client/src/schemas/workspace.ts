import { z } from 'zod'
import { createPaginationSchema } from './common'

/** A workspace metrics item returned by POST /v1/metrics/workspaces/filter. */
export const WorkspaceSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    priceMonth: z.number(),
    priceYear: z.number(),
    cpu: z.number(),
    memory: z.number(),
    cpuConsumed: z.number(),
    memoryConsumed: z.number(),
    cpuPercentage: z.number(),
    memoryPercentage: z.number(),
    nodePoolCount: z.number(),
    nodeCount: z.number(),
    clusterCount: z.number(),
  })
  .passthrough()

export const WorkspaceListSchema = z.array(WorkspaceSchema)
export const WorkspaceResponseSchema = createPaginationSchema(WorkspaceSchema)
