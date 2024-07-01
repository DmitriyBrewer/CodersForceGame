import { createApi } from '@reduxjs/toolkit/query/react'

import { User } from '@/entities/user/types'

import { baseQuery } from '@/shared/api/baseQuery'

import { RegisterResponse, RegisterPayload } from '../register/types'
import { LoginPayload, LoginResponse } from '../login/types'

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: credentials => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials
      })
    }),
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: credentials => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials
      })
    }),
    getUser: builder.query<User, void>({
      query: () => '/auth/user'
    })
  })
})

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useLazyGetUserQuery } = authApiSlice
