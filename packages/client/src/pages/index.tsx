import { FC } from 'react'

import { paths } from '@/shared/config/routing'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseLink from '@/shared/components/ui/BaseLink'

const HomePage: FC = () => {
  return (
    <>
      <BaseTypography>Стартовая страница</BaseTypography>
      <BaseLink to={paths.game}>Перейти к игре</BaseLink>
    </>
  )
}

export default HomePage
