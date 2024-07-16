import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'

interface Topic {
  id: number
  title: string
  autor: string
  lastMessageDate: string
}

interface NewTopic {
  title: string
  autor: string
  content: string
}

interface Comment {
  id: number
  topicId: number
  content: string
  author: string
  date: string
}

interface GetTopicsResponse {
  topics: Topic[]
}

interface GetTopicDetailsResponse {
  topic: Topic
  comments: Comment[]
}

interface AddCommentRequest {
  topicId: number
  content: string
  author: string
}

const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
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
    getTopicDetails: builder.query<GetTopicDetailsResponse, number>({
      query: topicId => ({
        url: `topics/${topicId}`,
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
      query: ({ topicId, content, author }) => ({
        url: `comments/${topicId}`,
        method: 'POST',
        body: { content, author }
      })
    }),
    deleteComment: builder.mutation<void, { topicId: number; commentId: number }>({
      query: ({ topicId, commentId }) => ({
        url: `comments/${topicId}/${commentId}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetTopicsQuery,
  useGetTopicDetailsQuery,
  useCreateTopicMutation,
  useAddCommentMutation,
  useDeleteCommentMutation
} = forumApi

export default forumApi
