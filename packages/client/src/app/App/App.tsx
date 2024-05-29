import AppRouter from '../router/AppRouter'
import ThemeModeProvider from '../../shared/context/ThemeProvider'

const App = () => {
  return (
    <ThemeModeProvider>
      <AppRouter />
    </ThemeModeProvider>
  )
}

export default App
