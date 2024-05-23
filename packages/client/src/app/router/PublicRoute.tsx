import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest }: any) => {
  return <Component />
}

export default PublicRoute
