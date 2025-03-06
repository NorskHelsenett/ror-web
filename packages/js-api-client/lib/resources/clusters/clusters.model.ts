import { z } from 'zod'
import { HealthSchema } from '../generic-models/health'

const NhnToolingModel = z.object({
  version: z.string(),
})

export const VersionsModel = z.object({
  nhnTooling: NhnToolingModel,
})

export const ProjectModel = z.object({
  name: z.string().optional(),
})

export const MetadataModel = z.object({
  project: ProjectModel.optional(),
})

export const DatacenterModel = z.object({
  name: z.string(),
  provider: z.string(),
  apiEndpoint: z.string(),
})

export const WorkspaceModel = z.object({
  name: z.string(),
  datacenter: DatacenterModel,
})

export const Cluster = z
  .object({
    clusterId: z.string(),
    clusterName: z.string(),
    healthStatus: z.object({
      health: HealthSchema,
    }),
    metrics: z.object({
      cpu: z.number(),
      cpuPercentage: z.number(),
      memoryPercentage: z.number(),
      memory: z.number(),
    }),
    lastObserved: z.string(),
    created: z.string(),
    versions: VersionsModel,
    metadata: MetadataModel,
    workspace: WorkspaceModel,
  })
  .passthrough()

export type ClusterType = z.infer<typeof Cluster>
