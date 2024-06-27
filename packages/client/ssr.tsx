import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import store from './src/shared/store'

import App from './src/app/App/App'

// export function render(url: string) {
//   return ReactDOMServer.renderToString(
//     <StaticRouter location={url}>
//       <App />
//     </StaticRouter>
//   )
// }

export function render(path: string) {
  console.log(path)
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={path}>
        {/* <App /> */}
        {/* <App /> */}
        <Routes>
          <Route element={<App />} path="/test" key={1} />
          <Route element={<p>ss</p>} path="/test2" key={2} />
        </Routes>
      </StaticRouter>
    </Provider>
  )
}
