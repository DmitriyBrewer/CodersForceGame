import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import BackgroundWrapper from '@/shared/components/core/BackgroundWrapper'

import { styleMui } from '@/shared/styleMui'

import RegisterFeature from '@/feature/session/register'

import backgroundImage from '@/assets/images/login-background.png'

const RegisterWidget: FC = () => {
  return (
    <BackgroundWrapper backgroundUrl={backgroundImage} filter="blur(2px)">
      <BaseContainer maxWidth="sm" sx={styleMui.secsionContainer}>
        <RegisterFeature />
      </BaseContainer>
    </BackgroundWrapper>
  )
}

export default RegisterWidget
