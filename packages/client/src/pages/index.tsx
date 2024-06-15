import { FC } from 'react'

import BaseLink from '@/shared/components/ui/BaseLink'
import { paths } from '@/shared/config/routing'
import BaseTypography from '@/shared/components/ui/BaseTypography'

const HomePage: FC = () => {
  return (
    <>
      <BaseTypography>Стартовая страница</BaseTypography>
      <BaseLink to={paths.game}>Перейти к игре</BaseLink>
    </>
  )
}

export default HomePage
