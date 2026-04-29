// /**
//  * VM Search Component
//  *
//  * FILE OVERVIEW:
//  * ------------------------
//  * This file defines a React component that provides a search functionality for Virtual Machines (VMs).
//  * The component includes a debounced input field to optimize performance and prevent excessive re-renders during typing.
//  *
//  */
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { Search } from 'lucide-react'
// import { Input } from '@/components/shadcn/input'
// import { useVmSearch } from '../hooks/use-vm-search'
// import { useDebouncedValue } from '@/hooks/use-debounced-value'
// import { VirtualMachine } from '@ror/js-api-client'
// import { getVmsKey } from '../utils/vms'

// export interface VmSearchProps {
//   items: VirtualMachine[]
//   onResultsChange?: (results: VmSearchProps['items']) => void
// }

// export function VmSearch({ items, onResultsChange }: VmSearchProps) {
//   const [query, setQuery] = useState('')
//   const debouncedQuery = useDebouncedValue(query, 120)
//   const results = useVmSearch(items, debouncedQuery)

//   const lastSentKeyRef = useRef('')

//   useEffect(() => {
//     const nextKey = getVmsKey(results)
//     if (nextKey !== lastSentKeyRef.current) {
//       onResultsChange?.(results)
//       lastSentKeyRef.current = nextKey
//     }
//   }, [results, onResultsChange])

//   return (
//     <Input
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       aria-label='Search VMs'
//       placeholder='Search VMs...'
//       icon={<Search className='h-4 w-4' />}
//       iconPosition='left'
//     />
//   )
// }
