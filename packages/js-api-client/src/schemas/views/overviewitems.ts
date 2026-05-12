import z from 'zod'
import { ViewElementString, ViewElementNumber, ViewColumn } from './types'

export const OverviewItemsViewRow = z
  .object({
    itemUid: ViewElementString,
    itemName: ViewElementString,
    greenTitle: ViewElementString,
    greenNumber: ViewElementNumber,
    yellowTitle: ViewElementString,
    yellowNumber: ViewElementNumber,
    redTitle: ViewElementString,
    redNumber: ViewElementNumber,
  })
  .loose()

export const OverviewItemsViewSchema = z
  .object({
    type: z.string(),
    columns: z.array(ViewColumn),
    rows: z.array(OverviewItemsViewRow),
  })
  .loose()
