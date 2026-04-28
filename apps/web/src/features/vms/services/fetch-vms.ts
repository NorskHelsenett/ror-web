import { buildRegexSearchFilter } from '../utils/regex-search'

export async function fetchVms(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  params: {
    page: number
    limit: number
    sort?: string
    order: 'asc' | 'desc'
    filters?: string
    search?: string
    searchField?: string
  }
) {
  const skip = (params.page - 1) * params.limit

  const listParams = new URLSearchParams()
  listParams.set('limit', String(params.limit))
  listParams.set('offset', String(skip))
  if (params.sort) listParams.set('sort', params.sort)
  const search = params.search?.trim() || undefined

  if (search) {
    const filters = buildRegexSearchFilter(search, 'virtualmachine.spec.name', params.searchField)
    if (filters) listParams.set('filters', filters)
  } else if (params.filters) {
    listParams.set('filters', params.filters)
  }

  const virtualmachines = await api.virtualMachine.list(listParams)
  return { vms: virtualmachines?.resources ?? [] }
}
