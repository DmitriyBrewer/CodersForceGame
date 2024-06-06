import { CssBaseline } from '@mui/material'

import { Provider } from 'react-redux'

import store from '@/shared/store'

import AppRouter from '../router/AppRouter'
import ThemeModeProvider from '../../shared/context/ThemeProvider'
import ErrorBoundary from '../../shared/context/error-boundary/ErrorBoundary'

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
