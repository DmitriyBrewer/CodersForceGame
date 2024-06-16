import React from 'react'
import { Navigate } from 'react-router-dom'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import { paths } from '@/shared/config/routing'

import { useAuth } from '../hooks/useAuth'
import RouteBox from '../RouteBox'

interface Props {
  component: React.FC
}

const PrivateRoute = (props: Props) => {
  const { component: Component } = props
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return (
      <RouteBox>
        <BaseLoader />
      </RouteBox>
    )
  }

  return isAuth ? <Component /> : <Navigate to={paths.login} />
}

export default PrivateRoute
