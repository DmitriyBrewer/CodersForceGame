import { useEffect, useRef } from 'react'

import { useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { REDIRECT_URI } from '@/shared/api/constant'

import { useGetClientIdMutation, useLoginMutation } from '@/feature/session/api/oAuthApi'
import { useLazyGetUserQuery } from '@/feature/session/api/authApi'
import { useAuth } from '@/app/router/hooks/useAuth'

export const useOAuth = () => {
  const [getClientId] = useGetClientIdMutation()
  const [login] = useLoginMutation()
  const [getUser] = useLazyGetUserQuery()
  const location = useLocation()
  const dispatch = useDispatch()
  const { isAuth } = useAuth()
  const isInitialMount = useRef(true)

  const handleOAuth = async () => {
    try {
      const { data } = await getClientId()
      if (!data) {
        return
      }
      const { service_id: clientId } = data
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${REDIRECT_URI}`
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!isInitialMount.current) {
      return
    }

    const params = new URLSearchParams(location.search)
    const authCode = params.get('code')

    const loginHandle = async (code: string) => {
      try {
        const payload = {
          code,
          redirect_uri: REDIRECT_URI
        }
        await login(payload)
      } catch (err) {
        console.error(err)
      }
    }

    if (authCode && !isAuth) {
      loginHandle(authCode)
    }
    isInitialMount.current = false
  }, [isAuth, getUser, login, location, dispatch])

  return { handleOAuth }
}
