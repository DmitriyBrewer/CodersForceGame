import { useEffect, useState } from 'react'

import fetchInstance from '@/shared/api/fetchInstance'

import { Field, nullable, User } from '@/feature/profile/types'

export const useProfile = () => {
  const [userData, setUserData] = useState<nullable<User>>(null)
  const [error, setError] = useState<nullable<unknown>>(null)
  const [loading, setLoading] = useState(true)

  // TODO: feature/cfg-25 fetch two times
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: replace to store
        const data = await fetchInstance<User>('/auth/user')
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
    { label: 'Имя', name: 'first_name' },
    { label: 'Фамилия', name: 'second_name' },
    { label: 'Логин', name: 'login' },
    { label: 'Email', name: 'email' },
    { label: 'Телефон', name: 'phone' }
  ]

  return { userData, error, loading, fields }
}
