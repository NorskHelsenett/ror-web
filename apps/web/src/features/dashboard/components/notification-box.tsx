'use client'

import { Checkbox } from '@/components/shadcn/checkbox'
import { DashboardBox } from './dashboard-box'
import { useState } from 'react'
import { cn } from '@/utils/clsxm'

export interface Notification {
  title: { fieldValue: string }
  description: { fieldValue: string }
  criticality: { fieldValue: 'positive' | 'neutral' | 'negative' }
}

export const getNotificationTitle = (notification: Notification): string => notification.title?.fieldValue || ''

const PingingDot = ({
  criticality,
  className,
}: {
  criticality: 'positive' | 'neutral' | 'negative'
  className?: string
}) => (
  <span className={cn('absolute flex items-center justify-around size-7', className)}>
    <span
      className={cn(
        'size-4 animate-ping rounded-full opacity-75',
        criticality == 'positive' ? 'bg-emerald-600' : criticality == 'neutral' ? 'bg-blue-600' : 'bg-red-600'
      )}
    ></span>
    <span
      className={cn(
        'size-5 absolute z-10 rounded-full ',
        criticality == 'positive' ? 'bg-emerald-700' : criticality == 'neutral' ? 'bg-blue-700' : 'bg-red-700'
      )}
    ></span>
  </span>
)

export const NotificationBox = ({ notification }: { notification: Notification }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false)
  return (
    <DashboardBox title={notification.title.fieldValue}>
      <PingingDot criticality={notification.criticality.fieldValue} className='-top-2.5 -right-2.5' />
      <button onClick={() => setShowDescription(!showDescription)} className='mb-2 hover:underline'>
        Click to see {showDescription ? 'less' : 'more'}
      </button>
      {showDescription && <p className='mb-2'>{notification.description.fieldValue}</p>}
      <span className='flex items-center gap-2'>
        <Checkbox />
        Mark as seen
      </span>
    </DashboardBox>
  )
}
