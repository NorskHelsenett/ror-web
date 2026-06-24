export interface NoramlizeParamsResult {
  page: number
  limit: number
  sort?: string
  order: 'asc' | 'desc'
}

export function normalizeParams(parameters: Record<string, string | string[] | undefined>): NoramlizeParamsResult {
  const get = (key: string): string | undefined =>
    typeof parameters[key] === 'string' ? (parameters[key] as string) : undefined

  const page = Number(get('page') ?? '1') || 1
  const limit = Number(get('limit') ?? '10') || 10
  const sort = get('sort')
  const order: 'asc' | 'desc' = get('order') === 'desc' ? 'desc' : 'asc'

  return { page, limit, sort, order }
}
