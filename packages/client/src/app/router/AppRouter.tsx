import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import RegisterPage from '@/pages/session/register'
import Profile from '@/pages/Profile'
import Game from '@/pages/Game'
import Leaderboard from '@/pages/Leaderboard'
import Forum from '@/pages/Forum'
import ForumTopic from '@/pages/ForumTopic'
import Login from '@/pages/Login'
import Page500 from '@/pages/500'
import Page404 from '@/pages/404'

import PrivateRoute from '@/app/router/PrivateRoute'
import PublicRoute from '@/app/router/PublicRoute'
import BaseLayout from '@/layouts/BaseLayout'

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: paths.login,
        element: <PublicRoute component={Login} />
      },
      {
        path: paths.register,
        element: <PublicRoute component={RegisterPage} />
      },
      {
        path: paths.profile,
        element: <PrivateRoute component={Profile} />
      },
      {
        path: paths.game,
        element: <PrivateRoute component={Game} />
      },
      {
        path: paths.leaderboard,
        element: <PrivateRoute component={Leaderboard} />
      },
      {
        path: paths.forum,
        element: <PrivateRoute component={Forum} />
      },
      {
        path: paths.forumTopic,
        element: <PrivateRoute component={ForumTopic} />
      },
      {
        path: paths.page500,
        element: <Page500 />
      },
      {
        path: paths.page404,
        element: <Page404 />
      }
    ]
  }
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
