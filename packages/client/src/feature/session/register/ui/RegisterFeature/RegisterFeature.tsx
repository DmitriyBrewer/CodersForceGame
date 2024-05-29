import { FC } from 'react'

import RegisterPasswordInput from '../RegisterPasswordInput'
import { useRegister } from '../../hooks/useRegister'

import RegisterForm from '../RegisterForm'
import RegisterTextInput from '../RegisterTextInput'
import RegisterPhoneInput from '../RegisterPhoneInput'
import RegisterButton from '../RegisterButton'
import RegisterHeader from '../RegisterHeader'

const RegisterFeature: FC = () => {
  const { inputProps, handleSubmit } = useRegister()

  return (
    <RegisterForm handleSubmit={handleSubmit}>
      <RegisterHeader>Регистрация</RegisterHeader>

      <RegisterTextInput label="Имя" name="first_name" {...inputProps} />
      <RegisterTextInput label="Фамилия" name="second_name" {...inputProps} />
      <RegisterTextInput label="Логин" name="login" {...inputProps} />
      <RegisterTextInput label="Email" name="email" {...inputProps} />
      <RegisterPasswordInput label="Пароль" name="password" {...inputProps} />
      <RegisterPhoneInput label="Телефон" name="phone" {...inputProps} />

      <RegisterButton>Регистрация</RegisterButton>
    </RegisterForm>
  )
}

export default RegisterFeature
