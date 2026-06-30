import { Info } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert'
import { Header } from '@/components/layout/app-shell/header'
import { ReleaseCard } from '@/features/dashboard/components/release-card'

const ReleaseNotesPage = () => {
  return (
    <div className='w-full flex flex-col'>
      <Header title='Release notes' />
      <div className='mx-6 my-8'>
        <div className='mx-7'>
          <Alert className='mb-6'>
            <Info />
            <AlertTitle>ROR web is under active development</AlertTitle>
            <AlertDescription>
              New features, improvements, and fixes are continuously being added. This page lets you easily keep track
              of what new functionality has been released and what has changed between versions.
            </AlertDescription>
          </Alert>
          <ReleaseCard view='release-notes' />
          <p className='pt-3 text-sm text-muted-foreground italic'>Release table started in June 2026</p>
        </div>
      </div>
    </div>
  )
}

export default ReleaseNotesPage
