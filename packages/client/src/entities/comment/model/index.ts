import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import forumApi from '@/shared/forum/api/forumApi'

import { Comment } from '../../../shared/forum/types'

export interface commentState {
  commentsData: Comment[]
  isLoading: boolean
  errorMessage?: string
}

export const initialState: commentState = {
  isLoading: false,
  commentsData: []
}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment: (state: commentState, action: PayloadAction<Comment[]>) => {
      state.commentsData = action.payload
    },
    addComment: (state: commentState, action: PayloadAction<Comment>) => {
      state.commentsData = [...state.commentsData, action.payload]
    },
    setLoading: (state: commentState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state: commentState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(forumApi.endpoints.addComment.matchPending, state => {
        state.isLoading = true
        state.errorMessage = undefined
      })
      .addMatcher(forumApi.endpoints.addComment.matchFulfilled, (state, action) => {
        const newComment: Comment = {
          id: action.payload.id,
          comment: action.payload.comment,
          author: action.payload.author,
          date: action.payload.date,
          replyToId: action.payload.replyToId
        }
        state.isLoading = false
        state.commentsData.push(newComment)
      })
      .addMatcher(forumApi.endpoints.addComment.matchRejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.error.message || 'Ошибка при добавлении комментария'
      })
      .addMatcher(forumApi.endpoints.getComments.matchPending, state => {
        state.isLoading = true
        state.errorMessage = undefined
      })
      .addMatcher(forumApi.endpoints.getComments.matchFulfilled, (state, action) => {
        state.isLoading = false
        state.commentsData = action.payload
      })
      .addMatcher(forumApi.endpoints.getComments.matchRejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.error.message || 'Ошибка при добавлении комментария'
      })
  }
})

export const { setComment, setLoading, setError, addComment } = commentSlice.actions

export default commentSlice
