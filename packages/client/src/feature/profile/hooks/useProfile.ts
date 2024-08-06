import { Field } from '@/feature/profile/types'

export const useProfile = () => {
  const fields: Field[] = [
    { label: 'Имя', name: 'first_name', id: 1 },
    { label: 'Фамилия', name: 'second_name', id: 2 },
    { label: 'Логин', name: 'login', id: 3 },
    { label: 'Email', name: 'email', id: 4 },
    { label: 'Телефон', name: 'phone', id: 5 }
  ]

  return { fields }
}
