import { http, HttpResponse } from 'msw'
import { getRorAPIPath } from '../utils/mock-base-url'
import { overviewItemsView } from '../data/overviewitemsview'

export const overviewItemsViewHandler = [
  http.get(getRorAPIPath('/v2/views/overviewitemslist'), () => {
    return HttpResponse.json(overviewItemsView)
  }),
]
