import { FC } from 'react'

import BackgroundWrapper from '@/shared/components/core/BackgroundWrapper'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import { styleMui } from '@/shared/styleMui'

import BaseBox from '@/shared/components/ui/BaseBox'

import LoginFeature from '@/feature/session/login/ui'

import backgroundImage from '@/assets/images/bg.png'

import styles from './LoginWidget.module.scss'

const LoginWidget: FC = () => {
  return (
    <BackgroundWrapper backgroundUrl={backgroundImage} filter="blur(0.5px)">
      <BaseBox className={styles.box}>
        <BaseContainer maxWidth="sm" sx={styleMui.secsionContainer}>
          <LoginFeature />
        </BaseContainer>
      </BaseBox>
    </BackgroundWrapper>
  )
}

export default LoginWidget
