import { FC } from 'react'

import { useSelector } from 'react-redux'

import ThemeSwitcherButton from '@/shared/components/core/ThemeSwitcherButton'

import { getUser } from '@/entities/user/model/selector'

import ProfileAvatar from '@/feature/profile/ui/ProfileAvatarGroup'
import ProfilePassword from '@/feature/profile/ui/ProfilePassword'
import styles from './ProfileHeader.module.scss'

const ProfileHeader: FC = () => {
  const user = useSelector(getUser)
  return (
    <div className={styles.root}>
      <ProfileAvatar src={user?.avatar ?? ''} />
      <ProfilePassword />
      <ThemeSwitcherButton />
    </div>
  )
}

export default ProfileHeader
