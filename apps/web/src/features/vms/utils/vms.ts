import type { VirtualMachine, User } from '@ror/js-api-client'
import { VMCardData } from '@/features/vms/types/vm-types'
import { Params } from '@/types/resources-page'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'

export interface VmResponse {
  resources: VirtualMachine[]
}

export interface VMCardProps {
  className?: string
  user?: User
  vm: VirtualMachine | VMWithBackupStatus
  vmDisplayData: VMCardData[]
}

export interface VMTableProps {
  metadata_name?: string
  os_id?: string | null
  powerstate?: string | null
}

export interface PageViewProps {
  className?: string
  user?: User
  vms: VirtualMachine[] | VMWithBackupStatus[]
  params: Params
}

export interface Network {
  dns?: string
  gateway?: string
  id: string
  ipv4?: string
  ipv6?: string
  mac?: string
  mask?: string
}

export interface VMDetailsProps {
  user?: User
  className?: string
}

export interface VmSearchProps {
  items: VirtualMachine[]
  onSelect?: (item: VirtualMachine) => void
  onResultsChange?: (results: VirtualMachine[]) => void
}

export interface UseVmLayoutParams {
  params: Promise<{ id: string }>
}

export interface UseVmLayoutReturn {
  id: string
  vm: VirtualMachine | null
  isLoading: boolean
  error: string | null
}

export interface VirtualMachineTeam {
  key: string
  description: string
  value: string
}

export interface MetricsData {
  cpuUsage?: number
  cpuLimit?: number
  cpuRequest?: number
  cpuSize?: number
  cpuSockets?: number
  cpuCoresPerSocket?: number

  memoryUsage?: number
  memorySizeBytes?: number
  memoryLimit?: number
  memoryRequest?: number

  diskSize?: number
  diskUsage?: number
  // Multiple disks support
  diskSizes?: number[]
  diskUsages?: number[]
  disks?: Array<{
    id?: string
    name?: string
    diskSize: number
    diskUsage?: number
    isMounted?: boolean
  }>
}

export const getVmOperatingSystemId = (vm: VirtualMachine): string => {
  return vm.virtualmachine?.status?.operatingSystem?.id || 'unknown-id'
}

export const getVmHostName = (vm: VirtualMachine): string => {
  return vm.virtualmachine?.status?.operatingSystem?.hostName || 'Unknown VM'
}

export const getVmPowerState = (vm: VirtualMachine): string => {
  return vm.virtualmachine?.status?.operatingSystem?.powerState || 'undefined'
}

export const getVmName = (vm: VirtualMachine): string => {
  return (
    vm.virtualmachine?.status?.operatingSystem?.name ||
    vm.virtualmachine?.spec?.name ||
    vm.metadata?.name ||
    'unnamed-vm'
  )
}

export const getVmFamily = (vm: VirtualMachine): string => {
  return vm.virtualmachine?.status?.operatingSystem?.family || 'Unknown'
}

export const getVmArchitecture = (vm: VirtualMachine): string => {
  return vm.virtualmachine?.status?.operatingSystem?.architecture || 'Unknown'
}

export const getVmVersion = (vm: VirtualMachine): string => {
  return vm.virtualmachine?.status?.operatingSystem?.version || 'Unknown'
}

export const getVmToolVersion = (vm: VirtualMachine): string => {
  return vm.virtualmachine?.status?.operatingSystem?.toolVersion || 'Unknown'
}

export const getVmDisks = (vm: VirtualMachine) => {
  return vm.virtualmachine?.status?.disks || []
}

export const getVmDiskSizes = (vm: VirtualMachine): number[] => {
  const disks = getVmDisks(vm)
  return disks.map((disk) => disk.sizeBytes || 0)
}

export const getVmDiskUsages = (vm: VirtualMachine): number[] => {
  const disks = getVmDisks(vm)
  return disks.map((disk) => disk.usageBytes || 0)
}

export const getSpecSockets = (vm: VirtualMachine): number | undefined => {
  return vm?.virtualmachine?.spec?.cpu?.sockets ?? undefined
}

export const getSpecCoresPerSocket = (vm: VirtualMachine): number | undefined => {
  return vm?.virtualmachine?.spec?.cpu?.coresPerSocket ?? undefined
}

export const getStatusCpuUsage = (vm: VirtualMachine): number | undefined => {
  return vm?.virtualmachine?.status?.cpu?.usage ?? undefined
}

export const getSpecMemory = (vm: VirtualMachine): number | undefined => {
  return vm?.virtualmachine?.spec?.memory?.sizeBytes ?? undefined
}

export const getStatusMemoryUsage = (vm: VirtualMachine): number | undefined => {
  return vm?.virtualmachine?.status?.memory?.usage ?? undefined
}

export const getSpecCpuTotal = (vm: VirtualMachine): number | undefined => {
  const coresPerSocket = vm?.virtualmachine?.spec?.cpu?.coresPerSocket ?? 0
  const sockets = vm?.virtualmachine?.spec?.cpu?.sockets ?? 0
  return coresPerSocket && sockets ? coresPerSocket * sockets : undefined
}

export const getNetworks = (vm: VirtualMachine): Network[] => {
  const networks = vm?.virtualmachine?.status?.networks ?? []
  return networks.map((networkitems) => ({
    dns: networkitems?.dns ?? undefined,
    gateway: networkitems?.gateway ?? undefined,
    id: networkitems?.id ?? 'Missing ID',
    ipv4: networkitems?.ipv4 ?? undefined,
    ipv6: networkitems?.ipv6 ?? undefined,
    mac: networkitems?.mac ?? undefined,
    mask: networkitems?.mask ?? undefined,
  }))
}

