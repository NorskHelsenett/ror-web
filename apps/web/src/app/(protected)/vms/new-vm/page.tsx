import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'

export default async function NewVmPage() {
  return (
    <div className='w-full flex flex-col'>
      <Header title='New Virtual machine' />
      <PageView />
    </div>
  )
}
