import { WorkspaceListViewsRowType } from '@ror/js-api-client'

export const getWorkspaceUidView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.workspaceUid?.fieldValue || ''

export const getWorkspaceNameView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.workspaceName?.fieldValue || ''

export const getWorkspaceDatacenterIdView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.datacenterId?.fieldValue || ''

export const getWorkspaceDatacenterNameView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.datacenterName?.fieldValue || ''

export const getWorkspaceDefaultMachineClassView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.defaultMachineClass?.fieldValue || ''

export const getWorkspaceDefaultStorageClassView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.defaultStorageClass?.fieldValue || ''

export const getWorkspaceClustersView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.clusters?.fieldValue || ''

export const getWorkspaceKey = (policyReport: WorkspaceListViewsRowType[] = []): string =>
  Array.isArray(policyReport) ? policyReport.map(getWorkspaceUidView).join(',') : ''
