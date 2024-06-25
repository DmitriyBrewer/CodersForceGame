import { Reducer } from '@reduxjs/toolkit'

import { UserState } from '@/entities/user/model'
import { TopicState } from '@/entities/topic/model'
import { MessageState } from '@/entities/message/model'

import { ErrorState } from '@/entities/error'

import { authApiSlice } from '@/feature/session/api/authApi'
import { navbarApiSlice } from '@/feature/base-layout/api/navbarApi'

type StoreState = {
  user: UserState
  topics: TopicState
  messages: MessageState
  authApi: ReturnType<typeof authApiSlice.reducer>
  navbarApi: ReturnType<typeof navbarApiSlice.reducer>
  error: ErrorState
}

export type RTKStoreState = StoreState

export type ReducerState = Reducer<StoreState>
