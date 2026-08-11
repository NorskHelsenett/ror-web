'use client'

import { useClusterContext } from '@/context/cluster-context'
import { Cluster } from '@ror/js-api-client'
import React from 'react'

interface ContactInfo {
  upn: string
  email: string
  phone: string
}

interface Role {
  contactInfo: ContactInfo
  roleDefinition: string
}

const RoleBox = ({ roles }: { roles: Role[] }) => (
  <div className='bg-(--r-layer-1)'>
    {roles.map((role) => (
      <div key={role.contactInfo.upn}>{JSON.stringify(role)}</div>
    ))}
  </div>
)

/**
 * Renders the about page view for a specific cluster.
 *
 * @returns {JSX.Element} The rendered about page view.
 */
export function PageView({ v1Cluster }: { v1Cluster: Cluster | undefined }) {
  const { cluster } = useClusterContext()

  return (
    <div>
      {cluster ? (
        <div className='grid grid-cols-2'>
          <p className='w-fit bg-red-700'>Project</p>
          <p>{v1Cluster?.metadata.project?.name}</p>
          <p className='w-fit bg-red-700'>Criticality</p>
          <p>{v1Cluster?.metadata.criticality}</p>
          <p className='w-fit bg-red-700'>Sensitivity</p>
          <p>{v1Cluster?.metadata.sensitivity}</p>
          <p className='w-fit bg-red-700'>Work order</p>
          <p>{v1Cluster?.metadata.billing.workorder}</p>
          <p className='w-fit bg-red-700'>Service tags</p>
          <p>{JSON.stringify(v1Cluster?.metadata.serviceTags)}</p>
          <p className='w-fit bg-red-700'>Roles</p>
          <p>{JSON.stringify(v1Cluster?.metadata.roles)}</p>
          {v1Cluster?.metadata.roles && <RoleBox roles={v1Cluster?.metadata.roles} />}
          <p className='w-fit bg-red-700'>Description</p>
          <p>{JSON.stringify(v1Cluster?.metadata.description)}</p>
        </div>
      ) : (
        <p>Could not fetch cluster metadata</p>
      )}
      <br />
      <p>V2: {JSON.stringify(cluster)}</p>
      <br />
      <p>V1: {JSON.stringify(v1Cluster)}</p>
    </div>
  )
}
