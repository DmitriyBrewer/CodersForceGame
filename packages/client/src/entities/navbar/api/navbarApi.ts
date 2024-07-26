import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'

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

  if (result.error && result.error.status === 200 && result.error.data === 'OK') {
    return { data: 'OK' }
  }

  return result
}

export const navbarApiSlice = createApi({
  reducerPath: 'navbarApi',
  baseQuery,
  endpoints: builder => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST'
      })
    })
  })
})

export const { useLogoutMutation } = navbarApiSlice
