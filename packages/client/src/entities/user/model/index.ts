import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../types'

export interface UserState {
  userData?: User
  isAuth: boolean
  isLoading: boolean
  errorMessage?: string
}

export const initialState: UserState = {
  userData: undefined,
  isAuth: false,
  isLoading: false,
  errorMessage: undefined
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
  }
})

export const { setAuthUser, setLoading, setError } = userSlice.actions
export default userSlice
