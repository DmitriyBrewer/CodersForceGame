export type PasswordPayload = {
  oldPassword: string
  newPassword: string
}

export type nullable<T> = T | null

export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export type Field = {
  name: keyof User
  label: string
}
