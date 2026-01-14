'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '@/utils/clsxm'
import { Input } from '@/components/shadcn/input'
import { Button } from '@/components/shadcn/button'
import { Sliders, Edit3 } from 'lucide-react'

interface SliderWithInputProps {
  value?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
  disabled?: boolean
  label?: string
}

const SliderWithInput = React.forwardRef<HTMLInputElement, SliderWithInputProps>(
  ({ className, value = 20, onValueChange, min = 10, max = 500, step = 10, disabled, label = 'GB', ...props }, ref) => {
    const [inputMode, setInputMode] = useState<'slider' | 'input'>('slider')

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10)
      onValueChange?.(newValue)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10)
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        onValueChange?.(newValue)
      }
    }

    const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10)
      if (isNaN(newValue) || newValue < min) {
        onValueChange?.(min)
      } else if (newValue > max) {
        onValueChange?.(max)
      }
    }

    const toggleInputMode = () => {
      setInputMode((prev) => (prev === 'slider' ? 'input' : 'slider'))
    }

    return (
      <div className={cn('space-y-4', className)}>
        {/* Header with current value and mode toggle */}
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium mr-4'>VM Size ({label})</span>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-muted-foreground'>
              {value} {label}
            </span>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={toggleInputMode}
              className='h-8 w-8 p-0'
              title={`Switch to ${inputMode === 'slider' ? 'input' : 'slider'} mode`}
            >
              {inputMode === 'slider' ? <Edit3 className='h-3 w-3' /> : <Sliders className='h-3 w-3' />}
            </Button>
          </div>
        </div>

        {/* Conditional rendering based on input mode */}
        {inputMode === 'slider' ? (
          <>
            {/* Slider Mode */}
            <div className='px-1'>
              <input
                ref={ref}
                type='range'
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleSliderChange}
                disabled={disabled}
                className={cn(
                  'w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5',
                  '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer',
                  '[&::-webkit-slider-thumb]:hover:bg-primary/90 [&::-webkit-slider-thumb]:transition-colors',
                  '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5',
                  '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer',
                  '[&::-moz-range-thumb]:border-none',
                  '[&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-muted [&::-moz-range-track]:rounded-lg',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((value - min) / (max - min)) * 100}%, hsl(var(--muted)) ${((value - min) / (max - min)) * 100}%, hsl(var(--muted)) 100%)`,
                }}
                {...props}
              />
            </div>

            {/* Min/Max labels for slider */}
            <div className='flex justify-between text-xs text-muted-foreground px-1'>
              <span>
                {min} {label}
              </span>
              <span>
                {max} {label}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Input Mode */}
            <div className='space-y-3'>
              <div className='flex items-center gap-3 justify-center'>
                <label className='text-sm text-muted-foreground min-w-fit'>Enter size:</label>
                <Input
                  type='number'
                  min={min}
                  max={max}
                  step={step}
                  value={value || ''}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  disabled={disabled}
                  className='w-32 text-center'
                  placeholder={String(min)}
                />
                <span className='text-sm text-muted-foreground'>{label}</span>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
)
SliderWithInput.displayName = 'SliderWithInput'

export { SliderWithInput }
export default SliderWithInput
