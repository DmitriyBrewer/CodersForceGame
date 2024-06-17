import { FC } from 'react'

import { useSelector } from 'react-redux'

import { paths } from '@/shared/config/routing'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import { styleMui } from '@/shared/styleMui'

import BaseButton from '@/shared/components/ui/BaseButton'

import BaseBox from '@/shared/components/ui/BaseBox'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import BaseAlert from '@/shared/components/ui/BaseAlert'

import { IconExitToApp, IconLogin } from '@/shared/components/icons/iconsMui'

import { getAuth } from '@/entities/user/model/selector'

import BaseLink from '@/shared/components/ui/BaseLink'

import NavbarLink from '@/feature/base-layout/navbar/ui/NavbarLink'
import { useLogout } from '../../../hooks/useLogout'

const NavbarFeature: FC = () => {
  const { isLoading, isError, handleLogout, error } = useLogout()
  const isAuth = useSelector(getAuth)

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
          <NavbarLink to={paths.home}>Главная</NavbarLink>
          <NavbarLink to={paths.forum}>Форум</NavbarLink>
          <NavbarLink to={paths.leaderboard}>Таблица рекордов</NavbarLink>
          <NavbarLink to={paths.profile}>Профиль</NavbarLink>
          <NavbarLink to={paths.game}>Игра</NavbarLink>
        </BaseBox>
        {isAuth && (
          <BaseButton color="error" variant="contained" onClick={handleLogout} endIcon={<IconExitToApp />}>
            Выйти
          </BaseButton>
        )}
        {!isAuth && (
          <BaseLink to={paths.login}>
            <BaseButton color="secondary" variant="contained" endIcon={<IconLogin />}>
              Войти
            </BaseButton>
          </BaseLink>
        )}
      </BaseContainer>
    </>
  )
}

export default NavbarFeature
