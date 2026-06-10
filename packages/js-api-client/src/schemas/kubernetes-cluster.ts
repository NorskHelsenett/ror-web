import { z } from 'zod'
import { createV2ResourceResponseSchema, V2ResourceSchema } from './common'

export const KubernetesClusterSpecData = z.object({
  clusterId: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  datacenter: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  zone: z.string().nullable().optional(),
  project: z.string().nullable().optional(),
  workspace: z.string().nullable().optional(),
  workorder: z.string().nullable().optional(),
  environment: z.string().nullable().optional(),
})

// Extra metadata for machines
export const KubernetesClusterSpecMetadataDetails = z.object({
  labels: z.record(z.string(), z.string()).nullable().optional(), // stricter what you can have in label, so often used in selectors that give me those with this label
  annotations: z.record(z.string(), z.string()).nullable().optional(), // less strict, often just additional information
})

export const KubernetesClusterStorage = z.object({
  class: z.string().nullable().optional(),
  path: z.string().nullable().optional(),
  size: z.string().nullable().optional(),
})

// Control plane: some machines in the cluster must hold processes internally in the cluster, so management. Often smaller because it only runs internal stuff. Master in master/slave terminology
// TODO: CHECK CAUSE THIS IS CHANGED
export const KubernetesClusterSpecControlPlane = z.object({
  replicas: z.number().nullable().optional(),
  version: z.string().nullable().optional(), // Kubernetes version
  provider: z.string().nullable().optional(),
  machineClass: z.string().nullable().optional(),
  metadata: KubernetesClusterSpecMetadataDetails.nullable().optional(),
  storage: z.array(KubernetesClusterStorage).nullable().optional(),
})

// If the user has enabled autoscaling, with configuration
export const KubernetesClusterAutoscalingConfig = z.object({
  enabled: z.boolean().nullable().optional(),
  minReplicas: z.number().nullable().optional(),
  maxReplicas: z.number().nullable().optional(),
})

// Extends autoscalingconfig, adds scaling rules
const KubernetesClusterAutoscalingSpec = KubernetesClusterAutoscalingConfig.extend({
  scalingRules: z.array(z.string()).nullable().optional(),
})

// Store information about nodepool
// TODO: CHECK CAUSE THIS IS CHANGED
export const KubernetesClusterNodePool = z.object({
  machineClass: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  version: z.string().nullable().optional(), // Kubernetes version
  name: z.string().nullable().optional(),
  replicas: z.number().nullable().optional(), // Number of nodes
  autoscaling: KubernetesClusterAutoscalingSpec.nullable().optional(),
  metadata: KubernetesClusterSpecMetadataDetails.nullable().optional(),
})

// Worker is basically slave in master/slave terminology
export const KubernetesClusterWorkers = z.object({
  nodePools: z.array(KubernetesClusterNodePool).nullable().optional(),
})

// Specification of the cluster, what is used to create it
export const KubernetesClusterSpecTopology = z.object({
  version: z.string().nullable().optional(), // Kubernetes version
  controlplane: KubernetesClusterSpecControlPlane.nullable().optional(), // Contains control plan configuration
  workers: KubernetesClusterWorkers.nullable().optional(), // Contains worker nodes configuration
})

export const KubernetesClusterSpec = z
  .object({
    data: KubernetesClusterSpecData.nullable().optional(),
    topology: KubernetesClusterSpecTopology.nullable().optional(),
    slackChannels: z.array(z.string()).nullable().optional(),
  })
  .passthrough()

// cpu, memory, gpu, disk
export const KubernetesClusterStatusClusterStatusResource = z.object({
  capacity: z.string().nullable().optional(),
  used: z.string().nullable().optional(),
  percentage: z.number().nullable().optional(),
})

export const KubernetesClusterStatusClusterStatusResources = z.object({
  cpu: KubernetesClusterStatusClusterStatusResource.nullable().optional(),
  memory: KubernetesClusterStatusClusterStatusResource.nullable().optional(),
  gpu: KubernetesClusterStatusClusterStatusResource.nullable().optional(),
  disk: KubernetesClusterStatusClusterStatusResource.nullable().optional(),
})

export const KubernetesClusterNodePoolStatus = z.object({
  name: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  scale: z.number().nullable().optional(), // Number of nodes in the nodepool
  machineClass: z.string().nullable().optional(), // Size of machines in nodes
  autoscaling: KubernetesClusterAutoscalingConfig.nullable().optional(),
  resources: KubernetesClusterStatusClusterStatusResources.nullable().optional(),
  nodes: z.array(z.string()).nullable().optional(), // List of node names in the nodepool
})

export const KubernetesClusterStatusPrice = z.object({
  monthly: z.number().nullable().optional(),
  yearly: z.number().nullable().optional(),
})

export const KubernetesClusterControlPlaneStatus = z.object({
  status: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  scale: z.number().nullable().optional(),
  machineClass: z.string().nullable().optional(),
  resources: KubernetesClusterStatusClusterStatusResources.nullable().optional(),
  nodes: z.array(z.string()).optional().nullable(),
})

