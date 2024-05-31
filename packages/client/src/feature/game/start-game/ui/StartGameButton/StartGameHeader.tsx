import { FC, PropsWithChildren } from 'react'

import { ButtonProps } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'

const StartGameButton: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  type = 'button',
  variant = 'contained',
  color = 'secondary',
  ...rest
}) => {
  return (
    <BaseButton type={type} color={color} variant={variant} {...rest}>
      {children}
    </BaseButton>
  )
}

export default StartGameButton
