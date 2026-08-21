import z from 'zod'
import {
  ViewColumn,
  ViewElementArray,
  ViewElementNumber,
  ViewElementNumberFieldUnit,
  ViewElementString,
  ViewElementStringFieldUnit,
  ViewElementTagsObject,
} from './types'

export const ClusterListViewRow = z
  .object({
    clusterUid: ViewElementString.nullish(),
    clusterId: ViewElementString.nullish(),
    clusterName: ViewElementString.nullish(),
    provider: ViewElementString.nullish(),
    datacenter: ViewElementString.nullish(),
    availabilityZone: ViewElementString.nullish(),
    country: ViewElementString.nullish(),
    region: ViewElementString.nullish(),
    workspace: ViewElementString.nullish(),
    environment: ViewElementString.nullish(),
    resourcesCpu: ViewElementString.nullish(),
    resourcesMemory: ViewElementStringFieldUnit.nullish(),
    resourcesCpuUsedMilli: ViewElementNumberFieldUnit.nullish(),
    resourcesMemoryUsed: ViewElementStringFieldUnit.nullish(),
    resourcesCpuUsedPercent: ViewElementNumberFieldUnit.nullish(),
    resourcesMemoryUsedPercent: ViewElementNumberFieldUnit.nullish(),
    nodes: ViewElementNumber.nullish(),
    nodepoolsCount: ViewElementNumber.nullish(),
    priceMonth: ViewElementNumber.nullish(),
    priceYear: ViewElementNumber.nullish(),
    argocdURL: ViewElementString.nullish(),
    grafanaURL: ViewElementString.nullish(),
    rorAgentVersion: ViewElementString.nullish(),
    kubernetesVersion: ViewElementString.nullish(),
    nhnToolVersion: ViewElementString.nullish(),
    serviceID: ViewElementString.nullish(),
    tags: ViewElementTagsObject.nullish(),
    status: ViewElementString.nullish(),
    created: ViewElementString.nullish(),
    lastSeen: ViewElementString.nullish(),
    nodepools: ViewElementArray.nullish(),
    egressIP: ViewElementString.nullish(),
  })
  .loose()

export const ClusterListViewSchema = z
  .object({
    type: z.string(),
    columns: z.array(ViewColumn),
    rows: z.array(ClusterListViewRow).default([]),
  })
  .loose()
