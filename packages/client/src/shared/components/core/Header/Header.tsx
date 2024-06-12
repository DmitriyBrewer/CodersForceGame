import { FC, PropsWithChildren } from 'react'

import BaseTypography from '@/shared/components/ui/BaseTypography'
import { BaseTypographyProps } from '@/shared/types'

interface Props extends BaseTypographyProps {
  className?: string | undefined
}

const Header: FC<PropsWithChildren<Props>> = ({
  children,
  component = 'h1',
  variant = 'h1',
  className = '',
  ...rest
}) => {
  return (
    <BaseTypography className={className} component={component} variant={variant} {...rest}>
      {children}
    </BaseTypography>
  )
}

export default Header
