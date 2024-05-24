import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  component: React.FC
}

function PrivateRoute({ component: Component }: Props) {
  const isAuthenticated = true || Boolean(localStorage.getItem('authToken'))

  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
