export async function fetchVms(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  params: {
    page: number
    limit: number
    sort?: string
    order: 'asc' | 'desc'
    filters?: string
    search?: string
  }
) {
  const skip = (params.page - 1) * params.limit

  const listParams = new URLSearchParams()
  listParams.set('limit', String(params.limit))
  listParams.set('offset', String(skip))
  if (params.sort) listParams.set('sort', params.sort)
  const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const search = params.search?.trim()

  if (search) {
    const safe = escapeRegExp(search)
    const fields = ['label', 'hostName', 'powerState', 'family', 'location', 'fullLocation']
    const filters = JSON.stringify(
      fields.map((field) => ({ field, value: `^${safe}`, type: 'string', operator: 'regexp' }))
    )
    listParams.set('filters', filters)
  } else if (params.filters) {
    listParams.set('filters', params.filters)
  }

  const virtualmachines = await api.virtualMachine.list(listParams)
  return { vms: virtualmachines?.resources ?? [] }
}
