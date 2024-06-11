import { FC } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'

import ProfileAvatarForm from '@/feature/profile/ui/ProfileAvatarForm'
import ProfileAvatar from '@/feature/profile/ui/ProfileAvatar'

type Props = {
  src: string
}

const ProfileAvatarGroup: FC<Props> = ({ src }) => {
  return (
    <BaseBox display="flex">
      <ProfileAvatar src={src} />
      <ProfileAvatarForm />
    </BaseBox>
  )
}

export default ProfileAvatarGroup
