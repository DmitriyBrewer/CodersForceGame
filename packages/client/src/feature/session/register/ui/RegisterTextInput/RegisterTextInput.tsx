import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import { InputProps } from '../../types'

const RegisterTextInput: FC<InputProps> = ({ formData, handleChange, errors, name, label }) => {
  return (
    <BaseTextField
      type="text"
      label={label}
      value={formData[name]}
      name={name}
      onChange={handleChange}
      error={!!errors.password}
      helperText={errors.password}
    />
  )
}

export default RegisterTextInput
