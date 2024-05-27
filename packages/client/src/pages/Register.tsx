import React from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTextField from '@/shared/components/ui/BaseTextField'
import BaseTypography from '@/shared/components/ui/BaseTypography'

const Register: React.FC = () => {
  const handleSubmit = () => {
    console.log('test')
  }

  return (
    <BaseBox component="form" onSubmit={handleSubmit}>
      <BaseTypography>Регистрация</BaseTypography>
      <BaseTextField required label="test" />
      <BaseButton>Регистрация</BaseButton>
    </BaseBox>
  )
}

export default Register
