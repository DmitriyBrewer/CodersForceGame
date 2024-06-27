import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'

import App from './app/App'
import store from './shared/store'

// import App from './app/App'

// import '@/app/styles/global.module.scss'
import registerServiceWorker from '@/app/service-worker/registerServiceWorker'

registerServiceWorker()

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
// <StrictMode>
//   <App />
// </StrictMode>
// <BrowserRouter>
// {
//   /* <App /> */
// }
// {
//   /* <Routes>
//       <Route element={<h1>Hello</h1>} path="/" key={1} />
//     </Routes> */
// }
// {
//   /* <Routes>
//       <Route element={<App />} path="/" key={1} />
//     </Routes> */
// }
// {
//   /* <h1>Hello</h1>
//   </BrowserRouter> */
// }
