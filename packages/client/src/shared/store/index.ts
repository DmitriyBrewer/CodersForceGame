import { combineReducers, configureStore } from '@reduxjs/toolkit'

import user, { initialState as initialStateUser } from '@/entities/user/model'

import topic, { initialState as initialStateTopic } from '@/entities/topic/model'
import message, { initialState as initialStateMessage } from '@/entities/message/model'

import { ReducerState, RTKStoreState } from './types'
import { authApiSlice } from '@/feature/session/api/authApi'
import { navbarApiSlice } from '@/feature/base-layout/api/navbarApi'

export const rootReducer: ReducerState = combineReducers({
  user: user.reducer,
  topics: topic.reducer,
  messages: message.reducer,
  authApi: authApiSlice.reducer,
  navbarApi: navbarApiSlice.reducer
})

export const preloadState: RTKStoreState = {
  user: initialStateUser,
  topics: initialStateTopic,
  messages: initialStateMessage,
  authApi: authApiSlice.reducer(undefined, { type: 'unknown' }),
  navbarApi: navbarApiSlice.reducer(undefined, { type: 'unknown' })
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApiSlice.middleware, navbarApiSlice.middleware)
})

export type AppState = ReturnType<typeof rootReducer>

export default store
