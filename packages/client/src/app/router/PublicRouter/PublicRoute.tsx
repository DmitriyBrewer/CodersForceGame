import React from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'
import BaseBox from '@/shared/components/ui/BaseBox'

import { usePublicAuth } from '../hooks/usePublicAuth'
import styles from './PublicRoute.module.scss'

interface Props {
  component: React.FC
}

const PublicRoute = (props: Props) => {
  const { component: Component } = props
  const { isLoading } = usePublicAuth()

  if (isLoading) {
    return (
      <BaseBox className={styles.root}>
        <BaseLoader />
      </BaseBox>
    )
  }
  return <Component />
}

export default PublicRoute
