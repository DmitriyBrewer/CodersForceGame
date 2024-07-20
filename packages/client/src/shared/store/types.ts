import { Reducer } from '@reduxjs/toolkit'

import { UserState } from '@/entities/user/model'
import { TopicState } from '@/entities/topic/model'
import { commentState } from '@/entities/comment/model'

import { ErrorState } from '@/entities/error'

import { LeaderboardState } from '@/entities/leaderboard/model'

import { authApiSlice } from '@/feature/session/api/authApi'
import { profileApiSlice } from '@/feature/profile/api/profileApi'
import { navbarApiSlice } from '@/feature/base-layout/api/navbarApi'
import leaderboardApi from '@/feature/leaderbord/leaderboardApi'
import { oAuthApiSlice } from '@/feature/session/api/oAuthApi'
import forumApi from '@/feature/social/forum/api/forumApi'

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
