import { Reducer } from '@reduxjs/toolkit'

import { UserState } from '@/entities/user/model'
import { TopicState } from '@/entities/topic/model'
import { MessageState } from '@/entities/message/model'

import { ErrorState } from '@/entities/error'

import { LeaderboardState } from '@/entities/leaderboard/model'

import { authApiSlice } from '@/feature/session/api/authApi'
import { navbarApiSlice } from '@/feature/base-layout/api/navbarApi'
import leaderboardApi from '@/feature/leaderbord/leaderboardApi'

type StoreState = {
  user: UserState
  topics: TopicState
  messages: MessageState
  authApi: ReturnType<typeof authApiSlice.reducer>
  navbarApi: ReturnType<typeof navbarApiSlice.reducer>
  error: ErrorState
  leaderboardApi: ReturnType<typeof leaderboardApi.reducer>
  leaderboard: LeaderboardState
}

export type RTKStoreState = StoreState

export type ReducerState = Reducer<StoreState>
