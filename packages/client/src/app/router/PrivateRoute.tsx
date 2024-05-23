import React from 'react'
import { Route, Navigate } from 'react-router-dom'

interface Props {
  component: React.FC
}
const PrivateRoute = (props: Props) => {
  const Component = props.component

  const isAuthenticated = true || Boolean(localStorage.getItem('authToken'))

  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
