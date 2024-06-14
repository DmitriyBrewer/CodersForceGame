import { useState } from 'react'

import { FormDataError } from '@/shared/types'
import { validateField } from '@/shared/components/core/FormData/model/validateField'

import profileApi from '@/feature/profile/api/profileApi'
import { PasswordPayload } from '@/feature/profile/types'

export const useProfilePassword = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value, formData.newPassword) })
  }

  // TODO: add snackbar after change
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      await profileApi.updatePassword(formData)
      setOpen(false)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
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
