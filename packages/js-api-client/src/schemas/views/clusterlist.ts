import z from 'zod'

const ClusterListViewColumn = z
  .object({
    name: z.string(),
    description: z.string(),
    order: z.number(),
    default: z.boolean(),
    type: z.string(),
  })
  .loose()

const ClusterListViewElementString = z
  .object({
    fieldValue: z.string().nullish().catch(null),
  })
  .loose()

const ClusterListViewElementNumber = z
  .object({
    fieldValue: z.number().nullish().catch(null),
  })
  .loose()

const ClusterListViewElementTagsObject = z
  .object({
    fieldValue: z.record(z.string(), z.unknown()).nullish().catch(null),
  })
  .loose()

const ClusterListViewElementNumberFieldUnit = z
  .object({
    fieldValue: z.number().nullish().catch(null),
    fieldUnit: z.string().nullish().catch(null),
  })
  .loose()

const ClusterListViewElementStringFieldUnit = z
  .object({
    fieldValue: z.string().nullish().catch(null),
    fieldUnit: z.string().nullish().catch(null),
  })
  .loose()

export const ClusterListViewRow = z
  .object({
    clusterUid: ClusterListViewElementString.nullish(),
    clusterId: ClusterListViewElementString.nullish(),
    clusterName: ClusterListViewElementString.nullish(),
    provider: ClusterListViewElementString.nullish(),
    datacenter: ClusterListViewElementString.nullish(),
    availabilityZone: ClusterListViewElementString.nullish(),
    country: ClusterListViewElementString.nullish(),
    region: ClusterListViewElementString.nullish(),
    workspace: ClusterListViewElementString.nullish(),
    environment: ClusterListViewElementString.nullish(),
    resourcesCpu: ClusterListViewElementString.nullish(),
    resourcesMemory: ClusterListViewElementStringFieldUnit.nullish(),
    resourcesCpuUsedMilli: ClusterListViewElementNumberFieldUnit.nullish(),
    resourcesMemoryUsed: ClusterListViewElementStringFieldUnit.nullish(),
    resourcesCpuUsedPercent: ClusterListViewElementNumberFieldUnit.nullish(),
    resourcesMemoryUsedPercent: ClusterListViewElementNumberFieldUnit.nullish(),
    nodes: ClusterListViewElementNumber.nullish(),
    nodePools: ClusterListViewElementNumber.nullish(),
    priceMonth: ClusterListViewElementNumber.nullish(),
    priceYear: ClusterListViewElementNumber.nullish(),
    argocdURL: ClusterListViewElementString.nullish(),
    grafanaURL: ClusterListViewElementString.nullish(),
    rorAgentVersion: ClusterListViewElementString.nullish(),
    kubernetesVersion: ClusterListViewElementString.nullish(),
    nhnToolVersion: ClusterListViewElementString.nullish(),
    serviceID: ClusterListViewElementString.nullish(),
    tags: ClusterListViewElementTagsObject.nullish(),
    status: ClusterListViewElementString.nullish(),
    created: ClusterListViewElementString.nullish(),
    lastSeen: ClusterListViewElementString.nullish(),
  })
  .loose()

export const ClusterListViewSchema = z
  .object({
    type: z.string(),
    columns: z.array(ClusterListViewColumn),
    rows: z.array(ClusterListViewRow),
  })
  .loose()
