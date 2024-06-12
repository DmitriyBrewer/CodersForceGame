import { createTheme, ThemeProvider } from '@mui/material/styles'

import { ReactNode, createContext, useMemo, useState, useEffect } from 'react'
import { PaletteMode, useMediaQuery } from '@mui/material'

import { getDesignTokens } from '@/themes'

interface ThemeContextType {
  toggleColorMode: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light')

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

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
