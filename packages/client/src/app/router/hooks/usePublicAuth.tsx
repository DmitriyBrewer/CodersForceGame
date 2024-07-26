import { useGetUserQuery } from '@/entities/session/api/authApi'

export const usePublicAuth = () => {
  const { data, error, isLoading } = useGetUserQuery()

  return { isLoading, user: data, error }
}
