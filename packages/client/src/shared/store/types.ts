import { Reducer } from '@reduxjs/toolkit'

import { UserState } from '@/entities/user/model'
import { TopicState } from '@/entities/topic/model'
import { MessageState } from '@/entities/message/model'

type StoreState = {
  user: UserState
  topics: TopicState
  messages: MessageState
}

export type RTKStoreState = StoreState

export type ReducerState = Reducer<StoreState>
