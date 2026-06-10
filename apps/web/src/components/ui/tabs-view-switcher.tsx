'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/tabs'
import { LayoutGrid, List } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface TabsViewSwitcherProps {
  storageKey?: string
  onViewChange?: (view: 'grid' | 'list') => void
}

export function TabsViewSwitcher({ storageKey, onViewChange }: TabsViewSwitcherProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Generate storage key based on pathname if not provided
  const getStorageKey = () => {
    if (storageKey) return storageKey

    // Extract the main route from pathname (e.g., "/clusters" or "/vms")
    const route = pathname.split('/').pop() || 'default'
    return `${route}:view-mode`
  }

  const LOCAL_STORAGE_KEY = getStorageKey()

  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState('grid')

  useEffect(() => {
    const fromUrl = searchParams.get('view')
    const fromStorage = localStorage.getItem(LOCAL_STORAGE_KEY) ?? 'grid'
    const view = fromUrl ?? fromStorage

    setSelected(view)
    setMounted(true)

    // Only update URL if it doesn't already reflect the desired view.
    // Without this guard, every router.replace triggers a searchParams change
    // which re-runs this effect, causing a loop that breaks in production.
    const expectedParam = view === 'grid' ? null : view
    if (fromUrl === expectedParam) return

    const params = new URLSearchParams(searchParams)
    if (view === 'grid') {
      params.delete('view')
    } else {
      params.set('view', view)
    }

    router.replace(params.size === 0 ? pathname : `${pathname}?${params.toString()}`, { scroll: false })
  }, [searchParams, router, pathname, LOCAL_STORAGE_KEY])

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete('page')
    params.delete('limit')

    if (value === 'grid') {
      params.delete('view')
    } else {
      params.set('view', value)
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, value)
    onViewChange?.(value as 'grid' | 'list')
    router.push(params.size === 0 ? pathname : `${pathname}?${params.toString()}`)
    setSelected(value)
  }

  if (!mounted) return null

  return (
    <Tabs value={selected} onValueChange={handleChange}>
      <TabsList>
        <TabsTrigger value='grid'>
          <LayoutGrid />
        </TabsTrigger>
        <TabsTrigger value='list'>
          <List />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
