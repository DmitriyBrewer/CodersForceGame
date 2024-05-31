import { FC, PropsWithChildren } from 'react'

import BaseTypography from '@/shared/components/ui/BaseTypography'
import { BaseTypographyProps } from '@/shared/types'

const RegisterHeader: FC<PropsWithChildren<BaseTypographyProps>> = ({
  children,
  component = 'h1',
  variant = 'h3',
  ...rest
}) => {
  return (
    <BaseTypography component={component} variant={variant} {...rest}>
      {children}
    </BaseTypography>
  )
}

export default RegisterHeader
