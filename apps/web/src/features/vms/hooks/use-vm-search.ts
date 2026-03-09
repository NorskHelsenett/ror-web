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
      // location: getSpecificLocation(getSpecificLocation),
    }))

    return new Fuse(flat, {
      keys: ['label', 'powerState', 'family', 'location'],
      threshold: 0.0,
    })
  }, [items])

  return query ? fuse.search(query).map((r) => r.item) : items
}
