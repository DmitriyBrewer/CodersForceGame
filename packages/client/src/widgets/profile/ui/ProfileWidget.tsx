import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import ProfileFeature from '@/feature/profile/ui'

const ProfileWidget: FC = () => {
  return (
    <BaseContainer>
      <ProfileFeature />
    </BaseContainer>
  )
}

export default ProfileWidget
