import { TextFieldProps } from '@mui/material'
import { ChangeEvent, FormEvent } from 'react'

export type RegisterPayload = {
  [key: string]: string
}

export type RegisterError = {
  [key: string]: string
}

export type RegisterFormProps = {
  handleSubmit: (e: FormEvent<Element>) => void
}

export type RegisterFormFieldProps = {
  formData: RegisterPayload
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: RegisterError
}

export type BaseTextFieldProps = {
  name: string
}

export type InputProps = RegisterFormFieldProps & BaseTextFieldProps & TextFieldProps
export type AllFormProps = InputProps & RegisterFormProps
