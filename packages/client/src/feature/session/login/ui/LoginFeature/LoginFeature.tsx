import { FC } from 'react'

import { paths } from '@/shared/config/routing'

import BaseButton from '@/shared/components/ui/BaseButton'
import TextInput from '@/shared/components/core/TextInput'
import PasswordInput from '@/shared/components/core/PasswordInput'
import SubmitButton from '@/shared/components/core/SubmitButton'

import FormData from '@/shared/components/core/FormData'

import Header from '@/shared/components/core/Header'

import { conditions } from '@/shared/components/constant'

import styles from './LoginFeature.module.scss'
import { useLogin } from '@/feature/session/login/hooks/useLogin'

const LoginFeature: FC = () => {
  const { inputProps, handleSubmit } = useLogin()

  return (
    <div className={styles.root}>
      <Header className={styles.root__header} color="primary.dark">
        Volga Checkers
      </Header>

      <FormData handleSubmit={handleSubmit} className={styles.root__formData}>
        <TextInput label="Логин" name="login" {...inputProps} pattern={conditions.login.pattern} />
        <PasswordInput label="Пароль" name="password" {...inputProps} />

        <SubmitButton>Авторизация</SubmitButton>
        <BaseButton variant="outlined" href={paths.register} color="secondary">
          Ещё нет аккаунта?
        </BaseButton>
      </FormData>
    </div>
  )
}

export default LoginFeature
