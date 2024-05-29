import { FC, useState } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseIconButton from '@/shared/components/ui/BaseIconButton'

import { IconVisibility, IconVisibilityOff } from '@/shared/components/icons/iconsMui'

import { InputProps } from '../../types'

const RegisterPasswordInput: FC<InputProps> = ({
  formData,
  handleChange,
  errors,
  name,
  label,
  required = true,
  size = 'small'
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const visibleIcon = showPassword ? (
    <IconVisibility color="primary" fontSize="small" />
  ) : (
    <IconVisibilityOff fontSize="small" />
  )

  const endIcon = {
    endAdornment: <BaseIconButton onClick={handleTogglePasswordVisibility}>{visibleIcon}</BaseIconButton>
  }

  return (
    <BaseTextField
      size={size}
      required={required}
      type={showPassword ? 'text' : 'password'}
      label={label}
      value={formData.password}
      name={name}
      onChange={handleChange}
      error={!!errors.password}
      helperText={errors.password}
      InputProps={endIcon}
    />
  )
}

export default RegisterPasswordInput
