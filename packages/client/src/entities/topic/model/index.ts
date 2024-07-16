import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Topic } from '../types'

export interface TopicState {
  topicsData?: Topic[]
  isLoading: boolean
  errorMessage?: string
}

// TODO feature/cfg-21 заменить на ответ апи

const INITIAL_TOPICS = [
  { id: 1, title: 'Первый топик', autor: 'Автор1', lastMessageDate: '2024-06-03' },
  { id: 2, title: 'Второй топик', autor: 'Автор2', lastMessageDate: '2024-06-04' },
  { id: 3, title: 'Третий топик', autor: 'Автор3', lastMessageDate: '2024-06-05' }
]

export const initialState: TopicState = {
  isLoading: false,
  topicsData: INITIAL_TOPICS
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
  }
})

export const { setTopics, setLoading, setError } = topicSlice.actions

export default topicSlice
