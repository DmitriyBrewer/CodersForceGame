import fetchInstance from '@/shared/api/fetchInstance'

import { PasswordPayload, User } from '@/feature/profile/types'

const profileApi = {
  async updateAvatar(body: FormData): Promise<User> {
    const response = await fetchInstance<User>('/user/profile/avatar', { method: 'PUT', body })
    return response
  },
  async updatePassword(body: PasswordPayload): Promise<string> {
    const headers = new Headers({ 'content-type': 'application/json' })
    const response = await fetchInstance<string>('/user/password', {
      method: 'PUT',
      body: JSON.stringify(body),
      headers
    })
    return response
  }
}

export default profileApi
