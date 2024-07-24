import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import BaseBox from '@/shared/components/ui/BaseBox'

import isBrowser from '@/shared/utils/isBrowser'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import { useAuth } from '../hooks/useAuth'

interface Props {
  component: FC
}

const PrivateRoute = (props: Props) => {
  const { component: Component } = props
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    if (isBrowser()) {
      return (
        <BaseBox>
          <BaseLoader />
        </BaseBox>
      )
    }
    return <Component />
  }

  return isAuth ? <Component /> : <Navigate to={paths.login} />
}

export default PrivateRoute
