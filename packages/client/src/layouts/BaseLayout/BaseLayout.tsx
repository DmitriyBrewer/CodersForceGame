import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import ErrorBoundary from '@/shared/context/error-boundary/ErrorBoundary'

const BaseLayout: FC = () => {
  return (
    <ErrorBoundary>
      {/* TODO feature/cfg-28 implement header & footer */}
      <header>
        <h4>header here</h4>
      </header>
      <Outlet />
      <footer>
        <h4>footer here</h4>
      </footer>
    </ErrorBoundary>
  )
}

export default BaseLayout
