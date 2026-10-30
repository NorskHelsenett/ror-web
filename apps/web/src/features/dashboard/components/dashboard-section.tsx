'use client'
import { cn } from '@/utils/clsxm'
import { X } from 'lucide-react'
import { ReactNode } from 'react'
import { OverviewItem } from '../types/items'

interface DashboardSectionProps {
  title: string
  items?: { nodeId: string; nodeTitle?: string; node: ReactNode }[]
  isEditing?: boolean
  onRemove?: (title: OverviewItem) => void
  addSlot?: ReactNode
  headerSlot?: ReactNode
  listHeader?: ReactNode
  layout?: 'card' | 'list'
  className?: string
}

export const DashboardSection = ({
  title,
  items,
  isEditing = false,
  onRemove,
  addSlot,
  headerSlot,
  listHeader,
  layout = 'card',
  className,
}: DashboardSectionProps) => {
  return (
    <div className={className}>
      {(title || headerSlot) && (
        <div className='flex justify-between items-center'>
          <h4 className='font-bold'>{title}</h4>
          {headerSlot}
        </div>
      )}
      <div
        className={cn(
          layout === 'list'
            ? 'flex flex-col overflow-x-auto pt-2.5'
            : 'flex gap-4 overflow-x-auto hide-scrollbar -mt-2.5 pt-2.5'
        )}
      >
        {layout === 'list' && listHeader}
        {items?.length
          ? items.map((item) => (
              <div key={item.nodeId} className='relative'>
                {item.node}
                {isEditing && item.nodeTitle && onRemove && (
                  <button
                    type='button'
                    aria-label='Remove'
                    className='absolute top-2 right-2 z-10 flex items-center justify-center'
                    onClick={() => onRemove(item.nodeTitle as OverviewItem)}
                  >
                    <X className='size-5 text-white' />
                  </button>
                )}
              </div>
            ))
          : 'No items present'}
        {isEditing && addSlot}
      </div>
    </div>
  )
}
