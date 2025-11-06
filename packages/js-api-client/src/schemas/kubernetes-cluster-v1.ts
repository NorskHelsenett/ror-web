import { z } from 'zod'
import { createPaginationSchema } from './common'

const VersionModel = z.object({
  version: z.string(),
})

const NhnToolingModel = VersionModel.extend({
  branch: z.string(),
  environment: z.string(),
})

const AgentModel = VersionModel.extend({
  sha: z.string(),
})

const VersionsModel = z.object({
  nhnTooling: NhnToolingModel.passthrough(),
  agent: AgentModel.optional(),
  kubernetes: z.string(),
})

const ProjectModel = z.object({
  name: z.string().optional(),
})

const MetadataModel = z.object({
  project: ProjectModel.optional(),
})

const DatacenterModel = z.object({
  name: z.string(),
  provider: z.string(),
  apiEndpoint: z.string(),
})

const WorkspaceModel = z.object({
  name: z.string(),
  datacenter: DatacenterModel,
})

const ControlPaneNodeModel = z.object({
  name: z.string(),
  role: z.literal('control-plane'),
  created: z.string(),
  osImage: z.string(),
  machineName: z.string(),
  metrics: z.object({
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
  }),
  architecture: z.string(),
  containerRuntimeVersion: z.string(),
  kernelVersion: z.string(),
  kubeProxyVersion: z.string(),
  kubeletVersion: z.string(),
  operatingSystem: z.string(),
  machineClass: z.string(),
})

const TopologyModel = z.object({
  controlPlaneEndpoint: z.string(),
  egressIp: z.string(),
  controlPlane: z.object({
    nodes: z.array(ControlPaneNodeModel).nullish(),
  }),
})

const AclModel = z.object({
  accessGroups: z.array(z.string()).default([]).optional().nullable(),
})

const IngressRuleV1 = z
  .object({
    hostname: z.string().optional(),
    ipaddresses: z.array(z.string()).optional().nullable(),
    rules: z.array(
      z.object({
        path: z.string(),
        // TODO: Finish model
        service: z.object({}).passthrough(),
      })
    ),
  })
  .passthrough()

export const ClusterIngressModelV1 = z.object({
  uid: z.string(),
  health: z.number(),
  name: z.string(),
  namespace: z.string(),
  class: z.string(),
  ingressrules: z.array(IngressRuleV1).optional().nullable(),
})

const ClusterIngressesModelV1 = z.array(ClusterIngressModelV1.passthrough())

export const ClusterSchema = z
  .object({
    clusterId: z.string(),
    clusterName: z.string(),
    created: z.string(),
    environment: z.string(),
    healthStatus: z.object({
      health: z.number(),
    }),
    firstObserved: z.string(),
    lastObserved: z.string(),
    metadata: MetadataModel,
    metrics: z.object({
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
    }),
    topology: TopologyModel,
    versions: VersionsModel,
    workspace: WorkspaceModel,
    ingresses: ClusterIngressesModelV1.optional().nullable(),
    acl: AclModel,
  })
  .passthrough()

export const ClustersResponseSchema = createPaginationSchema(ClusterSchema)
