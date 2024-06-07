import { combineReducers, configureStore } from '@reduxjs/toolkit'

import user, { initialState as initialStateUser } from '@/entities/user/model'

import topic, { initialState as initialStateTopic } from '@/entities/topic/model'
import message, { initialState as initialStateMessage } from '@/entities/message/model'

import { ReducerState, RTKStoreState } from './types'

export const rootReducer: ReducerState = combineReducers({
  user: user.reducer,
  topics: topic.reducer,
  messages: message.reducer
})

export const preloadState: RTKStoreState = {
  user: initialStateUser,
  topics: initialStateTopic,
  messages: initialStateMessage
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadState
})

export type AppState = ReturnType<typeof rootReducer>

export default store
