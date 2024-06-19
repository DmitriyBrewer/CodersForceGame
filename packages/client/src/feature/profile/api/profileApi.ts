import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react'

import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'

import fetchInstance from '@/shared/api/fetchInstance'

import { User } from '@/entities/user/types'

import { ApiResponse } from '@/shared/api/types'

import { PasswordPayload } from '@/feature/profile/types'

// TODO: remove profileApi
const profileApi = {
  async updateAvatar(body: FormData) {
    const response = await fetchInstance('/user/profile/avatar', { method: 'PUT', body })
    return response
  },
  async updatePassword(body: PasswordPayload) {
    const headers = new Headers({ 'content-type': 'application/json' })
    const response = await fetchInstance(
      '/user/password',
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers
      },
      false
    )
    return response
  }
}

const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include'
})
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const result = await customFetchBaseQuery(args, api, extraOptions)

  // так как API авторизации яндекса отвечает не JSON-ом, чтобы RTK Query не валился с ошибкой
  // @ts-ignore: в типе FetchBaseQueryError нет originalStatus
  if (result.error && result.error.originalStatus === 200 && result.error.data === 'OK') {
    return { data: 'OK' }
  }

  return result
}

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  endpoints: builder => ({
    updatePassword: builder.mutation<ApiResponse, PasswordPayload>({
      query: payload => ({
        url: '/user/password',
        method: 'PUT',
        body: payload
      })
    }),
    updateAvatar: builder.mutation<User, FormData>({
      query: payload => ({
        url: '/user/profile/avatar',
        method: 'PUT',
        body: payload
      })
    })
  })
})

export const { useUpdateAvatarMutation, useUpdatePasswordMutation } = profileApiSlice
export default profileApi
