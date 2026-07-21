import type { Metadata } from 'next'
import { PageView } from './page-view'

export const metadata: Metadata = {
  title: 'ROR - Node pools',
  description: 'View and manage node pools',
}

export default async function NodePoolsPage() {
  return <PageView />
}
