import { http, HttpResponse } from 'msw'
import { getRorAPIPath } from '../utils/mock-base-url'
import { workspaceListView } from '../data/workspacelistview'

export const workspaceListViewHandler = [
  http.get(getRorAPIPath('/v2/views/workspacelist'), () => {
    return HttpResponse.json(workspaceListView)
  }),
]
