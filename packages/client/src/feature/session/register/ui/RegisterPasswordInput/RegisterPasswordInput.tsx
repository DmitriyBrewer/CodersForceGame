import { ChangeEvent, FC, useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseIconButton from '@/shared/components/ui/BaseIconButton'

import { RegisterError, RegisterPayload } from '../../types'

interface Props {
  formData: RegisterPayload
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: RegisterError
}

const RegisterPasswordInput: FC<Props> = ({ formData, handleChange, errors }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const visibleIcon = showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />

  return (
    <BaseTextField
      type={showPassword ? 'text' : 'password'}
      label="Пароль"
      value={formData.password}
      name="password"
      onChange={handleChange}
      error={!!errors.password}
      helperText={errors.password}
      InputProps={{
        endAdornment: <BaseIconButton onClick={handleTogglePasswordVisibility}>{visibleIcon}</BaseIconButton>
      }}
    />
  )
}

export default RegisterPasswordInput
