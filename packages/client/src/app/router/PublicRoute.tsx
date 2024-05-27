import React from 'react'

interface Props {
  component: React.FC
}

const PublicRoute = (props: Props) => {
  const { component: Component } = props

  return <Component />
}

export default PublicRoute
