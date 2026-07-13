'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select'
import { ValueLabel } from '@/types/value-label'

interface SortSelectProps {
  options: ValueLabel[]
  currentSort: string | undefined
}

export function SortSelect({ options, currentSort }: SortSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  // Hydration flag (prevents early return)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only treat currentSort as valid if it exists in options
  const selected = useMemo(
    () => (currentSort && options.some((o) => o.value === currentSort) ? currentSort : undefined),
    [currentSort, options]
  )

  // Control the Radix menu to defer navigation until after close
  const [open, setOpen] = useState(false)
  const userInteracted = useRef(false)
  const nextHrefRef = useRef<string | null>(null)

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      userInteracted.current = true
    }
    setOpen(isOpen)
  }

  const onValueChange = (next: string) => {
    // Ignore any programmatic/init changes until the user interacted
    if (!userInteracted.current) {
      return
    }

    // No-op if same selection
    if (next === (selected ?? '')) {
      setOpen(false)
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    if (next) {
      params.set('sort', next)
      params.set('order', 'asc') // reset order on sort change
    } else {
      params.delete('sort')
      params.delete('order')
    }

    const nextHref = `${pathname}?${params.toString()}`
    const currentHref = `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ''}`
    if (nextHref === currentHref) {
      setOpen(false)
      return
    }

    // queue navigation until after the menu closes
    nextHrefRef.current = nextHref
    setOpen(false)
  }

  // Perform navigation only after the dropdown has closed
  useEffect(() => {
    if (!open && nextHrefRef.current) {
      const href = nextHrefRef.current
      nextHrefRef.current = null
      userInteracted.current = false
      startTransition(() => router.replace(href, { scroll: false }))
    }
  }, [open, router, startTransition])

  // Remount the Select when the selected value (from URL) changes
  // so Radix starts with a clean internal state.
  const selectKey = `sort-${selected ?? 'none'}`

  return (
    <div className='flex flex-col -mt-4'>
      <span className='text-xs'>Sorting</span>

      {!mounted ? (
        <div className='h-9 w-52 rounded-md border mb-1' aria-hidden='true' />
      ) : (
        <Select
          key={selectKey}
          open={open}
          onOpenChange={onOpenChange}
          defaultValue={selected}
          onValueChange={onValueChange}
        >
          <SelectTrigger
            className='w-52'
            onPointerDown={() => {
              userInteracted.current = true
            }}
          >
            <SelectValue placeholder='Select sorting' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
