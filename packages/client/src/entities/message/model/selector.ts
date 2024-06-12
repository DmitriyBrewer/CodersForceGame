import { createSelector } from 'reselect'

import { AppState } from '@/shared/store'

const selectMessagesState = (state: AppState) => state.messages

export const getMessages = createSelector(selectMessagesState, messages => messages.messagesData)

export const getLoading = createSelector(selectMessagesState, messages => messages.isLoading)
