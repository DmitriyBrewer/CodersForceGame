import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import { useLogoutMutation } from '../api/navbarApi'

export const useLogout = () => {
  const [error, setError] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const isError = error !== ''

  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    setLoading(true)

    try {
      const result = await logout()
      if (result) {
        navigate(paths.login)
      }
    } catch (err) {
      setError('Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  return {
    isError,
    isLoading,
    handleLogout,
    error
  }
}
