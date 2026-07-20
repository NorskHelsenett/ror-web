/*
 * FILE OVERVIEW
 *
 * This file defines the main React component (`DatacentersPage`) responsible for displaying
 * a list of data centers in the ROR web application.
 */

import { Header } from '@/components/layout/app-shell/header'
import { DataCenter } from '@ror/js-api-client'
import { getRorApi } from '@/services/ror-api'
import { datacenterColumns } from '@/features/datacenters/components/datacenter-columns'
import { DatacenterStats } from '@/features/datacenters/components/datacenter-stats'
import { DataTable } from '@/components/ui/data-table'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROR - Datacenters',
  description: 'View clusters',
}

/**
 * Asynchronous React component that renders the Datacenters page.
 *
 * Fetches a list of datacenters from the API and displays them in a data table.
 * Utilizes the `Header` and `DataTable` components for layout and presentation.
 *
 * @returns {Promise<JSX.Element>} The rendered Datacenters page component.
 */
const DatacentersPage = async () => {
  const api = await getRorApi()
  const listParams = new URLSearchParams()
  const res = await api.datacenter.list(listParams)
  const items: DataCenter[] = res?.resources ?? []

  return (
    <div className='w-full flex flex-col'>
      <Header title='Datacenters' />

      <div className='mx-12 my-8 flex flex-col gap-6'>
        <DatacenterStats items={items} />
        <DataTable columns={datacenterColumns} data={items} />
      </div>
    </div>
  )
}

export default DatacentersPage
