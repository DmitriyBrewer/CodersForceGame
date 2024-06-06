import { FC, FormEvent, PropsWithChildren } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import styles from './LoginForm.module.scss'

interface Props {
  handleSubmit: (e: FormEvent<Element>) => void
}

const LoginForm: FC<PropsWithChildren<Props>> = ({ handleSubmit, children }) => {
  return (
    <BaseBox className={styles.root} component="form" autoComplete="off" onSubmit={handleSubmit}>
      <BasePaperPolymorphic elevation={4} rgap="--g20">
        {children}
      </BasePaperPolymorphic>
    </BaseBox>
  )
}

export default LoginForm
