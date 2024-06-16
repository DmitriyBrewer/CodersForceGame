import React from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'
import BaseBox from '@/shared/components/ui/BaseBox'

import { useSessionRouter } from '../hooks/useSessionRouter'

import styles from './SessionRoute.module.scss'

interface Props {
  component: React.FC
}

const SessionRoute = (props: Props) => {
  const { component: Component } = props
  const { isLoading } = useSessionRouter()

  if (isLoading) {
    return (
      <BaseBox className={styles.root}>
        <BaseLoader />
      </BaseBox>
    )
  }
  return <Component />
}

export default SessionRoute
