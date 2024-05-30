import AppRouter from '../router/AppRouter'
import ThemeModeProvider from '../../shared/context/ThemeProvider'
import ErrorBoundary from '../../shared/context/error-boundary/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeModeProvider>
        <AppRouter />
      </ThemeModeProvider>
    </ErrorBoundary>
  )
}

export default App
