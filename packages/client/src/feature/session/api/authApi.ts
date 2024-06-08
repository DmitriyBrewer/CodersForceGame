import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { User } from '@/entities/user/types'

import { RegisterResponse, RegisterPayload } from '../register/types'

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/auth',
    credentials: 'include'
  }),
  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: credentials => ({
        url: '/signup',
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

export const { useRegisterMutation, useGetUserQuery, useLogoutMutation, useLazyGetUserQuery } = authApiSlice
