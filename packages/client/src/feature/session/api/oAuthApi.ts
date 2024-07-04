import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '@/shared/api/baseQuery'

import { SimpleResponse } from '@/shared/api/types'

import { REDIRECT_URI } from '@/shared/api/constant'

import { LoginPayload, LoginResponse } from '@/feature/session/o-auth/types'

export const oAuthApiSlice = createApi({
  reducerPath: 'oAuthApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: builder => ({
    login: builder.mutation<SimpleResponse, LoginPayload>({
      query: payload => ({
        url: '/oauth/yandex',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['User']
    }),
    getClientId: builder.mutation<LoginResponse, void>({
      query: () => `/oauth/yandex/service-id?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
    })
  })
})

export const { useGetClientIdMutation, useLoginMutation } = oAuthApiSlice
