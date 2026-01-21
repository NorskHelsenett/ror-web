'use server'

/**
 * Server-side VM team actions for fetching comprehensive team data
 *
 * This module provides server-side functions to fetch team options from all available VMs,
 * not just the initially loaded batch.
 *
 * Key functions:
 * - fetchAllTeamOptions(): Get all available team options from the server
 * - fetchAllDetailedTeamOptions(): Get detailed team options with descriptions and values
 */

import { getRorApi } from '@/services/ror-api'
import type { VirtualMachine } from '@ror/js-api-client'
import { getTeamDescription, getTeamValue, getUniqueTeams } from '@/features/vms/utils/vms'
import { Option } from '@/components/shadcn/multiselect'

/**
 * Fetch all available team options from the server
 */
export async function fetchAllTeamOptions(): Promise<Option[]> {
  try {
    const api = await getRorApi()

    // Fetch a large number of VMs to get comprehensive team data
    // We use a high limit to get as many VMs as possible in one request
    const params = new URLSearchParams()
    params.set('limit', '2000') // Adjust this based on your expected VM count
    params.set('offset', '0')

    const vmRes = await api.virtualMachine.list(params)
    const vms: VirtualMachine[] = vmRes?.resources ?? []

    // Generate team options from all available VMs
    return generateTeamOptionsFromVMs(vms)
  } catch (error) {
    console.error('Error fetching team options:', error)
    return []
  }
}

/**
 * Fetch detailed team options (with both description and value) from the server
 */
export async function fetchAllDetailedTeamOptions(): Promise<Option[]> {
  try {
    const api = await getRorApi()

    const params = new URLSearchParams()
    params.set('limit', '2000')
    params.set('offset', '0')

    const vmRes = await api.virtualMachine.list(params)
    const vms: VirtualMachine[] = vmRes?.resources ?? []

    // Generate detailed team options from all available VMs
    return generateDetailedTeamOptionsFromVMs(vms)
  } catch (error) {
    console.error('Error fetching detailed team options:', error)
    return []
  }
}

/**
 * Generate team options from VM data using team descriptions and values
 */
function generateTeamOptionsFromVMs(vms: VirtualMachine[]): Option[] {
  const teamOptionsSet = new Set<string>()

  vms.forEach((vm) => {
    const teamDescription = getTeamDescription(vm)
    const teamValue = getTeamValue(vm)

    // Prefer description, but fall back to value if description is empty
    if (teamDescription && teamDescription.trim()) {
      teamOptionsSet.add(teamDescription.trim())
    } else if (teamValue && teamValue.trim()) {
      teamOptionsSet.add(teamValue.trim())
    }
  })

  const options: Option[] = Array.from(teamOptionsSet)
    .sort()
    .map((teamIdentifier) => ({
      value: teamIdentifier,
      label: teamIdentifier,
    }))

  // Add "No Team" option for VMs without any team tags
  const hasVmsWithoutAnyTeamData = vms.some((vm) => !getTeamDescription(vm) && !getTeamValue(vm))
  if (hasVmsWithoutAnyTeamData) {
    options.push({ value: 'No Team', label: 'No Team' })
  }

  return options
}

/**
 * Generate detailed team options with both description and value
 */
function generateDetailedTeamOptionsFromVMs(vms: VirtualMachine[]): Option[] {
  const teams = getUniqueTeams(vms)

  const options: Option[] = teams.map((team) => ({
    value: team.description,
    label: `${team.description} (${team.value})`,
  }))

  // Add "No Team" option for VMs without team tags
  const hasVmsWithoutTeam = vms.some((vm) => !getTeamDescription(vm))
  if (hasVmsWithoutTeam) {
    options.push({ value: 'No Team', label: 'No Team' })
  }

  return options
}
