import { createSelector } from 'reselect'

import { AppState } from '@/shared/store'

const selectTopicsState = (state: AppState) => state.topics

export const getTopics = createSelector(selectTopicsState, topics => topics.topicsData)

export const getLoading = createSelector(selectTopicsState, topics => topics.isLoading)

export const getErrorMessage = createSelector(selectTopicsState, topics => topics.errorMessage)
