import { FC } from 'react'

import BackgroundWrapper from '@/shared/components/core/BackgroundWrapper'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import { styleMui } from '@/shared/styleMui'

import LoginFeature from '@/feature/session/login/ui'

import backgroundImage from '@/assets/images/login-background.png'

const LoginWidget: FC = () => {
  return (
    <BackgroundWrapper backgroundUrl={backgroundImage} filter="blur(2px)">
      <BaseContainer maxWidth="sm" sx={styleMui.secsionContainer}>
        <LoginFeature />
      </BaseContainer>
    </BackgroundWrapper>
  )
}

export default LoginWidget
