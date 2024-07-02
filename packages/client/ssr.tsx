import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'

import { Route, Routes } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

import ErrorBoundary from '@/shared/context/error-boundary'

import ThemeModeProvider from '@/shared/context/theme-provider/ThemeProvider'

import GlobalErrorWrapper from '@/shared/context/global-error-wrapper'

import { paths } from './src/shared/config/routing'
import HomePage from './src/pages'
import store from './src/shared/store'

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      {/* TODO: feature/cfg-88 в feature/cfg-89 сделать роутер для сервера, что-то вроде  <AppRouterServer requestUrl={url} /> + Уставновить BaseLayout  */}
      <ErrorBoundary>
        <ThemeModeProvider>
          <CssBaseline />
          <GlobalErrorWrapper>
            <StaticRouter location={url}>
              <Routes>
                <Route element={<HomePage />} path={paths.home} key={paths.home} />
                <Route element={<p>После добавления роутера здесь будет LoginPage</p>} path="/test" key={paths.login} />
                <Route
                  element={<p>После добавления роутера здесь будет LeaderBoardPage</p>}
                  path="/test2"
                  key={paths.leaderboard}
                />
              </Routes>
            </StaticRouter>
          </GlobalErrorWrapper>
        </ThemeModeProvider>
      </ErrorBoundary>
    </Provider>
  )
}
