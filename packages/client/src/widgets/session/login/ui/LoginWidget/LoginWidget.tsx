import { FC } from 'react'

import BackgroundWrapper from '@/shared/components/ui/BackgroundWrapper'

import LoginFeature from '@/feature/session/login/ui'

import backgroundImage from '@/assets/images/login-background.png'

const LoginWidget: FC = () => {
  return (
    <BackgroundWrapper backgroundUrl={backgroundImage} filter="blur(2px)">
      <LoginFeature />
    </BackgroundWrapper>
  )
}

export default LoginWidget
