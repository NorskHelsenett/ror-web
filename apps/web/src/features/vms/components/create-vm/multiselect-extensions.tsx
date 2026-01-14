'use client'

import { Controller } from 'react-hook-form'
import MultipleSelector, { Option } from '@/components/shadcn/multiselect'
import { FormSection } from '@/features/cluster/components/create-cluster/form-section'
import { extensions } from '@/features/vms/config/create-vm-values'
import { CreateVmForm } from '@/features/vms/types/create-vm'
import { Control } from 'react-hook-form'

interface MultiselectExtensionsProps {
  control: Control<CreateVmForm>
  error?: string
}

export const MultiselectExtensions = ({ control, error }: MultiselectExtensionsProps) => {
  // Convert extensions to multiselect options
  const extensionOptions: Option[] = extensions.map((extension) => ({
    value: extension.key,
    label: extension.display,
  }))

  return (
    <FormSection title='Extensions' error={error}>
      <div className='space-y-2'>
        <Controller
          control={control}
          name='extensions'
          render={({ field }) => {
            // Convert the current extensions object to multiselect format
            const currentValues = field.value
              ? Object.entries(field.value).map(([key, _]) => ({
                  value: key,
                  label: extensions.find((ext) => ext.key === key)?.display || key,
                }))
              : []

            return (
              <MultipleSelector
                value={currentValues}
                onChange={(selectedOptions) => {
                  // Convert back to Record<string, string> format
                  const newExtensions: Record<string, string> = {}
                  selectedOptions.forEach((option) => {
                    newExtensions[option.value] = option.value
                  })
                  field.onChange(newExtensions)
                }}
                defaultOptions={extensionOptions}
                placeholder='Select extensions...'
                hideClearAllButton={false}
                hidePlaceholderWhenSelected
                emptyIndicator={<p className='text-center text-sm'>No extensions found</p>}
                className='w-full'
              />
            )
          }}
        />
      </div>
    </FormSection>
  )
}