export const KubernetesClusterClusterDetails = z.object({
  externalId: z.string().nullable().optional(), // Cluster's ID from the outside, for the ones who have made cluster, like Tanzu
  resources: KubernetesClusterStatusClusterStatusResources.nullable().optional(),
  price: KubernetesClusterStatusPrice.nullable().optional(),
  controlplane: KubernetesClusterControlPlaneStatus.nullable().optional(),
  nodepools: z.array(KubernetesClusterNodePoolStatus).nullable().optional(), // TODO: Check if this changed in ror repo
})

// NHN tooling, agent, kubernetes
export const KubernetesClusterVersion = z.object({
  name: z.string().nullable().optional(),
  version: z.string().nullable().optional(),
  branch: z.string().nullable().optional(),
})

export const KubernetesClusterEndpoint = z.object({
  name: z.string().nullable().optional(), // Name of the endpoint, "controlplane", "kubernetes", "api", "dashboard, grafana, argocd", "datacenter"
  address: z.string().nullable().optional(), // Address of the endpoint
})

export const KubernetesClusterClusterState = z.object({
  cluster: KubernetesClusterClusterDetails.nullable().optional(),
  versions: z.array(KubernetesClusterVersion).nullable().optional(),
  endpoints: z.array(KubernetesClusterEndpoint).nullable().optional(),
  egressIP: z.string().nullable().optional(), // IP that load balancers use to route traffic out of the cluster, used to reach the cluster from the outside, e.g. to firewalls
  lastUpdated: z.coerce.date().nullable().optional(),
  lastUpdatedBy: z.string().nullable().optional(),
  created: z.coerce.date().nullable().optional(),
})

export const KubernetesClusterCondition = z.object({
  type: z.string().nullable().optional(), // Type is the type of the condition. For example, "ready", "available", etc.
  status: z.string().nullable().optional(), // Status is the status of the condition. Valid vales are: ok, warning, error, working, unknown.
  lastTransitionTime: z.string().nullable().optional(), // LastTransitionTime is the last time the condition transitioned from one status to another.
  reason: z.string().nullable().optional(), // Reason is a brief reason for the condition's last transition.
  message: z.string().nullable().optional(), // Message is a human-readable message indicating details about the condition.
})

// Agent status - the current format reported by ror-agent
export const KubernetesClusterNodeResource = z.object({
  capacity: z.string().nullable().optional(),
  allocated: z.string().nullable().optional(),
})

export const KubernetesClusterAgentNode = z.object({
  name: z.string().nullable().optional(),
  cpu: KubernetesClusterNodeResource.nullable().optional(),
  memory: KubernetesClusterNodeResource.nullable().optional(),
  architecture: z.string().nullable().optional(),
  kubernetesVersion: z.string().nullable().optional(),
})

export const KubernetesClusterAgentNodePool = z.object({
  name: z.string().nullable().optional(),
  nodes: z.array(KubernetesClusterAgentNode).nullable().optional(),
})

export const KubernetesClusterAgentNodes = z.object({
  controlPlane: z.array(KubernetesClusterAgentNode).nullable().optional(),
  nodepools: z.array(KubernetesClusterAgentNodePool).nullable().optional(),
})

export const KubernetesClusterAgentStatus = z
  .object({
    clusterId: z.string().nullable().optional(),
    clusterName: z.string().nullable().optional(),
    kubernetesProvider: z.string().nullable().optional(),
    az: z.string().nullable().optional(),
    region: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    workspaceId: z.string().nullable().optional(),
    environment: z.string().nullable().optional(),
    datacenter: z.string().nullable().optional(),
    nodes: KubernetesClusterAgentNodes.nullable().optional(),
    versions: z.record(z.string(), z.string()).nullable().optional(),
    urls: z.record(z.string(), z.string()).nullable().optional(),
    createdAt: z.string().nullable().optional(),
    lastSeen: z.string().nullable().optional(),
  })
  .passthrough()

export const KubernetesClusterStatus = z
  .object({
    state: KubernetesClusterClusterState.nullable().optional(),
    phase: z.string().nullable().optional(),
    conditions: z.array(KubernetesClusterCondition).nullable().optional(),
    agentstatus: KubernetesClusterAgentStatus.nullable().optional(),
  })
  .passthrough()

export const KubernetesClusterSchema = V2ResourceSchema.extend({
  kubernetescluster: z
    .object({
      // The spec defines how the cluster is configured and provisioned.
      spec: KubernetesClusterSpec.nullable().optional(),
      // The status defines the current state of the cluster.
      status: KubernetesClusterStatus.nullable().optional(),
    })
    .passthrough()
    .nullable()
    .optional(),
})

export const KubernetesClusterResponseSchema = createV2ResourceResponseSchema(KubernetesClusterSchema)
export type KubernetesClusterNodePoolType = z.infer<typeof KubernetesClusterNodePool>
export type KubernetesClusterNodePoolStatusType = z.infer<typeof KubernetesClusterNodePoolStatus>
