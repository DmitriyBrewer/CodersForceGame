import { Reducer } from '@reduxjs/toolkit'

import { UserState } from '@/entities/user/model'

type StoreState = {
  user: UserState
}

export type RTKStoreState = StoreState

export type ReducerState = Reducer<StoreState>
