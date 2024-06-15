import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import BackgroundWrapper from '@/shared/components/core/BackgroundWrapper'

import { styleMui } from '@/shared/styleMui'

import BaseBox from '@/shared/components/ui/BaseBox'

import RegisterFeature from '@/feature/session/register'

import backgroundImage from '@/assets/images/login-background.png'

import styles from './RegisterWidget.module.scss'

const RegisterWidget: FC = () => {
  return (
    <BackgroundWrapper backgroundUrl={backgroundImage} filter="blur(2px)">
      <BaseBox className={styles.box}>
        <BaseContainer maxWidth="sm" sx={styleMui.secsionContainer}>
          <RegisterFeature />
        </BaseContainer>
      </BaseBox>
    </BackgroundWrapper>
  )
}

export default RegisterWidget
