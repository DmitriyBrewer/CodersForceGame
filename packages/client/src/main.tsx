import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import App from './app/App'

import '@/app/styles/global.module.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
