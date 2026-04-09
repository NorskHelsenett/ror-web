import { http, HttpResponse } from 'msw'
import { getRorAPIPath } from '../utils/mock-base-url'
import { clusterListView } from '../data/clusterlistview'

export const clusterListViewHandler = [
  http.get(getRorAPIPath('/v2/views/clusterlist'), async ({ request }) => {
    console.log('[Project handler hit]', request.url)
    const body = await request.json().catch(() => null)
    console.log('[Project handler body]', body)

    return HttpResponse.json(clusterListView)
  }),
]
