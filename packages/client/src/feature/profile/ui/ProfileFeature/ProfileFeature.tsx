import { FC } from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import ProfileAvatar from '@/feature/profile/ui/ProfileAvatarGroup'
import ProfilePassword from '@/feature/profile/ui/ProfilePassword'
import ProfileForm from '@/feature/profile/ui/ProfileForm'
import ProfileFields from '@/feature/profile/ui/ProfileFields'
import { useProfile } from '@/feature/profile/hooks/useProfile'

const ProfileFeature: FC = () => {
  const { loading, fields, userData } = useProfile()
  return loading ? (
    <BaseLoader />
  ) : (
    <ProfileForm>
      <ProfileAvatar src={userData?.avatar ?? ''} />
      <ProfileFields fields={fields} userData={userData} />
      <ProfilePassword />
    </ProfileForm>
  )
}
export default ProfileFeature
