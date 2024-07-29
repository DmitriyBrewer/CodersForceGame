import { createApi } from '@reduxjs/toolkit/query/react'

import { User } from '@/entities/user/types'

import { baseQuery } from '@/shared/api/baseQuery'

import { RegisterResponse, RegisterPayload } from '../../../feature/session/register/types'
import { LoginPayload, LoginResponse } from '../../../feature/session/login/types'

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
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
      query: () => '/auth/user',
      providesTags: ['User']
    })
  })
})

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useLazyGetUserQuery } = authApiSlice
