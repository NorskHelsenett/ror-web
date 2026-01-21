import { useMemo } from 'react'
import type { VirtualMachine } from '@ror/js-api-client'
import { getUniqueTeamDescriptions, getUniqueTeams, getTeamIdentifier } from '../utils/vms'
import { Option } from '@/components/shadcn/multiselect'

export interface UseTeamFilterProps {
  vms: VirtualMachine[]
  selectedTeams?: string[]
}

export interface UseTeamFilterReturn {
  teamOptions: Option[]
  detailedTeamOptions: Option[]
  uniqueTeamDescriptions: string[]
  filteredVms: VirtualMachine[]
  filterByTeams: (teamDescriptions: string[]) => VirtualMachine[]
  hasTeamFilter: boolean
}

/**
 * Custom hook for managing team-based filtering of VMs
 *
 * @param vms Array of VirtualMachine objects
 * @param selectedTeams Array of selected team descriptions to filter by
 * @returns Object containing team options, filtered VMs, and utility functions
 */
export const useTeamFilter = ({ vms, selectedTeams = [] }: UseTeamFilterProps): UseTeamFilterReturn => {
  // Memoize unique team descriptions
  const uniqueTeamDescriptions = useMemo(() => {
    return getUniqueTeamDescriptions(vms)
  }, [vms])

  // Memoize team options for select components
  const teamOptions = useMemo((): Option[] => {
    const options = uniqueTeamDescriptions.map((description) => ({
      value: description,
      label: description,
    }))

    // Add "No Team" option if there are VMs without team tags
    const hasVmsWithoutTeam = vms.some((vm) => getTeamIdentifier(vm) === 'No Team')
    if (hasVmsWithoutTeam) {
      options.push({ value: 'No Team', label: 'No Team' })
    }

    return options
  }, [uniqueTeamDescriptions, vms])

  // Memoize detailed team options (showing both description and value)
  const detailedTeamOptions = useMemo((): Option[] => {
    const teams = getUniqueTeams(vms)
    const options = teams.map((team) => ({
      value: team.description,
      label: `${team.description} (${team.value})`,
    }))

    // Add "No Team" option if there are VMs without team tags
    const hasVmsWithoutTeam = vms.some((vm) => getTeamIdentifier(vm) === 'No Team')
    if (hasVmsWithoutTeam) {
      options.push({ value: 'No Team', label: 'No Team' })
    }

    return options
  }, [vms])

  // Filter VMs based on selected teams
  const filteredVms = useMemo((): VirtualMachine[] => {
    if (!selectedTeams.length) {
      return vms
    }

    return vms.filter((vm) => {
      const teamIdentifier = getTeamIdentifier(vm)

      // Handle team identifier matching (including "No Team")
      return selectedTeams.includes(teamIdentifier)
    })
  }, [vms, selectedTeams])

  // Utility function to filter VMs by multiple team descriptions
  const filterByTeams = (teamDescriptions: string[]): VirtualMachine[] => {
    if (!teamDescriptions.length) {
      return vms
    }

    return vms.filter((vm) => {
      const teamIdentifier = getTeamIdentifier(vm)

      // Handle team identifier matching (including "No Team")
      return teamDescriptions.includes(teamIdentifier)
    })
  }

  const hasTeamFilter = selectedTeams.length > 0

  return {
    teamOptions,
    detailedTeamOptions,
    uniqueTeamDescriptions,
    filteredVms,
    filterByTeams,
    hasTeamFilter,
  }
}
