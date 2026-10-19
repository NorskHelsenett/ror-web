import { clusterListViewHandler } from './handlers/clusterlistview'
import { clustersHandlers } from './handlers/clusters'
import { overviewItemsViewHandler } from './handlers/overviewitemview'
import { pricesHandlers } from './handlers/prices'
import { projectsHandlers } from './handlers/projects'
import { workspaceListViewHandler } from './handlers/workspacelistview'
import { v2ResourcesHandlers } from './handlers/v2-resources'
import { aclHandlers } from './handlers/acls'

/**
 * Mock handlers for the application.
 */
export const handlers = [
  ...v2ResourcesHandlers,
  ...aclHandlers,
  ...pricesHandlers,
  ...clustersHandlers,
  ...projectsHandlers,
  ...clusterListViewHandler,
  ...workspaceListViewHandler,
  ...overviewItemsViewHandler,
]
