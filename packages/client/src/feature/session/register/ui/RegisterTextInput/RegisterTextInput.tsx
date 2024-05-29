import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import { InputProps } from '../../types'

interface Props extends InputProps {
  name: string
  label: string
}

const RegisterTextInput: FC<Props> = ({ formData, handleChange, errors, name, label }) => {
  return (
    <BaseTextField
      type="text"
      label={label}
      value={formData.password}
      name={name}
      onChange={handleChange}
      error={!!errors.password}
      helperText={errors.password}
    />
  )
}

export default RegisterTextInput
