import { http, HttpResponse } from 'msw'
import { getRorAPIPath } from '../utils/mock-base-url'
import { clusterListView, clusterListViewItem } from '../data/clusterlistview'

export const clusterListViewHandler = [
  http.get(getRorAPIPath('/v2/views/clusterlist'), async ({ request }) => {
    console.log('[Cluster list handler handler hit]', request.url)
    const body = await request.json().catch(() => null)
    console.log('[Cluster list handler handler body]', body)

    return HttpResponse.json(clusterListView)
  }),
  http.get(getRorAPIPath('/v2/views/clusterlistitem'), async ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('filter') ?? ''
    const id = filter.replace('clusterUid=', '')

    const clusters = structuredClone(clusterListViewItem)
    clusters.rows = []

    for (const cluster of clusterListViewItem.rows) {
      if (cluster.clusterUid.fieldValue == id) {
        clusters.rows.push(cluster)
      }
    }

    if (clusters.rows.length === 0) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(clusters, { status: 200 })
  }),
]
