import { FC, PropsWithChildren } from 'react'

import { ButtonProps } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'

const ProfileAvatarButton: FC<PropsWithChildren<ButtonProps>> = ({ children, ...rest }) => {
  return (
    <BaseButton component="label" {...rest}>
      {children}
    </BaseButton>
  )
}

export default ProfileAvatarButton
