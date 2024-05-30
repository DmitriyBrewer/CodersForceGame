import { useState } from 'react'

import { RegisterError, RegisterPayload } from '../types'
import { validateField } from '../model/validateField'

export const useRegister = () => {
  const [formData, setFormData] = useState<RegisterPayload>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
    password_repeat: ''
  })

  const [errors, setErrors] = useState<RegisterError>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
    password_repeat: ''
  })

  const isError = Object.values(errors).some(error => error !== '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value, formData.password) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO:feature/cfg-23 удалить console.log и добавить api backend
    console.log(`Отправка формы... ${formData}`)
  }

  const inputProps = { formData, handleChange, errors }

  return {
    inputProps,
    handleSubmit,
    isError
  }
}