export const getNetworkId = (network: Network): string => {
  return network?.id ?? 'unknown-id'
}

export const getVmOperatingSystem = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.operatingSystem
}

export const getVmSpec = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.spec
}

export const getTeamValue = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.tags?.team?.value
}

export const getTeamDescription = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.tags?.team?.description
}

export const getTeam = (vm: VirtualMachine): VirtualMachineTeam | null => {
  const team = vm?.virtualmachine?.status?.tags?.team
  if (!team) return null

  return {
    key: team.key || 'team',
    description: team.description || '',
    value: team.value || '',
  }
}

/**
 * Extract unique team descriptions from an array of VMs
 * @param vms Array of VirtualMachine objects
 * @returns Array of unique team descriptions, filtered to remove empty values
 */
export const getUniqueTeamDescriptions = (vms: VirtualMachine[]): string[] => {
  const teamDescriptions = new Set<string>()

  vms.forEach((vm) => {
    const teamDescription = getTeamDescription(vm)
    if (teamDescription && teamDescription.trim()) {
      teamDescriptions.add(teamDescription.trim())
    }
  })

  return Array.from(teamDescriptions).sort()
}

/**
 * Extract unique team objects from an array of VMs
 * @param vms Array of VirtualMachine objects
 * @returns Array of unique VirtualMachineTeam objects
 */
export const getUniqueTeams = (vms: VirtualMachine[]): VirtualMachineTeam[] => {
  const teamsMap = new Map<string, VirtualMachineTeam>()

  vms.forEach((vm) => {
    const team = getTeam(vm)
    if (team && team.description && team.description.trim()) {
      // Use description as key to ensure uniqueness
      teamsMap.set(team.description.trim(), {
        key: team.key,
        description: team.description.trim(),
        value: team.value,
      })
    }
  })

  return Array.from(teamsMap.values()).sort((a, b) => a.description.localeCompare(b.description))
}

/**
 * Get the best available team identifier (description or value)
 * @param vm VirtualMachine object
 * @returns Team description if available, otherwise team value, or 'No Team' if neither exists
 */
export const getTeamIdentifier = (vm: VirtualMachine): string => {
  const teamDescription = getTeamDescription(vm)
  const teamValue = getTeamValue(vm)

  if (teamDescription && teamDescription.trim()) {
    return teamDescription.trim()
  }

  if (teamValue && teamValue.trim()) {
    return teamValue.trim()
  }

  return 'No Team'
}

/**
 * Filter VMs by team identifier (description or value)
 * @param vms Array of VirtualMachine objects
 * @param teamIdentifier The team identifier to filter by
 * @returns Array of VMs that belong to the specified team
 */
export const filterVmsByTeamIdentifier = (vms: VirtualMachine[], teamIdentifier: string): VirtualMachine[] => {
  if (!teamIdentifier || !teamIdentifier.trim()) {
    return vms
  }

  return vms.filter((vm) => {
    const vmTeamIdentifier = getTeamIdentifier(vm)
    return vmTeamIdentifier.toLowerCase() === teamIdentifier.trim().toLowerCase()
  })
}

/**
 * Filter VMs by team description
 * @param vms Array of VirtualMachine objects
 * @param teamDescription The team description to filter by
 * @returns Array of VMs that belong to the specified team
 * @deprecated Use filterVmsByTeamIdentifier instead for better fallback handling
 */
export const filterVmsByTeamDescription = (vms: VirtualMachine[], teamDescription: string): VirtualMachine[] => {
  if (!teamDescription || !teamDescription.trim()) {
    return vms
  }

  return vms.filter((vm) => {
    const vmTeamDescription = getTeamDescription(vm)
    return vmTeamDescription && vmTeamDescription.trim().toLowerCase() === teamDescription.trim().toLowerCase()
  })
}

export const getAdGroup = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.tags?._AdGroup?.value
}

export const serviceIdDescription = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.tags?.serviceId?.description
}

export const serviceIdValue = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.tags?.serviceId?.value
}

export const getVmMetadataName = (vm: VirtualMachine) => {
  return vm?.metadata?.name
}

export const getLastUpdated = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.lastUpdated
}

export const getLocation = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.location
}

export const getProvider = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.provider
}

export const getTags = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.status?.tags || {}
}
export const getVmUniqueKey = (vm: VirtualMachine) => {
  const hostname = getVmHostName(vm)
  const uid = vm?.metadata?.uid
  // If both hostname and uid are available, combine them; else use whichever is available
  if (hostname && hostname !== 'Unknown VM' && uid) {
    return `${hostname}-${uid}`
  }
  if (uid) {
    return uid
  }
  // Fallback: at least use hostname (may be 'Unknown VM')
  return hostname
}
export const getVmsKey = (vms: VirtualMachine[] = []) => (Array.isArray(vms) ? vms.map(getVmUniqueKey).join('|') : '')

export const getVmExternalId = (vm: VirtualMachine) => {
  return vm?.virtualmachine?.externalId
}

/**
 * Power state priority order for sorting
 * Lower numbers come first when sorting ascending
 */
const PowerStatePrirority: Record<string, number> = {
  poweredOn: 1,
  poweredOff: 2,
  undefined: 4,
} as const

/**
 * Compare two VMs by their power state using logical priority
 * @param a First VM to compare
 * @param b Second VM to compare
 * @returns Comparison result for sorting
 */
export const comparePowerState = (a: VirtualMachine, b: VirtualMachine): number => {
  const aPowerState = getVmPowerState(a)
  const bPowerState = getVmPowerState(b)

  const aPriority = PowerStatePrirority[aPowerState] ?? 999
  const bPriority = PowerStatePrirority[bPowerState] ?? 999

  return aPriority - bPriority
}
