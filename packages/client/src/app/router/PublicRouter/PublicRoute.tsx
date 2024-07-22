import { FC } from 'react'

interface Props {
  component: FC
}

const PublicRoute = (props: Props) => {
  const { component: Component } = props
  // const { isLoading } = usePublicAuth()
  // TODO: скрыл тк ошибка ssr, бесконечный loader, ошибка была на feature/cfg-89
  // if (isLoading) {
  //   return (
  //     <RouteBox>
  //       <BaseLoader color="info" />
  //     </RouteBox>
  //   )
  // }
  return <Component />
}

export default PublicRoute
