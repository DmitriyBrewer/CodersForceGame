import { ChangeEvent, useEffect, useState } from 'react'

import profileApi from '@/feature/profile/api/profileApi'
import { nullable } from '@/feature/profile/types'

const useProfileAvatar = () => {
  const [avatar, setAvatar] = useState<File>()
  const [, setError] = useState<nullable<unknown>>(null)
  const [, setLoading] = useState(true)

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files, form } = e.target
    if (!files || !form) {
      return
    }

    setAvatar(files[0])
  }

  // TODO: add snackbar after change
  useEffect(() => {
    async function submit() {
      if (!avatar) {
        return
      }
      setLoading(true)
      const formData = new FormData()
      formData.append('avatar', avatar)
      try {
        await profileApi.updateAvatar(formData)
        // TODO: update user in state
      } catch (err: unknown) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    submit()
  }, [avatar])

  return { fileChange }
}

export default useProfileAvatar
