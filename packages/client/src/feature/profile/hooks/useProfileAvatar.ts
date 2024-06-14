import { ChangeEvent, useEffect, useState } from 'react'

import profileApi from '@/feature/profile/api/profileApi'

const useProfileAvatar = () => {
  const [avatar, setAvatar] = useState<File>()
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files, form } = e.target
    if (!files || !form) {
      return
    }

    setAvatar(files[0])
  }

  // TODO: feature/cfg-25 add snackbar after change
  useEffect(() => {
    async function submit() {
      if (!avatar) {
        return
      }

      setLoading(true)
      setError(false)

      const formData = new FormData()
      formData.append('avatar', avatar)
      try {
        await profileApi.updateAvatar(formData)
        // TODO: feature/cfg-25 update user in state
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    submit()
  }, [avatar])

  return { fileChange, isLoading, isError }
}

export default useProfileAvatar
