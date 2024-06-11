import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import { conditions } from '@/shared/components/constant'
import { InputProps } from '@/shared/types'

const TextInput: FC<InputProps> = ({
  type = 'text',
  formData,
  handleChange,
  errors,
  name,
  label,
  required = true,
  size = 'small',
  pattern = conditions.name.pattern
}) => {
  return (
    <BaseTextField
      size={size}
      required={required}
      type={type}
      label={label}
      value={formData[name]}
      name={name}
      onChange={handleChange}
      error={!!errors[name]}
      helperText={errors[name]}
      inputProps={{
        pattern
      }}
    />
  )
}

export default TextInput
