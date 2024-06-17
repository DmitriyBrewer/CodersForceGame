import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import NavbarWidget from '@/widgets/base-layout/navbar'

const BaseLayout: FC = () => {
  return (
    // TODO feature/cfg-28 сделать тест ErrorBoundary
    <>
      <NavbarWidget />
      <main>
        <Outlet />
      </main>
      <footer>
        <h4>тут будет футер</h4>
      </footer>
    </>
  )
}

export default BaseLayout
