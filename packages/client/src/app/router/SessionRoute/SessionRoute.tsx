import { FC } from 'react'

interface Props {
  component: FC
}

const SessionRoute = (props: Props) => {
  const { component: Component } = props

  // TODO: скрыл тк ошибка ssr, бесконечный loader, ошибка была на feature/cfg-89
  return <Component />
}

export default SessionRoute
