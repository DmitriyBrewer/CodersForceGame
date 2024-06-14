import { ChangeEvent, FC } from 'react'

import ProfileAvatarButton from '@/feature/profile/ui/ProfileAvatarButton'
import ProfileFileInput from '@/feature/profile/ui/ProfileFileInput'

type Props = {
  fileChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ProfileAvatarForm: FC<Props> = ({ fileChange }) => {
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
