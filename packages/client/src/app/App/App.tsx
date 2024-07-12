import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'

import store from '@/shared/store'
import ErrorBoundary from '@/shared/context/error-boundary'
import ThemeModeProvider from '@/shared/context/theme-provider'

import GlobalErrorWrapper from '@/shared/context/global-error-wrapper'

import AppRouter from '../router'

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeModeProvider>
          <CssBaseline />
          <GlobalErrorWrapper>
            <AppRouter />
          </GlobalErrorWrapper>
        </ThemeModeProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
