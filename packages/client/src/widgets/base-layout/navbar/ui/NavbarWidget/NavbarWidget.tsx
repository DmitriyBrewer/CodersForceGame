import { FC } from 'react'

import BaseNavbar from '@/shared/components/ui/BaseNavbar'

import { styleMui } from '@/shared/styleMui'

import NavbarFeature from '@/feature/base-layout/navbar'

const NavbarWidget: FC = () => {
  return (
    <BaseNavbar component="header" sx={styleMui.navbar}>
      <NavbarFeature />
    </BaseNavbar>
  )
}

export default NavbarWidget
