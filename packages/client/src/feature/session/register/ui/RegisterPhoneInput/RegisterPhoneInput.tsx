import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseIconButton from '@/shared/components/ui/BaseIconButton'

import { IconLocalPhone } from '@/shared/components/icons/iconsMui'

import { InputProps } from '../../types'

const RegisterPhoneInput: FC<InputProps> = ({
  formData,
  handleChange,
  errors,
  name,
  label,
  required = true,
  size = 'small'
}) => {
  const endIcon = {
    endAdornment: (
      <BaseIconButton>
        <IconLocalPhone />
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
      InputProps={endIcon}
    />
  )
}

export default RegisterPhoneInput
