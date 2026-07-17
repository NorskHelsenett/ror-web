import z from 'zod'
import { ViewColumn, ViewElementString } from './types'

export const WorkspaceListViewRow = z
  .object({
    workspaceUid: ViewElementString.nullish(),
    workspaceName: ViewElementString.nullish(),
    datacenterId: ViewElementString.nullish(),
    datacenterName: ViewElementString.nullish(),
    defaultMachineClass: ViewElementString.nullish(),
    defaultStorageClass: ViewElementString.nullish(),
    clusters: ViewElementString.nullish(),
  })
  .loose()

export const WorkspaceListViewSchema = z
  .object({
    type: z.string(),
    columns: z.array(ViewColumn),
    rows: z.array(WorkspaceListViewRow).default([]),
  })
  .loose()
