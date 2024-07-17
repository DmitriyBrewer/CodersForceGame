export type LoginPayload = {
  code: string
  redirect_uri: string
}

export type LoginResponse = {
  service_id: string
}
