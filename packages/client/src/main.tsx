import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app/App'

import '@/app/styles/global.module.scss'
import registerServiceWorker from '@/app/service-worker/registerServiceWorker'

registerServiceWorker()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
