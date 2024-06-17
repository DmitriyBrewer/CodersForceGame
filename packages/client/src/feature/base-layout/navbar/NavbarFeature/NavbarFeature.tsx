import { FC } from 'react'

import { paths } from '@/shared/config/routing'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import { styleMui } from '@/shared/styleMui'

import BaseButton from '@/shared/components/ui/BaseButton'

import BaseBox from '@/shared/components/ui/BaseBox'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import BaseAlert from '@/shared/components/ui/BaseAlert'

import NavbarLink from '@/feature/base-layout/navbar/NavbarLink'
import { useLogout } from '../../hooks/useLogout'

const NavbarFeature: FC = () => {
  const { isLoading, isError, handleLogout, error } = useLogout()

  if (isLoading) {
    return <BaseLoader />
  }

  return (
    <>
      {isError && (
        <BaseAlert variant="filled" severity="error">
          {error}
        </BaseAlert>
      )}
      <BaseContainer sx={styleMui.navbarContainer}>
        <BaseBox sx={styleMui.navbarBox}>
          <NavbarLink to={paths.forum}>Главная</NavbarLink>
          <NavbarLink to={paths.forum}>Форум</NavbarLink>
          <NavbarLink to={paths.leaderboard}>Таблица рекордов</NavbarLink>
          <NavbarLink to={paths.profile}>Профиль</NavbarLink>
          <NavbarLink to={paths.game}>Игра</NavbarLink>
        </BaseBox>
        <BaseButton color="error" variant="contained" onClick={handleLogout}>
          Выйти
        </BaseButton>
      </BaseContainer>
    </>
  )
}

export default NavbarFeature
