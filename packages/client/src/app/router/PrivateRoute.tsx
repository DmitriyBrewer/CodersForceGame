import React from 'react'
import { Navigate } from 'react-router-dom'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import BaseBox from '@/shared/components/ui/BaseBox'

import { useAuth } from './hooks/useAuth'
import styles from './PrivateRoute.module.scss'

interface Props {
  component: React.FC
}

const PrivateRoute = (props: Props) => {
  const { component: Component } = props
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return (
      <BaseBox className={styles.root}>
        <BaseLoader />
      </BaseBox>
    )
  }

  return isAuth ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
