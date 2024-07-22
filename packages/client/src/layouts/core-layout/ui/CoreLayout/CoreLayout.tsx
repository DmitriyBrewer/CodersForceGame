import { CssBaseline } from '@mui/material'

import { FC, PropsWithChildren } from 'react'

import ErrorBoundary from '@/shared/context/error-boundary'
import ThemeModeProvider from '@/shared/context/theme-provider'

import GlobalErrorWrapper from '@/shared/context/global-error-wrapper'

const CoreLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ThemeModeProvider>
        <CssBaseline />
        <GlobalErrorWrapper>{children}</GlobalErrorWrapper>
      </ThemeModeProvider>
    </ErrorBoundary>
  )
}

export default CoreLayout
