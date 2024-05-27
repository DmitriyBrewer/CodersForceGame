import React from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTextField from '@/shared/components/ui/BaseTextField'
import BaseTypography from '@/shared/components/ui/BaseTypography'

import BasePaper from '@/shared/components/ui/BasePaper'

import BaseBox from '@/shared/components/ui/BaseBox'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import styles from './Register.module.scss'

const Register: React.FC = () => {
  return (
    <BaseBox className={styles.root} autoComplete="off" component="form">
      <BaseContainer maxWidth="md">
        <BasePaper className={styles.paper} elevation={4}>
          <BaseTypography component="h1" variant="h3">
            Регистрация
          </BaseTypography>
          <BaseTextField
            helperText="Введите first_name"
            error
            name="first_name"
            variant="outlined"
            required
            label="first_name"
            size="small"
          />
          <BaseTextField
            helperText="Введите second_name"
            error
            name="second_name"
            variant="outlined"
            required
            label="second_name"
            size="small"
          />
          <BaseTextField
            helperText="Введите login"
            error
            name="login"
            variant="outlined"
            required
            label="login"
            size="small"
          />
          <BaseTextField
            helperText="Введите email"
            error
            name="email"
            variant="outlined"
            required
            label="email"
            size="small"
          />
          <BaseTextField
            helperText="Введите password"
            error
            name="password"
            variant="outlined"
            required
            label="password"
            size="small"
          />
          <BaseTextField
            helperText="Введите phone"
            error
            name="phone"
            variant="outlined"
            required
            label="phone"
            size="small"
          />

          <BaseButton type="submit" variant="contained">
            Регистрация
          </BaseButton>
        </BasePaper>
      </BaseContainer>
    </BaseBox>
  )
}

export default Register
