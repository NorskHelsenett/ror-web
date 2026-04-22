import { http, HttpResponse } from 'msw'
import { getRorAPIPath } from '../utils/mock-base-url'
import projects from '../data/projects'

export const projectsHandlers = [
  http.post(getRorAPIPath('/v1/projects/filter'), () => {
    return HttpResponse.json(projects)
  }),
]
