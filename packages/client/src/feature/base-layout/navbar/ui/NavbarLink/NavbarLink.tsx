import { FC, PropsWithChildren } from 'react'

import BaseLink from '@/shared/components/ui/BaseLink'
import BaseButton from '@/shared/components/ui/BaseButton'

interface Props {
  to: string
}
const NavbarLink: FC<PropsWithChildren<Props>> = ({ to, children }) => {
  return (
    <BaseLink to={to}>
      <BaseButton variant="contained">{children}</BaseButton>
    </BaseLink>
  )
}

export default NavbarLink
