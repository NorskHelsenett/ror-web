import { z } from 'zod'
import { createV2ResourceResponseSchema, V2ResourceSchema } from './common'

// -------------------------
// Sub-schemas
// -------------------------

export const ResourcePolicyReportSummary = z.object({
  error: z.number().nullable().optional(),
  fail: z.number().nullable().optional(),
  pass: z.number().nullable().optional(),
  skip: z.number().nullable().optional(),
  warn: z.number().nullable().optional(),
})

export const ResourcePolicyReportResultsResources = z.object({
  uid: z.string().nullable().optional(),
  apiVersion: z.string().nullable().optional(),
  kind: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
})

export const ResourcePolicyReportResults = z.object({
  policy: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  properties: z.record(z.string(), z.string()).nullable().optional(),
  severity: z.string().nullable().optional(),
  result: z.string().nullable().optional(),
  resources: z.array(ResourcePolicyReportResultsResources).nullable().optional(),
})

// -------------------------
// Main schema
// -------------------------

export const ResourcePolicyReportType = V2ResourceSchema.extend({
  policyreport: z
    .object({
      results: z.array(ResourcePolicyReportResults).nullable().optional(),
      summary: ResourcePolicyReportSummary.nullable().optional(),
      lastReported: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
})

export const ResourcePolicyReportSchema = createV2ResourceResponseSchema(ResourcePolicyReportType)
