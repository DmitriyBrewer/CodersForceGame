import { ChangeEvent, useEffect, useState } from 'react'

import fetchInstance from '@/shared/api/fetchInstance'

type nullable<T> = T | null

const useProfileAvatar = () => {
  const [avatar, setAvatar] = useState<File>()
  const [error, setError] = useState<nullable<Error>>(null)
  const [loading, setLoading] = useState(true)

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
      const formData = new FormData()
      formData.append('avatar', avatar)

      try {
        const data = await fetchInstance('/user/profile/avatar', { method: 'PUT', body: formData })
      } catch (err: any) {
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
