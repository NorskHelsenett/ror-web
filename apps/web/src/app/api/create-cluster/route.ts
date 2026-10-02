import { NextResponse } from 'next/server'
import { authGuard } from '@/features/auth/utils/auth-guard'
import { z } from 'zod'

const MAX_REQUEST_BYTES = 16 * 1024
const MAX_NODES = 100

const commaSeparatedValues = (maxLength: number, maxItemLength: number, allowEmpty = false) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .refine(
      (value) =>
        (allowEmpty && value === '') ||
        value.split(',').every((item) => item.trim().length > 0 && item.trim().length <= maxItemLength),
      'Invalid comma-separated values'
    )

const ClusterRequestSchema = z
  .object({
    project: z.string().trim().min(1).max(128),
    name: z
      .string()
      .trim()
      .min(1)
      .max(63)
      .regex(/^[A-Za-zÆØÅæøå0-9-]+$/),
    datacenter: z.enum(['East (Vitistack Oslo)', 'Center (Vitistack Trondheim)', 'West (Vitistack Bergen)']),
    team: z.string().trim().min(1).max(128),
    environment: z.enum(['prod', 'test', 'qa', 'dev']),
    namespace: z
      .string()
      .trim()
      .min(1)
      .max(128)
      .regex(/^[^\u0000-\u001F\u007F]+$/),
    machine_class: z.enum([
      'Best Effort Medium',
      'GPU',
      'Large',
      'Large CPU',
      'Large Memory',
      'Medium',
      'Medium CPUBIG',
      'Small',
      'XLarge',
      'Xlarge CPU',
      'XXLarge CPU',
    ]),
    nodes: z
      .string()
      .regex(/^[1-9]\d{0,2}$/)
      .refine((value) => Number(value) <= MAX_NODES, `Must be at most ${MAX_NODES} nodes`),
    high_availability: z.enum(['Ja - For Produksjons-cluster!', 'Nei - Gjelder test/qa/dev']),
    criticality: z.enum(['1 - Normal', '2 - Moderat', '3 - Høy', '4 - Kritisk']),
    sensitivity: z.enum(['1 - Åpen', '2 - Intern', '3 - Skjermet', '4 - Sterkt skjermet']),
    service_id: z
      .string()
      .trim()
      .min(1)
      .max(256)
      .regex(/^\d+(?:\s*,\s*\d+)*$/),
    lcm: z.enum(['Dag (i arbeidstid, kl 0800 - 1600)', 'Kveld (utenfor arbeidstid, kl 1600 - 2359)']),
    tech_contact_upn: z.string().trim().min(3).max(254).email(),
    tech_contact_email: z.string().trim().min(3).max(254).email(),
    tech_contact_phone: z
      .string()
      .trim()
      .min(7)
      .max(40)
      .regex(/^(?=(?:\D*\d){7,15}\D*$)\+?[\d\s()-]+$/),
    slack_channel: commaSeparatedValues(1000, 100),
    access_groups: commaSeparatedValues(1000, 128, true),
    other: z.string().max(2000),
  })
  .strict()

class RequestBodyTooLargeError extends Error {}

async function readRequestBody(request: Request): Promise<string> {
  const contentLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    throw new RequestBodyTooLargeError()
  }

  if (!request.body) throw new Error('Request body is empty')

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      totalBytes += value.byteLength
      if (totalBytes > MAX_REQUEST_BYTES) {
        await reader.cancel()
        throw new RequestBodyTooLargeError()
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }

  const bytes = new Uint8Array(totalBytes)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

export async function POST(request: Request) {
  const session = await authGuard()

  try {
    const webhookUrl = process.env.CREATE_CLUSTER_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Cluster webhook is not configured' }, { status: 503 })
    }

    if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 })
    }

    let rawBody: string
    try {
      rawBody = await readRequestBody(request)
    } catch (error) {
      if (error instanceof RequestBodyTooLargeError) {
        return NextResponse.json({ error: 'Request body is too large' }, { status: 413 })
      }
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    let input: unknown
    try {
      input = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 })
    }

    const parsed = ClusterRequestSchema.safeParse(input)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid cluster request', fields: parsed.error.issues.map((issue) => issue.path.join('.')) },
        { status: 400 }
      )
    }

    const requester = session.user.name?.trim() || session.user.email?.trim() || session.user.id.trim()
    if (!requester) {
      return NextResponse.json({ error: 'Authenticated user identity is unavailable' }, { status: 401 })
    }

    const payload = { ...parsed.data, orderer: requester }
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Webhook request failed' }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send cluster request' }, { status: 500 })
  }
}
