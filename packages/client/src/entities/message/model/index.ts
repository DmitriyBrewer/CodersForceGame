import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Message } from '../types'

export interface MessageState {
  messagesData: Message[]
  isLoading: boolean
  errorMessage?: string
}

// TODO feature/cfg-21 заменить на ответ апи
const INITIAL_MESSAGES = [
  { id: 1, message: 'Первое сообщение', autor: 'Автор1', date: '2024-06-03' },
  { id: 2, message: 'Второе сообщение', autor: 'Автор2', date: '2024-06-04' },
  { id: 3, message: 'Третье сообщение', autor: 'Автор3', date: '2024-06-05' }
]

export const initialState: MessageState = {
  isLoading: false,
  messagesData: INITIAL_MESSAGES
}

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state: MessageState, action: PayloadAction<Message[]>) => {
      state.messagesData = action.payload
    },
    addMessage: (state: MessageState, action: PayloadAction<Message>) => {
      state.messagesData = [...state.messagesData, action.payload]
    },
    setLoading: (state: MessageState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state: MessageState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    }
  }
})

export const { setMessages, setLoading, setError, addMessage } = messageSlice.actions

export default messageSlice
