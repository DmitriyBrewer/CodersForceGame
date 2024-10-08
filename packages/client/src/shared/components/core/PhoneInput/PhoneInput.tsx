import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseIconButton from '@/shared/components/ui/BaseIconButton'

import { IconLocalPhone } from '@/shared/components/icons/iconsMui'

import { conditions } from '@/shared/components/constant'
import { InputProps } from '@/shared/types'

const PhoneInput: FC<InputProps> = ({
  formData,
  handleChange,
  errors,
  name,
  label,
  required = true,
  size = 'small',
  pattern = conditions.phone.pattern
}) => {
  const inputProps = {
    pattern,
    endAdornment: (
      <BaseIconButton>
        <IconLocalPhone fontSize="small" />
      </BaseIconButton>
    )
  }

  return (
    <BaseTextField
      size={size}
      required={required}
      type="tel"
      label={label}
      value={formData.phone}
      name={name}
      onChange={handleChange}
      error={!!errors.phone}
      helperText={errors.phone}
      InputProps={inputProps}
    />
  )
}

export default PhoneInput
