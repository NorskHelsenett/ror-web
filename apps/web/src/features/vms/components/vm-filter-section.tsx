'use client'

import { useEffect, useState } from 'react'
import MultipleSelector from '@/components/shadcn/multiselect'
import { powerStateOptions, backupStatusOptions, locationOptions } from '@/features/vms/config/page-view-options'
import { generateServerTeamOptions } from '@/features/vms/config/page-view-options'
import { Option } from '@/components/shadcn/multiselect'

interface VmFilterSectionProps {
  filtersOpen: boolean
  selectedFilters: Record<string, string[]>
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

export const VmFilterSection = ({ filtersOpen, selectedFilters, setSelectedFilters }: VmFilterSectionProps) => {
  const [teamOptions, setTeamOptions] = useState<Option[]>([])
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)

  useEffect(() => {
    const fetchTeamOptions = async () => {
      setIsLoadingTeams(true)
      try {
        const options = await generateServerTeamOptions()
        setTeamOptions(options)
      } catch (error) {
        console.error('Failed to fetch team options:', error)
        setTeamOptions([])
      } finally {
        setIsLoadingTeams(false)
      }
    }

    fetchTeamOptions()
  }, [])

  if (!filtersOpen) return null

  const filterOptions = [
    { label: 'Power States', placeholder: 'Choose Power State', data: powerStateOptions },
    { label: 'Location', placeholder: 'Choose Location', data: locationOptions },
    {
      label: 'Teams',
      placeholder: isLoadingTeams ? 'Loading teams...' : 'Choose Team',
      data: teamOptions,
    },
    { label: 'Backup', placeholder: 'Choose Backup Status', data: backupStatusOptions },
  ]

  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-6 min-h-28 mx-12 mt-6'>
      {filterOptions.map((option) => (
        <MultipleSelector
          key={option.label}
          className='w-52'
          commandProps={{ label: option.label }}
          value={(selectedFilters[option.label] || []).map((v) => ({ value: v, label: v }))}
          onChange={(selectedOptions) => {
            const next = selectedOptions.map((opt) => opt.value)
            setSelectedFilters((prev) => {
              const curr = prev[option.label] || []
              const same = curr.length === next.length && curr.every((v, i) => v === next[i])
              if (same) return prev
              return { ...prev, [option.label]: next }
            })
          }}
          defaultOptions={option.data}
          placeholder={option.placeholder}
          hideClearAllButton
          hidePlaceholderWhenSelected
          emptyIndicator={<p className='text-center text-sm'>No results found</p>}
          disabled={option.label === 'Teams' && isLoadingTeams}
        />
      ))}
    </div>
  )
}
