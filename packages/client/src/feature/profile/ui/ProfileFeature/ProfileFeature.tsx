import { FC } from 'react'

import { useSelector } from 'react-redux'

import { getUser } from '@/entities/user/model/selector'

import ProfileForm from '@/feature/profile/ui/ProfileForm'
import ProfileFields from '@/feature/profile/ui/ProfileFields'
import { useProfile } from '@/feature/profile/hooks/useProfile'
import ProfileHeader from '@/feature/profile/ui/ProfileHeader'

const ProfileFeature: FC = () => {
  const user = useSelector(getUser)
  const { fields } = useProfile()

  return (
    <ProfileForm>
      <ProfileHeader />
      <ProfileFields fields={fields} userData={userData} />
    </ProfileForm>
  )
}
export default ProfileFeature
