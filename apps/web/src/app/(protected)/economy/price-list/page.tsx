/*
 * FILE OVERVIEW:
 *
 * Server component that fetches and displays the list of prices
 * for the Price List page. Utilizes the DataTable component to render
 * the fetched price data in a tabular format.
 */

import React from 'react'

import { Header } from '@/components/layout/app-shell/header'
import { getRorApi } from '@/services/ror-api'
import { Price } from '@/types/prices'
import { PricesTable } from '@/features/economy/components/prices-table'

/**
 * Renders the Price List page, fetching price data from the API and displaying it in a data table.
 *
 * This asynchronous component retrieves a list of prices using the `getRorApi` function,
 * ensures the response is an array of `Price` objects, and passes the data to the `DataTable` component
 * for display. The page includes a header and is styled with utility classes.
 *
 * @returns {Promise<JSX.Element>} The rendered Price List page component.
 */
const PriceListPage = async () => {
  // const api = await getRorApi()
  // const res = await api.prices.list()

  // const items: Price[] = Array.isArray(res) ? res : []

  return (
    <div className='w-full flex flex-col'>
      <Header title='Price list' />
      <div className='mx-13 my-8'>
        <p>
          The cost model is still under development and this will be updated with correct information when the
          information is available.
        </p>
        {/* <PricesTable data={items} /> */}
      </div>
    </div>
  )
}

export default PriceListPage
