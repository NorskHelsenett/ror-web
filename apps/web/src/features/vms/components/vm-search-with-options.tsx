'use client'

import { ResourceRegexSearch } from '@/components/ui/resource-regex-search'

export function VmSearchWithOptions({
  onFieldChange,
  onQueryChange,
}: {
  onFieldChange?: (field: string) => void
  onQueryChange?: (query: string) => void
}) {
  return (
    <ResourceRegexSearch
      fields={[
        { value: 'virtualmachine.spec.name', label: 'Name', placeholderLabel: 'name' },
        { value: 'virtualmachine.status.tags.team.description', label: 'Team', placeholderLabel: 'team' },
        { value: 'virtualmachine.status.tags.service-id.value', label: 'Service-id', placeholderLabel: 'service-id' },
      ]}
      defaultField='virtualmachine.spec.name'
      searchEntityLabel='VM'
      onFieldChange={onFieldChange}
      onQueryChange={onQueryChange}
    />
  )
}
