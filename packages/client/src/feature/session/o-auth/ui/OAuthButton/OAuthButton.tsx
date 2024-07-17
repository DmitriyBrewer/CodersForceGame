import { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'

import { useOAuth } from '@/feature/session/o-auth/hooks/useOAuth'

const OAuthButton: FC = () => {
  const { handleOAuth } = useOAuth()
  return (
    <BaseButton type="button" onClick={handleOAuth}>
      Войти через яндекс
    </BaseButton>
  )
}

export default OAuthButton
