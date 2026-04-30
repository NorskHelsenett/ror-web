import { cn } from '@/utils/clsxm'
import { ReactNode } from 'react'

interface DashboardBoxProps {
  title: string
  half?: boolean
  className?: string
  children: ReactNode
}

export const DashboardBox = ({ title, half = false, className, children }: DashboardBoxProps) => (
  <div className={cn('relative bg-(--r-layer) p-4 rounded-lg', half ? 'w-61.5' : 'w-96.25', className)}>
    <h3 className='text-3xl'>{title}</h3>
    {children}
  </div>
)
