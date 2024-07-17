import { FC } from 'react'

import ThemeSwitcherButton from '@/shared/components/core/ThemeSwitcherButton'

import ProfileAvatar from '@/feature/profile/ui/ProfileAvatarGroup'
import ProfilePassword from '@/feature/profile/ui/ProfilePassword'
import { useProfile } from '@/feature/profile/hooks/useProfile'
import styles from './ProfileHeader.module.scss'

const ProfileHeader: FC = () => {
  const { userData } = useProfile()
  return (
    <div className={styles.root}>
      <ProfileAvatar src={userData?.avatar ?? ''} />
      <ProfilePassword />
      <ThemeSwitcherButton />
    </div>
  )
}

export default ProfileHeader
