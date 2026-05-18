'use client'
import { Button } from '@/components/shadcn/button'
import { cn } from '@/utils/clsxm'
import { Check, Pencil, X } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { OverviewItem } from '../types/items'

interface DashboardSectionProps {
  title: string
  items?: { nodeId: string; nodeTitle?: string; node: ReactNode }[]
  editable?: boolean
  onRemove?: (title: OverviewItem) => void
  addSlot?: ReactNode
  className?: string
}

export const DashboardSection = ({
  title,
  items,
  editable = false,
  onRemove,
  addSlot,
  className,
}: DashboardSectionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <div className={cn('mx-7', className)}>
      <div className='flex justify-between items-center'>
        <h2>{title}</h2>
        {editable &&
          (isEditing ? (
            <Button onClick={() => setIsEditing(false)} variant='green'>
              Save
              <Check />
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil />
              Edit
            </Button>
          ))}
      </div>
      <div className='flex gap-4 overflow-x-auto hide-scrollbar -mt-2.5 pt-2.5'>
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
