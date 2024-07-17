import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'

import user, { initialState as initialStateUser } from '@/entities/user/model'
import topic, { initialState as initialStateTopic } from '@/entities/topic/model'
import message, { initialState as initialStateMessage } from '@/entities/message/model'

import errorSlice, { initialState as initialStateError } from '@/entities/error'

import { ReducerState, RTKStoreState } from './types'
import { authApiSlice } from '@/feature/session/api/authApi'
import { navbarApiSlice } from '@/feature/base-layout/api/navbarApi'

export const rootReducer: ReducerState = combineReducers({
  user: user.reducer,
  topics: topic.reducer,
  messages: message.reducer,
  authApi: authApiSlice.reducer,
  navbarApi: navbarApiSlice.reducer,
  error: errorSlice.reducer
})

export type AppState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    APP_INITIAL_STATE: AppState
  }
}

export const preloadState: RTKStoreState = {
  user: initialStateUser,
  topics: initialStateTopic,
  messages: initialStateMessage,
  authApi: authApiSlice.reducer(undefined, { type: 'unknown' }),
  navbarApi: navbarApiSlice.reducer(undefined, { type: 'unknown' }),
  error: initialStateError
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApiSlice.middleware, navbarApiSlice.middleware)
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
