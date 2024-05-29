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

  const isValidName = (name: string) => {
    const nameRegExp = /^([А-ЯЁA-Z][а-яёa-z]*-?[А-ЯЁA-Z]?[а-яёa-z]*)$/
    return nameRegExp.test(name)
  }

  const isValidLogin = (login: string) => {
    const loginRegExp = /^(?=.*[a-zA-Z])(?=.*\\d?)[a-zA-Z\\d_\\-]{3,20}$/
    return loginRegExp.test(login)
  }

  const isValidEmail = (email: string) => {
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/
    return emailRegExp.test(email)
  }

  const isValidPhone = (phone: string) => {
    const phoneRegExp = /^\\+?\\d{10,15}$/
    return phoneRegExp.test(phone)
  }

  const isValidPassword = (password: string) => {
    const passwordRegExp = /^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,40}$/
    return passwordRegExp.test(password)
  }

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'first_name':
        return isValidName(value) ? '' : 'Первая буква должна быть заглавной'
      case 'second_name':
        return isValidName(value) ? '' : 'Первая буква должна быть заглавной'
      case 'login':
        return isValidLogin(value) ? '' : 'Логин введен неверно, от 3 до 20 символов'
      case 'email':
        return isValidEmail(value) ? '' : 'Некорректный email. Ожидается формат example@mail.com'
      case 'password':
        return isValidPassword(value) ? '' : 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
      case 'phone':
        return isValidPhone(value) ? '' : 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.'
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

  // TODO:feature/cfg-23 удалить console.log и добавить api backend
  console.log(formData)
  const inputProps = { formData, handleChange, errors }

  return {
    inputProps,
    handleSubmit
  }
}
