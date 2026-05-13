'use client'
import {
  HealthCard,
  HealthCardContent,
  HealthCardHeader,
  HealthCardIcon,
  HealthCardTitle,
} from '@/features/backup/backup-job/components/health-card'

export interface SummaryCardsProps {
  totalJobs: number
  activeJobs: number
  pausedJobs: number
  inactiveJobs: number
  activeJobRatio: number
  pausedJobRatio: number
  inactiveJobRatio: number
}

export const SummaryCards = ({
  totalJobs,
  activeJobs,
  pausedJobs,
  inactiveJobs,
  activeJobRatio,
  pausedJobRatio,
  inactiveJobRatio,
}: SummaryCardsProps) => {
  return (
    <div className='px-12 mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 @container'>
      <HealthCard className='w-full' size='md' type='total' resource='backupJob'>
        <HealthCardIcon type='total' placement='corner' />
        <HealthCardHeader className='px-6 flex items-center'>
          <HealthCardTitle>Total Jobs</HealthCardTitle>
        </HealthCardHeader>
        <HealthCardContent>
          <div className='flex flex-col gap-1'>
            <span className='text-4xl font-semibold leading-none'>{totalJobs}</span>
            <span className='text-sm text-muted-foreground'>All configured jobs</span>
          </div>
        </HealthCardContent>
      </HealthCard>

      <HealthCard className='w-full' size='md' type='active' resource='backupJob'>
        <HealthCardIcon type='active' placement='corner' />
        <HealthCardHeader className='px-6 flex items-center'>
          <HealthCardTitle>Active Jobs</HealthCardTitle>
        </HealthCardHeader>
        <HealthCardContent>
          <div className='flex flex-col gap-1'>
            <span className='text-4xl font-semibold leading-none'>{activeJobs}</span>
            <span className='text-sm text-muted-foreground'>{activeJobRatio}% of total jobs</span>
          </div>
        </HealthCardContent>
      </HealthCard>

      <HealthCard className='w-full' size='md' type='paused' resource='backupJob'>
        <HealthCardIcon type='paused' placement='corner' />
        <HealthCardHeader className='px-6 flex items-center'>
          <HealthCardTitle>Paused Jobs</HealthCardTitle>
        </HealthCardHeader>
        <HealthCardContent>
          <div className='flex flex-col gap-1'>
            <span className='text-4xl font-semibold leading-none'>{pausedJobs}</span>
            <span className='text-sm text-muted-foreground'>{pausedJobRatio}% of total jobs</span>
          </div>
        </HealthCardContent>
      </HealthCard>

      <HealthCard className='w-full' size='md' type='inactive' resource='backupJob'>
        <HealthCardIcon type='inactive' placement='corner' />
        <HealthCardHeader className='px-6 flex items-center'>
          <HealthCardTitle>Inactive Jobs</HealthCardTitle>
        </HealthCardHeader>
        <HealthCardContent>
          <div className='flex flex-col gap-1'>
            <span className='text-4xl font-semibold leading-none'>{inactiveJobs}</span>
            <span className='text-sm text-muted-foreground'>{inactiveJobRatio}% of total jobs</span>
          </div>
        </HealthCardContent>
      </HealthCard>
    </div>
  )
}
