import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { leaderboardApi } from '@/feature/leaderbord/leaderboardApi'

export interface Leader {
  data: {
    myField: string
    otherField: number
  }
}

export interface LeaderboardState {
  leaders: Leader[]
  isLoading: boolean
  errorMessage?: string
}

export const initialState: LeaderboardState = {
  leaders: [],
  isLoading: false
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLoading: (state: LeaderboardState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state: LeaderboardState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    setLeaders: (state: LeaderboardState, action: PayloadAction<Leader[]>) => {
      state.leaders = action.payload
    }
  },
  extraReducers: builder => {
    builder.addMatcher(leaderboardApi.endpoints.getLeaderboard.matchFulfilled, (state, { payload }) => {
      state.leaders = payload.leaders
      state.isLoading = false
      state.errorMessage = undefined
    })
    builder.addMatcher(leaderboardApi.endpoints.getLeaderboard.matchRejected, state => {
      state.leaders = []
      state.isLoading = false
      state.errorMessage = 'Failed to fetch leaderboard'
    })
  }
})

export const { setLoading, setError, setLeaders } = leaderboardSlice.actions

export default leaderboardSlice
