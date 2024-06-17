import { useEffect, useState } from 'react'

import fetchInstance from '@/shared/api/fetchInstance'

import { Field, nullable, User } from '@/feature/profile/types'

export const useProfile = () => {
  // TODO: feature/cfg-82 убргать в задаче feature/cfg-80 userData в redux + rtk и при успешном await profileApi.updateAvatar(formData) обновлять user
  const [userData, setUserData] = useState<nullable<User>>(null)
  const [error, setError] = useState<nullable<unknown>>(null)
  const [loading, setLoading] = useState(true)

  // TODO: feature/cfg-25 fetch two times
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: feature/cfg-25 replace to store
        const data = await fetchInstance('/auth/user')
        setUserData(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const fields: Field[] = [
    { label: 'Имя', name: 'first_name', id: 1 },
    { label: 'Фамилия', name: 'second_name', id: 2 },
    { label: 'Логин', name: 'login', id: 3 },
    { label: 'Email', name: 'email', id: 4 },
    { label: 'Телефон', name: 'phone', id: 5 }
  ]

  return { userData, error, loading, fields }
}
