/**
 * VM Header Component
 *
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that displays the header section for a Virtual Machine (VM) page.
 * It includes the VM's hostname, power state, and navigation tabs for different sections related to the VM.
 * The header is styled based on the VM's power state
 */
'use client'

import { navigationItemObject } from '@/app/(protected)/vms/[id]/layout'
import { useVMContext } from '@/context/vm-context'
import { Power, PowerOff, TriangleAlert } from 'lucide-react'
import { vmCardPowerStatus } from '../utils/env-colors'
import { getVmHostName, getVmPowerState } from '../utils/vms'
import { ResourceHeader } from '@/components/ui/resource-header'
import { changePowerStateValues } from '../types/powerState'

interface VMHeaderProps {
  className?: string
  tabs: navigationItemObject[]
}

function PowerIcon({ state }: { state: string }) {
  if (state === 'poweredOn') return <Power size={25} />
  if (state === 'poweredOff') return <PowerOff size={25} />
  return <TriangleAlert size={25} />
}

export const VMHeader = ({ className, tabs }: VMHeaderProps) => {
  const { vm } = useVMContext()
  const hostname = getVmHostName(vm) || 'Unknown VM'
  const powerstate = getVmPowerState(vm) || 'undefined'
  const [lightmode, darkmode] = vmCardPowerStatus[powerstate] || ['bg-gray-200', 'dark:bg-gray-600']

  const rightContent = (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col font-bold xl:font-normal'>
        <p className='text-lg flex items-center'>
          <span className='flex items-center pr-3'>
            <PowerIcon state={powerstate} />
          </span>
          <span className='hidden xl:block'>Power:&nbsp;</span>
          <span className='hidden md:block'>{changePowerStateValues[powerstate]}</span>
        </p>
      </div>
    </div>
  )

  return (
    <ResourceHeader
      className={className}
      title={hostname.toLowerCase()}
      tabs={tabs}
      rightContent={rightContent}
      lightmodeColor={lightmode}
      darkmodeColor={darkmode}
      titleSize='text-3xl sm:text-4xl'
    />
  )
}
