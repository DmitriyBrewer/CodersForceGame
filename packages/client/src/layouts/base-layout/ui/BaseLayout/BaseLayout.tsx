import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import NavbarWidget from '@/widgets/base-layout/navbar'
import FooterWidget from '@/widgets/base-layout/footer/FooterWidget'

const BaseLayout: FC = () => {
  return (
    // TODO feature/cfg-28 сделать тест ErrorBoundary
    <>
      <NavbarWidget />
      <main>
        <Outlet />
      </main>
      <FooterWidget />
    </>
  )
}

export default BaseLayout
