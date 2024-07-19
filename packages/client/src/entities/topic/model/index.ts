import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Topic } from '../types'
import forumApi from '@/feature/social/forum/api/forumApi'

export interface TopicState {
  topicsData?: Topic[]
  isLoading: boolean
  errorMessage?: string
}

export const initialState: TopicState = {
  isLoading: false,
  topicsData: []
}

const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setTopics: (state: TopicState, action: PayloadAction<Topic[]>) => {
      state.topicsData = action.payload
    },
    setLoading: (state: TopicState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state: TopicState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    addTopic: (state: TopicState, action: PayloadAction<Topic>) => {
      state.topicsData?.push(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(forumApi.endpoints.getTopics.matchPending, state => {
        state.isLoading = true
        state.errorMessage = undefined
      })
      .addMatcher(forumApi.endpoints.getTopics.matchFulfilled, (state, action) => {
        state.isLoading = false
        state.topicsData = action.payload
      })
      .addMatcher(forumApi.endpoints.createTopic.matchFulfilled, (state, action) => {
        state.isLoading = false
        state.topicsData?.push(action.payload)
      })
      .addMatcher(forumApi.endpoints.getTopics.matchRejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.error.message || 'Ошибка при создании топика'
      })
  }
})

export const { setTopics, setLoading, setError } = topicSlice.actions

export default topicSlice
