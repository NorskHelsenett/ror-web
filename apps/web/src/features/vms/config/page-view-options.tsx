import { Option } from '@/components/shadcn/multiselect'
import { fetchAllTeamOptions } from '@/utils/vm-team-actions'

export const displayDataOptions: Option[] = [
  { label: 'Backup status', value: 'activeBackup' },
  { label: 'Team', value: 'team' },
  { label: 'Power', value: 'powerState' },
  { label: 'Disk usage', value: 'disk-usage' },
  { label: 'Memory', value: 'memory' },
  { label: 'CPU', value: 'cpu' },
  { label: 'ID', value: 'id' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Family', value: 'family' },
  { label: 'Version', value: 'version' },
  { label: 'VMware Tools version', value: 'toolVersion' },
]

export const sortingOptions = [
  { label: 'Hostname', value: 'hostName' },
  { label: 'Backup status', value: 'activeBackup' },
  { label: 'Team', value: 'team' },
  { label: 'Power', value: 'powerState' },
  { label: 'Disk usage', value: 'disk-usage' },
  { label: 'Memory', value: 'memory' },
  { label: 'CPU', value: 'cpu' },
  { label: 'ID', value: 'id' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Family', value: 'family' },
  { label: 'Version', value: 'version' },
  { label: 'VMware Tools version', value: 'toolVersion' },
]

export const powerStateOptions: Option[] = [
  { value: 'poweredOn', label: 'Powered On' },
  { value: 'poweredOff', label: 'Powered Off' },
  { value: 'undefined', label: 'Undefined' },
]

export const backupStatusOptions: Option[] = [
  { value: 'activeBackup', label: 'Active Backup' },
  { value: 'historicalBackup', label: 'Historical Backup' },
  { value: 'configuredBackup', label: 'Configured Backup' },
  { value: 'noBackup', label: 'No Backup' },
  // TODO: Implement these statuses in the future
  // { value: 'inProgress', label: 'In Progress' },
  // { value: 'completed', label: 'Completed' },
  // { value: 'failed', label: 'Failed' },
]

export const generateServerTeamOptions = async (): Promise<Option[]> => {
  return await fetchAllTeamOptions()
}

// export const generateServerDetailedTeamOptions = async (): Promise<Option[]> => {
//   return await fetchAllDetailedTeamOptions()
// }

export const generateServerFilterOptions = async (): Promise<
  Array<{ label: string; placeholder: string; data: Option[] }>
> => {
  const teamOptions = await generateServerTeamOptions()

  return [
    { label: 'Power States', placeholder: 'Choose Power State', data: powerStateOptions },
    { label: 'Teams', placeholder: 'Choose Team', data: teamOptions },
    { label: 'Backup', placeholder: 'Choose Backup Status', data: backupStatusOptions },
  ]
}
