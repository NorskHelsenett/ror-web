import type { Metadata } from 'next'
import { PageView } from './page-view'

export const metadata: Metadata = {
  title: 'ROR - Gateway API',
  description: 'View and manage Gateway API',
}

export default async function GatewayApiPage() {
  return <PageView />
}
