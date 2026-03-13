'use client'

import { Controller } from 'react-hook-form'
import MultipleSelector, { Option } from '@/components/shadcn/multiselect'
import { FormSection } from '@/features/cluster/components/create-cluster/form-section'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { cn } from '@/utils/clsxm'

interface GenericMultiselectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  title: string
  options: Option[]
  placeholder?: string
  error?: string
  hideClearAllButton?: boolean
  hidePlaceholderWhenSelected?: boolean
  emptyIndicator?: React.ReactNode
  className?: string
}

export const GenericMultiselect = <TFieldValues extends FieldValues>({
  control,
  name,
  title,
  options,
  placeholder = 'Select options...',
  error,
  hideClearAllButton = false,
  hidePlaceholderWhenSelected = true,
  emptyIndicator,
  className = 'w-full',
}: GenericMultiselectProps<TFieldValues>) => {
  const defaultEmptyIndicator = emptyIndicator || <p className='text-center text-sm'>No options found</p>

  return (
    <FormSection title={title} error={error}>
      <div className='space-y-2 m-4'>
        <Controller
          control={control}
          name={name}
          render={({ field }) => {
            let currentValues: Option[] = []
            if (field.value) {
              if (Array.isArray(field.value)) {
                currentValues = field.value.map((value: string) => ({
                  value,
                  label: options.find((opt) => opt.value === value)?.label || value,
                }))
              } else if (typeof field.value === 'object') {
                currentValues = Object.entries(field.value).map(([key, _]) => ({
                  value: key,
                  label: options.find((opt) => opt.value === key)?.label || key,
                }))
              }
            }

            return (
              <MultipleSelector
                value={currentValues}
                onChange={(selectedOptions) => {
                  if (Array.isArray(field.value) || field.value === undefined || field.value === null) {
                    const newValues = selectedOptions.map((option) => option.value)
                    field.onChange(newValues)
                  } else {
                    const newValues: Record<string, string> = {}
                    selectedOptions.forEach((option) => {
                      newValues[option.value] = option.value
                    })
                    field.onChange(newValues)
                  }
                }}
                defaultOptions={options}
                placeholder={placeholder}
                hideClearAllButton={hideClearAllButton}
                hidePlaceholderWhenSelected={hidePlaceholderWhenSelected}
                emptyIndicator={defaultEmptyIndicator}
                className={cn(className, 'min-w-[300px]')}
              />
            )
          }}
        />
      </div>
    </FormSection>
  )
}
