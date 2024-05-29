import { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseContainer from '@/shared/components/ui/BaseContainer'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import styles from './RegisterFeature.module.scss'
import { useRegister } from '../../hooks/useRegister'
import PasswordInput from '../PasswordInput'

const RegisterFeature: FC = () => {
  const { formData, handleChange, errors, handleSubmit } = useRegister()

  return (
    <BaseBox className={styles.root} autoComplete="off" component="form" onSubmit={handleSubmit}>
      <BaseContainer maxWidth="sm">
        <BasePaperPolymorphic elevation={4} rgap="--g20">
          <BaseTypography component="h1" variant="h3">
            Регистрация
          </BaseTypography>
          <PasswordInput formData={formData} handleChange={handleChange} errors={errors} />
          <BaseButton type="submit" variant="contained">
            Регистрация
          </BaseButton>
        </BasePaperPolymorphic>
      </BaseContainer>
    </BaseBox>
  )
}

export default RegisterFeature
