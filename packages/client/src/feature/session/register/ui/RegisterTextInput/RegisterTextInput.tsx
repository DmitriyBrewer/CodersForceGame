import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import { InputProps } from '../../types'

const RegisterTextInput: FC<InputProps> = ({
  formData,
  handleChange,
  errors,
  name,
  label,
  required = true,
  size = 'small'
}) => {
  return (
    <BaseTextField
      size={size}
      required={required}
      type="text"
      label={label}
      value={formData[name]}
      name={name}
      onChange={handleChange}
      error={!!errors[name]}
      helperText={errors[name]}
    />
  )
}

export default RegisterTextInput
