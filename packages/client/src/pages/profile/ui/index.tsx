import { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import ProfileWidget from '@/widgets/profile/ui'
import { useAppDispatch } from '@/shared/store'
import { fetchUserThunk } from '@/entities/user/model'

const ProfilePage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserThunk())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Профиль</title>
      </Helmet>
      <ProfileWidget />
    </>
  )
}

export default ProfilePage
