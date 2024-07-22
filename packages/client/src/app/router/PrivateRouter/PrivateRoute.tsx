import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import { useAuth } from '../hooks/useAuth'

interface Props {
  component: FC
}

const PrivateRoute = (props: Props) => {
  const { component: Component } = props
  const { isAuth } = useAuth()

  // TODO: скрыл тк ошибка ssr, бесконечный loader, ошибка была на feature/cfg-89
  // if (isLoading) {
  //   return (
  //     <RouteBox>
  //       <BaseLoader color="secondary" />
  //     </RouteBox>
  //   )
  // }

  return isAuth ? <Component /> : <Navigate to={paths.login} />
}

export default PrivateRoute
