import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from '../routes/routes'

const AppRouter = () => {
  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}

export default AppRouter
