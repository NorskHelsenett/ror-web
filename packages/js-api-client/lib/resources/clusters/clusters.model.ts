import { z } from 'zod'
import { HealthSchema } from '../generic-models/health'

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

export const VersionsModel = z.object({
  nhnTooling: NhnToolingModel.passthrough(),
  agent: AgentModel.optional(),
  kubernetes: z.string(),
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

export const ControlPaneNodeModel = z.object({
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

export const TopologyModel = z.object({
  controlPlaneEndpoint: z.string(),
  egressIp: z.string(),
  controlPlane: z.object({
    nodes: z.array(ControlPaneNodeModel).nullish(),
  }),
})

export const Cluster = z
  .object({
    clusterId: z.string(),
    clusterName: z.string(),
    created: z.string(),
    environment: z.string(),
    healthStatus: z.object({
      health: HealthSchema,
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
    ingresses: z.union([
      z.array(
        z.object({
          ingressrules: z.array(
            z.object({
              hostname: z.string().optional(),
            }).optional()
          ).optional(),
        }).optional()
      ), 
      z.null()
    ]).optional(),
  })
  .passthrough()

export const ClusterListItem = Cluster.extend({
  topology: TopologyModel.extend({
    controlPlane: z.object({
      // Nodes are nullable when fetched from the "filter" endpoint
      nodes: z.array(ControlPaneNodeModel).nullable(),
    }),
  }),
})

/**
 * Version 2
 * This data model represent a cluster from the v2/resources endpoints
 */

/**
 * Version 2
 * This data model represent a cluster from the v2/resources endpoints
 */

// Define the Tag model
const TagModel = z.object({
  key: z.string(),
  value: z.string(),
})

// Define the Owner Reference model
const OwnerRefModel = z.object({
  scope: z.string(),
  subject: z.string(),
})

// Define the RorMeta model
const RorMetaModel = z.object({
  version: z.string(),
  ownerref: OwnerRefModel,
  tags: z.array(TagModel),
})

// Define the Kubernetes Metadata model
const K8sMetadataModel = z.object({
  name: z.string(),
  creationTimestamp: z.string(),
})

// Define the Resource model
const ResourceModel = z.object({
  name: z.string(),
  allocated: z.string(),
  usage: z.string(),
})

// Define the NodePool model for spec
const NodePoolSpecModel = z.object({
  name: z.string(),
  replicas: z.number(),
  provider: z.string(),
  machineClass: z.string(),
  metadata: z.object({
    labels: z.null(),
    annotations: z.null(),
  }),
  storage: z.null(),
})

// Define the NodePool model for status
const NodePoolStatusModel = z.object({
  name: z.string(),
  status: z.string(),
  message: z.string(),
})

// Define the Version model
const ComponentVersionModel = z.object({
  component: z.string(),
  version: z.string(),
  branch: z.string().optional(),
})

// Define the ClusterV2 model
export const ClusterV2Model = z
  .object({
    kind: z.string(),
    apiVersion: z.string(),
    metadata: K8sMetadataModel,
    rormeta: RorMetaModel,
    kubernetescluster: z.object({
      spec: z.object({
        data: z.object({
          clusterId: z.string(),
          provider: z.string(),
          datacenter: z.string(),
          region: z.string(),
          zone: z.string(),
          project: z.string(),
          workspace: z.string(),
          workorder: z.string(),
          environment: z.string(),
        }),
        topology: z.object({
          version: z.string(),
          controlplane: z.object({
            replicas: z.number(),
            provider: z.string(),
            machineClass: z.string(),
            metadata: z.object({
              labels: z.null(),
              annotations: z.null(),
            }),
            storage: z.null(),
          }),
          workers: z.object({
            nodePools: z.array(NodePoolSpecModel),
          }),
        }),
      }),
      status: z.object({
        status: z.object({
          cluster: z.object({
            externalId: z.string(),
            resources: z.array(ResourceModel),
            controlplane: z.object({
              status: z.string(),
              message: z.string(),
            }),
            workers: z.object({
              nodepools: z.array(NodePoolStatusModel),
            }),
          }),
          versions: z.array(ComponentVersionModel),
          'egress-ip': z.string(),
          controlplaneendpoint: z.string(),
          lastUpdated: z.string(),
          lastUpdatedBy: z.string(),
          created: z.string(),
        }),
        phase: z.string(),
        conditions: z.null(),
      }),
    }),
  })
  .passthrough()

export const ClusterV2ListModel = z.array(ClusterV2Model)
