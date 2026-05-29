'use client'

import { DashboardBox } from './dashboard-box'
import { ReactNode } from 'react'
import { cn } from '@/utils/clsxm'
import { FavoriteStar } from '@/components/ui/favorite-star'

export interface FavoritedBoxProps {
  title: string
  domain: string
  itemId: string
  isError?: boolean
  children: ReactNode
  className?: string
  onUnfavorite?: () => void
}

export const FavoritedBox = ({
  title,
  domain,
  itemId,
  isError = false,
  children,
  className,
  onUnfavorite,
}: FavoritedBoxProps) => (
  <DashboardBox className={cn(className, isError && 'bg-red-900')} title={title}>
    <FavoriteStar
      domain={domain}
      itemId={itemId}
      scale='scale-50'
      className='absolute right-1.5 top-1.5'
      onUnfavorite={onUnfavorite}
    />
    {children}
  </DashboardBox>
)
