import React from 'react'
import { Navigate } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import { usePublicAuth } from './hooks/usePublicAuth'

interface Props {
  component: React.FC
}

const PublicRoute = (props: Props) => {
  const { component: Component } = props
  const { isAuth } = usePublicAuth()

  return isAuth ? <Navigate to={paths.game} /> : <Component />
}

export default PublicRoute
