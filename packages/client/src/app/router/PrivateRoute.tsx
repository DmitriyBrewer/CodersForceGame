import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'

interface Props {
  component: React.FC
}

const PrivateRoute = (props: Props) => {
  const { component: Component } = props
  const { isAuth, isLoading } = useAuth()
  // TODO придумать loader
  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuth ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
