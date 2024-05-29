import { ChangeEvent, FormEvent } from 'react'

// TODO: feature/cfg-23 расписать для second_name и тд ?
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

export type TextFieldProps = {
  name: string
  label: string
}

export type InputProps = RegisterFormFieldProps & TextFieldProps
export type AllFormProps = InputProps & RegisterFormProps
