import { Loader } from 'lucide-react'

export function DashboardLoading() {
  return (
    <div role='status' className='flex flex-col items-center justify-center flex-1 min-h-[60vh] gap-3'>
      <Loader aria-hidden='true' className='h-6 w-6 animate-spin text-muted-foreground' />
      <span className='text-sm text-muted-foreground'>Loading dashboard...</span>
    </div>
  )
}
