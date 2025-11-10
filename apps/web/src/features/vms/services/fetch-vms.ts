export async function fetchVms(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  params: {
    page: number
    limit: number
    sort?: string
    order: 'asc' | 'desc'
  }
) {
  console.log('🚀 [fetchVms] Starting VM fetch with params:', {
    page: params.page,
    limit: params.limit,
    sort: params.sort,
    order: params.order,
    timestamp: new Date().toISOString(),
  })

  const skip = (params.page - 1) * params.limit

  const listParams = new URLSearchParams()
  listParams.set('limit', String(params.limit))
  listParams.set('offset', String(skip))
  if (params.sort) listParams.set('sort', params.sort)

  console.log('📡 [fetchVms] API call parameters:', {
    limit: listParams.get('limit'),
    offset: listParams.get('offset'),
    sort: listParams.get('sort'),
    fullParams: listParams.toString(),
  })

  const virtualmachines = await api.virtualMachine.list(listParams)

  const vms = virtualmachines?.resources ?? []
  console.log('✅ [fetchVms] API response received:', {
    totalVmsReceived: vms.length,
    hasResources: !!virtualmachines?.resources,
    rawResourcesLength: virtualmachines?.resources?.length,
    firstVmName: vms[0] ? (vms[0].metadata?.name ?? 'unnamed') : 'No VMs',
    vmSample: vms.slice(0, 3).map((vm) => ({
      name: vm.metadata?.name,
      hostname: vm.virtualmachine?.status?.operatingSystem?.hostName,
      uid: vm.metadata?.uid,
    })),
  })

  if (vms.length === 0) {
    console.warn('⚠️ [fetchVms] No VMs returned from API. Raw response:', virtualmachines)
  }

  return {
    vms: vms,
  }
}
