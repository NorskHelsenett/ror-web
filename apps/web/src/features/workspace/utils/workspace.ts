import { WorkspaceListViewRowType } from '@ror/js-api-client'

export const getWorkspaceUidView = (workspace: WorkspaceListViewRowType): string =>
  workspace.workspaceUid?.fieldValue || ''

export const getWorkspaceNameView = (workspace: WorkspaceListViewRowType): string =>
  workspace.workspaceName?.fieldValue || ''

export const getWorkspaceDatacenterIdView = (workspace: WorkspaceListViewRowType): string =>
  workspace.datacenterId?.fieldValue || ''

export const getWorkspaceDatacenterNameView = (workspace: WorkspaceListViewRowType): string => {
  return workspace.datacenterName?.fieldValue || ''
}

export const getWorkspaceDefaultMachineClassView = (workspace: WorkspaceListViewRowType): string =>
  workspace.defaultMachineClass?.fieldValue || ''

export const getWorkspaceDefaultStorageClassView = (workspace: WorkspaceListViewRowType): string =>
  workspace.defaultStorageClass?.fieldValue || ''

export const getWorkspaceClustersView = (workspace: WorkspaceListViewRowType): string =>
  workspace.clusters?.fieldValue || ''

export const getWorkspaceKey = (workspaces: WorkspaceListViewRowType[] = []): string =>
  Array.isArray(workspaces) ? workspaces.map(getWorkspaceUidView).join(',') : ''
