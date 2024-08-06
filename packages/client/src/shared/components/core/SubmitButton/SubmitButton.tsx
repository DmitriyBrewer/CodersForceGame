import { FC, PropsWithChildren } from 'react'

import { ButtonProps } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'

const SubmitButton: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  type = 'submit',
  variant = 'contained',
  ...rest
}) => {
  return (
    <BaseButton type={type} variant={variant} {...rest}>
      {children}
    </BaseButton>
  )
}

export default SubmitButton
