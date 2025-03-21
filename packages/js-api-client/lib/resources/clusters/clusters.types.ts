import { z } from 'zod'
import { Cluster, ClusterListItem, ClusterV2Model, ClusterV2ListModel } from './clusters.model'

export type ClusterType = z.infer<typeof Cluster>
export type ClusterListItemType = z.infer<typeof ClusterListItem>

export type ClusterV2Type = z.infer<typeof ClusterV2Model>
export type ClusterV2ListItemType = z.infer<typeof ClusterV2ListModel>
