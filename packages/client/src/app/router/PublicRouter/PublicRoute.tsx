import { FC } from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import { usePublicAuth } from '../hooks/usePublicAuth'
import RouteBox from '../RouteBox'

interface Props {
  component: FC
}

const PublicRoute = (props: Props) => {
  const { component: Component } = props
  const { isLoading } = usePublicAuth()

  if (isLoading) {
    return (
      <RouteBox>
        <BaseLoader />
      </RouteBox>
    )
  }
  return <Component />
}

export default PublicRoute
