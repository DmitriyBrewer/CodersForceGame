import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '@/shared/api/baseQuery'

import { SimpleResponse } from '@/shared/api/types'

import { REDIRECT_URI } from '@/shared/api/constant'

import { setError } from '@/entities/error'

import { authApiSlice } from '@/entities/session/api/authApi'

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
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(authApiSlice.util.invalidateTags(['User']))
        } catch (e) {
          dispatch(setError('Ошибка авторизации через яндекс!'))
          console.error(e)
        }
      }
    }),
    getClientId: builder.mutation<LoginResponse, void>({
      query: () => `/oauth/yandex/service-id?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
    })
  })
})

export const { useGetClientIdMutation, useLoginMutation } = oAuthApiSlice
