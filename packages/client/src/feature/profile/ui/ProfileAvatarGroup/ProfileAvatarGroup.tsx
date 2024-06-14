import React, { FC } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'

import BaseSnackbar from '@/shared/components/ui/BaseSnackbar'

import ProfileAvatarForm from '@/feature/profile/ui/ProfileAvatarForm'
import ProfileAvatar from '@/feature/profile/ui/ProfileAvatar'
import useProfileAvatar from '@/feature/profile/hooks/useProfileAvatar'

type Props = {
  src: string
}

const ProfileAvatarGroup: FC<Props> = ({ src }) => {
  const { fileChange, isError, isLoading } = useProfileAvatar()

  // TODO: feature/cfg-25 get src from store
  return (
    <BaseBox display="flex">
      <ProfileAvatar src={src} />
      <ProfileAvatarForm isError={isError} isLoading={isLoading} fileChange={fileChange} />
      {/* TODO: feature/cfg-25 move to global snackbar
       */}
      <BaseSnackbar open={isError} message="Ошибка изменения аватара!" />
    </BaseBox>
  )
}

export default ProfileAvatarGroup
