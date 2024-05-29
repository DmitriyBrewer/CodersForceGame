import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import RegisterFeature from '@/feature/session/register'

const RegisterWidget: FC = () => {
  return (
    <BaseContainer maxWidth="sm">
      <RegisterFeature />
    </BaseContainer>
  )
}

export default RegisterWidget
