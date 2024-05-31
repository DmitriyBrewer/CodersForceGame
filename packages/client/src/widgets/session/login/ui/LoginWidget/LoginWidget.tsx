import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import LoginFeature from '@/feature/session/login/ui'

import styles from './LoginWidget.module.scss'

const LoginWidget: FC = () => {
  return (
    <BaseContainer maxWidth={false} className={styles.root}>
      <LoginFeature />
    </BaseContainer>
  )
}

export default LoginWidget
