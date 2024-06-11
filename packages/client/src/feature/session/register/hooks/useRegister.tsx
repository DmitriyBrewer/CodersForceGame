import { useState } from 'react'

import { FormDataError, FormDataPayload } from '@/shared/types'
import { validateField } from '@/shared/components/core/FormData/model/validateField'

export const useRegister = () => {
  const [formData, setFormData] = useState<FormDataPayload>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
    password_repeat: ''
  })

  const [errors, setErrors] = useState<FormDataError>({
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
    console.log(`Отправка формы... \n ${JSON.stringify(formData, null, 2)}`)
  }

  const inputProps = { formData, handleChange, errors }

  return {
    inputProps,
    handleSubmit,
    isError
  }
}
