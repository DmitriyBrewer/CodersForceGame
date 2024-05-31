import { FC, PropsWithChildren } from 'react'

import BaseTypography from '@/shared/components/ui/BaseTypography'
import { BaseTypographyProps } from '@/shared/types'

const LoginHeader: FC<PropsWithChildren<BaseTypographyProps>> = ({
  children,
  component = 'h1',
  variant = 'h1',
  color = 'primary.contrastText',
  ...rest
}) => {
  return (
    <BaseTypography component={component} variant={variant} color={color} {...rest}>
      {children}
    </BaseTypography>
  )
}

export default LoginHeader
