'use client'

import { cn } from '@/utils/clsxm'
import { X } from 'lucide-react'
import { useState } from 'react'

interface NotReadyMessageProps {
  className?: string
  removable?: boolean
  children?: React.ReactNode
}

export const NotReadyMessage = ({ className, removable = true, children }: NotReadyMessageProps) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      className={cn(
        className,
        'p-5 border-3 rounded-lg flex flex-row justify-between items-center text-black gap-4',
        'bg-orange-400 dark:bg-orange-500 border-orange-600 dark:border-orange-700'
      )}
      role='alert'
    >
      <span>{children}</span>
      {removable && (
        <button onClick={() => setIsVisible(false)} aria-label='Close notification' type='button' className='pr-2'>
          <X />
        </button>
      )}
    </div>
  )
}
