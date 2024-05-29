import { FC, useState } from 'react'

// TODO: feature/cfg-23 icon вынести в отдельную папкку
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseIconButton from '@/shared/components/ui/BaseIconButton'

import { InputProps } from '../../types'

const RegisterPasswordInput: FC<InputProps> = ({ formData, handleChange, errors, name, label, required }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const visibleIcon = showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
  const endIcon = {
    endAdornment: <BaseIconButton onClick={handleTogglePasswordVisibility}>{visibleIcon}</BaseIconButton>
  }

  return (
    <BaseTextField
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
