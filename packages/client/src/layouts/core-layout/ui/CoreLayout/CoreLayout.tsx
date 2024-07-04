import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'

import { FC, PropsWithChildren, useEffect } from 'react'

import store from '@/shared/store'
import ErrorBoundary from '@/shared/context/error-boundary'
import ThemeModeProvider from '@/shared/context/theme-provider'

import GlobalErrorWrapper from '@/shared/context/global-error-wrapper'

const CoreLayout: FC<PropsWithChildren> = ({ children }) => {
  // TODO: feature/cfg-88 удалить запрос, если не нужен будет, сейчас для демонстрации работы с ssr
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeModeProvider>
          <CssBaseline />
          <GlobalErrorWrapper>{children}</GlobalErrorWrapper>
        </ThemeModeProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default CoreLayout
