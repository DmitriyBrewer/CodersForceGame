import { ChangeEvent, useEffect, useState } from 'react'

import { setUser } from '@/entities/user/model'

import { useUpdateAvatarMutation } from '@/feature/profile/api/profileApi'

const useProfileAvatar = () => {
  const [avatar, setAvatar] = useState<File>()
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const [updateAvatar] = useUpdateAvatarMutation()

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
        const { data } = await updateAvatar(formData)
        console.log('=>(useProfileAvatar.ts:37) data', data)

        if (data) {
          setUser(data)
        }
        // TODO: feature/cfg-25 update user in state
      } catch (err) {
        console.log('=>(useProfileAvatar.ts:52) err', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    submit()
  }, [updateAvatar, avatar])

  return { fileChange, isLoading, isError }
}

export default useProfileAvatar
