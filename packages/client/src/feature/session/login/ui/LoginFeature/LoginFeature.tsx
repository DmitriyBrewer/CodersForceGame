import { FC } from 'react'

import { paths } from '@/shared/config/routing'

import BaseButton from '@/shared/components/ui/BaseButton'

import LoginForm from '../LoginForm'
import LoginHeader from '../LoginHeader'

import { useRegister } from '@/feature/session/register/hooks/useRegister'
import RegisterTextInput from '@/feature/session/register/ui/RegisterTextInput'
import RegisterPasswordInput from '@/feature/session/register/ui/RegisterPasswordInput'
import RegisterButton from '@/feature/session/register/ui/RegisterButton'

import styles from './LoginFeature.module.scss'

const LoginFeature: FC = () => {
  const { inputProps, handleSubmit } = useRegister()

  return (
    <div className={styles.root}>
      <LoginHeader className={styles.header}>Volga Checkers</LoginHeader>
      <LoginForm handleSubmit={handleSubmit}>
        <RegisterTextInput label="Логин" name="login" {...inputProps} />
        <RegisterPasswordInput label="Пароль" name="password" {...inputProps} />

        <RegisterButton>Авторизация</RegisterButton>
        <BaseButton variant="outlined" href={paths.register} color="primary">
          Ещё нет аккаунта?
        </BaseButton>
      </LoginForm>
    </div>
  )
}

export default LoginFeature
