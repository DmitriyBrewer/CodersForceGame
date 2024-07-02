import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { Provider } from 'react-redux'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

import store from './shared/store'

import registerServiceWorker from '@/app/service-worker/registerServiceWorker'
import { paths } from './shared/config/routing'
import HomePage from './pages'
import ErrorBoundary from './shared/context/error-boundary'
import ThemeModeProvider from './shared/context/theme-provider/ThemeProvider'
import GlobalErrorWrapper from './shared/context/global-error-wrapper'

registerServiceWorker()

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeModeProvider>
          <CssBaseline />
          <GlobalErrorWrapper>
            {/* TODO: feature/cfg-88 в feature/cfg-89 сделать роутер для сервера, что-то вроде  <AppRouterClient/>  + Уставновить BaseLayout */}
            <BrowserRouter>
              <Routes>
                <Route element={<HomePage />} path={paths.home} key={paths.home} />
                <Route element={<p>После добавления роутера здесь будет LoginPage</p>} path="/test" key={paths.login} />
                <Route
                  element={<p>После добавления роутера здесь будет LeaderBoardPage</p>}
                  path="/test2"
                  key={paths.leaderboard}
                />
              </Routes>
            </BrowserRouter>
          </GlobalErrorWrapper>
        </ThemeModeProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
)
