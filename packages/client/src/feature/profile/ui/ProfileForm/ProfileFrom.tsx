import { FC, PropsWithChildren } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import BaseBox from '@/shared/components/ui/BaseBox'

import styles from '@/feature/session/register/ui/RegisterForm/RegisterForm.module.scss'

const ProfileFrom: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseBox className={styles.root}>
      <BasePaperPolymorphic elevation={4} rgap="--g20">
        {children}
      </BasePaperPolymorphic>
    </BaseBox>
  )
}

export default ProfileFrom
