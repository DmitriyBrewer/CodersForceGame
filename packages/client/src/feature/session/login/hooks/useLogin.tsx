import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { validateField } from '@/shared/components/core/FormData/model/validateField'

import { setError, setLoading } from '@/entities/user/model'

import { useLazyGetUserQuery, useLoginMutation } from '../../api/authApi'
import { LoginApiError, LoginError, LoginPayload } from '../types'

export const useLogin = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    login: '',
    password: ''
  })

  const [errors, setErrors] = useState<LoginError>({
    login: '',
    password: ''
  })

  const isError = Object.values(errors).some(error => error !== '')

  const [login] = useLoginMutation()
  const [getUser] = useLazyGetUserQuery()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value, formData.password) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setLoading(true))
    try {
      const loginResult = await login(formData).unwrap()
      if (loginResult) {
        await getUser()
        navigate('/')
      }
    } catch (err) {
      const typedError = err as LoginApiError
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
