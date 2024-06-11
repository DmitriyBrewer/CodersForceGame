import { useEffect, useState } from 'react'

import fetchInstance from '@/shared/api/fetchInstance'

type nullable<T> = T | null

export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export type Field = {
  name: keyof User
  label: string
}

export const useProfile = () => {
  const [userData, setUserData] = useState<nullable<User>>(null)
  const [error, setError] = useState<nullable<Error>>(null)
  const [loading, setLoading] = useState(true)

  // TODO: feature/cfg-25 fetch to times
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchInstance('/auth/user')
        setUserData(data)
      } catch (err: any) {
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
