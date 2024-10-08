import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'

import { AddCommentRequest, Comment, GetTopicsResponse, NewTopic } from '@/shared/forum/types'
import { Topic } from '@/entities/topic/types'

const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:9000/api'
})

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> = async (
  args,
  api,
  extraOptions
) => {
  const result = await customFetchBaseQuery(args, api, extraOptions)
  return result
}

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery,
  endpoints: builder => ({
    getTopics: builder.query<GetTopicsResponse, void>({
      query: () => ({
        url: 'topics',
        method: 'GET'
      })
    }),

    createTopic: builder.mutation<Topic, NewTopic>({
      query: newTopic => ({
        url: 'topics',
        method: 'POST',
        body: newTopic
      })
    }),
    addComment: builder.mutation<Comment, AddCommentRequest>({
      query: ({ topicId, comment, author, date, replyToId }) => ({
        url: `comments/${topicId}`,
        method: 'POST',
        body: { comment, author, date, replyToId }
      })
    }),
    getComments: builder.query<Comment[], number>({
      query: topicId => ({
        url: `comments/${topicId}`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetTopicsQuery,
  useCreateTopicMutation,
  useAddCommentMutation,
  useLazyGetTopicsQuery,
  useGetCommentsQuery,
  useLazyGetCommentsQuery
} = forumApi

export default forumApi
