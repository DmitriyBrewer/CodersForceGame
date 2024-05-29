import { ThemeProvider } from '@mui/material/styles'

import { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from 'react'

import { darkMuiTheme, lightMuiTheme } from '@/themes'

interface ThemeContextType {
  isDarkMode: boolean
  setIsDarkMode: Dispatch<SetStateAction<boolean>>
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const contextValue = useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode
    }),
    [isDarkMode]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={isDarkMode ? darkMuiTheme : lightMuiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeModeProvider
