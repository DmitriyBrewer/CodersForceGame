import { ChangeEvent, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { setUser } from '@/entities/user/model'

import { useUpdateAvatarMutation } from '@/feature/profile/api/profileApi'

const useProfileAvatar = () => {
  const [avatar, setAvatar] = useState<File>()
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()

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
        if (data) {
          dispatch(setUser(data))
        }
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    submit()
  }, [dispatch, updateAvatar, avatar])

  return { fileChange, isLoading, isError }
}

export default useProfileAvatar
