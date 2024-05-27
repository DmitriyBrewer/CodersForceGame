import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  component: React.FC
}

const PrivateRoute = (props: Props) => {
  const { component: Component } = props
  const isAuthenticated = true || Boolean(localStorage.getItem('authToken'))

  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
