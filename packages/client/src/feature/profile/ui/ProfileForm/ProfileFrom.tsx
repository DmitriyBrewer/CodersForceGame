import { FC, PropsWithChildren } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import BaseBox from '@/shared/components/ui/BaseBox'

const ProfileFrom: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseBox>
      <BasePaperPolymorphic elevation={4} rgap="--g20">
        {children}
      </BasePaperPolymorphic>
    </BaseBox>
  )
}

export default ProfileFrom
