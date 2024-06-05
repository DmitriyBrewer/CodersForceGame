import { AppState } from '@/shared/store'

export const getUser = (state: AppState) => state.user.userData
export const getUserId = (state: AppState) => state.user.userData?.id
export const getAuth = (state: AppState) => state.user.isAuth
export const getAuthError = (state: AppState) => state.user.isError
export const getLoading = (state: AppState) => state.user.isLoading
