import { ChangeEvent, FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { setAuthUser, setError, setLoading } from '@/entities/user/model'

import { RegisterApiError, RegisterError, RegisterPayload } from '../types'
import { validateField } from '../model/validateField'
import { useLazyGetUserQuery, useRegisterMutation } from '../../api/authApi'

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
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value, formData.password) })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(setLoading(true))
    try {
      const registerResult = await register({ ...formData }).unwrap()
      if (registerResult) {
        const userResult = await getUser().unwrap()
        dispatch(setAuthUser(userResult))
        navigate('/')
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
