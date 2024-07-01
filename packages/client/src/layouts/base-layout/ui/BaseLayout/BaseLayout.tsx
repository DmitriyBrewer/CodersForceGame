import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import NavbarWidget from '@/widgets/base-layout/navbar'
import FooterWidget from '@/widgets/base-layout/footer/FooterWidget'

import styles from './BaseLayout.module.scss'
// import { useOAuth } from '@/feature/session/o-auth/hooks/useOAuth'

const BaseLayout: FC = () => {
  // useOAuth()
  return (
    // TODO feature/cfg-28 сделать тест ErrorBoundary
    <>
      <NavbarWidget />
      <main className={styles.root}>
        <Outlet />
      </main>
      <FooterWidget />
    </>
  )
}

export default BaseLayout
