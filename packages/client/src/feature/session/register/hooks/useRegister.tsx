import { useState } from 'react'

import { RegisterError, RegisterPayload } from '../types'

export const useRegister = () => {
  const [formData, setFormData] = useState<RegisterPayload>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: ''
  })

  const [errors, setErrors] = useState<RegisterError>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: ''
  })

  const isValidEmail = (email: string) => {
    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegExp.test(email)
  }

  const isValidPhone = (phone: string) => {
    const phoneRegExp = /^\+\d{1,3}\d{10}$/
    return phoneRegExp.test(phone)
  }

  const isValidPassword = (password: string) => {
    const emailRegExp = /^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,40}$/
    return emailRegExp.test(password)
  }

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        return isValidEmail(value) ? '' : 'Некорректный email. Ожидается формат example@mail.com'
      case 'password':
        return isValidPassword(value) ? '' : 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
      case 'phone':
        return isValidPhone(value) ? '' : 'Некорректный номер телефона. Ожидается формат +1234567890'
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  // api backend
  // TODO:
  console.log(formData)

  return {
    formData,
    handleChange,
    errors,
    handleSubmit
  }
}
