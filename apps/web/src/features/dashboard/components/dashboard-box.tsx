import { cn } from '@/utils/clsxm'
import { ReactNode } from 'react'

interface DashboardBoxProps {
  title: string
  half?: boolean
  className?: string
  children: ReactNode
  onClick?: () => void
}

export const DashboardBox = ({ title, half = false, className, children, onClick }: DashboardBoxProps) => (
  <div
    className={cn(
      'relative bg-(--r-layer) p-4 rounded-lg',
      half ? 'w-61.5' : 'w-96.25',
      onClick && 'cursor-pointer',
      className
    )}
    onClick={onClick}
  >
    <h3 className='text-2xl font-medium'>{title}</h3>
    {children}
  </div>
)
