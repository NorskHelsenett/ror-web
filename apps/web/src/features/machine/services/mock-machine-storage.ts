import type { Machine } from '@ror/js-api-client'

import type { MachineSpec } from '../utils/machines'

const MOCK_CREATED_MACHINES_KEY = 'mockCreatedMachines'

const readStoredMachines = (): Machine[] => {
  if (typeof window === 'undefined') return []

  try {
    const storedMachines = localStorage.getItem(MOCK_CREATED_MACHINES_KEY)
    if (!storedMachines) return []

    const parsedMachines = JSON.parse(storedMachines) as Machine[]
    return Array.isArray(parsedMachines) ? parsedMachines : []
  } catch {
    return []
  }
}

const writeStoredMachines = (machines: Machine[]) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(MOCK_CREATED_MACHINES_KEY, JSON.stringify(machines))
  } catch {
    // Ignore localStorage write failures in mock mode.
  }
}

const getMachineIdentity = (machine: Machine) => machine.metadata?.name ?? machine.metadata?.uid ?? ''

const dedupeMachines = (machines: Machine[]) => {
  const seenMachineIds = new Set<string>()

  return machines.filter((machine) => {
    const machineId = getMachineIdentity(machine)

    if (!machineId) return true
    if (seenMachineIds.has(machineId)) return false

    seenMachineIds.add(machineId)
    return true
  })
}

const buildMockMachineResource = (machineSpec: MachineSpec): Machine => {
  const name = machineSpec.name?.trim() || `machine-${Date.now()}`
  const machineId = `mock-machine-${name}-${Date.now()}`

  return {
    kind: 'Machine',
    apiVersion: 'general.ror.internal/v1alpha1',
    metadata: {
      name,
      uid: machineId,
      namespace: 'mock-machines',
    },
    rormeta: {
      ownerref: {
        scope: 'machine',
        subject: machineId,
      },
    },
    machine: {
      spec: machineSpec,
      status: {
        phase: 'Provisioning',
        message: 'Created from local mock frontend storage',
        providerID: machineId,
        machineID: machineId,
        state: 'creating',
        provider: machineSpec.provider,
        region: machineSpec.providerConfig?.region,
        zone: machineSpec.providerConfig?.zone,
        hostname: `${name}.internal`,
        cpus: machineSpec.cpu?.cores,
        memory: machineSpec.memory,
        privateIPAddresses: machineSpec.network?.privateIP ? [machineSpec.network.privateIP] : [],
        publicIPAddresses: machineSpec.network?.publicIP ? [machineSpec.network.publicIP] : [],
        conditions: [
          {
            type: 'Creating',
            status: 'True',
            reason: 'MockFrontendCreate',
            message: 'This machine exists only in localStorage mock data',
          },
        ],
        creationTime: {},
      },
    },
  }
}

export const getMockCreatedMachines = () => readStoredMachines()

export const persistMockCreatedMachine = (machineSpec: MachineSpec) => {
  const createdMachine = buildMockMachineResource(machineSpec)
  const storedMachines = readStoredMachines()
  const nextMachines = dedupeMachines([createdMachine, ...storedMachines])

  writeStoredMachines(nextMachines)

  return createdMachine
}

export const mergeMockCreatedMachines = (machines: Machine[], createdMachines: Machine[]) => {
  const createdMachineIds = new Set(createdMachines.map(getMachineIdentity).filter(Boolean))

  return [...createdMachines, ...machines.filter((machine) => !createdMachineIds.has(getMachineIdentity(machine)))]
}
