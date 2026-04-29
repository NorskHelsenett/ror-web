import { cn } from '@/utils/clsxm'
import { ReactNode } from 'react'

interface DashboardBoxProps {
  title: string
  half?: boolean
  className?: string
  children: ReactNode
}

export const DashboardBox = ({ title, half = false, className, children }: DashboardBoxProps) => {
  return (
    <div className={cn('relative bg-(--r-layer) p-4 rounded-lg', half ? 'w-[246px]' : 'w-[385px]', className)}>
      <h3 className='text-3xl'>{title}</h3>
      {children}
    </div>
  )
}
