import { FC } from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import isBrowser from '@/shared/utils/isBrowser'
import BaseBox from '@/shared/components/ui/BaseBox'

import { useSessionRouter } from '../hooks/useSessionRouter'

interface Props {
  component: FC
}

const SessionRoute = (props: Props) => {
  const { component: Component } = props
  const { isLoading } = useSessionRouter()

  if (isLoading) {
    if (isBrowser()) {
      return (
        <BaseBox>
          <BaseLoader />
        </BaseBox>
      )
    }
    return <Component />
  }

  return <Component />
}

export default SessionRoute
