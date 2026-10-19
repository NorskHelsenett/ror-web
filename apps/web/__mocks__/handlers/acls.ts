import { http, HttpResponse } from 'msw'
import { getRorAPIPath } from '../utils/mock-base-url'

import { getMockAclLookup } from '../data/acls'

export const aclHandlers = [
  http.get<{ scope: string; subject: string }>(getRorAPIPath('/v2/acl/lookup/:scope/:subject'), ({ params }) =>
    HttpResponse.json(getMockAclLookup(params.scope, params.subject))
  ),
]
