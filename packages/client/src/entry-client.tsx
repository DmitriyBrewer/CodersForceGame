import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@/shared/store'

import registerServiceWorker from '@/app/service-worker/registerServiceWorker'
import '@/app/styles/global.module.scss'
import CoreLayout from './layouts/core-layout/ui'
import AppRoutes from '@/app/app-routes/AppRoutes'

registerServiceWorker()

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <CoreLayout>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CoreLayout>
    </Provider>
  </StrictMode>
)
