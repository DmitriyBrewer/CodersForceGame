import { CssBaseline } from '@mui/material'

import { Provider } from 'react-redux'

import store from '@/shared/store'

import ErrorBoundary from '@/shared/context/error-boundary/ErrorBoundary'

import ThemeModeProvider from '@/shared/context/ThemeProvider'

import AppRouter from '../router'

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeModeProvider>
          <CssBaseline />
          <AppRouter />
        </ThemeModeProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
