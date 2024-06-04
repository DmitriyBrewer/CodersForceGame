import { useEffect, useState } from 'react'

export const useRenderClient = () => {
  const [isRenderClient, setIsRenderClient] = useState<boolean>(false)

  useEffect(() => {
    setIsRenderClient(true)
  }, [])

  return isRenderClient
}
