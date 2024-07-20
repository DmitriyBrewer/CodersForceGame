import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'

import user, { initialState as initialStateUser } from '@/entities/user/model'
import topic, { initialState as initialStateTopic } from '@/entities/topic/model'
import comment, { initialState as initialStateComment } from '@/entities/comment/model'

import errorSlice, { initialState as initialStateError } from '@/entities/error'

import leaderboardSlice, { initialState as initialStateLeaderboard } from '@/entities/leaderboard/model'

import { ReducerState, RTKStoreState } from './types'
import { authApiSlice } from '@/feature/session/api/authApi'
import { navbarApiSlice } from '@/feature/base-layout/api/navbarApi'
import { profileApiSlice } from '@/feature/profile/api/profileApi'
import leaderboardApi from '@/feature/leaderbord/leaderboardApi'
import { oAuthApiSlice } from '@/feature/session/api/oAuthApi'
import forumApi from '@/feature/social/forum/api/forumApi'

export const rootReducer: ReducerState = combineReducers({
  user: user.reducer,
  topics: topic.reducer,
  comments: comment.reducer,
  authApi: authApiSlice.reducer,
  profileApi: profileApiSlice.reducer,
  oAuthApi: oAuthApiSlice.reducer,
  navbarApi: navbarApiSlice.reducer,
  error: errorSlice.reducer,
  forumApi: forumApi.reducer,
  leaderboardApi: leaderboardApi.reducer,
  leaderboard: leaderboardSlice.reducer
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
  comments: initialStateComment,
  authApi: authApiSlice.reducer(undefined, { type: 'unknown' }),
  profileApi: profileApiSlice.reducer(undefined, { type: 'unknown' }),
  oAuthApi: oAuthApiSlice.reducer(undefined, { type: 'unknown' }),
  navbarApi: navbarApiSlice.reducer(undefined, { type: 'unknown' }),
  error: initialStateError,
  forumApi: forumApi.reducer(undefined, { type: 'unknown' }),
  leaderboardApi: leaderboardApi.reducer(undefined, { type: 'unknown' }),
  leaderboard: initialStateLeaderboard
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      navbarApiSlice.middleware,
      oAuthApiSlice.middleware,
      forumApi.middleware,
      profileApiSlice.middleware,
      navbarApiSlice.middleware,
      leaderboardApi.middleware,
      oAuthApiSlice.middleware
    )
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
