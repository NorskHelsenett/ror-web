import { http, HttpResponse } from 'msw'
import { getRorAPIPath } from '../utils/mock-base-url'
import projects from '../data/projects'

export const projectsHandlers = [
  http.post(getRorAPIPath('/v1/projects/filter'), async ({ request }) => {
    console.log('[Project handler hit]', request.url)
    const body = await request.json().catch(() => null)
    console.log('[Project handler body]', body)

    return HttpResponse.json(projects)
  }),
]
