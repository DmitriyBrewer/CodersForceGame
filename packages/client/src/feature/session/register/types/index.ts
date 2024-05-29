import { ChangeEvent } from 'react'

import { BaseTextFieldProps } from '@/shared/types'

export type RegisterPayload = {
  [key: string]: string
}

export type RegisterError = {
  [key: string]: string
}

type RegisterFormField = {
  formData: RegisterPayload
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: RegisterError
}

export type TextFieldProps = {
  name: string
}

export type InputProps = RegisterFormField & TextFieldProps & BaseTextFieldProps
