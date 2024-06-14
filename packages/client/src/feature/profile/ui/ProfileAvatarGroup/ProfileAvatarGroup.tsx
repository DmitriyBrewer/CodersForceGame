import { FC } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'

import ProfileAvatarForm from '@/feature/profile/ui/ProfileAvatarForm'
import ProfileAvatar from '@/feature/profile/ui/ProfileAvatar'
import useProfileAvatar from '@/feature/profile/hooks/useProfileAvatar'

type Props = {
  src: string
}

const ProfileAvatarGroup: FC<Props> = ({ src }) => {
  const { fileChange } = useProfileAvatar()

  // TODO: get src from store
  return (
    <BaseBox display="flex">
      <ProfileAvatar src={src} />
      <ProfileAvatarForm fileChange={fileChange} />
    </BaseBox>
  )
}

export default ProfileAvatarGroup
