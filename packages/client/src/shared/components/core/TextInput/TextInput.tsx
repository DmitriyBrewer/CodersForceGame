import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import { InputProps } from '@/shared/components/core/FormData/types'
import { conditions } from '@/shared/components/core/FormData/constant'

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
