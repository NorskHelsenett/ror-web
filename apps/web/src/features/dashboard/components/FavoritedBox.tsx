'use client'

import { Star } from 'lucide-react'
import { DashboardBox } from './DashboardBox'
import { ReactNode } from 'react'
import { cn } from '@/utils/clsxm'

export interface FavoritedBoxProps {
  title: string
  isError?: boolean
  children: ReactNode
  className?: string
}

export const FavoritedBox = ({ title, isError = false, children, className }: FavoritedBoxProps) => (
  <DashboardBox className={cn(className, isError && 'bg-red-900')} title={title}>
    <Star
      onClick={() => console.log('function to unfavorite')}
      className='absolute right-3 top-3'
      size={32}
      stroke='none'
      fill='yellow'
    />
    {children}
  </DashboardBox>
)
