import { FC, FormEvent, PropsWithChildren } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

interface Props {
  handleSubmit: (e: FormEvent<Element>) => void
  className?: string | undefined
}

const FormData: FC<PropsWithChildren<Props>> = ({ handleSubmit, children, className = '' }) => {
  return (
    <BaseBox component="form" className={className} onSubmit={handleSubmit} autoComplete="off">
      <BasePaperPolymorphic elevation={4} rgap="--g20">
        {children}
      </BasePaperPolymorphic>
    </BaseBox>
  )
}

export default FormData
