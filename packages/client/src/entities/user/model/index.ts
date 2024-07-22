import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../types'
import { authApiSlice } from '@/feature/session/api/authApi'
import { navbarApiSlice } from '@/feature/base-layout/api/navbarApi'

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

export const fetchUserThunk = createAsyncThunk('user/fetchUserThunk', async (_: void) => {
  return authApiSlice.endpoints?.getUser
})

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
    builder.addMatcher(navbarApiSlice.endpoints.logout.matchFulfilled, state => {
      state.userData = undefined
      state.isAuth = false
      state.isLoading = false
    })
    builder.addMatcher(authApiSlice.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.userData = payload
      state.isAuth = true
      state.isLoading = false
      state.errorMessage = undefined
    })

    builder.addMatcher(authApiSlice.endpoints.getUser.matchRejected, state => {
      state.userData = undefined
      state.isAuth = false
      state.isLoading = false
    })
  }
})

export const { setLoading, setError, setUser } = userSlice.actions
export default userSlice
