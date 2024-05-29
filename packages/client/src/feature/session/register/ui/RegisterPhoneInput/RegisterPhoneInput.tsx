import { FC } from 'react'

// TODO: feature/cfg-23 icon вынести в отдельную папкку
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseIconButton from '@/shared/components/ui/BaseIconButton'

import { InputProps } from '../../types'

const RegisterPhoneInput: FC<InputProps> = ({ formData, handleChange, errors, name, label, required = true }) => {
  const endIcon = {
    endAdornment: (
      <BaseIconButton>
        <LocalPhoneIcon />
      </BaseIconButton>
    )
  }

  return (
    <BaseTextField
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
