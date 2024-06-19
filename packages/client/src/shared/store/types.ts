import { Reducer } from '@reduxjs/toolkit'

import { UserState } from '@/entities/user/model'
import { TopicState } from '@/entities/topic/model'
import { MessageState } from '@/entities/message/model'

import { authApiSlice } from '@/feature/session/api/authApi'
import { profileApiSlice } from '@/feature/profile/api/profileApi'

type StoreState = {
  user: UserState
  topics: TopicState
  messages: MessageState
  authApi: ReturnType<typeof authApiSlice.reducer>
  profileApi: ReturnType<typeof profileApiSlice.reducer>
}

export type RTKStoreState = StoreState

export type ReducerState = Reducer<StoreState>
