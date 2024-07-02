import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { Provider } from 'react-redux'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import store from './shared/store'

import registerServiceWorker from '@/app/service-worker/registerServiceWorker'
import { paths } from './shared/config/routing'
import HomePage from './pages'
import '@/app/styles/global.module.scss'
import CoreLayout from './layouts/core-layout/ui'

registerServiceWorker()

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <CoreLayout>
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
      </CoreLayout>
    </Provider>
  </StrictMode>
)
