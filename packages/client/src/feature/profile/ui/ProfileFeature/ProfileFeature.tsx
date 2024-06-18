import { FC } from 'react'

import { useSelector } from 'react-redux'

import { getUser } from '@/entities/user/model/selector'

import ProfileAvatar from '@/feature/profile/ui/ProfileAvatarGroup'
import ProfilePassword from '@/feature/profile/ui/ProfilePassword'
import ProfileForm from '@/feature/profile/ui/ProfileForm'
import ProfileFields from '@/feature/profile/ui/ProfileFields'
import { useProfile } from '@/feature/profile/hooks/useProfile'

const ProfileFeature: FC = () => {
  const user = useSelector(getUser)
  const { fields } = useProfile()

  return (
    <ProfileForm>
      <ProfileAvatar src={user?.avatar ?? ''} />
      <ProfileFields fields={fields} userData={user} />
      <ProfilePassword />
    </ProfileForm>
  )
}
export default ProfileFeature
