import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAuth, getLoading } from '@/entities/user/model/selector'

import { useLazyGetUserQuery } from '@/feature/session/api/authApi'

export const useAuth = () => {
  const isAuth = useSelector(getAuth)
  const isLoading = useSelector(getLoading)
  const [getUser] = useLazyGetUserQuery()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser()
      } catch (err) {
        console.log(err)
      }
    }

    if (!isAuth) {
      fetchUser()
    }
  }, [isAuth, getUser])

  return { isAuth, isLoading }
}
