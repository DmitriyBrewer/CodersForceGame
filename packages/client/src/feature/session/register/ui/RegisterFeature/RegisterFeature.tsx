import { FC } from 'react'

import RegisterPasswordInput from '../RegisterPasswordInput'
import { useRegister } from '../../hooks/useRegister'

import RegisterForm from '../RegisterForm'
import RegisterTextInput from '../RegisterTextInput'
import RegisterPhoneInput from '../RegisterPhoneInput'
import RegisterButton from '../RegisterButton'
import RegisterHeader from '../RegisterHeader'
import { conditions } from '../../constant'

const RegisterFeature: FC = () => {
  const { inputProps, handleSubmit } = useRegister()

  return (
    <RegisterForm handleSubmit={handleSubmit}>
      <RegisterHeader>Регистрация</RegisterHeader>

      <RegisterTextInput label="Имя" name="first_name" {...inputProps} />
      <RegisterTextInput label="Фамилия" name="second_name" {...inputProps} />
      <RegisterTextInput label="Логин" name="login" {...inputProps} pattern={conditions.login.pattern} />
      <RegisterTextInput label="Email" name="email" type="email" {...inputProps} pattern={conditions.email.pattern} />
      <RegisterPhoneInput label="Телефон" name="phone" {...inputProps} />
      <RegisterPasswordInput label="Пароль" name="password" {...inputProps} />
      <RegisterPasswordInput label="Повторите пароль" name="password_repeat" {...inputProps} />

      <RegisterButton>Регистрация</RegisterButton>
    </RegisterForm>
  )
}

export default RegisterFeature
