import { FC, PropsWithChildren } from 'react'

import BaseTypography from '@/shared/components/ui/BaseTypography'

const StartGameDescription: FC<PropsWithChildren> = ({ children }) => {
  return <BaseTypography gutterBottom>{children} </BaseTypography>
}

export default StartGameDescription
