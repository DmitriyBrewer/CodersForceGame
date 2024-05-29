import { FC, PropsWithChildren } from 'react'

import { TypographyProps } from '@mui/material'

import BaseTypography from '@/shared/components/ui/BaseTypography'

const RegisterHeader: FC<PropsWithChildren<TypographyProps>> = ({
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
