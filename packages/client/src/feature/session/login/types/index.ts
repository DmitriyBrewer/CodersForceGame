import { User } from '@/entities/user/types'

export type LoginResponse = {
  token: string
  user: User
}
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
