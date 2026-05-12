import { OverviewItemsViewRowType } from '@ror/js-api-client'

export const overviewItemsValues = ['Clusters', 'VMs', 'Vulnerabilities'] as const

export type OverviewItem = (typeof overviewItemsValues)[number]

export interface LocalstorageOverviewItemObject {
  name: string
  data: OverviewItemsViewRowType[]
}
