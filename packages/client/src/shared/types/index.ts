import { TypographyProps, TextFieldProps } from '@mui/material'
import { ChangeEvent } from 'react'

import { AppState } from '@/shared/store'

export type BaseTypographyProps = TypographyProps
type BaseTextFieldProps = TextFieldProps

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

export type InputFieldProps = {
  name: string
  pattern?: string
}

export type InputProps = FormDataField & InputFieldProps & BaseTextFieldProps

export type RenderResult = {
  appHtml: string
  preloadedState: AppState
}
