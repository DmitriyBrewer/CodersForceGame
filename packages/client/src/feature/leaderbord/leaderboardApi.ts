import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'

import { Leader } from '@/entities/leaderboard/model'

const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include'
})

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> = async (
  args,
  api,
  extraOptions
) => {
  const result = await customFetchBaseQuery(args, api, extraOptions)

  return result
}

interface GetLeaderboardResponse {
  leaders: Leader[]
}

interface GetLeaderboardRequest {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery,
  endpoints: builder => ({
    submitScore: builder.mutation<{ message: string }, { data: object; ratingFieldName: string; teamName: string }>({
      query: scoreData => {
        return {
          url: '/leaderboard',
          method: 'POST',
          body: scoreData
        }
      }
    }),
    getLeaderboard: builder.query<GetLeaderboardResponse, GetLeaderboardRequest>({
      query: params => ({
        url: '/leaderboard/all',
        method: 'POST',
        body: params
      })
    })
  })
})

export const { useSubmitScoreMutation, useGetLeaderboardQuery } = leaderboardApi
export default leaderboardApi
