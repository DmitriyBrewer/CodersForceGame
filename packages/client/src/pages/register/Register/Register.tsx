import React from 'react'

import { Box } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTextField from '@/shared/components/ui/BaseTextField'
import BaseTypography from '@/shared/components/ui/BaseTypography'

import BasePaper from '@/shared/components/ui/BasePaper'

import styles from './Register.module.scss'

const Register: React.FC = () => {
  return (
    <Box className={styles.root} noValidate autoComplete="off" component="form">
      <BasePaper elevation={4}>
        <BaseTypography variant="h3">Регистрация</BaseTypography>
        <BaseTextField name="firstName" variant="outlined" required label="test" />
        <BaseButton type="submit" variant="contained">
          Регистрация
        </BaseButton>
      </BasePaper>
    </Box>
  )
}

export default Register
