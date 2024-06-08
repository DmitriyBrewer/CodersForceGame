import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../types'
import { authApiSlice } from '@/feature/session/api/authApi'

export interface UserState {
  userData?: User
  isAuth: boolean
  isLoading: boolean
  errorMessage?: string
}

export const initialState: UserState = {
  isAuth: true,
  isLoading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser: (state: UserState, action: PayloadAction<User>) => {
      state.userData = action.payload
      state.isAuth = true
    },
    setLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state: UserState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    }
  },

  extraReducers: builder => {
    builder.addMatcher(authApiSlice.endpoints.logout.matchFulfilled, state => {
      state.userData = undefined
      state.isAuth = false
    })
    builder.addMatcher(authApiSlice.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.userData = payload
      state.isAuth = true
    })
    builder.addMatcher(authApiSlice.endpoints.getUser.matchRejected, (state, { error }) => {
      state.userData = undefined
      state.isAuth = false
      state.errorMessage = error?.message ?? 'Ошибка получения пользователя'
    })
  }
})

export const { setAuthUser, setLoading, setError } = userSlice.actions
export default userSlice
