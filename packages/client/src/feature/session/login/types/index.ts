export type LoginResponse = string | { reason: string } | unknown

export type LoginPayload = {
  login: string
  password: string
}

export type LoginError = {
  [key: string]: string
}

export type LoginApiError = {
  data: {
    reason: string
  }
}
