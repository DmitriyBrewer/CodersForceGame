import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
    <Provider store={store}>
      <BrowserRouter>
        {/* <App /> */}
        <Routes>
          <Route element={<App />} path="/test" key={1} />
          <Route element={<p>ss</p>} path="/test2" key={2} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
