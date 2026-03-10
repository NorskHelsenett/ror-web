/*
 * FILE OVERVIEW:
 *
 * Client component that renders the vulnerability view for a specific Virtual Machine (VM).
 */

'use client'

import { useVMContext } from '@/context/vm-context'
import { VulnerabilityCard } from '@/features/vms/components/vm-vulnerability-info-card'

export default function VMRawDataPage() {
  const { vm } = useVMContext()

  return (
    <div className=''>
      <VulnerabilityCard vmid={vm?.metadata?.uid} />
    </div>
  )
}
