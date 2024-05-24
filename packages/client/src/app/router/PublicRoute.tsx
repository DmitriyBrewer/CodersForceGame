import React from 'react'

interface Props {
  component: React.FC
}

const PublicRoute = (props: Props) => {
  const Component = props.component
  return <Component />
}

export default PublicRoute
