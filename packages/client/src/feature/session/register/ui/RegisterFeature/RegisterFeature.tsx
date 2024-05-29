import { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTypography from '@/shared/components/ui/BaseTypography'

import RegisterPasswordInput from '../RegisterPasswordInput'
import { useRegister } from '../../hooks/useRegister'

import RegisterForm from '../RegisterForm'
import RegisterTextInput from '../RegisterTextInput'
import RegisterPhoneInput from '../RegisterPhoneInput'

const RegisterFeature: FC = () => {
  const { formData, handleChange, errors, handleSubmit } = useRegister()

  return (
    <RegisterForm handleSubmit={handleSubmit}>
      <BaseTypography component="h1" variant="h3">
        Регистрация
      </BaseTypography>
      <RegisterTextInput
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        label="Имя"
        name="first_name"
        required
      />
      <RegisterTextInput
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        label="Фамилия"
        name="second_name"
        required
      />
      <RegisterTextInput
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        label="Логин"
        name="login"
        required
      />
      <RegisterTextInput
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        label="Email"
        name="email"
        required
      />
      <RegisterPasswordInput
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        label="Пароль"
        name="password"
        required
      />
      <RegisterPhoneInput
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        label="Телефон"
        name="phone"
        required
      />
      <BaseButton type="submit" variant="contained">
        Регистрация
      </BaseButton>
    </RegisterForm>
  )
}

export default RegisterFeature
