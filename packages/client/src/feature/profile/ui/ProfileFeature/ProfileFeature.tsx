import { FC } from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import ProfileForm from '@/feature/profile/ui/ProfileForm'
import ProfileFields from '@/feature/profile/ui/ProfileFields'
import { useProfile } from '@/feature/profile/hooks/useProfile'
import ProfileHeader from '@/feature/profile/ui/ProfileHeader'

const ProfileFeature: FC = () => {
  const { loading, fields, userData } = useProfile()
  return loading ? (
    <BaseLoader />
  ) : (
    <ProfileForm>
      <ProfileHeader />
      <ProfileFields fields={fields} userData={userData} />
    </ProfileForm>
  )
}
export default ProfileFeature
