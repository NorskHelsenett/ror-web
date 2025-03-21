import { clustersHandlers } from './handlers/clusters'
import { resourcesHandlers } from './handlers/resources'

export const handlers = [...clustersHandlers, ...resourcesHandlers]
