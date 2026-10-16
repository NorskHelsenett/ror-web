'use client'

import { cn } from '@/utils/clsxm'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface NotReadyMessageProps {
  className?: string
  removable?: boolean
  children?: React.ReactNode
  /** If set, dismissal is persisted in localStorage under this key. */
  storageKey?: string
}

export const NotReadyMessage = ({ className, removable = true, children, storageKey }: NotReadyMessageProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (storageKey && localStorage.getItem(storageKey) === 'true') setIsVisible(false)
  }, [storageKey])

  const dismiss = () => {
    setIsVisible(false)
    if (storageKey) localStorage.setItem(storageKey, 'true')
  }

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
      <div>{children}</div>
      {removable && (
        <button onClick={dismiss} aria-label='Close notification' type='button' className='pr-2'>
          <X />
        </button>
      )}
    </div>
  )
}
