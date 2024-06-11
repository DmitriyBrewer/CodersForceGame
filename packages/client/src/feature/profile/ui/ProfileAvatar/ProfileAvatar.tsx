import { FC } from 'react'

import { AvatarProps } from '@mui/material/Avatar/Avatar'

import BaseAvatar from '@/shared/components/ui/BaseAvatar'

type Props = AvatarProps

const ProfileAvatar: FC<Props> = props => {
  return <BaseAvatar {...props} />
}

export default ProfileAvatar
