import { FC } from 'react'

interface Props {
  component: FC
}

const PublicRoute = (props: Props) => {
  const { component: Component } = props

  return <Component />
}

export default PublicRoute
