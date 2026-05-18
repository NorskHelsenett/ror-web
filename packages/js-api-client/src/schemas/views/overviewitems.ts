import z from 'zod'
import { ViewElementString, ViewElementNumber, ViewColumn } from './types'

export const OverviewItemsViewRow = z
  .object({
    itemUid: ViewElementString.nullish(),
    itemName: ViewElementString.nullish(),
    greenTitle: ViewElementString.nullish(),
    greenNumber: ViewElementNumber.nullish(),
    yellowTitle: ViewElementString.nullish(),
    yellowNumber: ViewElementNumber.nullish(),
    redTitle: ViewElementString.nullish(),
    redNumber: ViewElementNumber.nullish(),
  })
  .loose()

export const OverviewItemsViewSchema = z
  .object({
    type: z.string(),
    columns: z.array(ViewColumn),
    rows: z.array(OverviewItemsViewRow),
  })
  .loose()
