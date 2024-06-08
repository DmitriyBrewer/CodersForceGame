import { ChangeEvent } from 'react'

import { BaseTextFieldProps } from '@/shared/types'

export type FormDataPayload = {
  [key: string]: string
}

export type FormDataError = {
  [key: string]: string
}

type FormDataField = {
  formData: FormDataPayload
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: FormDataError
}

export type TextFieldProps = {
  name: string
  pattern?: string
}

export type InputProps = FormDataField & TextFieldProps & BaseTextFieldProps
