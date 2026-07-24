'use client'

import { useClusterContext } from '@/context/cluster-context'
import React from 'react'

/**
 * Renders the about page view for a specific cluster.
 *
 * @returns {JSX.Element} The rendered about page view.
 */
export function PageView() {
  const { cluster } = useClusterContext()

  return (
    <div>
      <div className='flex gap-2'>
        <p>Project</p>
        <p></p>
      </div>
      <div className='flex gap-2'>
        <p>Criticality</p>
        <p></p>
      </div>
      <div className='flex gap-2'>
        <p>Sensitivity</p>
        <p></p>
      </div>
      <div className='flex gap-2'>
        <p>Work order</p>
        <p></p>
      </div>
      <div className='flex gap-2'>
        <p>Service tags</p>
        <p></p>
      </div>
      <div className='flex gap-2'>
        <p>Roles</p>
        <p></p>
      </div>
      <div className='flex gap-2'>
        <p>Description</p>
        <p></p>
      </div>
      {JSON.stringify(cluster)}
    </div>
  )
}
