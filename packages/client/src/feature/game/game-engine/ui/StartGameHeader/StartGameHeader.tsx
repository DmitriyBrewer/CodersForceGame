import { FC, PropsWithChildren } from 'react'

import BaseTypography from '@/shared/components/ui/BaseTypography'

const StartGameHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseTypography component="h1" variant="h3">
      {children}
    </BaseTypography>
  )
}

export default StartGameHeader
