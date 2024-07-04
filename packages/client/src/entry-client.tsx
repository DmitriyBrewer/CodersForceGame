import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import store from './shared/store'

import registerServiceWorker from '@/app/service-worker/registerServiceWorker'

import '@/app/styles/global.module.scss'
import CoreLayout from './layouts/core-layout/ui'
import AppRoutes from './app/app-routes'

registerServiceWorker()

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <CoreLayout>
        {/* TODO: feature/cfg-88 в feature/cfg-89 сделать роутер для сервера, что-то вроде  <AppRouterClient/>  + Уставновить BaseLayout */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CoreLayout>
    </Provider>
  </StrictMode>
)
