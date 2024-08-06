import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import DOMPurify from 'dompurify'

import { setLoading } from '@/entities/user/model'
import { validateField } from '@/shared/components/core/FormData/model/validateField'
import { paths } from '@/shared/config/routing'
import { clearError, setError } from '@/entities/error'

import { RegisterApiError, RegisterError, RegisterPayload } from '../types'
import { useLazyGetUserQuery, useRegisterMutation } from '../../../../entities/session/api/authApi'

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

  const [register] = useRegisterMutation()
  const [getUser] = useLazyGetUserQuery()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const sanitizedValue = DOMPurify.sanitize(value)

    setFormData({ ...formData, [name]: sanitizedValue })
    setErrors({ ...errors, [name]: validateField(name, sanitizedValue, formData.password) })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(setLoading(true))
    try {
      const registerResult = await register({ ...formData }).unwrap()
      if (registerResult) {
        await getUser()
        dispatch(clearError())
        navigate(paths.game)
      }
    } catch (err) {
      const typedError = err as RegisterApiError
      dispatch(setError(typedError.data.reason))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const inputProps = { formData, handleChange, errors }

  return {
    inputProps,
    handleSubmit,
    isError
  }
}
