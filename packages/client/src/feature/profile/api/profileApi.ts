import fetchInstance from '@/shared/api/fetchInstance'

import { PasswordPayload } from '@/feature/profile/types'

const profileApi = {
  async updateAvatar(body: FormData) {
    const response = await fetchInstance('/user/profile/avatar', { method: 'PUT', body })
    return response
  },
  async updatePassword(body: PasswordPayload) {
    const headers = new Headers({ 'content-type': 'application/json' })
    const response = await fetchInstance(
      '/user/password',
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers
      },
      false
    )
    return response
  }
}

export default profileApi
