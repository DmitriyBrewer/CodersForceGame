import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'

import { StrictMode } from 'react'

import { RenderResult } from '@/shared/types'

import store from './shared/store'
import AppRoutes from '@/app/app-routes'
import CoreLayout from './layouts/core-layout'

export async function render(url: string): Promise<RenderResult> {
  const appHtml = renderToString(
    <StrictMode>
      <Provider store={store}>
        <CoreLayout>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </CoreLayout>
      </Provider>
    </StrictMode>
  )

  const preloadedState = store.getState()

  return { appHtml, preloadedState }
}
