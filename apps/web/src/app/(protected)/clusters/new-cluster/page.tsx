import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'

export default async function ClustersPage() {
  return (
    <div className='w-full flex flex-col'>
      <Header title='New Cluster' />
      <PageView />
    </div>
  )
}
