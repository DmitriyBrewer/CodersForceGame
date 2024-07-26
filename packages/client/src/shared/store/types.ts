import { Reducer } from '@reduxjs/toolkit'

import { UserState } from '@/entities/user/model'
import { TopicState } from '@/entities/topic/model'
import { commentState } from '@/entities/comment/model'

import { ErrorState } from '@/entities/error'

import { LeaderboardState } from '@/entities/leaderboard/model'

import forumApi from '@/shared/forum/api/forumApi'

import { authApiSlice } from '@/entities/session/api/authApi'
import { profileApiSlice } from '@/entities/profile/api/profileApi'
import { navbarApiSlice } from '@/entities/navbar/api/navbarApi'

import { oAuthApiSlice } from '@/entities/session/api/oAuthApi'
import leaderboardApi from '@/entities/leaderboard/api/leaderboardApi'

type StoreState = {
  user: UserState
  topics: TopicState
  comments: commentState
  authApi: ReturnType<typeof authApiSlice.reducer>
  profileApi: ReturnType<typeof profileApiSlice.reducer>
  oAuthApi: ReturnType<typeof oAuthApiSlice.reducer>
  navbarApi: ReturnType<typeof navbarApiSlice.reducer>
  error: ErrorState
  forumApi: ReturnType<typeof forumApi.reducer>
  leaderboardApi: ReturnType<typeof leaderboardApi.reducer>
  leaderboard: LeaderboardState
}

export type RTKStoreState = StoreState

export type ReducerState = Reducer<StoreState>
