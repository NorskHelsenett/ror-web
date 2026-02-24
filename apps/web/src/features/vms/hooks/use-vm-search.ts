import { useMemo } from 'react'
import Fuse from 'fuse.js'
import type { VirtualMachine } from '@ror/js-api-client'
import { getVmFamily, getVmHostName, getVmPowerState, getLocation } from '../utils/vms'

export const getSpecificLocation = (location: string | undefined): string => {
  const locationMap: Record<string, string> = {
    OSL: 'OSL NAM01',
    OSL3: 'OSL3 NAM03',
    TRD: 'TRD NAM01',
    TRD3: 'TRD3 NAM03',
  }
  return location ? locationMap[location] || location : ''
}

export const useVmSearch = (items: VirtualMachine[], query: string) => {
  const fuse = useMemo(() => {
    const flat = items.map((vm) => ({
      ...vm,
      label: getVmHostName(vm),
      powerState: getVmPowerState(vm),
      family: getVmFamily(vm),
      location: getLocation(vm),
      fullLocation: getSpecificLocation(getLocation(vm) || ''),
    }))

    return new Fuse(flat, {
      keys: ['label', 'powerState', 'family', 'location', 'fullLocation'],
      threshold: 0.1,
      ignoreLocation: true,
      shouldSort: true,
      minMatchCharLength: 5,
      distance: 100,
      useExtendedSearch: true,
    })
  }, [items])

  const trimmedQuery = query.trim()
  if (!trimmedQuery) return items

  // For very specific searches (longer queries), use exact match
  if (trimmedQuery.length > 15) {
    // Use exact token match for long hostnames
    const searchQuery = `=${trimmedQuery}`
    const results = fuse.search(searchQuery)

    // If exact match found, return only that
    if (results.length > 0) {
      return results.map((r) => r.item)
    }

    // Fall back to prefix if no exact match
    const prefixQuery = `^${trimmedQuery}`
    return fuse.search(prefixQuery).map((r) => r.item)
  }

  // For shorter queries, use prefix matching
  const searchQuery = `^${trimmedQuery}`
  return fuse.search(searchQuery).map((r) => r.item)
}
