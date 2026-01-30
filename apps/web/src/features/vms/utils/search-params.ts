export interface VmPageParams {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
  view: 'grid' | 'list'
  filters?: 'open'
  skip?: number
}

export interface VmSearchParams {
  page?: string | string[]
  limit?: string | string[]
  sort?: string | string[]
  order?: string | string[]
  view?: string | string[]
  filters?: string | string[]
}

export const parseVmSearchParams = (searchParams: VmSearchParams): VmPageParams => {
  const page = Number(searchParams.page ?? '1') || 1
  const limit = Number(searchParams.limit ?? '25') || 25
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : undefined
  const order: 'asc' | 'desc' = searchParams.order === 'desc' ? 'desc' : 'asc'
  const view: 'grid' | 'list' = searchParams.view === 'list' ? 'list' : 'grid'
  const filters = searchParams.filters === 'open' ? ('open' as const) : undefined
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    sort,
    order,
    view,
    filters,
    skip,
  }
}

// Helper functions for building search param URLs
export const buildVmSearchParams = (params: Partial<VmPageParams>): URLSearchParams => {
  const searchParams = new URLSearchParams()

  if (params.page && params.page > 1) {
    searchParams.set('page', params.page.toString())
  }
  if (params.limit && params.limit !== 10) {
    searchParams.set('limit', params.limit.toString())
  }
  if (params.sort) {
    searchParams.set('sort', params.sort)
  }
  if (params.order && params.order === 'desc') {
    searchParams.set('order', params.order)
  }
  if (params.view && params.view === 'list') {
    searchParams.set('view', params.view)
  }
  if (params.filters) {
    searchParams.set('filters', params.filters)
  }

  return searchParams
}

export const getVmPageUrl = (baseUrl: string, params: Partial<VmPageParams>): string => {
  const searchParams = buildVmSearchParams(params)
  return searchParams.toString() ? `${baseUrl}?${searchParams.toString()}` : baseUrl
}
