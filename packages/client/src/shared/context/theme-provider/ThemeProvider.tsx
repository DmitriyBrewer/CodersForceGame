import { createTheme, ThemeProvider } from '@mui/material/styles'

import { ReactNode, createContext, useMemo, useState, useEffect } from 'react'
import { PaletteMode, useMediaQuery } from '@mui/material'

import isBrowser from '@/shared/utils/isBrowser'

import { getDesignTokens } from '@/themes'

interface ThemeContextType {
  toggleColorMode: () => void
}

const modeList: Array<PaletteMode> = ['light', 'dark']

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const initialMode = (): PaletteMode => {
    if (isBrowser()) {
      const savedMode = localStorage.getItem('theme') || ''
      if (modeList.includes(savedMode as PaletteMode)) {
        return savedMode as PaletteMode
      }
    }
    return prefersDarkMode ? 'dark' : 'light'
  }

  const [mode, setMode] = useState<PaletteMode>(initialMode)

  useEffect(() => {
    if (isBrowser()) {
      localStorage.setItem('theme', mode)
    }
  }, [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeModeProvider
