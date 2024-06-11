import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getAuth } from '@/entities/user/model/selector'

export const usePublicAuth = () => {
  const isAuth = useSelector(getAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/game') // путь до главной страницы игры
    }
  }, [isAuth, navigate])

  return { isAuth }
}
