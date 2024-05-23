import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const PrivateRoute = ({ component: Component }: any) => {
  const isAuthenticated = true || Boolean(localStorage.getItem('authToken'))

  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
