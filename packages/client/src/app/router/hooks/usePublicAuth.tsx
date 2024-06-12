import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getAuth, getLoading } from '@/entities/user/model/selector'
import { paths } from '@/shared/config/routing'

import { useLazyGetUserQuery } from '@/feature/session/api/authApi'

export const usePublicAuth = () => {
  const isAuth = useSelector(getAuth)
  const navigate = useNavigate()
  const [getUser] = useLazyGetUserQuery()
  const isLoading = useSelector(getLoading)

  useEffect(() => {
    if (isAuth) {
      navigate(paths.game)
    }
  }, [isAuth, navigate])

  useEffect(() => {
    getUser()
  }, [getUser])

  return { isAuth, isLoading }
}
