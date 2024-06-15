import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAuth, getLoading } from '@/entities/user/model/selector'

import { useLazyGetUserQuery } from '@/feature/session/api/authApi'

export const usePublicAuth = () => {
  const isAuth = useSelector(getAuth)
  const [getUser] = useLazyGetUserQuery()
  const isLoading = useSelector(getLoading)

  useEffect(() => {
    getUser()
  }, [getUser])

  return { isAuth, isLoading }
}
