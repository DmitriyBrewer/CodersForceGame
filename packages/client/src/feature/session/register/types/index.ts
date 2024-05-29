import { ChangeEvent } from 'react'

export type RegisterPayload = {
  [key: string]: string
}

export type RegisterError = {
  [key: string]: string
}

export type InputProps = {
  formData: RegisterPayload
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: RegisterError
  name: string
  label: string
}
