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

const ClusterListViewElementResourcesObject = z
  .object({
    fieldValue: z.record(z.string(), z.unknown()).nullish().catch(null),
  })
  .loose()

const ClusterListViewElementTagsObject = z
  .object({
    fieldValue: z.record(z.string(), z.unknown()).nullish().catch(null),
  })
  .loose()

export const ClusterListViewRow = z
  .object({
    clusterId: ClusterListViewElementString.nullish(),
    clusterName: ClusterListViewElementString.nullish(),
    clusterUid: ClusterListViewElementString.nullish(),
    provider: ClusterListViewElementString.nullish(),
    availabilityZone: ClusterListViewElementString.nullish(),
    country: ClusterListViewElementString.nullish(),
    region: ClusterListViewElementString.nullish(),
    workspace: ClusterListViewElementString.nullish(),
    environment: ClusterListViewElementString.nullish(),
    resources: ClusterListViewElementResourcesObject.nullish(),
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
