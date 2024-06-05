import { combineReducers, configureStore } from '@reduxjs/toolkit'

import user, { initialState as initialStateUser } from '@/entities/user/model'

import { ReducerState, RTKStoreState } from './types'

export const rootReducer: ReducerState = combineReducers({
  user: user.reducer
})

export const preloadState: RTKStoreState = {
  user: initialStateUser
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadState
})

export type AppState = ReturnType<typeof rootReducer>

export default store
