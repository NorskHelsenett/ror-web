'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ColorScheme, resolveColorScheme } from '@/utils/dark-mode'
import { toast, Toaster } from 'sonner'

const ColorSchemeContext = createContext<ColorScheme>(ColorScheme.System)
const ColorSchemeUpdateContext = createContext<(scheme: ColorScheme) => Promise<void>>(async () => {})

export function useColorScheme() {
  return useContext(ColorSchemeContext)
}

export function useSetColorScheme() {
  return useContext(ColorSchemeUpdateContext)
}

export function ThemedToaster() {
  const scheme = useColorScheme()
  return (
    <Toaster
      richColors
      position='bottom-right'
      theme={scheme === ColorScheme.System ? 'system' : resolveColorScheme(scheme, false)}
    />
  )
}

function applyResolvedTheme(current: ColorScheme) {
  const resolved = resolveColorScheme(current, window.matchMedia('(prefers-color-scheme: dark)').matches)

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)
  document.documentElement.dataset.colorScheme = current
}

export function ColorSchemeProvider({
  children,
  initialScheme,
}: {
  children: React.ReactNode
  initialScheme: ColorScheme
}) {
  const [scheme, setScheme] = useState<ColorScheme>(initialScheme)

  useEffect(() => {
    applyResolvedTheme(scheme)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => {
      if (scheme === ColorScheme.System) applyResolvedTheme(scheme)
    }
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [scheme])

  // Used when toggling theme
  const updateScheme = async (newScheme: ColorScheme) => {
    try {
      const response = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: newScheme }),
      })
      if (!response.ok) throw new Error(`Theme preference request failed (${response.status})`)
      setScheme(newScheme)
      applyResolvedTheme(newScheme)
    } catch (error) {
      console.error('Failed to save theme preference:', error)
      toast.error('Failed to save theme preference. Please try again.')
    }
  }

  return (
    <ColorSchemeContext.Provider value={scheme}>
      <ColorSchemeUpdateContext.Provider value={updateScheme}>{children}</ColorSchemeUpdateContext.Provider>
    </ColorSchemeContext.Provider>
  )
}
