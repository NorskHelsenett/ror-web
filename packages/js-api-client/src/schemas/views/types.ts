import z from 'zod'

export const ViewColumn = z
  .object({
    name: z.string(),
    description: z.string(),
    order: z.number(),
    default: z.boolean(),
    type: z.string(),
  })
  .loose()

export const ViewElementString = z
  .object({
    fieldValue: z.string().nullish().catch(null),
  })
  .loose()

export const ViewElementNumber = z
  .object({
    fieldValue: z.number().nullish().catch(null),
  })
  .loose()

export const ViewElementArray = z
  .object({
    fieldValue: z.array(z.any()).nullish().catch(null),
  })
  .loose()

export const ViewElementTagsObject = z
  .object({
    fieldValue: z.record(z.string(), z.unknown()).nullish().catch(null),
  })
  .loose()

export const ViewElementNumberFieldUnit = z
  .object({
    fieldValue: z.number().nullish().catch(null),
    fieldUnit: z.string().nullish().catch(null),
  })
  .loose()

export const ViewElementStringFieldUnit = z
  .object({
    fieldValue: z.string().nullish().catch(null),
    fieldUnit: z.string().nullish().catch(null),
  })
  .loose()
