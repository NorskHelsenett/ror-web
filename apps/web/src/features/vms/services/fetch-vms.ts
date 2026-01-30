export async function fetchVms(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  params: {
    page: number
    limit: number
    sort?: string
    order?: 'asc' | 'desc'
  }
) {
  const skip = (params.page - 1) * params.limit

  const listParams = new URLSearchParams()
  listParams.set('limit', String(params.limit))
  listParams.set('offset', String(skip))
  listParams.set('sort', 'externalId')
  //  if (params.sort) listParams.set('sort', params.sort)

  const virtualmachines = await api.virtualMachine.list(listParams)
  const vms = virtualmachines?.resources ?? []

  return { vms }
}
