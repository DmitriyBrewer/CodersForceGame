import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'

import store from './src/shared/store'
import CoreLayout from '@/layouts/core-layout/ui'
import AppRoutes from '@/app/app-routes'

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      {/* TODO: feature/cfg-88 в feature/cfg-89 сделать роутер для сервера, что-то вроде  <AppRouterServer requestUrl={url} /> + Уставновить BaseLayout  */}
      <CoreLayout>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </CoreLayout>
    </Provider>
  )
}
