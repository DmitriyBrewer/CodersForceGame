import { FC } from 'react'

import { AvatarProps } from '@mui/material/Avatar/Avatar'

import BaseAvatar from '@/shared/components/ui/BaseAvatar'

type Props = AvatarProps

const ProfileAvatar: FC<Props> = props => {
  const { src } = props
  const fullSrc = `https:\\ya-praktikum.tech/api/v2/resources${src}`
  return <BaseAvatar src={fullSrc} />
}

export default ProfileAvatar
