import { Header } from '@/components/layout/app-shell/header'
import { ReleaseCard } from '@/features/dashboard/components/release-card'

const ReleaseNotesPage = () => {
  return (
    <div className='w-full flex flex-col'>
      <Header title='Release notes' />
      <div className='mx-6 my-8'>
        <div className='mx-7'>
          <ReleaseCard view='release-notes' />
        </div>
      </div>
    </div>
  )
}

export default ReleaseNotesPage
