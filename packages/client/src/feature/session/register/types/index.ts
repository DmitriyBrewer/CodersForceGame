
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

export type TextFieldProps = {
  name: string
  pattern?: string
}

export type RegisterResponse = string | { reason: string }
