import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

// import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './app/App'

// import App from './app/App'

// import '@/app/styles/global.module.scss'
// import registerServiceWorker from '@/app/service-worker/registerServiceWorker'

// registerServiceWorker()

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <App />
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
