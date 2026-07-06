import { WorkspaceListViewsRowType } from '@ror/js-api-client'

function nameIsUuid(name: string): boolean {
  const uuidHyphens = 4
  const otherUuidCharacters = 32

  if (name.length == uuidHyphens + otherUuidCharacters && name.split('-').length) {
    return true
  }
  return false
}

export const getWorkspaceUidView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.workspaceUid?.fieldValue || ''

export const getWorkspaceNameView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.workspaceName?.fieldValue || ''

export const getWorkspaceDatacenterIdView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.datacenterId?.fieldValue || ''

export const getWorkspaceDatacenterNameView = (workspace: WorkspaceListViewsRowType): string => {
  const potentialName = workspace.datacenterName?.fieldValue || ''
  if (nameIsUuid(potentialName)) {
  }
  return potentialName
}

export const getWorkspaceDefaultMachineClassView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.defaultMachineClass?.fieldValue || ''

export const getWorkspaceDefaultStorageClassView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.defaultStorageClass?.fieldValue || ''

export const getWorkspaceClustersView = (workspace: WorkspaceListViewsRowType): string =>
  workspace.clusters?.fieldValue || ''

export const getWorkspaceKey = (policyReport: WorkspaceListViewsRowType[] = []): string =>
  Array.isArray(policyReport) ? policyReport.map(getWorkspaceUidView).join(',') : ''
