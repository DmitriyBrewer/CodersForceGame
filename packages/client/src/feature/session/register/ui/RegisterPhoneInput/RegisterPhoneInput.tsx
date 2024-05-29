import { FC } from 'react'

import LocalPhoneIcon from '@mui/icons-material/LocalPhone'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseIconButton from '@/shared/components/ui/BaseIconButton'

import { InputProps } from '../../types'

const RegisterPhoneInput: FC<InputProps> = ({ formData, handleChange, errors, name, label }) => {
  return (
    <BaseTextField
      type="phone"
      label={label}
      value={formData.phone}
      name={name}
      onChange={handleChange}
      error={!!errors.phone}
      helperText={errors.phone}
      InputProps={{
        endAdornment: (
          <BaseIconButton>
            <LocalPhoneIcon />
          </BaseIconButton>
        )
      }}
    />
  )
}

export default RegisterPhoneInput
