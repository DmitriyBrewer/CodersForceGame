import { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BasePaper from '@/shared/components/ui/BasePaper'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseContainer from '@/shared/components/ui/BaseContainer'

import styles from './RegisterFeature.module.scss'
import { useRegister } from '../../hooks/useRegister'
import PasswordInput from '../PasswordInput'

const RegisterFeature: FC = () => {
  const { formData, handleChange, errors, handleSubmit } = useRegister()

  return (
    <BaseBox className={styles.root} autoComplete="off" component="form" onSubmit={handleSubmit}>
      <BaseContainer maxWidth="sm">
        <BasePaper elevation={4}>
          <BaseTypography component="h1" variant="h3">
            Регистрация
          </BaseTypography>
          <PasswordInput formData={formData} handleChange={handleChange} errors={errors} />
          <BaseButton type="submit" variant="contained">
            Регистрация
          </BaseButton>
        </BasePaper>
      </BaseContainer>
    </BaseBox>
  )
}

export default RegisterFeature
