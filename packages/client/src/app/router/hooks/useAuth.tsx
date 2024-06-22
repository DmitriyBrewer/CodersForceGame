import { useSelector } from 'react-redux'

import { getAuth } from '@/entities/user/model/selector'

import { useGetUserQuery } from '@/feature/session/api/authApi'

export const useAuth = () => {
  const isAuth = useSelector(getAuth)
  const { data, error, isLoading } = useGetUserQuery()

  return { isAuth, isLoading, user: data, error }
}
