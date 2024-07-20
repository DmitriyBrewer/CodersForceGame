import { createSelector } from 'reselect'

import { AppState } from '@/shared/store'

const selectCommentsState = (state: AppState) => state.comments

export const getComments = createSelector(selectCommentsState, comments => comments.commentsData)

export const getLoading = createSelector(selectCommentsState, comments => comments.isLoading)
