import { FC } from 'react'

import ProfileAvatarButton from '@/feature/profile/ui/ProfileAvatarButton'
import ProfileFileInput from '@/feature/profile/ui/ProfileFileInput'
import useProfileAvatar from '@/feature/profile/hooks/useProfileAvatar'

const ProfileAvatarForm: FC = () => {
  const { fileChange } = useProfileAvatar()

  return (
    <form id="profile-avatar-form" onSubmit={e => e.preventDefault()}>
      <ProfileAvatarButton>
        Изменить
        <ProfileFileInput onChange={fileChange} />
      </ProfileAvatarButton>
    </form>
  )
}

export default ProfileAvatarForm
