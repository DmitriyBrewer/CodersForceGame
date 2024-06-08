import { ChangeEvent } from 'react'

import { BaseTextFieldProps } from '@/shared/types'

export type RegisterPayload = {
  first_name: string
  second_name: string
  phone: string
  login: string
  email: string
  password: string
  password_repeat?: string
}

export type RegisterError = {
  [key: string]: string
}

export type RegisterApiError = {
  data: {
    reason: string
  }
}
type RegisterFormField = {
  formData: RegisterPayload
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: RegisterError
}

export type TextFieldProps = {
  name: string
  pattern?: string
}

export type InputProps = RegisterFormField & TextFieldProps & BaseTextFieldProps

export type RegisterResponse = string | { reason: string }
