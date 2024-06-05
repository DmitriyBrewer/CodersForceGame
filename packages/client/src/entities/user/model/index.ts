import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  id: string
  name: string
  email: string
}

export interface UserState {
  userData?: UserData
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
    setAuthUser: (state: UserState, action: PayloadAction<UserData>) => {
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
