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
  { label: 'Location', value: 'location' },
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

export const locationOptions: Option[] = [
  { value: 'TRD', label: 'TRD NAM01' },
  { value: 'TRD3', label: 'TRD3 NAM03' },
  { value: 'OSL', label: 'OSL NAM01' },
  { value: 'OSL3', label: 'OSL3 NAM02' },
]

export const backupStatusOptions: Option[] = [
  { value: 'activeBackup', label: 'Active Backup' },
  { value: 'historicalBackup', label: 'Historical Backup' },
  { value: 'configuredBackup', label: 'Configured Backup' },
  { value: 'noBackup', label: 'No Backup' },
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
    { label: 'Location', placeholder: 'Choose Location', data: locationOptions },
    { label: 'Teams', placeholder: 'Choose Team', data: teamOptions },
    { label: 'Backup', placeholder: 'Choose Backup Status', data: backupStatusOptions },
  ]
}
