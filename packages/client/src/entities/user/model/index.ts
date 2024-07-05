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
  isAuth: false,
  isLoading: true
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state: UserState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    setUser(state: UserState, action: PayloadAction<User>) {
      state.userData = action.payload
    }
  },

  extraReducers: builder => {
    builder.addMatcher(authApiSlice.endpoints.logout.matchFulfilled, state => {
      state.userData = undefined
      state.isAuth = false
      state.isLoading = false
    })
    builder.addMatcher(authApiSlice.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.userData = payload
      state.isAuth = true
      state.isLoading = false
    })
    builder.addMatcher(authApiSlice.endpoints.getUser.matchRejected, (state, { error }) => {
      state.userData = undefined
      state.isAuth = false
      state.errorMessage = error?.message ?? 'Ошибка получения пользователя'
      state.isLoading = false
    })
  }
})

export const { setLoading, setError, setUser } = userSlice.actions
export default userSlice
