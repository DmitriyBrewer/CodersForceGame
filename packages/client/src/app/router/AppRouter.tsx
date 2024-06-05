import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import RegisterPage from '@/pages/session/register'
import Profile from '@/pages/Profile'
import Leaderboard from '@/pages/Leaderboard'

import Login from '@/pages/Login'
import Page404 from '@/pages/404'

import Error500Page from '@/pages/error/Error500'

import StartGamePage from '@/pages/game/game-engine'

import TopicListPage from '@/pages/TopicListPage'

import TopicDetailPage from '@/pages/TopicDetailPage'

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
        element: <PrivateRoute component={StartGamePage} />
      },
      {
        path: paths.leaderboard,
        element: <PrivateRoute component={Leaderboard} />
      },
      {
        path: paths.forum,
        element: <PrivateRoute component={TopicListPage} />
      },
      {
        path: paths.forumTopic,
        element: <PrivateRoute component={TopicDetailPage} />
      },
      {
        path: paths.page500,
        element: <Error500Page />
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
