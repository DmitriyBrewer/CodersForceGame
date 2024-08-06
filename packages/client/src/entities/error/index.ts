import { createSlice } from '@reduxjs/toolkit'

export interface ErrorState {
  message: string
  isError: boolean
}

export const initialState: ErrorState = {
  message: '',
  isError: false
}

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    message: '',
    isError: false
  },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload
      state.isError = !!action.payload
    },
    clearError: state => {
      state.message = ''
      state.isError = false
    }
  }
})

export const { setError, clearError } = errorSlice.actions
export default errorSlice
