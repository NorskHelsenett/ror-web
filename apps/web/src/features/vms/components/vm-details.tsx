/**
 * VM Details Component
 *
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that displays detailed information about a Virtual Machine (VM).
 * It uses a responsive grid layout to organize various attributes and actions related to the VM.
 * The component is designed to be interactive, allowing users to resize and rearrange the layout.
 *
 */
'use client'

import { useVMContext } from '@/context/vm-context'
import { Pill } from '@/components/shadcn/pill'
import { vmActionsColors } from '../utils/env-colors'

import {
  getVmArchitecture,
  getVmFamily,
  getVmHostName,
  getVmOperatingSystemId,
  getVmName,
  getVmPowerState,
  getVmVersion,
  getSpecSockets,
  getSpecCoresPerSocket,
  getStatusCpuUsage,
  getVmToolVersion,
  getAdGroup,
  getSpecMemory,
  getTeamValue,
  VMDetailsProps,
  serviceIdDescription,
  serviceIdValue,
  getTeamName,
} from '../utils/vms'
import { standardLayouts } from '@/features/vms/config/vm-details-layout'
import { useLayoutPreferences } from '@/hooks/use-layout-preferences'
import { GridLayoutWrapper } from '@/components/ui/grid-layout-wrapper'
import { CardHeader } from '@/components/ui/grid-layout-card'

