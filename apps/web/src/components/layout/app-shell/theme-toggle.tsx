'use client'

import { useColorScheme, useSetColorScheme } from '@/context/color-theme-context'
import { ColorScheme, Labels } from '@/utils/dark-mode'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
import { Layer } from '@ror/react'
import { Moon, Sun, SunMoon } from 'lucide-react'
import { useState } from 'react'
import s from './theme-toggle.module.scss'

interface ThemeToggleProps {
  colorScheme: ColorScheme
}

export function ThemeToggle({ colorScheme }: ThemeToggleProps) {
  const current = useColorScheme()
  const setScheme = useSetColorScheme()
  const [choosingDark, setChoosingDark] = useState(
    colorScheme === ColorScheme.Dark || colorScheme === ColorScheme.DarkBlack
  )
  const [saving, setSaving] = useState(false)
  const isDark = current === ColorScheme.Dark || current === ColorScheme.DarkBlack

  const selectTheme = async (theme: ColorScheme) => {
    setChoosingDark(false)
    setSaving(true)
    try {
      await setScheme(theme)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Popover onOpenChange={() => setChoosingDark(false)}>
      <PopoverTrigger asChild>
        <ThemeToggleTrigger theme={current} />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent collisionPadding={8} sideOffset={4}>
          <Layer level={0}>
            <div className='bg-[var(--r-layer)] p-4 rounded-md border border-subtle shadow-lg'>
              <div className='flex flex-wrap gap-3' role='group' aria-label='Color theme'>
                <ThemeOption
                  theme={ColorScheme.Light}
                  isActive={current === ColorScheme.Light}
                  onClick={selectTheme}
                  disabled={saving}
                />
                <ThemeOption
                  theme={ColorScheme.Dark}
                  isActive={isDark}
                  onClick={() => setChoosingDark(true)}
                  disabled={saving}
                />
                <ThemeOption
                  theme={ColorScheme.System}
                  isActive={current === ColorScheme.System}
                  onClick={selectTheme}
                  disabled={saving}
                />
              </div>
              {(choosingDark || isDark) && (
                <div className='mt-4 border-t border-subtle pt-3'>
                  <p className='text-sm mb-3'>Choose your dark appearance</p>
                  <div className='flex gap-3' role='group' aria-label='Dark appearance'>
                    <ThemeOption
                      theme={ColorScheme.Dark}
                      label='Gray'
                      isActive={current === ColorScheme.Dark}
                      onClick={selectTheme}
                      disabled={saving}
                    />
                    <ThemeOption
                      theme={ColorScheme.DarkBlack}
                      isActive={current === ColorScheme.DarkBlack}
                      onClick={selectTheme}
                      disabled={saving}
                    />
                  </div>
                </div>
              )}
            </div>
          </Layer>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

interface ThemeToggleTriggerProps {
  theme: ColorScheme
}

function ThemeToggleTrigger({ theme, ...rest }: ThemeToggleTriggerProps) {
  return (
    <button
      className='w-7 h-7 shrink-0 cursor-pointer hover:bg-background-hover flex items-center justify-center justify-self-end rounded-sm border border-subtle'
      title='Open theme menu'
      {...rest}
    >
      <ThemeIcon theme={theme} />
    </button>
  )
}

function ThemeIcon({ theme }: { theme: ColorScheme }) {
  switch (theme) {
    case ColorScheme.Light:
      return <Sun className='w-5 h-5 text-(--r-icon-primary)' />
    case ColorScheme.Dark:
    case ColorScheme.DarkBlack:
      return <Moon className='w-5 h-5 text-(--r-icon-primary)' />
    case ColorScheme.System:
      return <SunMoon className='w-5 h-5 text-(--r-icon-primary)' />
    default:
      return null
  }
}

function ThemeOption({
  theme,
  isActive,
  onClick,
  label = Labels.get(theme),
  disabled,
}: {
  theme: ColorScheme
  isActive: boolean
  onClick: (value: ColorScheme) => void
  label?: string
  disabled?: boolean
}) {
  const handleOnClick = () => {
    onClick(theme)
  }

  return (
    <button
      type='button'
      className={`${s.option}`}
      data-value={theme}
      aria-pressed={isActive}
      onClick={handleOnClick}
      disabled={disabled}
    >
      <span className='block rounded-md'>
        <ThemePreview theme={theme} />
      </span>
      <span className={`${s.label} block`}>{label}</span>
    </button>
  )
}

function ThemePreview({ theme }: { theme: ColorScheme }) {
  const classes = 'rounded-[inherit]'
  switch (theme) {
    case ColorScheme.Light:
      return (
        <svg xmlns='http://www.w3.org/2000/svg' width='70' height='50' viewBox='0 0 70 50' className={classes}>
          <path fill='#e5e5e6' d='M0 0h70v50H0z'></path>
          <path fill='#fff' d='M14 10h56v40H10V14a4 4 0 0 1 4-4'></path>
          <circle cx='18' cy='18' r='3' fill='#e5e5e6'></circle>
          <circle cx='27' cy='18' r='3' fill='#e5e5e6'></circle>
          <circle cx='36' cy='18' r='3' fill='#e5e5e6'></circle>
          <rect width='46' height='3' x='17' y='28' fill='#38393e' rx='1'></rect>
          <rect width='46' height='3' x='17' y='34' fill='#38393e' rx='1'></rect>
          <rect width='30' height='3' x='17' y='40' fill='#38393e' rx='1'></rect>
        </svg>
      )
    case ColorScheme.Dark:
    case ColorScheme.DarkBlack:
      return (
        <svg xmlns='http://www.w3.org/2000/svg' width='70' height='50' viewBox='0 0 70 50' className={classes}>
          <path fill={theme === ColorScheme.DarkBlack ? '#0b0d0e' : '#22232a'} d='M0 0h70v50H0z'></path>
          <path
            fill={theme === ColorScheme.DarkBlack ? '#191c1e' : '#5a5c63'}
            d='M14 10h56v40H10V14a4 4 0 0 1 4-4'
          ></path>
          <circle cx='18' cy='18' r='3' fill='#22232a'></circle>
          <circle cx='27' cy='18' r='3' fill='#22232a'></circle>
          <circle cx='36' cy='18' r='3' fill='#22232a'></circle>
          <rect width='46' height='3' x='17' y='28' fill='#fafaff' rx='1'></rect>
          <rect width='46' height='3' x='17' y='34' fill='#fafaff' rx='1'></rect>
          <rect width='30' height='3' x='17' y='40' fill='#fafaff' rx='1'></rect>
        </svg>
      )
    case ColorScheme.System:
      return (
        <svg xmlns='http://www.w3.org/2000/svg' width='70' height='50' viewBox='0 0 70 50' className={classes}>
          <path fill='#e5e5e6' d='M0 0h35v50H0z'></path>
          <path fill='#fff' d='M14 10h21v40H10V14a4 4 0 0 1 4-4'></path>
          <circle cx='18' cy='18' r='3' fill='#e5e5e6'></circle>
          <circle cx='27' cy='18' r='3' fill='#e5e5e6'></circle>
          <path
            fill='#38393e'
            d='M18 28h17v3H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1M18 34h17v3H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1M18 40h17v3H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1'
          ></path>
          <path fill='#22232a' d='M35 0h35v50H35z'></path>
          <path fill='#5a5c63' d='M49 10h21v40H45V14a4 4 0 0 1 4-4'></path>
          <circle cx='53' cy='18' r='3' fill='#22232a'></circle>
          <circle cx='62' cy='18' r='3' fill='#22232a'></circle>
          <path
            fill='#fafaff'
            d='M53 28h17v3H53a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1M53 34h17v3H53a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1M53 40h17v3H53a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1'
          ></path>
        </svg>
      )
    default:
      return null
  }
}
