import { FC } from 'react'

import { useSelector } from 'react-redux'

import PasswordInput from '@/shared/components/core/PasswordInput'

import TextInput from '@/shared/components/core/TextInput'
import PhoneInput from '@/shared/components/core/PhoneInput'
import SubmitButton from '@/shared/components/core/SubmitButton'

import { conditions } from '@/shared/components/constant'

import FormData from '@/shared/components/core/FormData/FormData'

import Header from '@/shared/components/core/Header'

import { getAuthError } from '@/entities/user/model/selector'

import BaseAlert from '@/shared/components/ui/BaseAlert'

import { useRegister } from '@/feature/session/register/hooks/useRegister'

const RegisterFeature: FC = () => {
  const { inputProps, handleSubmit, isError } = useRegister()
  const errorMessage = useSelector(getAuthError)
  const isBackendError = Boolean(errorMessage)

  return (
    <>
      {isBackendError && (
        <BaseAlert variant="filled" severity="error">
          {errorMessage}
        </BaseAlert>
      )}
      <FormData handleSubmit={handleSubmit}>
        <Header variant="h3">Регистрация</Header>

        <TextInput label="Имя" name="first_name" {...inputProps} />
        <TextInput label="Фамилия" name="second_name" {...inputProps} />
        <TextInput label="Логин" name="login" {...inputProps} pattern={conditions.login.pattern} />
        <TextInput label="Email" name="email" type="email" {...inputProps} pattern={conditions.email.pattern} />
        <PhoneInput label="Телефон" name="phone" {...inputProps} />
        <PasswordInput label="Пароль" name="password" {...inputProps} />
        <PasswordInput label="Повторите пароль" name="password_repeat" {...inputProps} />

        <SubmitButton disabled={isError}>Регистрация</SubmitButton>
      </FormData>
    </>
  )
}

export default RegisterFeature
