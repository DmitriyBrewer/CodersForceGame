// TODO: feature/cfg-88 удалить позже, если не будет использоваться при ssr
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from '../routes/routes'

const AppRouter = () => {
  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}

export default AppRouter
