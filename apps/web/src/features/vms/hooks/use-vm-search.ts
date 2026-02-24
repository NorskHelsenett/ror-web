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
      threshold: 0.3,
      ignoreLocation: true,
      shouldSort: true,
      minMatchCharLength: 1,
      distance: 100,
      useExtendedSearch: true,
    })
  }, [items])

  const trimmedQuery = query.trim()
  if (!trimmedQuery) return items

  // Always use prefix search - this ensures "mtrd-" only matches items starting with "mtrd-"
  const searchQuery = `^${trimmedQuery}`
  return fuse.search(searchQuery).map((r) => r.item)
}
