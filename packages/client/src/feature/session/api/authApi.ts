import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { User } from '@/entities/user/types'

import { RegisterResponse, RegisterPayload } from '../register/types'
import { LoginPayload, LoginResponse } from '../login/types'

// так как API авторизации яндекса отвечает не JSON-ом, чтобы RTK Query не валился с ошибкой
const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/auth',
    credentials: 'include'
  })

  const result = await rawBaseQuery(args, api, extraOptions)

  if (result.error) {
    return result
  }

  if (!result.meta?.response?.ok) {
    return {
      error: {
        status: result.meta?.response?.status || 500,
        statusText: result.meta?.response?.statusText || 'Unknown error',
        data: result.data
      }
    }
  }

  if (result.data === 'OK') {
    result.data = { message: 'OK' }
  }

  return result
}

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: credentials => ({
        url: '/signup',
        method: 'POST',
        body: credentials
      })
    }),
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: credentials => ({
        url: '/signin',
        method: 'POST',
        body: credentials
      })
    }),
    getUser: builder.query<User, void>({
      query: () => '/user'
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST'
      })
    })
  })
})

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useLogoutMutation, useLazyGetUserQuery } =
  authApiSlice
