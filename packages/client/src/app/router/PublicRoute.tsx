import React from 'react'

interface Props {
  component: React.FC
}

function PublicRoute({ component: Component }: Props) {
  return <Component />
}

export default PublicRoute
