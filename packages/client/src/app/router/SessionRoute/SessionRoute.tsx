import { FC } from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import { useSessionRouter } from '../hooks/useSessionRouter'
import RouteBox from '../RouteBox'

interface Props {
  component: FC
}

const SessionRoute = (props: Props) => {
  const { component: Component } = props
  const { isLoading } = useSessionRouter()

  if (isLoading) {
    return (
      <RouteBox>
        <BaseLoader />
      </RouteBox>
    )
  }
  return <Component />
}

export default SessionRoute
