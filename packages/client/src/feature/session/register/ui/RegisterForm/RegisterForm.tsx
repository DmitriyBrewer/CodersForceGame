import { FC, FormEvent, PropsWithChildren } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import styles from './RegisterForm.module.scss'

interface Props {
  handleSubmit: (e: FormEvent<Element>) => void
}

const RegisterForm: FC<PropsWithChildren<Props>> = ({ handleSubmit, children }) => {
  return (
    <BaseBox component="form" className={styles.root} onSubmit={handleSubmit}>
      <BasePaperPolymorphic elevation={4} rgap="--g20">
        {children}
      </BasePaperPolymorphic>
    </BaseBox>
  )
}

export default RegisterForm
