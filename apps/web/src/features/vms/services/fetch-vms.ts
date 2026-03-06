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

    // Map UI/search keys -> API field paths (replace with exact paths from your API model)
    // const apiSearchFields = [
    //   'virtualmachine.spec.name', // label/name
    //   'virtualmachine.spec.hostname', // hostName
    //   'virtualmachine.status.powerState', // powerState
    //   'virtualmachine.spec.family', // family
    //   'virtualmachine.status.location', // location
    //   // 'cluster.fullPath',                  // fullLocation
    // ]

    const filters = JSON.stringify([
      {
        field: 'virtualmachine.spec.name',
        value: `^${safe}`,
        type: 'string',
        operator: 'regexp',
      },
    ])

    console.log('[fetchVms] filters:', filters)
    listParams.set('filters', filters)
  } else if (params.filters) {
    listParams.set('filters', params.filters)
  }

  const virtualmachines = await api.virtualMachine.list(listParams)
  return { vms: virtualmachines?.resources ?? [] }
}
