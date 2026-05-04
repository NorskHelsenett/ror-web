import { cn } from '@/utils/clsxm'
import { ReactNode } from 'react'

interface DashboardSectionProps {
  title: string
  items?: ReactNode[]
  className?: string
}

export const DashboardSection = ({ title, items, className }: DashboardSectionProps) => {
  return (
    <div className={cn('mx-7', className)}>
      <h2>{title}</h2>
      <div className='flex gap-4 overflow-x-auto hide-scrollbar -mt-2.5 pt-2.5'>
        {' '}
        {/* Margin padding solution is to avoid clipping of pinging dot due to overflow-x-auto */}
        {items?.length !== 0 && items !== undefined ? items.map((item) => item) : 'No items presents'}
      </div>
    </div>
  )
}
