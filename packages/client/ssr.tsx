import React from 'react'
import ReactDOMServer from 'react-dom/server'
// import { StaticRouter } from 'react-router-dom/server'

import App from './src/app/App/App'

// export function render(url: string) {
//   return ReactDOMServer.renderToString(
//     <StaticRouter location={url}>
//       <App />
//     </StaticRouter>
//   )
// }

export function render() {
  return ReactDOMServer.renderToString(<App />)
}
