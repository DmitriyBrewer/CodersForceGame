import React, { ChangeEvent, FC, FormEvent } from 'react'

import ProfileAvatarButton from '@/feature/profile/ui/ProfileAvatarButton'
import ProfileFileInput from '@/feature/profile/ui/ProfileFileInput'

type Props = {
  fileChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}

const submitHandle = (e: FormEvent) => e.preventDefault()

const ProfileAvatarForm: FC<Props> = ({ fileChange, isLoading }) => {
  return (
    <form id="profile-avatar-form" onSubmit={submitHandle}>
      <ProfileAvatarButton disabled={isLoading}>
        Изменить аватар
        <ProfileFileInput onChange={fileChange} />
      </ProfileAvatarButton>
    </form>
  )
}

export default ProfileAvatarForm
