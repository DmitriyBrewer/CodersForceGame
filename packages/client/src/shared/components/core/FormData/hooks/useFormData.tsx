import { ChangeEvent, FormEvent, useState } from 'react'

import { validateField } from '../model/validateField'

import { FormDataError, FormDataPayload } from '../types'

export const useFormData = (initialState: FormDataPayload) => {
  const [formData, setFormData] = useState<FormDataPayload>(initialState)
  const [errors, setErrors] = useState<FormDataError>(
    Object.keys(initialState).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {} as FormDataError)
  )

  const isError = Object.values(errors).some(error => error !== '')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value, formData.password) })
  }

  const handleSubmit = (e: FormEvent, callback: (data: FormDataPayload) => void) => {
    e.preventDefault()
    if (!isError) {
      callback(formData)
    }
  }

  const inputProps = { formData, handleChange, errors }

  return {
    inputProps,
    handleSubmit,
    isError
  }
}
