export type LoginResponse = 'OK' | { reason: string }

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
