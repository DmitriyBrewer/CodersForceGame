import { FC, PropsWithChildren } from 'react'

import BaseTypography from '@/shared/components/ui/BaseTypography'
import { BaseTypographyProps } from '@/shared/types'

import styles from './LoginHeader.module.scss'

const LoginHeader: FC<PropsWithChildren<BaseTypographyProps>> = ({
  children,
  component = 'h1',
  variant = 'h1',
  color = 'primary.dark',
  ...rest
}) => {
  return (
    <BaseTypography className={styles.root} component={component} variant={variant} color={color} {...rest}>
      {children}
    </BaseTypography>
  )
}

export default LoginHeader
