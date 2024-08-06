import { FC, FormEvent, PropsWithChildren } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

interface Props {
  handleSubmit: (e: FormEvent<Element>) => void
}

const FormData: FC<PropsWithChildren<Props>> = ({ handleSubmit, children }) => {
  return (
    <BaseBox component="form" onSubmit={handleSubmit} autoComplete="off">
      <BasePaperPolymorphic elevation={4} rgap="--g20">
        {children}
      </BasePaperPolymorphic>
    </BaseBox>
  )
}

export default FormData
