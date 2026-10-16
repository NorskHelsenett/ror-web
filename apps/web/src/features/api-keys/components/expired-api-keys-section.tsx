'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/shadcn/collapsible'
import { cn } from '@/utils/clsxm'
import { ApiKeysTable, type ApiKey } from './api-keys-table'

export const ExpiredApiKeysSection = ({ keys }: { keys: ApiKey[] }) => {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className='mt-4'>
      <CollapsibleTrigger className='flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-(--r-text-secondary) hover:bg-accent'>
        <ChevronRight className={cn('h-4 w-4 transition-transform', open && 'rotate-90')} />
        <span>
          {open ? 'Hide' : 'Show'} expired API keys ({keys.length})
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2'>
        <ApiKeysTable keys={keys} expired />
      </CollapsibleContent>
    </Collapsible>
  )
}
