import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import BaseContainer from '@/shared/components/ui/BaseContainer'

const BaseLayout: FC = () => {
  return (
    // TODO feature/cfg-28 сделать тест ErrorBoundary
    <>
      {/* TODO feature/cfg-28 реализовать футер и хедер */}
      <header>
        <h4>тут будет хедер</h4>
      </header>
      <main>
        <BaseContainer>
          <Outlet />
        </BaseContainer>
      </main>
      <footer>
        <h4>тут будет футер</h4>
      </footer>
    </>
  )
}

export default BaseLayout
