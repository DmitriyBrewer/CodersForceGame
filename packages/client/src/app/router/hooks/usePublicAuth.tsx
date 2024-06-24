import { useGetUserQuery } from '@/feature/session/api/authApi'

export const usePublicAuth = () => {
  const { data, error, isLoading } = useGetUserQuery()

  return { isLoading, user: data, error }
}
