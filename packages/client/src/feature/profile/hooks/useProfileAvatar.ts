import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setError, clearError } from '@/entities/error'

import { setUser } from '@/entities/user/model'

import { useUpdateAvatarMutation } from '@/entities/profile/api/profileApi'

const useProfileAvatar = () => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState<File>()
  const [isLoading, setLoading] = useState(false)

  const [updateAvatar] = useUpdateAvatarMutation()

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files, form } = e.target
    if (!files || !form) {
      return
    }

    setAvatar(files[0])
  }

  useEffect(() => {
    async function submit() {
      if (!avatar) {
        return
      }

      setLoading(true)
      dispatch(clearError())

      const formData = new FormData()
      formData.append('avatar', avatar)
      try {
        const { data } = await updateAvatar(formData)
        if (data) {
          dispatch(setUser(data))
        }
      } catch (err) {
        dispatch(setError('Ошибка изменения аватара!'))
      } finally {
        setLoading(false)
      }
    }

    submit()
  }, [dispatch, updateAvatar, avatar])

  return { fileChange, isLoading }
}

export default useProfileAvatar
