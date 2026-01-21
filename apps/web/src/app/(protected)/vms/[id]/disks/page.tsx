'use client'

import { useVMContext } from '@/context/vm-context'
import { DisksTable } from '@/features/vms/components/disks-table'
import { getVmDisks } from '@/features/vms/utils/vms'
import { DiskProgressBars } from '@/features/vms/components/disks-progress-bars'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs'

export default function VMDisksPage() {
  const { vm } = useVMContext()
  const disks = getVmDisks(vm)

  return (
    <Tabs defaultValue={disks.length > 0 ? 'progressbar' : 'table'} className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='progressbar' disabled={disks.length === 0}>
          Advanced view
        </TabsTrigger>
        <TabsTrigger value='table' disabled={disks.length === 0}>
          Table view
        </TabsTrigger>
      </TabsList>
      <TabsContent value='progressbar'>
        <DiskProgressBars items={disks} />
      </TabsContent>
      <TabsContent value='table'>
        <DisksTable items={disks} />
      </TabsContent>
    </Tabs>
  )
}
