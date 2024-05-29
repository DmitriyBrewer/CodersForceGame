import { ThemeProvider } from '@mui/material/styles'

import { useEffect, useState } from 'react'

import AppRouter from '../router/AppRouter'
import { darkMuiTheme, lightMuiTheme } from '@/themes'

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    setIsDarkMode(prefersDarkMode)
  }, [])

  return (
    <ThemeProvider theme={isDarkMode ? darkMuiTheme : lightMuiTheme}>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
