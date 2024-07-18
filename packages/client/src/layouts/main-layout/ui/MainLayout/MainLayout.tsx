import { FC, PropsWithChildren } from 'react'

import NavbarWidget from '@/widgets/base-layout/navbar'
import FooterWidget from '@/widgets/base-layout/footer/FooterWidget'

import styles from './MainLayout.module.scss'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    // TODO feature/cfg-88 оставить или MainLayout или BaseLayout, другой удалить
    <>
      <NavbarWidget />
      <main className={styles.root}>{children}</main>
      <FooterWidget />
    </>
  )
}

export default MainLayout
