import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'

import { User } from '@/entities/user/types'

import { RegisterResponse, RegisterPayload } from '../register/types'
import { LoginPayload, LoginResponse } from '../login/types'

const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: 'https://ya-praktikum.tech/api/v2/auth',
  credentials: 'include'
})

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> = async (
  args,
  api,
  extraOptions
) => {
  const result = await customFetchBaseQuery(args, api, extraOptions)

  // так как API авторизации яндекса отвечает не JSON-ом, чтобы RTK Query не валился с ошибкой
  // @ts-ignore: в типе FetchBaseQueryError нет originalStatus
  if (result.error && result.error.originalStatus === 200 && result.error.data === 'OK') {
    return { data: 'OK' }
  }

  return result
}

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery,
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
