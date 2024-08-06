import { createSelector } from 'reselect'

import { AppState } from '@/shared/store'

const selectLeaderboardState = (state: AppState) => state.leaderboard

export const getLeaders = createSelector(selectLeaderboardState, leaderboard => leaderboard.leaders)

export const getLeaderboardLoading = createSelector(selectLeaderboardState, leaderboard => leaderboard.isLoading)

export const getLeaderboardError = createSelector(selectLeaderboardState, leaderboard => leaderboard.errorMessage)