export const VMDetails = ({ user, className }: VMDetailsProps) => {
  const { vm } = useVMContext()
  const { layouts, setLayouts, layoutKey, currentBreakpoint, setCurrentBreakpoint } = useLayoutPreferences(
    'vmDetails',
    standardLayouts
  )
  console.log('key', layoutKey)
  console.log(currentBreakpoint) // For future use if needed
  const cpuUsage = getStatusCpuUsage(vm)
  const cpuSockets = getSpecSockets(vm)
  const cpuCoresPerSocket = getSpecCoresPerSocket(vm)
  const memory = getSpecMemory(vm)
  const memoryInGB = ((memory ?? 0) / 1024 ** 3).toFixed(2)

  const id = getVmOperatingSystemId(vm)
  const name = getVmName(vm)
  const version = getVmVersion(vm)
  const hostName = getVmHostName(vm)
  const architecture = getVmArchitecture(vm)
  const family = getVmFamily(vm)
  const powerState = getVmPowerState(vm)
  const toolVersion = getVmToolVersion(vm)

  const teamName = getTeamName(vm)
  const teamValue = getTeamValue(vm)
  const AdGroup = getAdGroup(vm)
  const serviceId = serviceIdDescription(vm)
  const serviceValue = serviceIdValue(vm)

  console.log(user)

  const MemoryCard = () => (
    <>
      <CardHeader title='Memory' />
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <span>{memoryInGB} GB</span>
          </div>
        </div>
      </div>
    </>
  )

  const ConfigurationCard = () => (
    <>
      <CardHeader title='Configuration' />
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <b>CPU Sockets: </b>
            <span>{cpuSockets}</span>
          </div>
          <div className='flex flex-col'>
            <b>CPU Cores per Socket: </b>
            <span>{cpuCoresPerSocket}</span>
          </div>
        </div>
      </div>
    </>
  )

  const CpuCard = () => (
    <>
      <CardHeader title='CPU' />
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <b>CPU Usage: </b>
            <span>{cpuUsage}%</span>
          </div>
        </div>
      </div>
    </>
  )

  const TeamCard = () => (
    <>
      <CardHeader title='Team' />
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <span>
              {teamValue} ({teamName})
            </span>
          </div>
        </div>
      </div>
    </>
  )

  const AdGroupsCard = () => (
    <>
      <CardHeader title='AD Group' />
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <span>{AdGroup}</span>
          </div>
        </div>
      </div>
    </>
  )

  const ServiceIdCard = () => (
    <>
      <CardHeader title='Service ID' />
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <span>
              {serviceId} ({serviceValue})
            </span>
          </div>
        </div>
      </div>
    </>
  )

  const InfoCard = () => (
    <>
      <CardHeader title='Operating System' />
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <b>Id: </b>
            <span>{id}</span>
          </div>
          <div className='flex flex-col'>
            <b>OS-version: </b>
            <span>{name}</span>
          </div>
          <div className='flex flex-col'>
            <b>Version: </b>
            <span>{version}</span>
          </div>
          <div className='flex flex-col'>
            <b>Hostname: </b>
            <span>{hostName}</span>
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <b>VMware Tools version: </b>
            <span>{toolVersion}</span>
          </div>
          <div className='flex flex-col'>
            <b>Architecture: </b>
            <span>{architecture}</span>
          </div>
          <div className='flex flex-col'>
            <b>OS-type: </b>
            <span>{family}</span>
          </div>
        </div>
      </div>
    </>
  )

  const ControlPanelCard = () => (
    <>
      <CardHeader title='Control Panel' />
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex flex-col'>
            <b>Power: </b>
            <span>{powerState === 'poweredOn' ? 'On' : powerState === 'poweredOff' ? 'Off' : 'Unknown'}</span>
            <b>Actions:</b>
            {powerState === 'poweredOn' ? null : (
              <Pill
                asChild
                variant={vmActionsColors['powerOn']}
                className='mt-2 px-3 cursor-pointer'
                onClick={() => {
                  // TODO: Implement turn on functionality
                }}
              >
                <button type='button'>Turn on</button>
              </Pill>
            )}
            {powerState === 'poweredOff' ? null : (
              <Pill
                asChild
                variant={vmActionsColors['powerOff']}
                className='mt-2 px-3 cursor-pointer'
                onClick={() => {
                  // TODO: Implement turn off functionality
                }}
              >
                <button type='button'>Turn off</button>
              </Pill>
            )}
            <Pill
              asChild
              variant={vmActionsColors['restart']}
              className='mt-2 px-3 cursor-pointer'
              onClick={() => {
                // TODO: Implement restart functionality
              }}
            >
              <button type='button'>Restart</button>
            </Pill>
            <Pill
              asChild
              variant={vmActionsColors['suspend']}
              className='mt-2 px-3 cursor-pointer'
              onClick={() => {
                // TODO: Implement suspend functionality
              }}
            >
              <button type='button'>Suspend</button>
            </Pill>
            <Pill
              asChild
              variant={vmActionsColors['delete']}
              className='mt-2 px-3 cursor-pointer'
              onClick={() => {
                // TODO: Implement delete functionality
              }}
            >
              <button type='button'>Delete</button>
            </Pill>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div>
      <GridLayoutWrapper
        className={className}
        layouts={layouts}
        layoutKey={layoutKey}
        onLayoutChange={(layout) => setLayouts({ ...layouts, [currentBreakpoint]: layout })}
        onBreakpointChange={setCurrentBreakpoint}
      >
        <div key='memory' className='drag-handle '>
          <MemoryCard />
        </div>
        <div key='configuration' className='drag-handle '>
          <ConfigurationCard />
        </div>
        <div key='cpu' className='drag-handle '>
          <CpuCard />
        </div>
        {/* {teamValue && ( */}
        <div key='team' className='drag-handle '>
          <TeamCard />
        </div>
        {/* )} */}
        {/* {AdGroup && ( */}
        <div key='ad-groups' className='drag-handle '>
          <AdGroupsCard />
        </div>
        {/* )} */}
        {/* {serviceId && ( */}
        <div key='service-id' className='drag-handle '>
          <ServiceIdCard />
        </div>
        {/* )} */}
        <div key='info' className='drag-handle '>
          <InfoCard />
        </div>
        <div key='control-panel' className='drag-handle '>
          <ControlPanelCard />
        </div>
      </GridLayoutWrapper>
    </div>
  )
}
