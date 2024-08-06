import { ClipboardEvent, FC, useState } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseIconButton from '@/shared/components/ui/BaseIconButton'

import { IconVisibility, IconVisibilityOff } from '@/shared/components/icons/iconsMui'

import { conditions } from '@/shared/components/constant'
import { InputProps } from '@/shared/types'

const PasswordInput: FC<InputProps> = ({
  formData,
  handleChange,
  errors,
  name,
  label,
  required = true,
  size = 'small',
  pattern = conditions.password.pattern
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const visibleIcon = showPassword ? (
    <IconVisibility color="primary" fontSize="small" />
  ) : (
    <IconVisibilityOff fontSize="small" />
  )

  const inputProps = {
    pattern,
    onPaste: handlePaste,
    endAdornment: <BaseIconButton onClick={handleTogglePasswordVisibility}>{visibleIcon}</BaseIconButton>
  }

  return (
    <BaseTextField
      size={size}
      required={required}
      type={showPassword ? 'text' : 'password'}
      label={label}
      value={formData[name]}
      name={name}
      onChange={handleChange}
      error={!!errors[name]}
      helperText={errors[name]}
      InputProps={inputProps}
    />
  )
}

export default PasswordInput
