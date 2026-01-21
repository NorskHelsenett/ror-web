export async function fetchBackupRuns(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  params: {
    page: number
    limit: number
    sort?: string
    order: 'asc' | 'desc'
  }
) {
  const skip = (params.page - 1) * params.limit

  const listParams = new URLSearchParams()
  listParams.set('limit', String(params.limit))
  listParams.set('offset', String(skip))
  if (params.sort) listParams.set('sort', params.sort)
  if (params.order) listParams.set('order', params.order)

  const backupRuns = await api.backupRun.list(listParams)

  return {
    backupRuns: backupRuns?.resources ?? [],
  }
}
