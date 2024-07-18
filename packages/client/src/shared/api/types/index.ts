export type ApiResponse = string | { reason: string }
export type ApiError = {
  reason: string
}

export type SimpleResponse = string | { reason: string } | unknown
