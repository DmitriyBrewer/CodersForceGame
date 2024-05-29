import { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTypography from '@/shared/components/ui/BaseTypography'

import RegisterPasswordInput from '../RegisterPasswordInput'
import { useRegister } from '../../hooks/useRegister'

import RegisterForm from '../RegisterForm'

const RegisterFeature: FC = () => {
  const { formData, handleChange, errors, handleSubmit } = useRegister()

  return (
    <RegisterForm handleSubmit={handleSubmit}>
      <BaseTypography component="h1" variant="h3">
        Регистрация
      </BaseTypography>
      <RegisterPasswordInput formData={formData} handleChange={handleChange} errors={errors} />
      <BaseButton type="submit" variant="contained">
        Регистрация
      </BaseButton>
    </RegisterForm>
  )
}

export default RegisterFeature
