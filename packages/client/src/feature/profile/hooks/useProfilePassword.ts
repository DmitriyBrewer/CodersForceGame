import { ChangeEvent, FormEvent, useState } from 'react'

import { useDispatch } from 'react-redux'

import { ApiError } from 'src/shared/api/types'

import { FormDataError } from '@/shared/types'
import { validateField } from '@/shared/components/core/FormData/model/validateField'

import { setError } from '@/entities/user/model'

import profileApi from '@/feature/profile/api/profileApi'
import { PasswordPayload } from '@/feature/profile/types'

export const useProfilePassword = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<PasswordPayload>({
    oldPassword: '',
    newPassword: ''
  })

  const [isLoading, setLoading] = useState(false)

  const [errors, setErrors] = useState<FormDataError>({
    oldPassword: '',
    newPassword: ''
  })

  const [open, setOpen] = useState<boolean>(false)

  const isError = Object.values(errors).some(error => error !== '')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value, formData.oldPassword) })
  }

  // TODO: feature/cfg-25 add global snackbar after change
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    try {
      await profileApi.updatePassword(formData)
      setOpen(false)
    } catch (err) {
      const typedError = err as ApiError
      const errorText = typedError?.reason ?? 'Неизвестная ошибка'
      dispatch(setError(errorText))
    } finally {
      setLoading(false)
    }
  }
  const inputProps = { formData, handleChange, errors }

  return {
    inputProps,
    handleSubmit,
    isError,
    isLoading,
    open,
    setOpen
  }
}