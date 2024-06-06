import { createSelector } from 'reselect'

import { AppState } from '@/shared/store'

const selectUserState = (state: AppState) => state.user

export const getUser = createSelector(selectUserState, user => user.userData)

export const getUserId = createSelector(selectUserState, user => user.userData?.id)

export const getAuth = createSelector(selectUserState, user => user.isAuth)

export const getAuthError = createSelector(selectUserState, user => user.errorMessage)

export const getLoading = createSelector(selectUserState, user => user.isLoading)
