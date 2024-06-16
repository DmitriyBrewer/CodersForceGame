import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import BaseLoader from '@/shared/components/ui/BaseLoader'
import BaseBox from '@/shared/components/ui/BaseBox'

import { usePublicAuth } from './hooks/usePublicAuth'
import styles from './PublicRoute.module.scss'

interface Props {
  component: React.FC
}

const PublicRoute = (props: Props) => {
  const { component: Component } = props
  const { isAuth, isLoading } = usePublicAuth()
  const { pathname } = useLocation()

  const isSession = isAuth && pathname.includes(paths.login)

  if (isLoading) {
    return (
      <BaseBox className={styles.root}>
        <BaseLoader />
      </BaseBox>
    )
  }
  return isSession ? <Navigate to={paths.game} /> : <Component />
}

export default PublicRoute
