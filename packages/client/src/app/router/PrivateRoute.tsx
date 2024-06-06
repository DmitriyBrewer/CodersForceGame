import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getAuth } from '@/entities/user/model/selector'

interface Props {
  component: React.FC
}

const PrivateRoute = (props: Props) => {
  const { component: Component } = props
  const isAuth = useSelector(getAuth)
  console.log(isAuth)

  return isAuth ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
