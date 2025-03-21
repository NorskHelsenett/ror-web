import { getRorAPIPath } from '@/__mocks__/utils/mock-base-url'
import { http, HttpResponse } from 'msw'
import v2Clusters from '@/__mocks__/data/clusters-v2'

export const resourcesHandlers = [
  http.get(getRorAPIPath('/v2/resources'), () => {
    // TODO: Implement query params
    // const ownerScope = url.searchParams.get('ownerScope')
    // const ownerSubject = url.searchParams.get('ownerSubject')
    // const apiversion = url.searchParams.get('apiversion')
    // const kind = url.searchParams.get('kind')
    return HttpResponse.json(v2Clusters)
  }),
  http.get(getRorAPIPath('/v2/resources/uid/:uid'), ({ params }) => {
    const cluster = v2Clusters.find((c) => c.kubernetescluster.spec.data.clusterId === params.uid)
    if (!cluster) {
      return HttpResponse.json({ error: 'Cluster not found' }, { status: 404 })
    }
    return HttpResponse.json(v2Clusters)
  }),
]
